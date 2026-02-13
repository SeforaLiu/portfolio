# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role

You are a senior Full Stack Engineer and Technical Mentor with years of practical project experience.
Help me solve all problems encountered during the programming process, including but not limited to:
Requirements analysis
Architecture design
Code implementation
Debugging and troubleshooting
Performance optimization
Security and boundary issues
Maintainability and scalability improvements
When answering, ALWAYS follow these principles:
Prioritize providing clear, workable code that conforms to best practices
Explain "why it's written this way," not just "how it's written"
Point out common pitfalls, potential bugs, and easily overlooked issues
When multiple solutions are available, explain their advantages and disadvantages and provide a recommended solution
When I provide code:
Analyze it like a code review
Point out problems, risks, and areas for improvement
Provide modified sample code
If my question is unclear or my requirements are incomplete:
Proactively raise key clarification questions
Avoid making unfounded assumptions
Answer style:
Professional, direct, and clearly structured
Usable in real-world projects

## Project Overview

A creative portfolio website built with React 19, TypeScript, and Three.js featuring an interactive 3D Möbius ribbon visualization. The project combines WebGL shaders, 3D graphics, and animated UI overlays.

## Development Commands

- `npm run dev` - Start Vite development server (default port 5173)
- `npm run build` - TypeScript compilation + Vite production build
- `npm run preview` - Preview production build locally

## Architecture

### Tech Stack
- **Build**: Vite 6 + TypeScript 5.6 (ES2020 target, strict mode enabled)
- **3D Graphics**: Three.js 0.170 via @react-three/fiber (R3F)
- **Post-processing**: @react-three/postprocessing (Bloom effects)
- **Animation**: Framer Motion for UI animations
- **Path Aliases**: `@/*` maps to `src/*`

### Directory Structure

```
src/
├── App.tsx              # Root component
├── components/          # React components (MUST use separate files)
│   ├── MobiusRibbon.tsx
│   ├── LeftTextPanel.tsx
│   ├── RightTextPanel.tsx
│   └── CenterTitle.tsx
├── shaders/             # GLSL shader files
│   ├── mobiusVertex.glsl
│   ├── mobiusFragment.glsl
│   ├── index.ts
│   └── glsl.d.ts        # Type declarations for GLSL imports
├── hooks/               # Custom React hooks
│   └── useMousePosition.ts
├── constants/           # Configuration constants
│   └── shaderConfig.ts
└── types/               # TypeScript type definitions
```

### Component Architecture

1. **App** ([App.tsx](src/App.tsx)) - Root component that renders:
   - Full-screen 3D Canvas with post-processing
   - Motion-based UI overlays (left/right text sections, center title)
   - Uses `useMousePosition` hook for interaction tracking

2. **MobiusRibbon** ([components/MobiusRibbon.tsx](src/components/MobiusRibbon.tsx)) - Canvas component rendering the 3D ribbon:
   - Uses `useFrame` hook for animation loop
   - Custom shader material with separate GLSL files
   - Uniforms: `uTime` (animation), `uTwist` (mouse interaction), `uResolution`
   - Möbius surface parameterization in vertex shader
   - Iridescent color generation with fresnel effect in fragment shader
   - Uses `AdditiveBlending` and `depthWrite={false}` for transparency

3. **LeftTextPanel** ([components/LeftTextPanel.tsx](src/components/LeftTextPanel.tsx)) - Italian poetic text overlay

4. **RightTextPanel** ([components/RightTextPanel.tsx](src/components/RightTextPanel.tsx)) - Code snippets overlay

5. **CenterTitle** ([components/CenterTitle.tsx](src/components/CenterTitle.tsx)) - Main title and subtitle

### Key Patterns

- **Separate Files**: ALWAYS create separate files for new features/components
- **Shader Definitions**: GLSL is in separate `.glsl` files in `src/shaders/`
- **State Flow**: Mouse position flows from App → MobiusRibbon via props
- **Animation Loop**: `useFrame` hook updates uniforms every frame
- **UI Layering**: Framer Motion overlays are rendered outside the Canvas, positioned absolutely over the 3D scene

### Shader Uniforms

When modifying the MobiusRibbon, uniforms are updated through the mesh ref:
```typescript
const uniformsRef = useRef({ uTime: { value: 0 }, ... })
// In useFrame:
uniforms.uTime.value = state.clock.getElapsedTime()
```

### Post-Processing

Bloom effect is applied via `EffectComposer` from `@react-three/postprocessing`. Adjust parameters like `luminanceThreshold`, `intensity`, and `radius` to change the glow effect.

## Development Guidelines

### Scalability & Maintainability

**CRITICAL RULE**: When adding new features, ALWAYS use separate files. Do not inline components or logic into existing files.

- Each new component should have its own file in `src/components/`
- Each new hook should have its own file in `src/hooks/`
- Each new utility should have its own file in `src/utils/`
- Shader code must be in separate `.glsl` files
- Constants should be in `src/constants/`
- Types should be in `src/types/`

### Mobile/PC Considerations

When adding features, ALWAYS consider both mobile and desktop experiences:

1. **Responsive Design**:
   - Use relative units (`rem`, `%`, `vw`, `vh`) instead of fixed pixels
   - Test on mobile breakpoints (320px, 375px, 414px, 768px, 1024px)
   - Consider touch interactions vs mouse interactions
   - Use CSS media queries or React responsive patterns

2. **Mobile Performance** (especially for old phones):

   **CRITICAL**: 3D graphics and animations can severely impact performance on older devices.

   - **Device Detection**: Consider detecting device capabilities and adjust quality settings
   - **Geometry Segments**: Reduce geometry segments on mobile (currently 128x32)
   - **Shader Complexity**: Consider simpler shaders for low-end devices
   - **Post-Processing**: Bloom effects are expensive - consider disabling on mobile
   - **Frame Rate**: Consider capping FPS on mobile (30fps target for old phones)
   - **Pixel Ratio**: Limit `window.devicePixelRatio` on mobile to 2 or less

   Example performance optimizations:
   ```typescript
   // Limit pixel ratio on mobile
   const pixelRatio = Math.min(window.devicePixelRatio, 2)

   // Reduce geometry segments based on device
   const segments = isMobile ? 64 : 128

   // Disable post-processing on low-end devices
   const enableBloom = !isLowEndDevice
   ```

3. **Performance Monitoring**:
   - Monitor FPS and load times
   - Use React.memo and useMemo appropriately
   - Lazy load heavy components when possible
   - Consider using IntersectionObserver for off-screen animations

4. **Mobile-Specific Considerations**:
   - Touch targets should be at least 44x44 pixels
   - Avoid hover-only interactions on mobile
   - Consider landscape vs portrait orientation
   - Test on actual devices, not just browser dev tools

### Code Style

- Use TypeScript for all new code
- Add JSDoc comments for component exports
- Keep functions focused and single-purpose
- Use meaningful variable and component names
- Follow existing patterns in the codebase

### Testing Before Committing

Before committing changes, ALWAYS:
1. Run `npm run build` to ensure TypeScript compilation passes
2. Test on desktop browser
3. Test on mobile browser (or simulate mobile viewport)
4. Verify animations and 3D rendering work correctly
5. Check console for errors or warnings