---
name: Hidden dev-login auth pattern
description: Lessons from implementing a hidden PIN+name dev sign-in with a gated admin/dev center, backed by env secrets instead of a normal password.
---

When adding a hidden "sign in as dev" flow gated by env secrets (e.g. `DEV_PIN`/`DEV_NAME`) that creates/reuses a special account:

- **Reserve the identity's username/email at the source.** If normal signup generates usernames without a minimum length, a real user can land on the exact reserved username (e.g. `"dev"`) before the dev account is ever created. Add the reserved name to the signup username-generation collision check, not just to manual profile-edit validation (which may already reject short names via its own regex and give false confidence).
- **Never trust `username === reserved` alone when resolving the special account.** Look it up, then verify its actual role/flag column (e.g. `isDev`) before reusing it; fail closed (503) if the reserved slot is occupied by a non-matching row rather than silently signing in as the wrong account.
- **Lock out globally, not per-IP, when the credential is a single shared secret.** `x-forwarded-for`/client-supplied headers are trivially spoofable, so per-IP lockout on a shared PIN is not real protection — a global in-memory attempt counter closes that gap cheaply (accepting the tradeoff that it resets on restart and doesn't scale across processes, which is fine for a low-traffic hidden route only).
- **Any account-suspension/ban flag must be checked in every path that calls `createSession`,** not just the primary password login route — this includes token-based "switch account" / passwordless re-auth endpoints, which are easy to miss since they don't go through the normal login form.
