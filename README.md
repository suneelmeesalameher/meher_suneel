# Mehersuneel Meesala Portfolio

A modern personal portfolio built with Next.js, React, and custom CSS animations.

This site includes:
- A single-page home experience with About, Experience, Skills, and Contact sections
- A dedicated Projects page with interactive project mockups
- Custom cursor interactions, scroll-based reveals, and animated UI details

## Live Site

TBD

## Tech Stack

- Next.js 16 (App Router)
- React 19
- JavaScript/JSX
- TypeScript config support
- Tailwind dependency installed (current UI is custom CSS-in-JSX)

## Project Structure

```txt
app/
  layout.tsx            # Root layout + metadata
  page.jsx              # Home page (About/Experience/Skills/Contact)
  projects/
    page.jsx            # Projects showcase page
public/                 # Static assets
```

## Features

- Fully responsive layout for desktop and mobile
- Distinct visual style with editorial typography and neon-accent theme
- Animated section reveals and scroll state tracking
- Interactive contact form UI state (client-side demo flow)
- Project cards with status badges and animated mock previews

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open:

```txt
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization Guide

- Update personal details and experience content in `app/page.jsx`
- Update showcased projects in `app/projects/page.jsx`
- Adjust SEO metadata in `app/layout.tsx`
- Replace/add static files in `public/`

## Deployment

This project is optimized for Vercel deployment.

Quick deploy flow:
1. Push the repo to GitHub
2. Import the repo into Vercel
3. Deploy with default Next.js settings

## License

Personal portfolio project. Reuse with attribution.
