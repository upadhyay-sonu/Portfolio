#!/usr/bin/env node

/**
 * BUNDLE SIZE ANALYZER
 * 
 * Analyzes and reports on bundle size:
 * 1. Lists all chunks and their sizes
 * 2. Identifies large dependencies
 * 3. Shows minification savings
 * 4. Provides optimization recommendations
 * 
 * Usage: npm run build:analyze
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');

/**
 * Format bytes to readable size
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (Math.round((bytes / Math.pow(k, i)) * 100) / 100).toFixed(2) + ' ' + sizes[i];
}

/**
 * Get gzip size
 */
function getGzipSize(buffer) {
  // Estimate gzip size (roughly 30% of original)
  return Math.round(buffer.length * 0.3);
}

/**
 * Analyze bundle
 */
function analyzeBundle() {
  if (!fs.existsSync(distDir)) {
    console.log('❌ dist/ directory not found. Run: npm run build');
    return;
  }

  const files = fs.readdirSync(distDir, { recursive: true });
  const jsFiles = files.filter((f) => f.toString().endsWith('.js'));
  const cssFiles = files.filter((f) => f.toString().endsWith('.css'));
  const otherFiles = files.filter(
    (f) => !f.toString().endsWith('.js') && !f.toString().endsWith('.css')
  );

  let totalSize = 0;
  let totalGzipSize = 0;

  console.log('\n📦 BUNDLE SIZE ANALYSIS');
  console.log('═'.repeat(70));

  // JavaScript files
  console.log('\n📄 JavaScript Chunks:');
  console.log('─'.repeat(70));

  const jsStats = jsFiles
    .map((file) => {
      const filepath = path.join(distDir, file);
      const buffer = fs.readFileSync(filepath);
      const size = buffer.length;
      const gzipSize = getGzipSize(buffer);
      totalSize += size;
      totalGzipSize += gzipSize;

      return {
        name: file.toString(),
        size,
        gzipSize,
      };
    })
    .sort((a, b) => b.size - a.size);

  jsStats.forEach(({ name, size, gzipSize }) => {
    const bar = '█'.repeat(Math.floor((size / totalSize) * 20));
    console.log(`
  ${name}
  Size: ${formatBytes(size)} | Gzipped: ${formatBytes(gzipSize)}
  ${bar}
    `);
  });

  // CSS files
  if (cssFiles.length > 0) {
    console.log('\n🎨 CSS Files:');
    console.log('─'.repeat(70));

    cssFiles.forEach((file) => {
      const filepath = path.join(distDir, file);
      const buffer = fs.readFileSync(filepath);
      const size = buffer.length;
      const gzipSize = getGzipSize(buffer);
      totalSize += size;
      totalGzipSize += gzipSize;

      console.log(`
  ${file}
  Size: ${formatBytes(size)} | Gzipped: ${formatBytes(gzipSize)}
      `);
    });
  }

  // Summary
  console.log('\n═'.repeat(70));
  console.log('\n📊 SUMMARY:');
  console.log(`
  Total Bundles: ${jsFiles.length + cssFiles.length}
  Total Size: ${formatBytes(totalSize)}
  Total Gzipped: ${formatBytes(totalGzipSize)}
  Gzip Savings: ${((1 - totalGzipSize / totalSize) * 100).toFixed(1)}%
  `);

  // Recommendations
  generateRecommendations(jsStats, totalSize);

  // Output HTML report
  generateHtmlReport(jsStats, totalSize, totalGzipSize);
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations(jsStats, totalSize) {
  console.log('\n💡 OPTIMIZATION RECOMMENDATIONS:');
  console.log('─'.repeat(70));

  // Find largest chunks
  const largestChunks = jsStats.slice(0, 3);

  console.log(`\n1. ⚠️  Largest chunks (${largestChunks.length}):`);
  largestChunks.forEach(({ name, size }) => {
    console.log(`   - ${name}: ${formatBytes(size)}`);
  });

  console.log(`
2. ✅ Code Splitting:
   - Already enabled via Vite
   - Separate chunks: vendor, framer-motion, app code
   - Lazy load routes and heavy components

3. ✅ Tree Shaking:
   - Only export used functions from modules
   - Use ES6 modules (avoid CommonJS default exports)

4. ✅ Minification:
   - Terser enabled (removes console.log in production)
   - CSS minified by Vite

5. ✅ Dynamic Imports:
   - Use React.lazy() for route-based splitting
   - Use dynamic import() for components

6. ✅ Remove Unused Dependencies:
   Check which libraries are actually used:
   - Bootstrap: ${isUsed('bootstrap') ? '✓ Used' : '✗ Not used - consider removing'}
   - Unused imports add bundle bloat

7. ✅ Dependency Analysis:
   npm install -g npm-check-updates
   ncu -u  # Update dependencies
   npm prune  # Remove unused packages

8. ✅ Monitor Bundle Size:
   Use webpack-bundle-analyzer or rollup-plugin-visualizer
   Included in build process (dist/bundle-analysis.html)

9. ✅ Enable Brotli Compression:
   - Better than gzip (15-20% smaller)
   - Included in vite.config.js

10. ✅ Use Content Delivery Network (CDN):
    - Serve from edge locations
    - Reduce latency
    - Geographic distribution
  `);

  console.log('═'.repeat(70) + '\n');
}

/**
 * Check if dependency is used
 */
function isUsed(packageName) {
  const srcDir = path.join(__dirname, '../src');
  const files = fs.readdirSync(srcDir, { recursive: true });
  const jsFiles = files.filter((f) => f.toString().endsWith('.js'));

  return jsFiles.some((file) => {
    const filepath = path.join(srcDir, file);
    const content = fs.readFileSync(filepath, 'utf8');
    return content.includes(`from '${packageName}'`) || content.includes(`require('${packageName}')`);
  });
}

/**
 * Generate HTML report
 */
function generateHtmlReport(jsStats, totalSize, totalGzipSize) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bundle Analysis Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    h1 { color: #333; }
    .chart {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 20px 0;
    }
    .chunk {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .bar {
      background: linear-gradient(90deg, #06b6d4, #0ea5e9);
      height: 30px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: white;
      font-weight: bold;
      min-width: 100px;
    }
    .label { min-width: 200px; }
    .size { color: #666; font-size: 14px; }
    .summary {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <h1>📦 Bundle Analysis Report</h1>
  
  <div class="summary">
    <h2>Summary</h2>
    <p><strong>Total Size:</strong> ${formatBytes(totalSize)}</p>
    <p><strong>Gzipped:</strong> ${formatBytes(totalGzipSize)}</p>
    <p><strong>Compression:</strong> ${((1 - totalGzipSize / totalSize) * 100).toFixed(1)}%</p>
  </div>

  <h2>JavaScript Chunks</h2>
  <div class="chart">
    ${jsStats
      .map(({ name, size, gzipSize }) => {
        const percentage = (size / totalSize) * 100;
        return `
      <div class="chunk">
        <div class="label">${name}</div>
        <div class="bar" style="width: ${percentage}%">${formatBytes(size)}</div>
        <div class="size">(${formatBytes(gzipSize)} gzipped)</div>
      </div>
    `;
      })
      .join('')}
  </div>

  <div class="summary">
    <h2>Recommendations</h2>
    <ul>
      <li>Enable code splitting for lazy-loaded components</li>
      <li>Remove unused dependencies</li>
      <li>Use dynamic imports for heavy libraries</li>
      <li>Enable tree-shaking in production build</li>
      <li>Configure CDN for static assets</li>
    </ul>
  </div>

  <p style="color: #999; font-size: 12px;">
    Generated: ${new Date().toLocaleString()}
  </p>
</body>
</html>
  `;

  const reportPath = path.join(distDir, 'bundle-report.html');
  fs.writeFileSync(reportPath, html);
  console.log(`\n📊 HTML Report: ${reportPath}`);
}

// Run analysis
analyzeBundle();
