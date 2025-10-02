# AI Task Assigner (Monorepo)

A full‑stack project management tool that analyzes tickets and helps teams assign work efficiently. The repository contains:
- A NestJS API with JWT auth, MongoDB (Mongoose), Inngest-powered background jobs, and Nodemailer emails.
- A React (Vite) client using Tailwind CSS v4 and shadcn/ui.

Badges: Node.js • PNPM • NestJS • React • Vite • Tailwind v4 • MongoDB

## Contents
- Overview
- Features
- Tech Stack
- Monorepo Structure
- Getting Started
- Configuration (Env)
- Development
- Build & Deploy
- Scripts
- API Quick Reference
- Architecture
- Contributing
- License

## Overview
The API exposes secure endpoints for users and tickets while delegating long‑running tasks (emails, analysis) to background jobs. The client provides modern, accessible UI screens (login, signup, dashboard, tickets) built with shadcn/ui and Tailwind v4.

## Features
- Authentication with JWT and role-based access
- Ticket CRUD and listing
- Background jobs via Inngest (e.g., welcome emails, ticket analysis)
- Email notifications using Nodemailer
- Modern UI with Tailwind v4 + shadcn/ui + React 19
- DX: E2E/unit tests, linting, formatting

## Tech Stack
- Backend: NestJS, Mongoose, Inngest, Nodemailer, TypeScript
- Frontend: React 19, Vite 7, Tailwind CSS v4, shadcn/ui, React Router 7
- Tooling: ESLint, Prettier, PNPM

## Monorepo Structure
```
.
├── client/               # React + Vite app
│   ├── src/
│   │   ├── pages/        # App pages (e.g., Dashboard, Tickets)
│   │   ├── components/   # shadcn/ui components
│   │   └── index.css     # Tailwind v4 entry
│   └── vite.config.ts
└── server/               # NestJS API
    ├── src/
    │   ├── app.module.ts
    │   ├── main.ts
    │   ├── users/
    │   ├── tickets/
    │   ├── mail/
    │   └── inngest/
    └── package.json
```

Key files:
- Client: [client/src/index.css](client/src/index.css), [client/vite.config.ts](client/vite.config.ts), [client/src/pages/dashboard.tsx](client/src/pages/dashboard.tsx)
- Server: [server/src/app.module.ts](server/src/app.module.ts), [server/src/main.ts](server/src/main.ts), [server/src/mail/mail.service.ts](server/src/mail/mail.service.ts), [server/src/inngest/inngest.controller.ts](server/src/inngest/inngest.controller.ts), [server/src/inngest/function.service.ts](server/src/inngest/function.service.ts), [server/src/users/users.service.ts](server/src/users/users.service.ts), [server/src/tickets/tickets.module.ts](server/src/tickets/tickets.module.ts)

Example UI pages:
- Dashboard: [client/src/pages/dashboard.tsx](client/src/pages/dashboard.tsx)
- Tickets list: [client/src/pages/tickets.tsx](client/src/pages/tickets.tsx)
- Single ticket: [client/src/pages/ticket.tsx](client/src/pages/ticket.tsx)
- Admin: [client/src/pages/admin.tsx](client/src/pages/admin.tsx)
- Auth: [client/src/pages/login.tsx](client/src/pages/login.tsx), [client/src/pages/signup.tsx](client/src/pages/signup.tsx)

## Getting Started

Prerequisites
- Node.js 20+
- PNPM 10+
- MongoDB (local or Atlas)
- Inngest Dev Server (for background jobs)

Install
```sh
# from the repo root
cd server && pnpm i
cd ../client && pnpm i
```

## Configuration (Env)

Server env (server/.env)
```env
# Core
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/ai_task_assigner

# JWT
JWT_SECRET=your-super-secret
JWT_EXPIRES_IN=1d

# Email (Mailtrap)
MAILTRAP_SMTP_HOST=smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your-user
MAILTRAP_SMTP_PASSWORD=your-pass

# Optional
GOOGLE_API_KEY=your-google-api-key
```
Notes:
- Mail service reads MAILTRAP_* in [`MailService`](server/src/mail/mail.service.ts).
- JWT config is loaded in [`AppModule`](server/src/app.module.ts).
- Global config keys are defined in [`load.config.ts`](server/src/configs/load.config.ts).

Client env (client/.env)
```env
# example
VITE_API_BASE_URL=http://localhost:3000/api
```

## Development

Run the servers in separate terminals:

1) API (NestJS)
```sh
cd server
pnpm run start:dev
# http://localhost:3000 (API prefix: /api)
```

2) Inngest Dev Server (for background jobs dashboard)
```sh
cd server
pnpm run start:inngest
# http://localhost:8288
```

3) Client (Vite)
```sh
cd client
pnpm run dev
# http://localhost:5173
```

## Build & Deploy

Server
```sh
cd server
pnpm build      # outputs to dist/
pnpm start:prod # runs dist/main.js
```

Client
```sh
cd client
pnpm build      # outputs to dist/
pnpm preview    # local preview
```

## Scripts

Server (see [server/package.json](server/package.json))
- start:dev — run API with watch
- start:prod — run compiled API
- start:inngest — Inngest dev server
- test, test:watch, test:cov — Jest
- lint — ESLint
- format — Prettier

Client (see [client/package.json](client/package.json))
- dev — Vite dev server
- build — Type-check then build
- preview — Preview built app
- lint — ESLint

## API Quick Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint        | Description                       | Protected |
| -----: | --------------- | --------------------------------- | --------- |
| POST   | /users/signup   | Register a new user               | No        |
| POST   | /users/login    | Login and receive a JWT           | No        |
| GET    | /tickets        | List all tickets                  | Yes       |
| POST   | /tickets        | Create a ticket                   | Yes       |
| GET    | /tickets/:id    | Get a ticket by ID                | Yes       |
| PATCH  | /tickets/:id    | Update a ticket                   | Yes       |
| DELETE | /tickets/:id    | Delete a ticket                   | Yes       |
| ALL    | /inngest        | Inngest webhook endpoint          | N/A       |

## Architecture

High‑level flow
- HTTP requests enter the API at [`main.ts`](server/src/main.ts) and route via [`AppModule`](server/src/app.module.ts)
- Auth and RBAC in Users and JWT modules (see [`users.service.ts`](server/src/users/users.service.ts))
- Tickets module exposes CRUD (see [`tickets.module.ts`](server/src/tickets/tickets.module.ts))
- Background jobs are registered in [`FunctionService`](server/src/inngest/function.service.ts) and served by [`InngestController`](server/src/inngest/inngest.controller.ts)
- Emails are sent via [`MailService`](server/src/mail/mail.service.ts) using Mailtrap credentials

Frontend notes
- Tailwind v4 is enabled via [client/vite.config.ts](client/vite.config.ts) and styles are loaded in [client/src/index.css](client/src/index.css)
- UI is composed with shadcn/ui components from `client/src/components/ui`

## Contributing
- Fork the project
- Create a feature branch: `git checkout -b feat/awesome`
- Commit: `pnpm -w lint` and `pnpm -w format` where applicable
- Push and open a PR

## License
MIT — see LICENSE if present.