# web

Unified server — serves both the Hono API under `/api` and the React frontend from a single Bun.serve process.

## Run

```bash
bun run dev
```

The server port is configured automatically.

## Typecheck and build

```bash
bun run typecheck
bun run build











$env:SEED_ADMIN_EMAIL = "admin@antsomafi.com"
$env:SEED_ADMIN_NAME = "administrateur"
$secure = Read-Host "12345678910" -AsSecureString
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try {
  $env:SEED_ADMIN_PASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
  bun --env-file=../../.env scripts/seed-admin.ts
} finally {
  Remove-Item Env:SEED_ADMIN_PASSWORD -ErrorAction SilentlyContinue
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
  $secure.Dispose()
}
```
