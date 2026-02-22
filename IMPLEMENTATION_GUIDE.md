# Advanced Animation System - Implementation Guide

## Quick Start

### 1. File Structure

Your project now has the following new structure:

```
src/
├── hooks/
│   ├── useCursorPosition.js         # Cursor tracking with motion values
│   ├── useParallax.js               # Parallax effect hooks
│   └── usePerformanceMonitor.js     # Device capability detection
├── components/
│   ├── MagneticButton.js            # Buttons that follow cursor
│   ├── FloatingCard.js              # Cards with cursor tracking
│   ├── InteractiveBackground.js     # Animated background with parallax
│   ├── AnimatedGradientText.js      # Gradient text animations
│   ├── EdgeShiftUI.js               # UI shift at viewport edges
│   └── AdvancedPortfolioHero.js     # Complete hero section
├── App_with_animations.js           # Full example implementation
└── ANIMATION_GUIDE.md               # Technical deep-dive documentation
```

### 2. Installation

Your `package.json` already has Framer Motion and Tailwind CSS. Verify:

```bash
npm install  # Install if needed
```

Check that you have:
- `framer-motion`: ^12.0.0+
- `tailwindcss`: ^4.0.0+
- `react`: ^18.0.0+

### 3. Update Your App.js

Option A: Replace completely with `App_with_animations.js`:
```bash
cp src/App_with_animations.js src/App.js
```

Option B: Gradually integrate components:

```javascript
import React from 'react';
import { AdvancedPortfolioHero } from './components/AdvancedPortfolioHero';
import { MagneticButton } from './components/MagneticButton';

function App() {
  return (
    <>
      <AdvancedPortfolioHero />
      {/* Your other sections */}
    </>
  );
}

export default App;
```

### 4. Run Your App

```bash
npm start
```

Navigate to http://localhost:3000 and move your mouse around!

---

## Component Usage Examples

### MagneticButton

```javascript
import { MagneticButton } from './components/MagneticButton';

<MagneticButton
  magneticRadius={200}
  onClick={() => alert('Clicked!')}
  className="px-6 py-3 bg-cyan-500 text-white rounded-lg"
>
  Click Me
</MagneticButton>
```

**Props:**
- `magneticRadius`: Distance in pixels the button reacts (default: 150)
- `onClick`: Click handler
- `className`: Tailwind classes
- `springConfig`: `{ stiffness: 300, damping: 20 }`
- `onlyTextMagnetic`: If true, only text moves (button stays fixed)

**Real-World Example:**
```javascript
<div className="flex gap-4">
  <MagneticButton 
    magneticRadius={250}
    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl"
  >
    Explore
  </MagneticButton>

  <MagneticButton 
    magneticRadius={200}
    className="px-8 py-4 border-2 border-purple-500 text-purple-300 rounded-xl"
  >
    Contact
  </MagneticButton>
</div>
```

---

### FloatingCard

```javascript
import { FloatingCard } from './components/FloatingCard';

<FloatingCard intensity={0.8} followCursor>
  <div className="p-6 rounded-2xl bg-slate-800 border border-cyan-500/30">
    <h3 className="text-xl font-bold text-cyan-300">Feature</h3>
    <p className="text-gray-400">Description here</p>
  </div>
</FloatingCard>
```

**Props:**
- `intensity`: How much the card follows cursor (0-2, default: 1)
- `followCursor`: Enable cursor tracking (default: true)
- `className`: Additional Tailwind classes
- `children`: Card content

**Grid Example:**
```javascript
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((feature, idx) => (
    <FloatingCard key={idx} intensity={0.8}>
      <div className="p-6">
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </div>
    </FloatingCard>
  ))}
</div>
```

---

### InteractiveBackground

```javascript
import { InteractiveBackground } from './components/InteractiveBackground';

<InteractiveBackground 
  enableParticles
  particleCount={30}
  intensity={0.6}
  variant="gradient"
/>
```

**Props:**
- `enableParticles`: Show floating particles (default: true)
- `particleCount`: Number of particles (default: 20)
- `intensity`: Parallax strength (default: 0.5)
- `variant`: 'gradient' | 'mesh' | 'vortex'

