/**
 * Converts an object storage path (e.g. "/objects/uploads/<uuid>", as stored
 * on the user record) into a servable URL through the API server's storage
 * route. The API server is mounted at "/api" on the same host (see
 * artifacts/api-server/.replit-artifact/artifact.toml), so no separate
 * origin/env var is needed.
 */
export function objectStorageUrl(objectPath: string): string {
  return `/api/storage${objectPath}`;
}
