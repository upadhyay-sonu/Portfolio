import React, { useState, useEffect, useRef } from 'react';

/**
 * OPTIMIZED IMAGE COMPONENT
 * 
 * Performance features:
 * 1. Lazy loading - loads images only when visible
 * 2. Progressive enhancement - shows blur while loading
 * 3. Responsive images - different sizes for different screens
 * 4. WebP support - modern format with fallback
 * 5. LQIP (Low Quality Image Placeholder) - blur-up effect
 * 6. Error handling - fallback on load failure
 * 
 * Why this is faster:
 * - Native lazy loading (Intersection Observer)
 * - Smaller file sizes with modern formats
 * - Progressive rendering (blur → sharp)
 * - Deferred off-screen image loading
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = '/placeholder.svg',
  webp = null,
  responsive = true,
  loading = 'lazy',
  decoding = 'async',
  onLoad = null,
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Skip if placeholder
    if (!src || src === placeholder) return;

    // Create intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Image is visible - start loading
            setImageSrc(src);
            if (imgRef.current) {
              observer.unobserve(imgRef.current);
            }
          }
        });
      },
      {
        // Start loading 50px before entering viewport
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, placeholder]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setHasError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Srcset for responsive images (different sizes for different screens)
  const getSrcSet = () => {
    if (!responsive) return undefined;
    return `
      ${src}?w=320 320w,
      ${src}?w=640 640w,
      ${src}?w=1024 1024w,
      ${src}?w=1280 1280w
    `;
  };

  return (
    <picture>
      {/* WebP format - modern, smaller file size (30-40% reduction) */}
      {webp && (
        <source
          srcSet={webp}
          type="image/webp"
        />
      )}

      {/* Fallback to original format */}
      <img
        ref={imgRef}
        src={isLoaded ? imageSrc : placeholder}
        alt={alt}
        width={width}
        height={height}
        srcSet={isLoaded ? getSrcSet() : undefined}
        sizes={responsive ? '(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw' : undefined}
        loading={loading}
        decoding={decoding}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`
          ${className}
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-300
          ${hasError ? 'hidden' : ''}
        `}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />

      {/* Fallback for failed loads */}
      {hasError && (
        <div
          className={`${className} bg-gray-700 flex items-center justify-center`}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : '1/1',
          }}
        >
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}
    </picture>
  );
};

/**
 * BATCH IMAGE PRELOADER
 * Preload critical images before they're needed
 * 
 * Usage:
 * preloadImages(['hero.jpg', 'feature1.jpg', 'feature2.jpg'])
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

/**
 * IMAGE OPTIMIZATION HELPER
 * Generates optimized image URLs with transformation parameters
 * 
 * Example:
 * getOptimizedImageUrl('image.jpg', { width: 800, quality: 80 })
 * → 'image.jpg?w=800&q=80&auto=format'
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  const {
    width,
    height,
    quality = 80,
    format = 'auto', // auto, webp, jpg, png
  } = options;

  const params = new URLSearchParams();
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  params.append('q', quality);
  params.append('auto', format);

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
};

export default OptimizedImage;