**Use as Page Background:**
```javascript
export default function Page() {
  return (
    <div className="relative w-full min-h-screen">
      <InteractiveBackground 
        particleCount={40}
        intensity={0.8}
      />
      
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  );
}
```

---

### AnimatedGradientText

```javascript
import { AnimatedGradientText, StaggeredText } from './components/AnimatedGradientText';

// Animated gradient
<AnimatedGradientText
  as="h1"
  className="text-5xl font-bold"
  animation="wave"
  duration={3}
  gradient="from-cyan-400 via-purple-400 to-pink-400"
>
  Amazing Heading
</AnimatedGradientText>

// Character stagger
<StaggeredText className="text-2xl">
  Hello World!
</StaggeredText>
```

**Animation Types:**
- `wave`: Gradient sweeps across (most common)
- `shimmer`: Light sparkle effect
- `pulse`: Fade in/out
- `breathe`: Scale and fade breathing effect

**Complete Example:**
```javascript
<div className="mb-8">
  <AnimatedGradientText
    as="h2"
    className="text-4xl font-bold mb-4"
    animation="wave"
    gradient="from-blue-400 to-purple-600"
  >
    Section Title
  </AnimatedGradientText>

  <StaggeredText className="text-xl text-gray-300">
    Each letter appears one by one
  </StaggeredText>
</div>
```

---

### EdgeShiftUI

```javascript
import { EdgeShiftUI } from './components/EdgeShiftUI';

<EdgeShiftUI strength={30} edgeThreshold={100}>
  <YourComponent />
</EdgeShiftUI>
```

**Props:**
- `strength`: How far to shift (pixels, default: 30)
- `edgeThreshold`: Distance from edge to activate (default: 100)

**How It Works:**
```
┌─────────────────────────┐
│  [Component]            │  ← Mouse center
│                         │
└─────────────────────────┘

↓ (Move mouse left)

┌─────────────────────────┐
│             [Component] │  ← Shifts right
│                         │
└─────────────────────────┘
```

---

### AdvancedPortfolioHero

```javascript
import { AdvancedPortfolioHero } from './components/AdvancedPortfolioHero';

function App() {
  return <AdvancedPortfolioHero />;
}
```

Complete out-of-the-box hero section with:
- Interactive animated background
- Magnetic CTA buttons
- Floating feature cards
- Animated gradient text
- Scroll indicator
- Performance monitoring

**Customize Colors:**
Edit `AdvancedPortfolioHero.js` and change gradient values:
```javascript
gradient="from-cyan-400 via-blue-500 to-purple-600"
```

---

## Performance Optimization Tips

### 1. Disable on Mobile

```javascript
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';

export function MyComponent() {
  const { quality } = usePerformanceMonitor();

  return (
    <>
      {quality.enableParallax && <InteractiveBackground />}
      {quality.enableFloatingCards && <FloatingCard />}
      {quality.enableMagneticButtons && <MagneticButton />}
    </>
  );
}
```

### 2. Reduce Particles on Mobile

```javascript
const particleCount = window.innerWidth < 768 ? 10 : 30;

<InteractiveBackground particleCount={particleCount} />
```

### 3. Disable Heavy Animations on Slow Network

```javascript
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';

const { perfMetrics } = usePerformanceMonitor();

if (perfMetrics.connection === 'slow') {
  // Use static background instead
}
```

### 4. Monitor Performance

Open DevTools → Performance tab:

1. Record animation interactions
2. Check FPS graph (should be 55-60fps)
3. Look for jank (dropped frames)
4. If jank occurs, reduce particle count or disable parallax

---

## Customization Guide

### Change Button Colors

```javascript
// Before
<MagneticButton className="px-8 py-4 bg-cyan-500 text-white rounded-lg">

// After (change color scheme)
<MagneticButton className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg">
```

### Adjust Spring Physics

```javascript
// Default (responsive)
<MagneticButton springConfig={{ stiffness: 300, damping: 20 }} />

// Slower, bouncier
<MagneticButton springConfig={{ stiffness: 100, damping: 30 }} />

// Snappy
<MagneticButton springConfig={{ stiffness: 500, damping: 10 }} />
```

### Change Parallax Intensity

```javascript
// Subtle
<InteractiveBackground intensity={0.2} />

// Dramatic
<InteractiveBackground intensity={1.0} />

// Very dramatic
<InteractiveBackground intensity={1.5} />
```

