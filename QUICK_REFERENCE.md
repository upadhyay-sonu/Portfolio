# 3D Floating Navigation - Quick Reference Guide

## The System in 30 Seconds

All 5 nav items use **one unified component** that provides:

1. **Floating Motion**: Continuous random movement within screen boundaries
2. **Click Behavior**: 600ms rotation → automatic navigation → resume motion
3. **Hover Effects**: Stop motion, show 3D rotation, enhance glow
4. **Same Experience**: All items behave identically

---

## Key Numbers

| Metric | Value |
|--------|-------|
| Float Speed | 0.0002 |
| Click Duration | 600ms |
| Scale on Click | 1.15x |
| Glow Intensity (Normal) | 40% |
| Glow Intensity (Clicking) | 60% |
| Screen Margin | 150px |
| Movement Boundary | ±200px X, ±150px Y |
| Wave Amplitude | 6-8px |
| Target Cycle | Every ~5 seconds |

---

## Animation States

```
FLOATING (Default)
├─ Continuous random motion
├─ Wave motion overlay
├─ Subtle glow
└─ Ready to interact

HOVERING
├─ Motion stopped (speedDamping=0)
├─ 3D rotation animation
├─ Enhanced glow
└─ Icon pulsing

CLICKING (600ms)
├─ 360° rotateY
├─ 216° rotateZ (0.6x)
├─ Scale 1.15
├─ Glow 60%
└─ Then navigate

NAVIGATING
├─ Scroll to section OR
├─ Open LinkedIn
└─ Then resume

BACK TO FLOATING
└─ speedDamping=1
```

---

## Per-Item Navigation Targets

| Item | Target | Type |
|------|--------|------|
| **Projects** | `#projects` | Scroll |
| **Skills** | `#skills` | Scroll |
| **Education** | `#education` | Scroll |
| **CV** | `#cv` | Scroll |
| **Connect** | LinkedIn URL | New Tab |

---

## Component Structure

```
SplitNavigation (main)
├─ navItems array (config for all 5)
└─ FloatingNavItem component (used 5x)
    ├─ Floating animation
    ├─ Click animation
    ├─ Hover effects
    ├─ Navigation dispatch
    └─ 3D rendering
```

---

## Code Locations (SplitNavigation.js)

| Feature | Lines |
|---------|-------|
| Floating animation | 45-113 |
| Click animation | 447-514 |
| Hover effects | 250-340 |
| Navigation config | 754-810 |
| Component rendering | 812-831 |

---

## State Variables (Per Item)

### Animation State
- `position`: Current {x, y, z}
- `clickRotation`: 0-360° progress
- `speedDamping`: 1 (moving) or 0 (stopped)

### Visual State
- `scale`: Current scale (1.0 normal, 1.15 on click)
- `hoverRotation`: {x, y} for 3D on hover
- `isHovering`: Boolean for hover state
- `isClicking`: Boolean for click animation

### Glow/Effect State
- `hoveredGlowIntensity`: 0-1 scale
- `iconPulse`: 0-1 for breathing effect
- `iconHoverGlow`: Intensity of icon glow

---

## Behavior Rules

### Motion
- ✅ Floats continuously (never stops on its own)
- ✅ Stops on hover (speedDamping = 0)
- ✅ Stops on click (speedDamping = 0)
- ✅ Resumes after navigation (speedDamping = 1)

### Speed
- ✅ Float speed: Always 0.0002
- ✅ Click duration: Always 600ms
- ✅ Never increases speed
- ✅ Never makes animations faster

### Boundaries
- ✅ Stays within screen bounds
- ✅ 150px margin from edges
- ✅ Adapts to window resize
- ✅ Smooth clamping (no bouncing)

### Consistency
- ✅ All 5 items use same component
- ✅ Same animation logic
- ✅ Same timing
- ✅ Same behavior patterns

---

## Testing Quick Checklist

