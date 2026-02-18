# Zwitch Payment Gateway — Landing Page

A modern, high-performance landing page for the **Zwitch Payment Gateway**, built with React, TypeScript, and Tailwind CSS.

## About

Zwitch Payment Gateway enables businesses to accept online payments at just **1.5%** per transaction with 150+ payment options including UPI, cards, net banking, wallets, and more. This repository contains the public-facing marketing landing page.

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | [React 18](https://react.dev)       |
| Language    | TypeScript                          |
| Build Tool  | [Vite 5](https://vitejs.dev)        |
| Styling     | [Tailwind CSS 3](https://tailwindcss.com) |
| UI Library  | [shadcn/ui](https://ui.shadcn.com) + Radix UI primitives |
| Animation   | [Framer Motion](https://www.framer.com/motion/) |
| Routing     | React Router v6                     |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 — [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** (ships with Node.js)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd zwitch-pg

# Install dependencies
npm install

# Start the development server (http://localhost:8080)
npm run dev
```

### Build for Production

```sh
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Project Structure

```
zwitch-pg/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images & media
│   ├── components/     # Reusable UI components (shadcn/ui + custom)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Route-level page components
│   ├── App.tsx         # Root app component with routing
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles & Tailwind directives
├── index.html          # HTML shell
├── tailwind.config.ts  # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── package.json
```

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start dev server with hot reload   |
| `npm run build`   | Production build                   |
| `npm run preview` | Preview production build locally   |
| `npm run lint`    | Run ESLint                         |

## Deployment

Build the production bundle with `npm run build`, then deploy the `dist/` directory to any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.).

## License

Proprietary — © Zwitch. All rights reserved.