### Custom Gradient Colors

```javascript
<AnimatedGradientText
  gradient="from-red-400 via-orange-400 to-yellow-400"
>
  Warm Colors
</AnimatedGradientText>

<AnimatedGradientText
  gradient="from-green-400 via-teal-400 to-blue-400"
>
  Cool Colors
</AnimatedGradientText>
```

---

## Responsive Behavior

### Mobile Automatically Disabled

The system automatically detects mobile and disables:
- Magnetic button pulling
- Parallax effects
- Floating cards cursor tracking
- Heavy particle animations

Respects:
- Touch devices (`hover: none`)
- Low memory devices
- Slow connections
- Devices with <50 FPS capability

### Responsive Typography

Use Tailwind's responsive utilities in components:

```javascript
<AnimatedGradientText as="h1" className="text-5xl md:text-6xl lg:text-7xl">
  Responsive Text
</AnimatedGradientText>
```

---

## Accessibility

### Respect prefers-reduced-motion

```javascript
const prefersReduced = window.matchMedia('(prefers-reduced-motion)').matches;

{!prefersReduced && <InteractiveBackground />}
```

### Keyboard Navigation

Magnetic buttons remain keyboard accessible:
```javascript
<MagneticButton className="focus:outline-none focus:ring-2 focus:ring-cyan-500">
  Accessible Button
</MagneticButton>
```

### Color Contrast

All text meets WCAG AA standards (4.5:1 ratio for normal text)

---

## Troubleshooting

### Issue: Animations are laggy/janky

**Solution:**
1. Check DevTools Performance tab - record animation
2. If FPS drops below 50, reduce particle count:
   ```javascript
   <InteractiveBackground particleCount={10} />
   ```
3. Disable parallax on lower-end devices
4. Use `usePerformanceMonitor` to auto-adapt

### Issue: Magnetic buttons not responding

**Solution:**
1. Check button has `ref` - it should auto-create one
2. Verify `magneticRadius` is large enough (try 250)
3. Check browser console for errors

### Issue: Cursor not tracking

**Solution:**
1. Verify component is within viewport
2. Check `z-index` isn't being blocked
3. Try increasing `edgeThreshold` on `EdgeShiftUI`

### Issue: Memory leak warning

**Solution:**
All hooks properly cleanup listeners. If you see warnings:
1. Ensure components unmount properly
2. Check for duplicate hook instances
3. Use React DevTools to check for unmounted components

### Issue: Performance bad on mobile

**Solution:**
1. Reduce particle count: `particleCount={5}`
2. Disable parallax: `intensity={0}`
3. Use `usePerformanceMonitor` quality levels
4. Test on real device, not just simulator

---

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 90+ | ✅ Full | Best performance |
| Firefox 88+ | ✅ Full | Excellent support |
| Safari 14+ | ✅ Full | GPU accelerated |
| Edge 90+ | ✅ Full | Chromium-based |
| Mobile Safari | ⚠️ Partial | Cursor tracking disabled on touch |
| Chrome Mobile | ⚠️ Partial | Touch-optimized |

---

## Production Checklist

- [ ] Performance tested on real devices
- [ ] Mobile/touch handling verified
- [ ] Low-end device detection working
- [ ] Accessibility (prefers-reduced-motion) implemented
- [ ] Memory leaks checked in DevTools
- [ ] FPS monitoring enabled in dev mode
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Bundle size acceptable (~40KB Framer Motion)
- [ ] SEO considerations (no animations on pre-renders)
- [ ] Error boundaries added for failed components

---

## Next Steps

1. **Customize colors** to match your brand
2. **Test on real devices** (not just desktop)
3. **Monitor performance** using DevTools
4. **Adjust spring physics** to your preference
5. **Add your content** to the components
6. **Deploy and monitor** real-world performance

---

## Support

For detailed technical explanations, see `ANIMATION_GUIDE.md`

Key sections:
- How cursor tracking works (zero re-renders)
- How animation performance is optimized (GPU acceleration)
- How to disable on low-end devices (automatic detection)
- Complete API reference for all hooks
- Advanced customization examples

---

## License

These animation components are production-ready and free to use in your projects.

Framer Motion is used under its MIT license.
