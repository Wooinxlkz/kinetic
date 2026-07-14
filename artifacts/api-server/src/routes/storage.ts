import { Readable } from "stream";
import { RequestUploadUrlBody, RequestUploadUrlResponse } from "@workspace/api-zod";
import { Router, type IRouter, type Request, type Response } from "express";
import { ObjectNotFoundError, ObjectStorageService } from "../lib/objectStorage";
import { requireSessionUser } from "../lib/sessionAuth";

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

// Only static raster images may be uploaded (avatars/banners). This is an
// allowlist, not a blocklist: anything else — including HTML/JS/SVG, which
// could be rendered as active content if served back from this origin — is
// rejected outright. GIF is gated separately below to Pro/Sponsor/Lifetime
// plans rather than being blocked outright.
const ALLOWED_CONTENT_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const GIF_CONTENT_TYPE = "image/gif";
const GIF_ALLOWED_PLANS = new Set(["pro", "sponsor", "lifetime"]);

/**
 * POST /storage/uploads/request-url
 *
 * Request a presigned URL for file upload.
 * The client sends JSON metadata (name, size, contentType) — NOT the file.
 * Then uploads the file directly to the returned presigned URL.
 */
router.post("/storage/uploads/request-url", requireSessionUser, async (req: Request, res: Response) => {
  const parsed = RequestUploadUrlBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Missing or invalid required fields" });
    return;
  }

  const { name, size, contentType } = parsed.data;
  const normalizedContentType = contentType.toLowerCase();

  if (normalizedContentType === GIF_CONTENT_TYPE) {
    const plan = req.sessionUser?.plan ?? "free";
    if (!GIF_ALLOWED_PLANS.has(plan)) {
      res.status(400).json({ error: "GIF uploads require a Pro, Sponsor, or Lifetime membership" });
      return;
    }
  } else if (!ALLOWED_CONTENT_TYPES.has(normalizedContentType)) {
    res.status(400).json({ error: "Only PNG, JPEG, WEBP, or GIF images are supported" });
    return;
  }

  try {
    const uploadURL = await objectStorageService.getObjectEntityUploadURL();
    const objectPath = objectStorageService.normalizeObjectEntityPath(uploadURL);

    res.json(
      RequestUploadUrlResponse.parse({
        uploadURL,
        objectPath,
        metadata: { name, size, contentType },
      }),
    );
  } catch (error) {
    req.log.error({ err: error }, "Error generating upload URL");
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

/**
 * GET /storage/objects/*
 *
 * Serves uploaded avatar/banner images. Profile images are readable by
 * anyone (they're shown on public profile pages). This namespace is
 * currently used exclusively for profile media, but as defense-in-depth we
 * scope serving to the "uploads/" prefix and re-verify the object's actual
 * stored Content-Type is an image before streaming it — even though only
 * image uploads are accepted at request-url time, this guards against any
 * future upload path being added carelessly and against served content ever
 * being interpreted as active content by a browser.
 */
router.get("/storage/objects/*path", async (req: Request, res: Response) => {
  try {
    const raw = req.params.path;
    const wildcardPath = Array.isArray(raw) ? raw.join("/") : raw;
    if (!wildcardPath.startsWith("uploads/")) {
      res.status(404).json({ error: "Object not found" });
      return;
    }
    const objectPath = `/objects/${wildcardPath}`;
    const objectFile = await objectStorageService.getObjectEntityFile(objectPath);

    const [metadata] = await objectFile.getMetadata();
    const contentType = typeof metadata.contentType === "string" ? metadata.contentType : "";
    if (!contentType.startsWith("image/")) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    // Profile media objects are content-addressed (random UUID per upload,
    // never mutated in place), so it's safe to cache them for a long time —
    // this avoids re-streaming the same avatar/banner through this server
    // on every page view.
    const response = await objectStorageService.downloadObject(objectFile, 31536000);

    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.setHeader("X-Content-Type-Options", "nosniff");

    if (response.body) {
      const nodeStream = Readable.fromWeb(response.body as ReadableStream<Uint8Array>);
      nodeStream.pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    if (error instanceof ObjectNotFoundError) {
      res.status(404).json({ error: "Object not found" });
      return;
    }
    req.log.error({ err: error }, "Error serving object");
    res.status(500).json({ error: "Failed to serve object" });
  }
});

export default router;
