import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Rocket, Zap, GraduationCap, FileText, Mail } from "lucide-react";

// Individual Floating Navigation Item
const FloatingNavItem = ({
    label,
    icon: IconComponent,
    color = "cyan",
    position: initialPos,
    animationSpeed = 0.0005,
    amplitude = { x: 100, y: 80 },
    frequency = { x: 0.9, y: 1.1 },
    onClick,
    href,
    glow = "cyan",
}) => {
    const [position, setPosition] = useState(initialPos);
    const [tilt, setTilt] = useState({ x: 0, y: 0, z: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [lightAngle, setLightAngle] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [speedDamping, setSpeedDamping] = useState(1); // 1 = normal, 0 = stopped
    const [isHovering, setIsHovering] = useState(false); // Direct hover on item
    const [hoveredGlowIntensity, setHoveredGlowIntensity] = useState(0); // 0-1
    const [depthPulse, setDepthPulse] = useState(0); // For 3D depth animation
    const [hoverRotation, setHoverRotation] = useState({ x: 0, y: 0 }); // Hover-based 3D rotation
    const [iconPulse, setIconPulse] = useState(0); // Icon animation state (0-1)
    const [iconHoverGlow, setIconHoverGlow] = useState(0); // Icon hover glow intensity (0-1)
    const [isClicking, setIsClicking] = useState(false); // Click animation state
    const [clickRotation, setClickRotation] = useState(0); // Click rotation angle (0-360)
    const [isNavigating, setIsNavigating] = useState(false); // Track if navigation in progress
    const itemRef = useRef(null);
    const animationRef = useRef(null);
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const mouseMovementTimeoutRef = useRef(null);
    const hoverExitTimeoutRef = useRef(null);
    const restoreIntervalRef = useRef(null); // For smooth restoration on mouse leave
    const hoverRotationRef = useRef(null); // For continuous hover rotation animation
    const clickRotationRef = useRef(null); // For click rotation animation
    const motionForcedRestoreRef = useRef(null); // Safety timer to force motion restoration
    const floatTargetRef = useRef({ x: initialPos.x, y: initialPos.y }); // Random float target
    const floatPhaseRef = useRef({ x: Math.random(), y: Math.random() }); // Phase for smooth movement

    // Random smooth floating motion - moves between random positions
    useEffect(() => {
        let floatTime = 0;
        const floatSpeed = 0.0002; // Very slow movement

        // Set initial target if not already set
        if (!floatTargetRef.current.targetX) {
            const boundaryX = 200;
            const boundaryY = 150;
            floatTargetRef.current = {
                x: initialPos.x + (Math.random() - 0.5) * boundaryX,
                y: initialPos.y + (Math.random() - 0.5) * boundaryY,
                targetX: initialPos.x + (Math.random() - 0.5) * boundaryX,
                targetY: initialPos.y + (Math.random() - 0.5) * boundaryY,
            };
        }

        const floatAnimate = () => {
            floatTime += floatSpeed;

            // Check if we should pick a new target (every few seconds)
            if (floatTime > 1) {
                floatTime = 0;
                const boundaryX = 200;
                const boundaryY = 150;
                floatTargetRef.current.targetX =
                    initialPos.x + (Math.random() - 0.5) * boundaryX;
                floatTargetRef.current.targetY =
                    initialPos.y + (Math.random() - 0.5) * boundaryY;
            }

            // Smooth interpolation towards target
            const easeProgress = Math.sin(floatTime * Math.PI) * 0.5 + 0.5; // Smooth easing
            const currentX =
                floatTargetRef.current.x +
                (floatTargetRef.current.targetX - floatTargetRef.current.x) *
                easeProgress;
            const currentY =
                floatTargetRef.current.y +
                (floatTargetRef.current.targetY - floatTargetRef.current.y) *
                easeProgress;

            // Add subtle continuous wave motion
            const waveX =
                Math.sin(floatTime * Math.PI * 2 + floatPhaseRef.current.x) * 8;
            const waveY =
                Math.cos(floatTime * Math.PI * 2 + floatPhaseRef.current.y) * 6;

            // Apply damping when hovering or clicking
            const finalX = (currentX + waveX) * speedDamping;
            const finalY = (currentY + waveY) * speedDamping;

            // Keep within safe screen boundaries (with margin)
            const margin = 150;
            const clampedX = Math.max(
                -margin,
                Math.min(window.innerWidth - margin, finalX),
            );
            const clampedY = Math.max(
                -margin,
                Math.min(window.innerHeight - margin, finalY),
            );

            setPosition({
                x: clampedX,
                y: clampedY,
                z: Math.sin(floatTime * Math.PI) * 5,
            });
            animationRef.current = requestAnimationFrame(floatAnimate);
        };

        animationRef.current = requestAnimationFrame(floatAnimate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [initialPos, speedDamping]);

    // SAFETY: Force motion restoration if stuck for too long
    useEffect(() => {
        // Clear any existing forced restore timeout
        if (motionForcedRestoreRef.current) {
            clearTimeout(motionForcedRestoreRef.current);
            motionForcedRestoreRef.current = null;
        }

        // If speedDamping is very low (close to 0), set a timer to force restoration
        if (speedDamping < 0.5) {
            motionForcedRestoreRef.current = setTimeout(() => {
                // Force motion restoration - set speedDamping to 1
                setSpeedDamping(1);
            }, 2000); // Force restore after 2 seconds of low motion
        }

        return () => {
            if (motionForcedRestoreRef.current) {
                clearTimeout(motionForcedRestoreRef.current);
                motionForcedRestoreRef.current = null;
            }
        };
    }, [speedDamping]);

    // Click rotation animation - smooth 3D spin with glow
    useEffect(() => {
        if (!isClicking) {
            setClickRotation(0);
            if (clickRotationRef.current) {
                cancelAnimationFrame(clickRotationRef.current);
                clickRotationRef.current = null;
            }
            return;
        }

        let clickTime = 0;
        const rotationDuration = 0.6; // 600ms for smooth rotation

        const rotateAnimate = () => {
            clickTime += 0.016; // ~60fps

            if (clickTime >= rotationDuration) {
                // Animation complete - trigger navigation
                setClickRotation(360);
                setIsClicking(false);
                setIsNavigating(true);

                // Execute navigation after animation
                setTimeout(() => {
                    if (onClick) {
                        onClick();
                    } else if (href) {
                        if (href.startsWith("#")) {
                            const element = document.querySelector(href);
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                            }
                        } else {
                            window.open(href, "_blank");
                        }
                    }
                    setIsNavigating(false);
                    // Resume floating motion after navigation
                    setSpeedDamping(1);
                }, 100);

                if (clickRotationRef.current) {
                    cancelAnimationFrame(clickRotationRef.current);
                    clickRotationRef.current = null;
                }
                return;
            }

            // Ease out cubic for smooth rotation
            const easeProgress = 1 - Math.pow(1 - clickTime / rotationDuration, 3);
            setClickRotation(easeProgress * 360);

            clickRotationRef.current = requestAnimationFrame(rotateAnimate);
        };

        clickRotationRef.current = requestAnimationFrame(rotateAnimate);

        return () => {
            if (clickRotationRef.current) {
                cancelAnimationFrame(clickRotationRef.current);
                clickRotationRef.current = null;
            }
        };
    }, [isClicking, onClick, href]);

    // Hover-based 3D rotation animation (smooth, cinematic)
    useEffect(() => {
        if (!isHovering) {
            // Reset hover rotation when not hovering
            setHoverRotation({ x: 0, y: 0 });
            setIconPulse(0);
            if (hoverRotationRef.current) {
                cancelAnimationFrame(hoverRotationRef.current);
                hoverRotationRef.current = null;
            }
            return;
        }

        // Continuous rotation animation while hovering
        let rotationTime = 0;
        const rotationSpeed = 0.002; // Very slow, controlled rotation

        const rotationAnimate = () => {
            rotationTime += rotationSpeed;

            // Subtle X and Y rotation for cinematic effect
            const rotateX = Math.sin(rotationTime * 0.5) * 4; // ±4 degrees
            const rotateY = Math.cos(rotationTime * 0.6) * 5; // ±5 degrees

            setHoverRotation({ x: rotateX, y: rotateY });

            // Icon pulse animation (smooth breathing effect)
            setIconPulse((Math.sin(rotationTime * 0.5) + 1) / 2); // 0-1 range

            hoverRotationRef.current = requestAnimationFrame(rotationAnimate);
        };

        hoverRotationRef.current = requestAnimationFrame(rotationAnimate);

        return () => {
            if (hoverRotationRef.current) {
                cancelAnimationFrame(hoverRotationRef.current);
                hoverRotationRef.current = null;
            }
        };
    }, [isHovering]);

    // FORCED BEHAVIOR OVERRIDE: Hard stop on hover with zero-delay freeze
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!itemRef.current) return;

            const rect = itemRef.current.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const itemCenterY = rect.top + rect.height / 2;

            // Distance from mouse to item
            const dx = e.clientX - itemCenterX;
            const dy = e.clientY - itemCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Direct hover detection: cursor directly on the item (within bounding rect)
            const isDirectHover =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            // Light reflection follows cursor
            setLightAngle({
                x: (e.clientY / window.innerHeight) * 100,
                y: (e.clientX / window.innerWidth) * 100,
            });

            setMousePos({ x: e.clientX, y: e.clientY });

            // ============================================================================
            // HARD STOP RULE: IMMEDIATE FREEZE ON HOVER (NO EASING, NO SMOOTHING)
            // ============================================================================
            if (isDirectHover) {
                // ENFORCE: Movement speed to zero immediately
                setSpeedDamping(0);

                // ENFORCE: Tilt and rotation disabled (no drift, no wobble)
                setTilt({ x: 0, y: 0, z: 0 });

                // ENFORCE: Minimal scale (solid, grounded appearance)
                setScale(1);

                // ENFORCE: Glow intensity set to subtle level
                setIsHovering(true);
                setHoveredGlowIntensity(0.4); // Fixed, calm glow

                // ICON HOVER GLOW: Enhance icon glow on hover
                setIconHoverGlow((prev) => Math.min(1, prev + 0.1));

                // Clear any pending restoration
                if (restoreIntervalRef.current) {
                    clearInterval(restoreIntervalRef.current);
                    restoreIntervalRef.current = null;
                }
            } else {
                // When mouse is nearby but not directly hovering: gentle slowdown
                const proximityFactor = Math.max(0, 1 - distance / 250);

                // Only apply tilt if not frozen by hover
                if (proximityFactor > 0) {
                    const tiltIntensity = 8;
                    const zRotIntensity = 5;

                    setTilt({
                        x: (dy / rect.height) * proximityFactor * tiltIntensity,
                        y: -(dx / rect.width) * proximityFactor * tiltIntensity,
                        z: Math.atan2(dy, dx) * proximityFactor * zRotIntensity,
                    });

                    const hoverScaleBoost = 0.05;
                    setScale(1 + proximityFactor * hoverScaleBoost);
                }

                setIsHovering(false);
                setHoveredGlowIntensity((prev) => Math.max(0, prev - 0.05));

                // Gradual slowdown when approaching
                const detectionRadius = 400;
                const dampingFactor = Math.max(0, 1 - distance / detectionRadius);

                setSpeedDamping((prev) => {
                    const targetDamping = 0.15 + (1 - dampingFactor) * 0.85;
                    return prev + (targetDamping - prev) * 0.15;
                });
            }

            // Clear timeout for mouse stop detection
            if (mouseMovementTimeoutRef.current) {
                clearTimeout(mouseMovementTimeoutRef.current);
            }

            // Clear hover exit timeout if hovering
            if (isDirectHover && hoverExitTimeoutRef.current) {
                clearTimeout(hoverExitTimeoutRef.current);
                hoverExitTimeoutRef.current = null;
            }

            // Set timeout: if mouse doesn't move for 3 seconds, start restoring full speed
            mouseMovementTimeoutRef.current = setTimeout(() => {
                setSpeedDamping((prev) => prev + (1 - prev) * 0.03);
            }, 3000);

            lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            // Reset hover state immediately
            setIsHovering(false);
            setHoveredGlowIntensity(0);
            setIconHoverGlow(0); // Reset icon hover glow
            setTilt({ x: 0, y: 0, z: 0 });
            setScale(1);

            // Clear any existing restoration interval
            if (restoreIntervalRef.current) {
                clearInterval(restoreIntervalRef.current);
                restoreIntervalRef.current = null;
            }

            // CRITICAL: Immediately restore motion to prevent motion getting stuck
            // Gradually restore speed damping over ~800ms (no sudden acceleration)
            let restoreSteps = 0;
            const maxSteps = 16;

            // Start restoration immediately
            setSpeedDamping(0.5); // Quick initial boost to prevent sticking

            restoreIntervalRef.current = setInterval(() => {
                restoreSteps++;
                setSpeedDamping((prev) => {
                    const progress = restoreSteps / maxSteps;
                    const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
                    // Go from 0.5 to 1.0
                    return 0.5 + easeOutProgress * 0.5;
                });

                if (restoreSteps >= maxSteps) {
                    clearInterval(restoreIntervalRef.current);
                    restoreIntervalRef.current = null;
                    setSpeedDamping(1); // Ensure we hit exactly 1
                }
            }, 50);
        };

        window.addEventListener("mousemove", handleMouseMove);
        itemRef.current?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            itemRef.current?.removeEventListener("mouseleave", handleMouseLeave);
            if (mouseMovementTimeoutRef.current) {
                clearTimeout(mouseMovementTimeoutRef.current);
            }
            if (hoverExitTimeoutRef.current) {
                clearTimeout(hoverExitTimeoutRef.current);
            }
            if (restoreIntervalRef.current) {
                clearInterval(restoreIntervalRef.current);
            }
            if (motionForcedRestoreRef.current) {
                clearTimeout(motionForcedRestoreRef.current);
            }
        };
    }, []);

    const colorMap = {
        cyan: {
            border: "border-cyan-500/50",
            glow: "rgba(52, 211, 255, 0.8)",
            text: "text-cyan-300",
        },
        magenta: {
            border: "border-magenta-500/50",
            glow: "rgba(236, 72, 153, 0.8)",
            text: "text-magenta-300",
        },
        purple: {
            border: "border-purple-500/50",
            glow: "rgba(168, 85, 247, 0.8)",
            text: "text-purple-300",
        },
        emerald: {
            border: "border-emerald-500/50",
            glow: "rgba(16, 185, 129, 0.8)",
            text: "text-emerald-300",
        },
        blue: {
            border: "border-blue-500/50",
            glow: "rgba(59, 130, 246, 0.8)",
            text: "text-blue-300",
        },
    };

    const colors = colorMap[color] || colorMap.cyan;

    // Click animation effect - rotate then navigate, then resume motion
    useEffect(() => {
        if (!isClicking) {
            setClickRotation(0);
            if (clickRotationRef.current) {
                cancelAnimationFrame(clickRotationRef.current);
                clickRotationRef.current = null;
            }
            return;
        }

        let clickTime = 0;
        const rotationDuration = 0.6; // 600ms for smooth rotation

        const rotateAnimate = () => {
            clickTime += 0.016; // ~60fps

            if (clickTime >= rotationDuration) {
                // Animation complete - trigger navigation
                setClickRotation(360);
                setIsClicking(false);
                setIsNavigating(true);

                // Stop floating motion during navigation
                setSpeedDamping(0);

                // Execute navigation after animation
                setTimeout(() => {
                    if (onClick) {
                        onClick();
                    } else if (href) {
                        if (href.startsWith("#")) {
                            const element = document.querySelector(href);
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                            }
                        } else {
                            window.open(href, "_blank");
                        }
                    }
                    setIsNavigating(false);
                    // Resume floating motion after navigation
                    setSpeedDamping(1);
                }, 100);

                if (clickRotationRef.current) {
                    cancelAnimationFrame(clickRotationRef.current);
                    clickRotationRef.current = null;
                }
                return;
            }

            // Ease out cubic for smooth rotation
            const easeProgress = 1 - Math.pow(1 - clickTime / rotationDuration, 3);
            setClickRotation(easeProgress * 360);

            clickRotationRef.current = requestAnimationFrame(rotateAnimate);
        };

        clickRotationRef.current = requestAnimationFrame(rotateAnimate);

        return () => {
            if (clickRotationRef.current) {
                cancelAnimationFrame(clickRotationRef.current);
                clickRotationRef.current = null;
            }
        };
    }, [isClicking, onClick, href]);

    // Direct click handler - trigger rotation animation
    const handleDirectClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Trigger rotation animation, which will execute navigation after completion
        setIsClicking(true);
    };

    return (
        <motion.div
            ref={itemRef}
            className="fixed z-40 pointer-events-auto cursor-pointer"
            onClick={handleDirectClick}
            style={{
                top: `${position.y + 100}px`,
                left: `${position.x + 50}%`,
                perspective: 1400,
                pointerEvents: "auto", // ENFORCE: Always accept clicks
            }}
            animate={{
                x: "-50%",
            }}
        >
            {/* Ambient glow aura (subtle, steady on hover) */}
            <motion.div
                className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: isHovering ? 1.1 : [0.8, 1.1, 0.8],
                    opacity: 0.3 + hoveredGlowIntensity * 0.3,
                }}
                transition={{
                    duration: isHovering ? 0 : 3 + Math.random() * 2,
                    repeat: isHovering ? false : Infinity,
                }}
                style={{
                    background: `radial-gradient(circle, ${colors.glow}, transparent)`,
                    width: "150px",
                    height: "150px",
                    left: "-75px",
                    top: "-75px",
                }}
            />

            {/* Dynamic light spot (subtle on hover) */}
            <motion.div
                className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
                animate={{
                    opacity: 0.3 + hoveredGlowIntensity * 0.3,
                }}
                transition={{ duration: 0.3 }}
                style={{
                    background: `radial-gradient(circle at ${lightAngle.y}% ${lightAngle.x}%, ${colors.glow}, transparent)`,
                    width: isHovering ? "140px" : "120px",
                    height: isHovering ? "140px" : "120px",
                    left: isHovering ? "-70px" : "-60px",
                    top: isHovering ? "-70px" : "-60px",
                    transition: "all 0.2s ease-out",
                }}
            />

            {/* Main 3D card with hover rotation and click rotation */}
            <motion.div
                animate={{
                    rotateX: isClicking ? 0 : tilt.x + hoverRotation.x,
                    rotateY: isClicking ? clickRotation : tilt.y + hoverRotation.y,
                    rotateZ: isClicking ? clickRotation * 0.6 : tilt.z,
                    scale: isClicking ? 1.15 : scale,
                    z: isHovering && !isClicking ? 30 : 0,
                }}
                transition={{
                    rotateY: isClicking
                        ? { duration: 0.6, ease: "easeOut" }
                        : { type: "spring", stiffness: 300, damping: 40, mass: 0.7 },
                    rotateZ: isClicking
                        ? { duration: 0.6, ease: "easeOut" }
                        : { type: "spring", stiffness: 300, damping: 40, mass: 0.7 },
                    scale: isClicking
                        ? { duration: 0.3, ease: "easeOut" }
                        : { type: "spring", stiffness: 300, damping: 40, mass: 0.7 },
                    rotateX: { type: "spring", stiffness: 300, damping: 40, mass: 0.7 },
                    z: { type: "spring", stiffness: 300, damping: 40, mass: 0.7 },
                }}
                style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
                className="relative"
            >
                {/* Layered depth effect */}
                <motion.div
                    animate={{
                        boxShadow: isClicking
                            ? `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 60px ${colors.glow}60`
                            : isHovering
                                ? `0 20px 40px rgba(0, 0, 0, 0.7), 0 0 40px ${colors.glow}20`
                                : `0 15px 30px rgba(0, 0, 0, 0.5)`,
                    }}
                    transition={{ duration: isClicking ? 0.1 : 0.4 }}
                    style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(30px)",
                    }}
                    className={`relative px-6 py-4 rounded-2xl backdrop-blur-xl ${isHovering ? "bg-gradient-to-br from-slate-800/90 via-slate-700/65 to-slate-800/90" : "bg-gradient-to-br from-slate-900/85 via-slate-800/60 to-slate-900/85"} border ${colors.border} shadow-2xl`}
                >
                    {/* Holographic shine (subtle on hover) */}
                    <motion.div
                        animate={{
                            opacity: isHovering ? 0.2 : 0.12,
                        }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.06) 25%,
                rgba(255, 255, 255, 0) 50%,
                rgba(255, 255, 255, 0.06) 75%,
                rgba(255, 255, 255, 0.15) 100%)`,
                            animation: `shimmer ${isHovering ? "2s" : "2.5s"} infinite`,
                        }}
                    />

                    {/* Dynamic reflection layer (subtle on hover) */}
                    <motion.div
                        animate={{
                            opacity: isHovering ? 0.35 : 0.25,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at ${lightAngle.y}% ${lightAngle.x}%, ${colors.glow}, transparent 70%)`,
                            transition: "all 0.2s ease-out",
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                        {/* Icon container with hover glow and pulse animation */}
                        <motion.div
                            className="p-3 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-current/20 pointer-events-none"
                            animate={{
                                scale: isHovering ? 1 + iconPulse * 0.05 : 1, // Subtle 5% pulse on hover
                                boxShadow: isHovering
                                    ? `0 0 ${20 + iconHoverGlow * 10}px ${colors.glow.replace("0.8", String(0.3 + iconHoverGlow * 0.5))}`
                                    : "0 0 10px rgba(0, 0, 0, 0.3)",
                            }}
                            transition={{ duration: 0.15 }}
                            whileHover={!isHovering ? { scale: 1.05 } : {}}
                            style={{
                                transition: isHovering ? "none" : "all 0.2s ease-out",
                            }}
                        >
                            <IconComponent className={`w-6 h-6 ${colors.text}`} />
                        </motion.div>

                        {/* Label - CLICK PRIORITY: Always clickable, triggers rotation then navigation */}
                        <motion.button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Trigger rotation animation (same as container click)
                                setIsClicking(true);
                            }}
                            href={href}
                            target={href ? "_blank" : undefined}
                            rel={href ? "noopener noreferrer" : undefined}
                            as="button"
                            className={`text-sm font-bold ${colors.text} cursor-pointer transition-all hover:opacity-100 opacity-90 pointer-events-auto`}
                            whileHover={isHovering ? {} : { scale: 1.03 }}
                            whileTap={isHovering ? {} : { scale: 0.97 }}
                            transition={{ duration: 0.1 }}
                        >
                            {label}
                        </motion.button>

                        {/* Glowing accent line - enhanced on hover */}
                        <motion.div
                            className="h-0.5 rounded-full"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
                                width: isHovering ? "60px" : "40px",
                            }}
                            animate={{
                                opacity: isHovering ? [0.6, 1, 0.6] : [0.5, 1, 0.5],
                                width: isHovering ? "60px" : "40px",
                            }}
                            transition={{
                                duration: isHovering ? 1.5 : 2,
                                repeat: Infinity,
                                opacity: { duration: isHovering ? 1.5 : 2 },
                                width: { duration: 0.3 },
                            }}
                        />
                    </div>
                </motion.div>

                {/* Back face depth layer */}
                <div
                    style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(-15px)",
                    }}
                    className={`absolute inset-0 px-6 py-4 rounded-2xl border ${colors.border} opacity-40 backdrop-blur-sm`}
                />
            </motion.div>

            {/* Floating particle effect around item - disabled while hovering */}
            {!isHovering && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(2)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full blur-sm"
                            style={{
                                background: colors.glow,
                                left: `${25 + i * 50}%`,
                                top: "50%",
                            }}
                            animate={{
                                y: [0, -4, 0], // Drastically reduced from -15 (75% less)
                                opacity: [0.2, 0.6, 0.2],
                                x: [0, Math.sin(i * Math.PI) * 2.25, 0], // Drastically reduced from 9 (75% less)
                            }}
                            transition={{
                                duration: 8 + i, // Increased from 3.5 for much slower motion
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

// Main Split Navigation Component
const SplitNavigation = () => {
    const navItems = [
        {
            label: "Projects",
            icon: Rocket,
            color: "cyan",
            position: { x: -280, y: 20, z: 0 },
            animationSpeed: 0.00004725, // Increased by 5%
            amplitude: { x: 15.75, y: 11.55 }, // Increased by 5%
            frequency: { x: 0.8, y: 0.95 },
            href: "#projects",
            glow: "cyan",
        },
        {
            label: "Skills",
            icon: Zap,
            color: "magenta",
            position: { x: -120, y: 60, z: 0 },
            animationSpeed: 0.000055125, // Increased by 5%
            amplitude: { x: 13.65, y: 14.7 }, // Increased by 5%
            frequency: { x: 0.95, y: 0.85 },
            href: "#skills",
            glow: "magenta",
        },
        {
            label: "Education",
            icon: GraduationCap,
            color: "purple",
            position: { x: 40, y: -10, z: 0 },
            animationSpeed: 0.0000328125, // Increased by 5%
            amplitude: { x: 10.5, y: 9.45 }, // Increased by 5%
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
            animationSpeed: 0.0000590625, // Increased by 5%
            amplitude: { x: 12.6, y: 13.65 }, // Increased by 5%
            frequency: { x: 1.0, y: 0.8 },
            href: "https://www.linkedin.com/in/sonukumar102/",
            glow: "blue",
        },
    ];

    return (
        <>
            {/* Render all floating navigation items with consistent behavior */}
            {navItems.map((item, idx) => (
                <FloatingNavItem
                    key={idx}
                    label={item.label}
                    icon={item.icon}
                    color={item.color}
                    position={item.position}
                    animationSpeed={item.animationSpeed}
                    amplitude={item.amplitude}
                    frequency={item.frequency}
                    href={item.href}
                    glow={item.glow}
                    onClick={item.onClick}
                />
            ))}
        </>
    );
};

export default SplitNavigation;
