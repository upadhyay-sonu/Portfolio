# Animation System - Quick Reference

## One-Liner Examples

### Magnetic Button
```javascript
<MagneticButton onClick={handleClick}>Click Me</MagneticButton>
```

### Floating Card
```javascript
<FloatingCard><div className="p-6">Content</div></FloatingCard>
```

### Interactive Background
```javascript
<InteractiveBackground enableParticles particleCount={30} />
```

### Animated Text
```javascript
<AnimatedGradientText animation="wave">Title</AnimatedGradientText>
```

### Edge Shift
```javascript
<EdgeShiftUI><YourComponent /></EdgeShiftUI>
```

---

## Props Quick Reference

### MagneticButton
```javascript
<MagneticButton
  magneticRadius={200}           // 0-500px, default 150
  springConfig={{                // Spring physics
    stiffness: 300,             // 100-500 (higher = snappier)
    damping: 20                 // 10-40 (higher = less bouncy)
  }}
  onClick={() => {}}             // Click handler
  className="..."                // Tailwind classes
/>
```

### FloatingCard
```javascript
<FloatingCard
  intensity={1}                  // 0-2 (how much it follows cursor)
  followCursor={true}            // Enable cursor tracking
  className="..."                // Tailwind classes
>
  {children}
</FloatingCard>
```

### InteractiveBackground
```javascript
<InteractiveBackground
  enableParticles={true}         // Show floating particles
  particleCount={30}             // 5-50 particles
  intensity={0.5}                // 0-1 parallax strength
  variant="gradient"             // 'gradient' | 'mesh' | 'vortex'
/>
```

### AnimatedGradientText
```javascript
<AnimatedGradientText
  as="h1"                        // h1-h6, p, span
  animation="wave"               // 'wave' | 'shimmer' | 'pulse' | 'breathe'
  duration={2}                   // Seconds
  gradient="from-cyan-400 to-blue-600"  // Tailwind gradient
  className="text-4xl font-bold"
>
  {children}
</AnimatedGradientText>
```

### EdgeShiftUI
```javascript
<EdgeShiftUI
  strength={30}                  // 0-100px shift distance
  edgeThreshold={100}            // 50-300px from edge to activate
>
  {children}
</EdgeShiftUI>
```

### AdvancedPortfolioHero
```javascript
<AdvancedPortfolioHero />        // Drop-in hero component (no props needed)
```

---

## Hooks Quick Reference

### useCursorPosition
```javascript
const { cursorX, cursorY, isMoving } = useCursorPosition();

// cursorX, cursorY are MotionValues (use with useTransform)
const offsetX = useTransform(cursorX, (x) => x * 0.1);
```

### useCursorDistance
```javascript
const ref = useRef(null);
const { distanceX, distanceY, distance } = useCursorDistance(ref, cursorX, cursorY);

// All are MotionValues
// distance = √(distanceX² + distanceY²)
```

### useParallax
```javascript
const { parallaxX, parallaxY } = useParallax(cursorX, cursorY, intensity);

// Single layer parallax
<motion.div style={{ x: parallaxX, y: parallaxY }} />
```

### useMultiLayerParallax
```javascript
const layers = useMultiLayerParallax(cursorX, cursorY, [0.2, 0.4, 0.6, 0.8]);

// Each layer has {x, y} motion values with different intensities
{layers.map((layer, i) => <motion.div key={i} style={layer} />)}
```

### usePerformanceMonitor
```javascript
const { isLowEndDevice, perfMetrics, quality } = usePerformanceMonitor();

// isLowEndDevice: boolean
// perfMetrics: { fps, gpu, memory, connection }
// quality: { enableParallax, enableMagneticButtons, enableFloatingCards, ... }
```

---

## Spring Physics Presets

```javascript
// Responsive (default)
{ stiffness: 300, damping: 20 }

// Snappy & Fast
{ stiffness: 500, damping: 10 }

// Bouncy & Fun
{ stiffness: 100, damping: 30 }

// Smooth & Deliberate
{ stiffness: 150, damping: 40 }

// Loose & Elastic
{ stiffness: 50, damping: 20 }
```

---

## Gradient Presets

