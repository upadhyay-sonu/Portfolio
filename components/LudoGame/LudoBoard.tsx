import { motion } from 'framer-motion';
import { GameState, ROUTE, HOME_STRETCHES, BASES, TokenState } from './LudoConstants';

interface LudoBoardProps {
  gameState: GameState;
  onTokenClick: (tokenId: string) => void;
  validMoves: TokenState[];
}

export function LudoBoard({ gameState, onTokenClick, validMoves }: LudoBoardProps) {
  // Helpers to get token physical coordinates
  const getTokenCoords = (token: TokenState, index: number) => {
    let pos = { c: 0, r: 0 };
    if (token.position === -1) {
      pos = BASES[token.color][index];
    } else if (token.position >= 100 && token.position < 106) {
      const idx = token.position - 100;
      pos = HOME_STRETCHES[token.color][idx];
    } else if (token.position === 106) {
       // Home center point approx
       pos = { c: 7, r: 7 }; 
    } else {
      pos = ROUTE[token.position] || { c: 0, r: 0 };
    }

    // Offset slightly if multiple tokens occupy the exact same tile (for path)
    let overlapOffset = { x: 0, y: 0 };
    if (token.position !== -1 && token.position !== 106) {
       const samePosTokens = gameState.tokens.filter(t => t.position === token.position);
       if (samePosTokens.length > 1) {
          const occIndex = samePosTokens.findIndex(t => t.id === token.id);
          overlapOffset = {
             x: (occIndex % 2 === 0 ? -15 : 15),
             y: (occIndex < 2 ? -15 : 15)
          };
       }
    }

    return {
      left: `calc(${(pos.c * 100) / 15}% + ${overlapOffset.x}px)`,
      top: `calc(${(pos.r * 100) / 15}% + ${overlapOffset.y}px)`,
      width: `${100 / 15}%`,
      height: `${100 / 15}%`,
    };
  };

  const isMoveValid = (tokenId: string) => validMoves.some(t => t.id === tokenId);

  return (
    <div className="relative w-full max-w-[500px] aspect-square rounded-xl overflow-hidden shadow-2xl bg-white border-8 border-gray-300">
      {/* 15x15 Static Grid Layout */}
      <div className="absolute inset-0 grid grid-cols-15 grid-rows-15">
        {/* We just draw the base colored quadrants and home */}
        <div className="col-span-6 row-span-6 bg-red-500 border-r-2 border-b-2 border-gray-800 p-4">
          <div className="w-full h-full bg-white rounded-xl shadow-inner flex flex-wrap items-center justify-center gap-4 p-4">
            <div className="w-[30%] h-[30%] rounded-full border-4 border-red-500/20" />
            <div className="w-[30%] h-[30%] rounded-full border-4 border-red-500/20" />
            <div className="w-[30%] h-[30%] rounded-full border-4 border-red-500/20" />
            <div className="w-[30%] h-[30%] rounded-full border-4 border-red-500/20" />
          </div>
        </div>
        <div className="col-span-3 row-span-6 grid grid-cols-3 grid-rows-6">
           {Array.from({length: 18}).map((_, i) => (
             <div key={i} className={`border border-gray-300 ${[7,10,13,16,1,4].includes(i) ? 'bg-green-500/80':'bg-white'}`}></div>
           ))}
        </div>
        <div className="col-span-6 row-span-6 bg-green-500 border-l-2 border-b-2 border-gray-800 p-4">
          <div className="w-full h-full bg-white rounded-xl shadow-inner" />
        </div>

        <div className="col-span-6 row-span-3 grid grid-rows-3 grid-cols-6">
           {Array.from({length: 18}).map((_, i) => (
             <div key={i} className={`border border-gray-300 ${[1,7,8,9,10,11].includes(i) ? 'bg-red-500/80':'bg-white'}`}></div>
           ))}
        </div>
        <div className="col-span-3 row-span-3">
          {/* Center Home */}
          <div className="w-full h-full">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="0,0 50,50 0,100" fill="#ef4444" />
              <polygon points="0,0 100,0 50,50" fill="#22c55e" />
              <polygon points="100,0 100,100 50,50" fill="#eab308" />
              <polygon points="0,100 100,100 50,50" fill="#3b82f6" />
            </svg>
          </div>
        </div>
        <div className="col-span-6 row-span-3 grid grid-rows-3 grid-cols-6">
           {Array.from({length: 18}).map((_, i) => (
             <div key={i} className={`border border-gray-300 ${[6,7,8,9,10,16].includes(i) ? 'bg-yellow-500/80':'bg-white'}`}></div>
           ))}
        </div>

        <div className="col-span-6 row-span-6 bg-blue-500 border-r-2 border-t-2 border-gray-800 p-4">
          <div className="w-full h-full bg-white rounded-xl shadow-inner" />
        </div>
        <div className="col-span-3 row-span-6 grid grid-cols-3 grid-rows-6">
           {Array.from({length: 18}).map((_, i) => (
             <div key={i} className={`border border-gray-300 ${[1,4,7,10,13,16].includes(i) ? 'bg-blue-500/80':'bg-white'}`}></div>
           ))}
        </div>
        <div className="col-span-6 row-span-6 bg-yellow-500 border-l-2 border-t-2 border-gray-800 p-4">
          <div className="w-full h-full bg-white rounded-xl shadow-inner flex flex-wrap items-center justify-center gap-4 p-4">
             <div className="w-[30%] h-[30%] rounded-full border-4 border-yellow-500/20" />
            <div className="w-[30%] h-[30%] rounded-full border-4 border-yellow-500/20" />
            <div className="w-[30%] h-[30%] rounded-full border-4 border-yellow-500/20" />
            <div className="w-[30%] h-[30%] rounded-full border-4 border-yellow-500/20" />
          </div>
        </div>
      </div>

      {/* Snake Images overlay if snake mode */}
      {gameState.mode === 'snake' && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
           {/* Visual snakes - approximations mapping routes */}
           <svg className="w-full h-full">
              <path d="M 20% 40% Q 40% 60% 10% 80%" stroke="green" strokeWidth="8" fill="transparent" strokeLinecap="round" />
              <path d="M 80% 20% Q 90% 40% 70% 60%" stroke="green" strokeWidth="8" fill="transparent" strokeLinecap="round" />
           </svg>
        </div>
      )}

      {/* Tokens Layer */}
      {gameState.tokens.map((token, idx) => {
        const coords = getTokenCoords(token, idx % 4);
        const valid = isMoveValid(token.id);

        return (
          <motion.button
            key={token.id}
            onClick={() => valid && onTokenClick(token.id)}
            disabled={!valid}
            className="absolute rounded-full flex items-center justify-center outline-none ring-offset-1 pointer-events-auto"
            style={{
              left: coords.left,
              top: coords.top,
              width: coords.width,
              height: coords.height,
            }}
            initial={false}
            animate={{
              left: coords.left,
              top: coords.top,
              scale: valid ? [1, 1.15, 1] : 1,
            }}
            transition={{
              scale: { repeat: valid ? Infinity : 0, duration: 1 },
              left: { type: 'spring', stiffness: 200, damping: 20 },
              top: { type: 'spring', stiffness: 200, damping: 20 }
            }}
            whileHover={valid ? { scale: 1.2 } : {}}
            whileTap={valid ? { scale: 0.9 } : {}}
          >
            <div className={`w-[80%] h-[80%] rounded-full shadow-lg border-[3px] flex items-center justify-center
               ${token.color === 'red' ? 'bg-gradient-to-br from-red-400 to-red-600 border-red-800' : 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-700'}
               ${valid ? 'ring-4 ring-white animate-pulse z-10' : ''}
               ${token.isHome ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}>
               <div className="w-[40%] h-[40%] rounded-full bg-white/30" />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
