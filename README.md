# Portfolio -- LIU Shiyun

> Software Developer who speaks human and computer language

**Live:** [shiyun-liu.com](https://shiyun-liu.com) | **GitHub:** [SeforaLiu](https://github.com/SeforaLiu)

---

## About

This is a creative portfolio website designed to present my technical skills, projects, and cross-disciplinary background as part of my application to European graduate programs. It combines full-stack web engineering with 3D graphics programming and interactive data visualization in a single-page experience.

---

## Features

### Interactive 3D Visualization

- Custom GLSL vertex and fragment shaders for a parametric Mobius ribbon
- Mouse-reactive twist and hover animations with exponential damping
- Scroll-driven ribbon repositioning and scaling across screens

### Three-Screen Scroll-Snap Layout

- **Hero screen** -- animated text overlays with Italian literary references and gradient title
- **Skills screen** -- infinity-curve (lemniscate) visualization with an animated snake traversal
- **Projects screen** -- glassmorphism project cards with SVG illustrations

### Skill Map Visualization

- Lemniscate of Bernoulli parametric curve with 60 animated dots
- Glowing snake traversal animation with dot consumption on a 6-second cycle
- Real-time mouse-inside-shape detection for expandable skill detail cards
- Responsive: horizontal infinity on desktop, vertical figure-8 on mobile

### Internationalization

- Three languages: English, Italian (Italiano), Chinese
- Browser language auto-detection with `localStorage` persistence
- Context-based React i18n system (`LanguageProvider` / `useLanguage` hook)

### Mobile Optimization

- Conditional Bloom post-processing (disabled on mobile)
- Geometry segment reduction and pixel ratio capping at 2x
- Touch-based scroll snapping with swipe gesture support
- Mobile-specific layouts: vertical infinity curve, reduced text overlays, hidden ribbon on secondary screens

---

## Tech Stack

| Layer           | Technology                                       |
| --------------- | ------------------------------------------------ |
| Framework       | React 19, TypeScript 5.6                         |
| 3D Graphics     | Three.js 0.170, @react-three/fiber 9             |
| Post-Processing | @react-three/postprocessing 3 (Bloom)            |
| Shaders         | Custom GLSL (vertex + fragment)                  |
| Animation       | Framer Motion 11                                 |
| Styling         | Tailwind CSS 4, PostCSS                          |
| Build           | Vite 6 (ES modules, path aliases, GLSL imports)  |
| Utilities       | @react-three/drei, Leva (debug controls)         |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/SeforaLiu/portfolio.git
cd portfolio
npm install
npm run dev
```

The dev server starts with `--host`, making it accessible on the local network.

### Production Build

```bash
npm run build   # TypeScript check + Vite build
npm run preview # Preview the production build locally
```

---

## Showcased Projects

### 3D Travel Globe

Full-stack WebGL application for narrative mapping and sentiment analysis.

- **Live:** https://travel.shiyun-liu.com/
- **Source:** https://github.com/SeforaLiu/travel-globe

### Marble Race

Interactive 3D marble race game built with Three.js and WebGL.

- **Live:** https://marble-race-game-threejs.vercel.app/
- **Source:** https://github.com/SeforaLiu/game_marble_race

---

## License

MIT
