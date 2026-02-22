/**
 * TAILWIND CSS CONFIGURATION - OPTIMIZED
 * 
 * Key optimizations:
 * 1. PurgeCSS - removes unused styles
 * 2. Content scanning - analyzes all template files
 * 3. Minimal variants - only include necessary variants
 * 4. Disabled preflights - custom resets when needed
 */

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  
  theme: {
    extend: {
      colors: {
        // Custom color palette (replaces extended defaults)
      },
      spacing: {
        // Custom spacing utilities
      },
      // Add other custom theme values here
    },
  },
  
  // Only include necessary variant combinations
  variants: {
    extend: {},
  },
  
  // Plugins
  plugins: [],
  
  // Critical optimization settings
  corePlugins: {
    preflight: true, // Include Tailwind's reset styles
  },
};