### Floating (Observe for 10 seconds)
- [ ] Each item moves smoothly
- [ ] No sudden jumps
- [ ] All stay in bounds
- [ ] Different movement patterns
- [ ] Never freeze

### Hovering (Hover over each item)
- [ ] Motion stops immediately
- [ ] 3D rotation visible
- [ ] Glow increases
- [ ] Icon pulses
- [ ] Motion resumes on leave

### Clicking (Click each item)
- [ ] Rotation animation smooth
- [ ] Takes 600ms
- [ ] Scale increases
- [ ] Glow enhances
- [ ] Navigation happens
- [ ] Motion resumes

### Navigation (Check each target)
- [ ] Projects → scrolls to #projects
- [ ] Skills → scrolls to #skills
- [ ] Education → scrolls to #education
- [ ] CV → scrolls to #cv
- [ ] Connect → opens LinkedIn

---

## Common Modifications

### Change Float Speed
**Location**: Line 48
```javascript
const floatSpeed = 0.0002; // Decrease for slower
```

### Change Click Duration
**Location**: Line 459
```javascript
const rotationDuration = 0.6; // In seconds
```

### Change Screen Margin
**Location**: Line 98
```javascript
const margin = 150; // Pixels from edge
```

### Add New Navigation Item
**Location**: Line 754 (navItems array)
```javascript
{
  label: "NewItem",
  icon: IconComponent,
  color: "color-name",
  position: { x: 0, y: 0, z: 0 },
  animationSpeed: 0.00005,
  amplitude: { x: 15, y: 12 },
  frequency: { x: 0.9, y: 1.0 },
  href: "#new-section",
  glow: "color-name",
}
```

### Change Navigation Target
**Location**: Line 763, 774, 785, 796, 807
```javascript
href: "#new-target", // Or full URL for external
```

---

## Performance Notes

- **Frame Rate**: 60fps maintained
- **CPU Impact**: Minimal (uses RAF efficiently)
- **Memory**: No leaks (cleanup in useEffect)
- **GPU**: Uses transform for acceleration

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Item stuck | Check `floatTargetRef` initialization |
| Goes off-screen | Verify margin = 150, check window size |
| Motion doesn't resume | Check `setSpeedDamping(1)` in navigation |
| Click doesn't work | Verify `pointerEvents: "auto"` |
| Animation skips | Check `cancelAnimationFrame` cleanup |
| No glow on hover | Verify color configuration in colorMap |

---

## Files to Know

| File | Purpose |
|------|---------|
| `src/SplitNavigation.js` | Main component (834 lines) |
| `NAVIGATION_BEHAVIOR_SPEC.md` | Detailed behavior spec |
| `TESTING_GUIDE.md` | Complete test cases |
| `IMPLEMENTATION_SUMMARY.md` | Deep technical details |
| `IMPLEMENTATION_CHECKLIST.md` | Requirement verification |

---

## Quick Customization Template

To customize an item, modify the navItems array:

```javascript
{
  label: "CustomName",           // Display text
  icon: IconComponent,            // From lucide-react
  color: "cyan",                  // Color scheme
  position: { x: 100, y: 50, z: 0 }, // Initial position
  animationSpeed: 0.00005,        // Float speed
  amplitude: { x: 15, y: 12 },    // Wave motion
  frequency: { x: 0.9, y: 1.0 },  // Wave oscillation
  href: "#target",                // Navigation target
  glow: "cyan",                   // Glow color
},
```

---

## Success Indicators

✅ All items float continuously
✅ No item ever freezes permanently
✅ Click animations are smooth (600ms)
✅ Navigation happens after rotation
✅ Motion resumes automatically
✅ All items stay in screen bounds
✅ 3D effects visible throughout
✅ 60fps maintained
✅ No console errors
✅ All interactions responsive

---

## Version Info

- **Component**: FloatingNavItem + SplitNavigation
- **Framework**: React + Framer Motion
- **Icons**: Lucide React
- **Total Lines**: ~834 (SplitNavigation.js)
- **Status**: Production Ready ✅