```javascript
// Cyan to Purple
gradient="from-cyan-400 via-blue-500 to-purple-600"

// Purple to Pink
gradient="from-purple-400 via-pink-400 to-red-400"

// Green to Teal
gradient="from-green-400 via-teal-400 to-cyan-400"

// Orange to Red
gradient="from-orange-400 via-red-400 to-pink-600"

// Blue to Indigo
gradient="from-blue-400 via-indigo-500 to-purple-600"
```

---

## Common Patterns

### Hero Section
```javascript
<div className="relative w-full min-h-screen">
  <InteractiveBackground enableParticles />
  <div className="relative z-10">
    <AnimatedGradientText as="h1">Title</AnimatedGradientText>
    <MagneticButton>CTA</MagneticButton>
  </div>
</div>
```

### Feature Grid
```javascript
<div className="grid grid-cols-3 gap-6">
  {features.map((f, i) => (
    <FloatingCard key={i} intensity={0.8}>
      <h3>{f.title}</h3>
      <p>{f.desc}</p>
    </FloatingCard>
  ))}
</div>
```

### Button Group
```javascript
<div className="flex gap-4">
  <MagneticButton className="bg-cyan-500">Primary</MagneticButton>
  <MagneticButton className="border-2 border-purple-500">Secondary</MagneticButton>
</div>
```

### Responsive Adaptation
```javascript
const { quality } = usePerformanceMonitor();

<InteractiveBackground 
  enableParticles={quality.enableParticles}
  particleCount={quality.enableParticles ? 30 : 5}
/>
```

---

## Performance Tips

### ✅ DO
- Use `usePerformanceMonitor` on low-end devices
- Reduce particles on mobile: `particleCount={10}`
- Use `will-change: transform` on animated elements
- Profile with DevTools Performance tab
- Test on real devices, not just desktop

### ❌ DON'T
- Update state in animation loops (use motion values instead)
- Add event listeners without cleanup
- Use `left`/`top` instead of `transform`
- Set `willChange` on too many elements
- Animate `width`/`height`/`box-shadow`

---

## Debugging

### Check FPS
```javascript
// DevTools → Performance → Record → Look at FPS graph
// Should stay at 55-60fps
```

### Monitor Motion Values
```javascript
useEffect(() => {
  const unsub = cursorX.onChange((x) => console.log('cursorX:', x));
  return unsub;
}, [cursorX]);
```

### Check Device Performance
```javascript
// In browser console
const { quality } = usePerformanceMonitor();
console.log(quality);
```

### Enable Dev Mode Indicator
The code includes a performance indicator in development mode showing:
- 🟢 High Performance Mode
- 🔴 Low-End Device Mode

---

## Mobile Handling

Mobile devices automatically:
- Disable cursor tracking (use touch instead)
- Reduce particle count
- Disable parallax effects
- Adapt spring physics

Users can also enable `prefers-reduced-motion` to disable all animations.

---

## Color Schemes

### Neon
```javascript
from-cyan-400 via-blue-500 to-purple-600
```

### Warm
```javascript
from-orange-400 via-red-400 to-pink-600
```

### Cool
```javascript
from-teal-400 via-cyan-400 to-blue-600
```

### Vibrant
```javascript
from-yellow-400 via-orange-400 to-red-600
```

### Pastel
```javascript
from-pink-300 via-purple-300 to-blue-300
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Laggy animations | Reduce particle count, disable parallax |
| Buttons not magnetic | Increase `magneticRadius`, check ref |
| Cursor not tracking | Check component is in viewport, check z-index |
| Memory leak warning | Components cleanup properly, check DevTools |
| Mobile is slow | Use `usePerformanceMonitor` quality levels |
| Jittery movement | Use spring animation instead of tween |

---

## Bundle Size

- Framer Motion: ~40KB (gzipped)
- Tailwind CSS: ~15KB (gzipped)
- Your components: ~10KB (gzipped)
- **Total: ~65KB**

---

## Next Steps

1. Copy components to your `src/components` folder
2. Import hooks from `src/hooks`
3. Update your App.js to use components
4. Test performance with DevTools
5. Customize colors and physics to your liking
6. Deploy and monitor real-world performance

For detailed explanations, see:
- `ANIMATION_GUIDE.md` - Technical deep-dive
- `IMPLEMENTATION_GUIDE.md` - Step-by-step integration
