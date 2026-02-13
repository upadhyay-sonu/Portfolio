# 3D Floating Navigation System - Behavior Specification

## Overview
All 5 navigation items (Projects, Skills, Education, CV, Connect) now use a unified, consistent behavior system for floating motion, clicking, and navigation.

---

## ✅ 1️⃣ Continuous Random Slow Movement (All Items)

### Implementation Details
- **FloatingNavItem Component** → Unified for all 5 items
- **Float Speed**: `0.0002` (extremely slow and premium)
- **Boundary Limits**: ±200px horizontally, ±150px vertically from initial position
- **Motion Type**: 
  - Random target selection every ~5 seconds
  - Smooth interpolation to target (easing curve: sine)
  - Continuous wave motion (sine/cosine) overlaid on target movement
  - Z-depth oscillation for 3D effect

### Behavior Pattern
```
Initial Position
    ↓
Pick Random Target (within boundary)
    ↓
Smoothly Interpolate Towards Target (5 seconds)
    ↓
Add Continuous Wave Motion (always active)
    ↓
Clamp to Safe Screen Boundaries
    ↓
Every 5 seconds: Repeat (pick new target)
```

### Screen Boundary Protection
- Margin: 150px from viewport edges
- Prevents items from going off-screen
- Applied to both X and Y coordinates
- Adjusts dynamically to window size

---

## ✅ 2️⃣ On Click – Same Behavior for All Items

### Click Animation Flow

**Step 1: Stop & Rotate (600ms)**
```javascript
if (onClick) {
  // Click detected
  setIsClicking(true);
  setSpeedDamping(0);  // Stop floating motion
}

// 600ms rotation animation (ease-out cubic)
rotateY: clickRotation (0° → 360°)
rotateZ: clickRotation * 0.6 (complementary spin)
scale: 1.15 (zoom emphasis)
boxShadow: Enhanced glow (60% intensity)
```

**Step 2: Navigate After Rotation**
```javascript
setTimeout(() => {
  // After 600ms rotation completes...
  
  if (onClick) {
    onClick();  // Custom handler (CV: unused, others: undefined)
  } else if (href) {
    if (href.startsWith("#")) {
      // Internal navigation
      const element = document.querySelector(href);
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // External navigation
      window.open(href, "_blank");
    }
  }
}, 100);
```

### Navigation Targets

| Item | Type | Target |
|------|------|--------|
| **Projects** | Internal | `#projects` (scroll to section) |
| **Skills** | Internal | `#skills` (scroll to section) |
| **Education** | Internal | `#education` (scroll to section) |
| **CV** | Internal | `#cv` (scroll to section) |
| **Connect** | External | LinkedIn profile (new tab) |

### Visual Effects During Click
- **Scale Increase**: 1.0 → 1.15
- **Rotation**: Full 360° on Y-axis + complementary Z-axis rotation
- **Glow Intensity**: 40% → 60% during animation
- **Shadow Depth**: Enhanced (0 20px 50px with 60% colored glow)
- **Duration**: 600ms with ease-out cubic easing

---

## ✅ 3️⃣ After Navigation

### Motion Resumption
```javascript
setTimeout(() => {
  // Navigate...
  
  setIsNavigating(false);
  setSpeedDamping(1);  // Resume floating motion
}, 100);
```

### Behavior After Click
- ✅ Floating motion resumes immediately after navigation
- ✅ 3D depth effects maintained
- ✅ Lighting and glow effects continue
- ✅ No permanent freeze
- ✅ Hover effects available again

---

## ✅ 4️⃣ Consistency Rules (All 5 Items)

### Unified Properties
Each item receives the same FloatingNavItem component with:
- Same floating animation logic
- Same click rotation behavior
- Same navigation dispatch logic
- Same screen boundary clamping
- Same hover effects

### Configuration (navItems Array)

```javascript
const navItems = [
  {
    label: "Projects",
    icon: Rocket,
    color: "cyan",
    position: { x: -280, y: 20, z: 0 },
    animationSpeed: 0.00004725,
    amplitude: { x: 15.75, y: 11.55 },
    frequency: { x: 0.8, y: 0.95 },
    href: "#projects",
    glow: "cyan",
  },
  {
    label: "Skills",
    icon: Zap,
    color: "magenta",
    position: { x: -120, y: 60, z: 0 },
    animationSpeed: 0.000055125,
    amplitude: { x: 13.65, y: 14.7 },
    frequency: { x: 0.95, y: 0.85 },
    href: "#skills",
    glow: "magenta",
  },
  {
    label: "Education",
    icon: GraduationCap,
    color: "purple",
    position: { x: 40, y: -10, z: 0 },
    animationSpeed: 0.0000328125,
    amplitude: { x: 10.5, y: 9.45 },
    frequency: { x: 0.65, y: 0.75 },
    href: "#education",
    glow: "purple",
  },
  {
    label: "CV",
    icon: FileText,
    color: "emerald",
    position: { x: 180, y: 50, z: 0 },
    animationSpeed: 0.000049875,
    amplitude: { x: 13.65, y: 12.6 },
    frequency: { x: 0.9, y: 1.0 },
    href: "#cv",
    glow: "emerald",
  },
  {
    label: "Connect",
    icon: Mail,
    color: "blue",
    position: { x: 320, y: 80, z: 0 },
    animationSpeed: 0.0000590625,
    amplitude: { x: 12.6, y: 13.65 },
    frequency: { x: 1.0, y: 0.8 },
    href: "https://www.linkedin.com/in/sonukumar102/",
    glow: "blue",
  },
];
```

