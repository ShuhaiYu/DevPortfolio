# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevPortfolio is a personal portfolio website for Felix Yu, built with Next.js 16 and React 19. It features a cyberpunk-themed design with a blog powered by Sanity CMS.

## Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Start development server (Turbopack)
npm run build      # Build for production
npm run start      # Start production server
```

## Environment Setup

Create a `.env.local` file with:
```
SANITY_API_TOKEN=your_token_here  # Optional, for write operations
```

## Architecture

### File Structure (Next.js App Router)
```
app/
├── layout.tsx          # Root layout with fonts and metadata
├── page.tsx            # Home page (portfolio)
├── blog/
│   ├── page.tsx        # Blog list page
│   └── [slug]/page.tsx # Blog post detail page
├── studio/[[...tool]]/ # Sanity Studio (embedded)
├── sitemap.ts          # Dynamic sitemap generation
└── robots.ts           # Robots.txt configuration

components/
├── portfolio/          # Portfolio section components
├── blog/               # Blog components (BlogCard, LatestPosts)
├── effects/            # Visual effects (FloatingLines - Three.js)
└── ui/                 # Shared UI components

lib/
├── constants.ts        # Portfolio content data
├── types.ts            # TypeScript interfaces
└── sanity/
    ├── client.ts       # Sanity client configuration
    └── queries.ts      # GROQ queries

sanity/
└── schemas/            # Sanity schema definitions (post, category)
```

### Key Technologies
- **Next.js 16** with App Router and Turbopack
- **React 19.2** with React Compiler
- **Tailwind CSS v4** with @theme directive
- **Sanity CMS** for blog content management
- **Three.js** for WebGL effects

### Content Management
- Portfolio content: Edit `lib/constants.ts`
- Blog content: Use Sanity Studio at `/studio`

### Styling
Custom theme colors (defined in `app/globals.css`):
- `primary`: #f0c445 (Amber Gold — vintage CRT terminal heritage)
- `secondary`: #a06b28 (Burnt Orange)
- `accent`: #d24b3e (Muted Coral — signal/alert)
- `dark`: #0c0a07 (warm-tinted near-black background)
- `surface`: #16120d (warm surface)

### Sanity Configuration
- Project ID: 1efjjikg
- Dataset: production
- Studio path: /studio

### Path Aliases
`@/*` maps to project root (configured in `tsconfig.json`).
