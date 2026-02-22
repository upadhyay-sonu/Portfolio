# Setup Checklist ✅

## Prerequisites
- [ ] Node.js 16+ installed
- [ ] React 18+ project initialized
- [ ] npm or yarn package manager ready

## Installation

### Step 1: Verify Dependencies
```bash
npm list framer-motion tailwindcss react
```

Required versions:
- [ ] framer-motion: ^12.0.0+
- [ ] tailwindcss: ^4.0.0+
- [ ] react: ^18.0.0+

If any are missing:
```bash
npm install framer-motion@latest tailwindcss@latest
```

### Step 2: Create Directories
```bash
mkdir -p src/hooks src/components
```

## Files to Create

### Hooks (Copy these files)
- [ ] `src/hooks/useCursorPosition.js`
- [ ] `src/hooks/useParallax.js`
- [ ] `src/hooks/usePerformanceMonitor.js`

### Components (Copy these files)
- [ ] `src/components/MagneticButton.js`
- [ ] `src/components/FloatingCard.js`
- [ ] `src/components/InteractiveBackground.js`
- [ ] `src/components/AnimatedGradientText.js`
- [ ] `src/components/EdgeShiftUI.js`
- [ ] `src/components/AdvancedPortfolioHero.js`

### Documentation
- [ ] Review `ANIMATION_GUIDE.md` (technical deep-dive)
- [ ] Review `IMPLEMENTATION_GUIDE.md` (step-by-step)
- [ ] Review `QUICK_REFERENCE.md` (quick lookup)
- [ ] Review `EFFECTS_EXPLAINED.md` (visual explanations)

## Integration

### Option A: Use Complete Hero
```javascript
// src/App.js
import { AdvancedPortfolioHero } from './components/AdvancedPortfolioHero';

function App() {
  return <AdvancedPortfolioHero />;
}

export default App;
```

### Option B: Gradual Integration
```javascript
// src/App.js
import { MagneticButton } from './components/MagneticButton';
import { FloatingCard } from './components/FloatingCard';
import { InteractiveBackground } from './components/InteractiveBackground';

function App() {
  return (
    <div>
      <InteractiveBackground />
      <MagneticButton>Click Me</MagneticButton>
      <FloatingCard><div>Content</div></FloatingCard>
    </div>
  );
}

export default App;
```

## Testing

### Run Development Server
```bash
npm start
```

### Manual Testing Checklist
- [ ] Navigate to http://localhost:3000
- [ ] Move mouse around - see animations respond
- [ ] Click buttons - magnetic effect works
- [ ] Scroll down - parallax effect visible
- [ ] Open DevTools → Performance tab
- [ ] Record interaction → FPS should be 55-60+
- [ ] Test on mobile device (touch)
- [ ] Try with `prefers-reduced-motion` enabled

### Performance Check
```javascript
// Open console and run:
const { quality } = usePerformanceMonitor();
console.log(quality);
// Should show adaptive quality levels
```

## Customization

### Change Brand Colors
Edit `src/components/AdvancedPortfolioHero.js`:
```javascript
gradient="from-cyan-400 via-blue-500 to-purple-600"
// Change to your brand colors
```

### Adjust Animation Speed
Edit component props:
```javascript
<MagneticButton springConfig={{ stiffness: 300, damping: 20 }} />
// Increase stiffness for faster response
```

### Disable on Mobile
```javascript
const { quality } = usePerformanceMonitor();

<InteractiveBackground enableParticles={quality.enableParticles} />
```

## Deployment

### Before Deploying

- [ ] Test on real devices (not just browser DevTools)
- [ ] Check bundle size: `npm run build`
- [ ] Verify FPS with DevTools on real device
- [ ] Test accessibility: Tab through buttons, test with screen reader
- [ ] Check mobile responsiveness
- [ ] Verify load time (animations don't block rendering)

### Production Build
```bash
npm run build
# Creates optimized build in ./build folder
```

### Check Build Size
```bash
npm run build
# Should see:
# framer-motion: ~40KB (gzipped)
# total: ~150-200KB (including all code)
```

## Troubleshooting

### Issue: "Cannot find module 'framer-motion'"
```bash
npm install framer-motion --save
```

### Issue: Animations are laggy
- [ ] Open DevTools Performance tab
- [ ] Record 5 seconds of interaction
- [ ] Check FPS graph (should be 55-60)
- [ ] If below 50fps: reduce particle count
- [ ] Check if running on low-end device

### Issue: Buttons not magnetic
- [ ] Check button is within viewport
- [ ] Increase `magneticRadius` to 250px
- [ ] Check browser console for errors
- [ ] Verify Framer Motion installed correctly

### Issue: TypeScript Errors
- [ ] Install types: `npm install --save-dev @types/framer-motion`
- [ ] Update tsconfig.json if needed

## Post-Deployment

- [ ] Monitor performance in production (Google Analytics)
- [ ] Check for console errors in real user sessions
- [ ] Test on actual user devices
- [ ] Gather feedback on animation feel
- [ ] Adjust spring physics if needed
- [ ] Monitor page load time

## Optional Enhancements

- [ ] Add sound effects on button hover
- [ ] Integrate with analytics (track interaction depth)
- [ ] Create animation theme switcher (light/dark)
- [ ] Add keyboard shortcuts
- [ ] Create animation complexity settings UI
- [ ] Add animation debug mode

## Documentation Links

For detailed information:
- **Technical Deep-Dive**: See `ANIMATION_GUIDE.md`
- **Step-by-Step Setup**: See `IMPLEMENTATION_GUIDE.md`
- **Quick Lookup**: See `QUICK_REFERENCE.md`
- **Visual Explanations**: See `EFFECTS_EXPLAINED.md`

## Success Indicators ✓

When you're done, you should see:
- [ ] Smooth 60fps animations in DevTools
- [ ] Responsive buttons following cursor
- [ ] Floating cards with parallax
- [ ] Animated gradient text
- [ ] Edge shift effect working
- [ ] Mobile/touch devices handled gracefully
- [ ] No console errors
- [ ] Accessibility maintained (keyboard + screen reader)

## Getting Help

If you encounter issues:

1. **Check DevTools Console** for errors
2. **Check Performance Tab** to identify bottlenecks
3. **Read `EFFECTS_EXPLAINED.md`** for how effects work
4. **Review `QUICK_REFERENCE.md`** for component props
5. **Check `IMPLEMENTATION_GUIDE.md`** for common issues

## Performance Targets

- [ ] 60fps on modern devices
- [ ] 30-40fps on low-end devices
- [ ] <3 second load time
- [ ] <200KB total bundle (gzipped)
- [ ] No jank or stuttering
- [ ] Responsive to all screen sizes

## Next Steps After Setup

1. Customize colors to match your brand
2. Adjust spring physics to your preference
3. Add your content/projects to cards
4. Test on real devices
5. Optimize further if needed
6. Deploy to production
7. Monitor real user performance
8. Gather feedback and iterate

---

Once you've completed this checklist, you'll have a production-ready animation system! 🚀