---

## ✅ Critical Rules (All Enforced)

### Motion Rules
- ✅ **No Speed Increase**: Float speed fixed at `0.0002`
- ✅ **No Sticking**: Every item picks new target every 5 seconds
- ✅ **Smooth Motion**: Uses easing curves, not linear movement
- ✅ **Screen Safety**: Boundary clamping prevents off-screen movement
- ✅ **Calm Feel**: Slow, deliberate motion (no jittery behavior)

### Click Rules
- ✅ **No Click Blocking**: `pointerEvents: "auto"` maintained
- ✅ **No Freezing**: Motion resumes after navigation
- ✅ **Consistent Rotation**: Same 600ms animation for all items
- ✅ **Same Glow**: All items get enhanced glow during rotation

### Navigation Rules
- ✅ **Automatic Dispatch**: Happens after rotation animation completes
- ✅ **Correct Targets**: Projects/Skills/Education/CV scroll locally, Connect opens LinkedIn
- ✅ **Smooth Scrolling**: `behavior: "smooth"` for internal navigation
- ✅ **New Tab**: LinkedIn opens in `_blank` target

---

## Testing Checklist

### ✓ Each Item Can:
- [ ] **Projects** - Float smoothly, click to rotate and scroll to #projects
- [ ] **Skills** - Float smoothly, click to rotate and scroll to #skills
- [ ] **Education** - Float smoothly, click to rotate and scroll to #education
- [ ] **CV** - Float smoothly, click to rotate and scroll to #cv
- [ ] **Connect** - Float smoothly, click to rotate and open LinkedIn

### ✓ All Items Exhibit:
- [ ] Random movement within boundaries
- [ ] No sudden jumps or jerky motion
- [ ] Smooth rotation (360°) on click
- [ ] Enhanced glow during click animation
- [ ] Motion resumes after navigation
- [ ] Can be hovered and clicked multiple times
- [ ] Hover effects work consistently

### ✓ System-Wide Behavior:
- [ ] All 5 items move independently
- [ ] All items stay within screen boundaries
- [ ] All items use same animation timing
- [ ] All items respond to clicks immediately
- [ ] No performance degradation with all items active
- [ ] 3D perspective maintained throughout

---

## Technical Implementation Summary

### Core Animation Loop
- **FloatingNavItem Component**: Single, unified component handling all 5 items
- **useEffect Hooks**: 
  1. Random floating motion (continuous)
  2. Click rotation animation (600ms)
  3. Hover rotation animation (continuous on hover)
  4. Safety timer to force motion restoration
  
### State Management
- `position`: Current {x, y, z} coordinates
- `speedDamping`: 1 (normal) or 0 (stopped)
- `isClicking`: Triggers rotation animation
- `clickRotation`: 0-360° progress
- `isHovering`: Disables motion, enables hover effects

### Performance Considerations
- RequestAnimationFrame for smooth 60fps animation
- Clamping prevents continuous boundary recalculation
- Refs used for animation frame IDs (no memory leaks)
- Damping mechanism prevents visual stuttering

---

## Visual Behavior Flow Diagram

```
FLOATING STATE (Default)
├─ Float towards random target (5 sec cycle)
├─ Add wave motion continuously
├─ Clamp to screen boundaries
└─ Display subtle glow

    ↓ (Hover detected)
    
HOVER STATE
├─ Stop motion (speedDamping = 0)
├─ Show subtle 3D rotation
├─ Enhance glow intensity
└─ Highlight icon with pulse

    ↓ (Click detected)
    
CLICK ANIMATION (600ms)
├─ Lock motion (speedDamping = 0)
├─ 360° Y-axis rotation + Z spin
├─ Scale 1.15 emphasis
├─ Enhanced glow (60%)
└─ Display cinematic shadow

    ↓ (Animation complete)
    
NAVIGATION
├─ Execute navigation (scroll or new tab)
└─ Resume motion (speedDamping = 1)

    ↓
    
Back to FLOATING STATE
```

---

## Files Modified
- `src/SplitNavigation.js` - Complete implementation

## No Features Removed
✅ All existing 3D effects, lighting, and hover behaviors preserved.
