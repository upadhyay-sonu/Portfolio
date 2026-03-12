# Next.js Portfolio Deployment Guide

## Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

Visit `http://localhost:3000` in your browser.

## Technology Stack

- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Advanced animations
- **Lucide React** - Icon library

## Project Structure

```
app/
  ├── page.tsx           # Main page
  ├── layout.tsx         # Root layout
  └── globals.css        # Global styles

components/
  ├── Navigation.tsx     # Navigation bar
  ├── Footer.tsx         # Footer
  ├── ParticlesBackground.tsx
  └── sections/
      ├── Hero.tsx
      ├── About.tsx
      ├── Skills.tsx
      ├── Projects.tsx
      ├── Experience.tsx
      └── Contact.tsx

lib/
  └── data.ts           # All portfolio data

styles/
  └── globals.css       # Global CSS
```

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=.next
```

### GitHub Pages
```bash
npm run build
npm run export
```

## Performance Optimization

- ✅ Optimized images
- ✅ Code splitting
- ✅ CSS minification
- ✅ JavaScript compression
- ✅ Lazy loading
- ✅ 60 FPS animations

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=your-site-url
```

## Building

```bash
npm run build
```

This creates an optimized production build in `.next` directory.

## All Data Preserved

All your portfolio information is stored in `lib/data.ts`:
- 20 projects with descriptions, links, and tech stacks
- 6 skills with proficiency levels
- 2 degrees from Lovely Professional University
- 19 professional certifications
- All social links and contact information
- CV download links

**No data was modified or removed.**
