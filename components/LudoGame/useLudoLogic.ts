import { useReducer, useEffect } from 'react';
import { PlayerColor, TokenState, GameState, START_INDICES, SAFE_INDICES } from './LudoConstants';

export type GameAction =
  | { type: 'ROLL_DICE'; payload: number }
  | { type: 'MOVE_TOKEN'; payload: { tokenId: string } }
  | { type: 'NEXT_TURN' }
  | { type: 'SET_MODE'; payload: 'normal' | 'snake' }
  | { type: 'RESET' };

const SNAKES: Record<number, number> = {
  // mapped globally on ROUTE indices
  15: 5,
  30: 10,
  45: 25,
};

const initialTokens: TokenState[] = [
  { id: 'red-0', color: 'red', position: -1, isHome: false },
  { id: 'red-1', color: 'red', position: -1, isHome: false },
  { id: 'red-2', color: 'red', position: -1, isHome: false },
  { id: 'red-3', color: 'red', position: -1, isHome: false },
  { id: 'yellow-0', color: 'yellow', position: -1, isHome: false },
  { id: 'yellow-1', color: 'yellow', position: -1, isHome: false },
  { id: 'yellow-2', color: 'yellow', position: -1, isHome: false },
  { id: 'yellow-3', color: 'yellow', position: -1, isHome: false },
];

const initialState: GameState = {
  tokens: initialTokens,
  turn: 'red',
  diceValue: 1,
  diceRolled: false,
  winner: null,
  mode: 'normal',
};

function checkWin(tokens: TokenState[], color: PlayerColor) {
  return tokens.filter((t) => t.color === color && t.isHome).length === 4;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...initialState, mode: action.payload };

    case 'RESET':
      return { ...initialState, mode: state.mode };

    case 'ROLL_DICE':
      if (state.diceRolled || state.winner) return state;
      return { ...state, diceValue: action.payload, diceRolled: true };

    case 'MOVE_TOKEN': {
      if (!state.diceRolled || state.winner) return state;

      const token = state.tokens.find((t) => t.id === action.payload.tokenId);
      if (!token || token.color !== state.turn || token.isHome) return state;

      // Unlocking from base
      if (token.position === -1) {
        if (state.diceValue === 6) {
          const newTokens = state.tokens.map((t) =>
            t.id === token.id ? { ...t, position: START_INDICES[token.color] } : t
          );
          return { ...state, tokens: newTokens, diceRolled: false }; // get another turn
        }
        return state;
      }

      // Moving token
      let currentPos = token.position;
      let isHome = false;
      let newPos = currentPos;

      // Normal path movement logic
      if (currentPos < 100) {
        const startIdx = START_INDICES[token.color];
        
        // Calculate logical progression
        // Red start is 0, ends around 50 to enter home stretch
        // Yellow start is 26, ends around 24 to enter home stretch
        
        const offsetFromStart = (currentPos - startIdx + 52) % 52;
        
        if (offsetFromStart + state.diceValue > 50) {
          // Enter home stretch (100+)
          const homeStepsIn = (offsetFromStart + state.diceValue) - 51;
          if (homeStepsIn < 6) {
             newPos = 100 + homeStepsIn; // 100 is start of home stretch
          } else if (homeStepsIn === 6) { // Final home tile is exactly 6 steps in
             newPos = 106;
             isHome = true;
          } else {
            return state; // Overshot home, invalid move
          }
        } else {
          newPos = (currentPos + state.diceValue) % 52;
        }
      } else {
        // Already in home stretch
        const homeStepsIn = state.diceValue + (currentPos - 100);
        if (homeStepsIn < 6) {
          newPos = 100 + homeStepsIn;
        } else if (homeStepsIn === 6) {
          newPos = 106;
          isHome = true;
        } else {
          return state; // Overshot
        }
      }

      // Snake Mode overrides
      if (state.mode === 'snake' && newPos < 100 && SNAKES[newPos] !== undefined) {
        newPos = SNAKES[newPos];
      }

      // Check kills
      let killedSomething = false;
      let nextTokens = state.tokens.map((t) => {
        if (t.id === token.id) return { ...t, position: newPos, isHome };
        
        // if another token is at same path position and not safe, kill it
        if (!isHome && newPos < 100 && t.position === newPos && t.color !== token.color) {
           if (!SAFE_INDICES.includes(newPos)) {
              killedSomething = true;
              return { ...t, position: -1 };
           }
        }
        return t;
      });

      const hasWon = checkWin(nextTokens, state.turn);
      if (hasWon) {
        return { ...state, tokens: nextTokens, winner: state.turn };
      }

      // If we killed a token, reached home safely, or rolled a 6 we get another turn
      if (killedSomething || isHome || state.diceValue === 6) {
        return { ...state, tokens: nextTokens, diceRolled: false };
      }

      // Next turn
      return { ...state, tokens: nextTokens, turn: state.turn === 'red' ? 'yellow' : 'red', diceRolled: false };
    }

    case 'NEXT_TURN':
      return { ...state, turn: state.turn === 'red' ? 'yellow' : 'red', diceRolled: false };

    default:
      return state;
  }
}

export function useLudoGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Helper to check if any valid moves exist
  const getValidMoves = () => {
    return state.tokens.filter((t) => {
      if (t.color !== state.turn || t.isHome) return false;
      if (t.position === -1 && state.diceValue !== 6) return false;
      if (t.position >= 100) {
        const homeStepsIn = state.diceValue + (t.position - 100);
        if (homeStepsIn > 6) return false;
      }
      return true;
    });
  };

  // Bot Logic
  useEffect(() => {
    if (state.turn === 'yellow' && !state.winner) {
      if (!state.diceRolled) {
        // Roll dice
        const timer = setTimeout(() => {
          const val = Math.floor(Math.random() * 6) + 1;
          dispatch({ type: 'ROLL_DICE', payload: val });
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        // Move token
        const timer = setTimeout(() => {
          const validMoves = getValidMoves();
          
          if (validMoves.length === 0) {
            dispatch({ type: 'NEXT_TURN' });
            return;
          }

          // Very simple AI: prioritize opening tokens -> killing -> reaching home -> moving furthest
          let chosen = validMoves[0];
          
          // Try to kill
          for(const t of validMoves) {
             if (t.position === -1 && state.diceValue === 6) continue;
             let fakeNewPos = t.position < 100 ? (t.position + state.diceValue) % 52 : t.position;
             if (fakeNewPos < 100 && !SAFE_INDICES.includes(fakeNewPos)) {
                 if (state.tokens.some(x => x.color === 'red' && x.position === fakeNewPos)) {
                     chosen = t;
                     break;
                 }
             }
          }

          // If no kill found, just unlock if we can
          if (validMoves.some(t => t.position === -1)) {
            chosen = validMoves.find(t => t.position === -1)!;
          }

          dispatch({ type: 'MOVE_TOKEN', payload: { tokenId: chosen.id } });

        }, 1200);
        return () => clearTimeout(timer);
      }
    } else if (state.turn === 'red' && !state.winner && state.diceRolled) {
      // Auto skip for user if no valid moves
      const validMoves = getValidMoves();
      if (validMoves.length === 0) {
        const timer = setTimeout(() => {
          dispatch({ type: 'NEXT_TURN' });
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
    return undefined;
  }, [state.turn, state.diceRolled, state.winner]);

  return { state, dispatch, getValidMoves };
}
