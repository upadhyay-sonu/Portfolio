import { motion } from 'framer-motion';

interface DiceProps {
  value: number;
  rolling: boolean;
  onRoll: () => void;
  disabled: boolean;
}

export function Dice({ value, rolling, onRoll, disabled }: DiceProps) {
  // Simple synthetic beep for sound
  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch(e) {
      // Ignore audio errors
    }
  };

  const handleRoll = () => {
    if (disabled || rolling) return;
    playSound();
    onRoll();
  };

  // SVG pips for dice faces
  const pips = {
    1: [[50, 50]],
    2: [[20, 20], [80, 80]],
    3: [[20, 20], [50, 50], [80, 80]],
    4: [[20, 20], [20, 80], [80, 20], [80, 80]],
    5: [[20, 20], [20, 80], [50, 50], [80, 20], [80, 80]],
    6: [[20, 20], [20, 50], [20, 80], [80, 20], [80, 50], [80, 80]],
  };

  const currentPips = pips[value as keyof typeof pips] || pips[1];

  return (
    <motion.button
      onClick={handleRoll}
      disabled={disabled}
      className={`w-20 h-20 rounded-2xl bg-white shadow-xl shadow-black/20 flex flex-col justify-center items-center relative inset-0 border-4 ${disabled ? 'border-gray-200 cursor-not-allowed opacity-80' : 'border-indigo-400 cursor-pointer hover:border-indigo-600'}`}
      animate={rolling ? {
        rotateX: [0, 360, 720],
        rotateY: [0, 360, 720],
        scale: [1, 1.2, 1],
      } : { rotateX: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-900 pointer-events-none">
        {currentPips.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="8" fill="currentColor" />
        ))}
      </svg>
    </motion.button>
  );
}
