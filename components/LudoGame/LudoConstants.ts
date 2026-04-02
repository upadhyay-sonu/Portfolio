export const ROUTE = [
  // Red side top
  { c: 1, r: 6 }, { c: 2, r: 6 }, { c: 3, r: 6 }, { c: 4, r: 6 }, { c: 5, r: 6 },
  // Green side left
  { c: 6, r: 5 }, { c: 6, r: 4 }, { c: 6, r: 3 }, { c: 6, r: 2 }, { c: 6, r: 1 }, { c: 6, r: 0 },
  // Green side top & right
  { c: 7, r: 0 }, { c: 8, r: 0 },
  // Green side right down
  { c: 8, r: 1 }, { c: 8, r: 2 }, { c: 8, r: 3 }, { c: 8, r: 4 }, { c: 8, r: 5 },
  // Yellow side top
  { c: 9, r: 6 }, { c: 10, r: 6 }, { c: 11, r: 6 }, { c: 12, r: 6 }, { c: 13, r: 6 }, { c: 14, r: 6 },
  // Yellow side right
  { c: 14, r: 7 }, { c: 14, r: 8 },
  // Yellow side bottom
  { c: 13, r: 8 }, { c: 12, r: 8 }, { c: 11, r: 8 }, { c: 10, r: 8 }, { c: 9, r: 8 },
  // Blue side right down
  { c: 8, r: 9 }, { c: 8, r: 10 }, { c: 8, r: 11 }, { c: 8, r: 12 }, { c: 8, r: 13 }, { c: 8, r: 14 },
  // Blue side bottom & left
  { c: 7, r: 14 }, { c: 6, r: 14 },
  // Blue side left up
  { c: 6, r: 13 }, { c: 6, r: 12 }, { c: 6, r: 11 }, { c: 6, r: 10 }, { c: 6, r: 9 },
  // Red side bottom left
  { c: 5, r: 8 }, { c: 4, r: 8 }, { c: 3, r: 8 }, { c: 2, r: 8 }, { c: 1, r: 8 }, { c: 0, r: 8 },
  // Red side left up
  { c: 0, r: 7 }, { c: 0, r: 6 },
];

export const HOME_STRETCHES = {
  red: [
    { c: 1, r: 7 }, { c: 2, r: 7 }, { c: 3, r: 7 }, { c: 4, r: 7 }, { c: 5, r: 7 }, { c: 6, r: 7 }
  ],
  yellow: [
    { c: 13, r: 7 }, { c: 12, r: 7 }, { c: 11, r: 7 }, { c: 10, r: 7 }, { c: 9, r: 7 }, { c: 8, r: 7 }
  ],
};

// Array indices in ROUTE where bases start
export const START_INDICES = {
  red: 0,
  yellow: 26,
};

// Safe zones logic
export const SAFE_INDICES = [0, 8, 13, 21, 26, 34, 39, 47];

export const BASES = {
  red: [{ c: 2, r: 2 }, { c: 3, r: 2 }, { c: 2, r: 3 }, { c: 3, r: 3 }],
  green: [{ c: 11, r: 2 }, { c: 12, r: 2 }, { c: 11, r: 3 }, { c: 12, r: 3 }],
  yellow: [{ c: 11, r: 11 }, { c: 12, r: 11 }, { c: 11, r: 12 }, { c: 12, r: 12 }],
  blue: [{ c: 2, r: 11 }, { c: 3, r: 11 }, { c: 2, r: 12 }, { c: 3, r: 12 }],
};

export type PlayerColor = 'red' | 'yellow';

export interface TokenState {
  id: string;
  color: PlayerColor;
  position: number; // -1 means in base. 0-51 path. 100+ home stretch
  isHome: boolean;
}

export interface GameState {
  tokens: TokenState[];
  turn: PlayerColor;
  diceValue: number;
  diceRolled: boolean;
  winner: PlayerColor | null;
  mode: 'normal' | 'snake';
}
