import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLudoGame } from './useLudoLogic';
import { LudoBoard } from './LudoBoard';
import { Dice } from './Dice';
import { ArrowLeft, RefreshCcw } from 'lucide-react';

interface LudoDashboardProps {
  onClose: () => void;
}

export function LudoDashboard({ onClose }: LudoDashboardProps) {
  const { state, dispatch, getValidMoves } = useLudoGame();
  const [showGame, setShowGame] = useState(false);

  const startGame = (mode: 'normal' | 'snake') => {
    dispatch({ type: 'SET_MODE', payload: mode });
    setShowGame(true);
  };

  const handleRoll = () => {
    const val = Math.floor(Math.random() * 6) + 1;
    dispatch({ type: 'ROLL_DICE', payload: val });

    // Check if any valid moves exist for user, otherwise auto pass turn after delay
    setTimeout(() => {
      // In a real effect, we'd wait for validMoves calculation. We handle this inside useLudoLogic
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-gray-900/95 backdrop-blur-sm text-gray-800 flex flex-col font-sans overflow-hidden">
      {/* SaaS Navbar */}
      <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">L</div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">Game Zone</span>
          {showGame && (
             <span className="ml-4 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold capitalize border border-indigo-100">
               {state.mode} Mode
             </span>
          )}
        </div>
        <div className="flex gap-4">
          {showGame && (
            <button
               onClick={() => dispatch({ type: 'RESET' })}
               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition"
            >
              <RefreshCcw className="w-4 h-4" /> Restart
            </button>
          )}
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Portfolio
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!showGame ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Choose Your Game</h1>
                <p className="text-gray-400 text-lg">Experience classic board games with a modern twist.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Normal Mode Card */}
                <button
                  onClick={() => startGame('normal')}
                  className="group relative bg-white rounded-2xl p-8 text-left shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-indigo-100"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition text-6xl">
                    🎲
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-6">
                    M
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Classic Ludo</h3>
                  <p className="text-gray-500">The traditional game of strategy and luck. Play against our smart AI bot.</p>
                </button>

                {/* Snake Mode Card */}
                <button
                  onClick={() => startGame('snake')}
                  className="group relative bg-white rounded-2xl p-8 text-left shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-emerald-100"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition text-6xl">
                    🐍
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-6">
                    S
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Snake & Ludo</h3>
                  <p className="text-gray-500">A hybrid mode where snakes lurk on the board to catch you off guard.</p>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col lg:flex-row gap-8 items-center justify-center"
            >
              {/* Left Panel: Status */}
              <div className="w-full lg:w-72 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col gap-6 order-2 lg:order-1">
                <div className="text-center">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Current Turn</h2>
                  <div className={`text-2xl font-bold capitalize flex items-center justify-center gap-2
                     ${state.turn === 'red' ? 'text-red-500' : 'text-yellow-500'}`}
                  >
                    {state.turn === 'red' ? 'You' : 'Bot'}
                    {state.turn === 'yellow' && !state.diceRolled && <div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />}
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                <div className="flex flex-col items-center justify-center gap-6">
                   <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Dice</h2>
                   <Dice 
                     value={state.diceValue} 
                     rolling={false} 
                     disabled={state.turn !== 'red' || state.diceRolled || !!state.winner}
                     onRoll={handleRoll}
                   />
                   
                   {state.turn === 'red' && !state.diceRolled && !state.winner && (
                     <p className="text-sm text-gray-500 animate-pulse text-center">Click dice to roll</p>
                   )}
                   {state.turn === 'red' && state.diceRolled && !state.winner && getValidMoves().length > 0 && (
                     <p className="text-sm text-green-600 font-medium text-center">Select a token to move</p>
                   )}
                   {state.turn === 'red' && state.diceRolled && !state.winner && getValidMoves().length === 0 && (
                     <p className="text-sm text-red-500 text-center font-medium">No valid moves. Skipping turn...</p>
                   )}
                </div>
              </div>

              {/* Center: Board */}
              <div className="order-1 lg:order-2">
                 <LudoBoard 
                    gameState={state} 
                    validMoves={state.turn === 'red' && state.diceRolled ? getValidMoves() : []}
                    onTokenClick={(tokenId) => dispatch({ type: 'MOVE_TOKEN', payload: { tokenId } })}
                 />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Winner Overlay */}
      {state.winner && (
         <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0, y: 50 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl"
            >
               <div className="w-20 h-20 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
                 🏆
               </div>
               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                  {state.winner === 'red' ? 'You Won!' : 'Bot Won!'}
               </h2>
               <p className="text-gray-500 mb-8">What a fantastic game.</p>
               <button
                  onClick={() => dispatch({ type: 'RESET' })}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all hover:scale-105"
               >
                 Play Again
               </button>
            </motion.div>
         </div>
      )}
    </div>
  );
}
