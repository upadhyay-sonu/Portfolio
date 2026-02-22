/**
 * POSTCSS CONFIGURATION FOR OPTIMIZED CSS
 * 
 * Plugins:
 * 1. tailwindcss - utility-first CSS framework
 * 2. autoprefixer - adds vendor prefixes
 * 3. postcss-import - optimizes @import statements
 * 4. postcss-nesting - enables CSS nesting
 */

export default {
  plugins: {
    // Process Tailwind CSS
    tailwindcss: {
      // Content paths for purging unused styles
      content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
      ],
      // Theme customization
      theme: {
        extend: {
          // Add custom utilities if needed
        },
      },
      // Plugins
      plugins: [],
      // Critical for optimization: only include used styles
      safelist: [],
    },
    // Add vendor prefixes automatically
    autoprefixer: {
      overrideBrowserslist: ['>0.5%', 'last 2 versions', 'not dead'],
      add: true,
      remove: true,
    },
    // Optimize imports
    'postcss-import': {},
    // Enable CSS nesting
    'postcss-nesting': {},
  },
};
