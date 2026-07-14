---
name: Migrating an artifact to a new directory/id
description: How to actually change an artifact's slug/directory when the user insists, and the pitfalls that break registration along the way.
---

Artifact ids/directories are permanent once created, and there is no delete-artifact callback available to the agent — only `createArtifact`, `listArtifacts`, `verifyAndReplaceArtifactToml`, `presentArtifact`. If a user insists on changing an artifact's folder/id "no matter what", the only path is: create a brand-new artifact with the desired slug, migrate the real app files into it, and leave the old artifact registration behind as an inert leftover (user deletes it from the UI later, once that becomes possible from their side).

**Why:** `id` is explicitly immutable via `verifyAndReplaceArtifactToml`, and no removal callback exists, so an old artifact entry cannot be cleaned up by the agent.

**How to apply:**
- Free up the desired `previewPath` first by editing the *old* artifact's `artifact.toml` (via `verifyAndReplaceArtifactToml`) to move it off that path — otherwise the new `createArtifact` call fails with `DUPLICATE_PREVIEW_PATH`.
- If both old and new packages will temporarily coexist in the pnpm workspace, rename the old package's `name` in `package.json` first (e.g. append `-legacy`) to avoid a duplicate-package-name collision when the new artifact scaffolds a package with the same name.
- **Never delete an artifact's `.replit-artifact/` directory** (or the `artifact.toml` inside it) as part of moving files — the platform treats that as removing the artifact from the registry entirely (confirmed: deleting it triggered an automatic "Removed artifact" update, and even an empty directory at that slug still blocks `createArtifact` with `ARTIFACT_DIR_EXISTS` until the directory itself is `rmdir`-ed). Move/copy real app content around `.replit-artifact/` untouched, or restore registration by re-running the full create → evacuate-content → create → move-content-back sequence if it happens.
- `createArtifact` for a framework not in its supported type list (e.g. Next.js — only `react-vite` is offered for a plain web app) still works as a base scaffold: create with the closest type, then overwrite the scaffolded frontend files with the real app and fix `services.development`/`services.production` run/build commands in `artifact.toml` by hand via `verifyAndReplaceArtifactToml`.
