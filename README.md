# URL Shortener CLI & API Monorepo

This is a monorepo for a URL shortening service with:

- **API** built with NestJS & MongoDB
- **CLI tool** to shorten URLs and open short links
- **Common package** with shared utilities and types

The project is managed with **PNPM workspaces**.

---

## Project Structure

```
.
├── README.md
├── apps
│   ├── api                # NestJS API
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── app.module.ts
│   │   │   ├── main.ts
│   │   │   └── url
│   │   │       ├── url.controller.ts
│   │   │       ├── url.module.ts
│   │   │       ├── url.schema.ts
│   │   │       └── url.service.ts
│   │   └── tsconfig.json
│   └── cli                # CLI tool
│       ├── package.json
│       ├── src
│       │   └── index.ts
│       └── tsconfig.json
├── packages
│   └── common             # Shared utilities and types
│       ├── package.json
│       ├── src
│       │   ├── index.ts
│       │   ├── types
│       │   │   └── url.ts
│       │   └── utils
│       │       └── generate-code.ts
│       └── tsconfig.json
├── package.json           # Root package.json
├── tsconfig.json          # Root tsconfig
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── package-lock.json
```

> **Note:** `node_modules` and `dist` directories are ignored for clarity.

---

## Prerequisites

- Node.js v20+
- PNPM v8+

---

## Setup

Install all dependencies for all workspaces:

```bash
pnpm install
```

This installs dependencies in root `node_modules` using **PNPM workspace hoisting**.

---

## Build

### Build all workspaces

```bash
pnpm -r run build
```

- `-r` → recursive for all workspaces
- Compiles TypeScript to `dist/` in `apps/api`, `apps/cli`, and `packages/common`

### Build a specific workspace

```bash
pnpm --filter @url-shrtn/cli run build
pnpm --filter @url-shrtn/api run build
pnpm --filter @url-shrtn/common run build
```

---

## Run

### Run the API

```bash
pnpm --filter @url-shrtn/api start
# or dev mode
pnpm --filter @url-shrtn/api run start:dev
```

### Run the CLI

```bash
pnpm --filter @url-shrtn/cli start
```

**Example usage:**

```bash
pnpm --filter @url-shrtn/cli start shorten https://example.com
pnpm --filter @url-shrtn/cli start open abc123
```

> CLI reads API URL and configuration from root `.env`.

---

## Environment Variables

Create a `.env` at root:

```env
MONGO_URI=mongodb://localhost:27017/url-shrtn
API_URL=http://localhost:3000
PORT=3000
```

All workspaces load this `.env` using `dotenv`.

---

## PNPM Workspace Tips

- **List dependencies per workspace**

```bash
pnpm list -r --depth=0
```

- **List all packages in monorepo**

```bash
pnpm -r list
```

- **Run a script in a specific workspace**

```bash
pnpm --filter @url-shrtn/api run build
pnpm --filter @url-shrtn/cli run start
```

- **Recursive install/build/run**

```bash
pnpm -r run build
pnpm -r install
```

---

## Notes

- CLI `index.ts` should import dotenv:

```ts
import 'dotenv/config';
```

- API uses Mongoose:

```ts
MongooseModule.forRoot(process.env.MONGO_URI)
```

- Common utilities and types are shared via `@url-shrtn/common`.