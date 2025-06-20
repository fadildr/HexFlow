import { useRef, useEffect, memo, useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const throttle = <T extends (...args: Parameters<T>) => void>(
  func: T,
  limit: number
) => {
  let inThrottle: boolean;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * HexagonSvg Component
 *
 * A reusable hexagon SVG component with GSAP animations.
 * Optimized for performance with Next.js Image component.
 *
 * @param size - Optional size in pixels (default: 200x200)
 * @param onLoad - Callback fired when image loads
 * @param priority - Whether to prioritize loading (for above-the-fold content)
 * @param className - Additional CSS classes
 * @param aria-label - Accessibility label
 * @param disableAnimation - Disable animations (useful for reduced motion)
 *
 * @example
 * ```tsx
 * <HexagonSvg
 *   size={300}
 *   onLoad={() => console.log('Loaded!')}
 *   priority={true}
 *   className="custom-class"
 * />
 * ```
 */
interface HexagonSvgProps {
  size?: number;
  onLoad?: () => void;
  priority?: boolean;
  className?: string;
  'aria-label'?: string;
  disableAnimation?: boolean;
}

// Constants for better maintainability
const DEFAULT_DIMENSIONS = {
  width: 200,
  height: 200,
} as const;

export const HexagonSvg = memo<HexagonSvgProps>(
  ({
    size,
    onLoad,
    priority = false,
    className = '',
    'aria-label': ariaLabel = 'Hexagon background animation',
    disableAnimation = false,
  }) => {
    const hexagonRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    const [imageError, setImageError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Memoize size calculation
    const dimensions = useMemo(() => {
      if (size) {
        return { width: size, height: size };
      }
      return DEFAULT_DIMENSIONS;
    }, [size]);

    // Memoize style calculation untuk container
    const containerStyle = useMemo(
      () =>
        size
          ? { width: `${size}px`, height: `${size}px` }
          : { width: '100%', height: '100%' },
      [size]
    );

    // Check for reduced motion preference
    const prefersReducedMotion = useMemo(() => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    // Memoize onLoad callback
    const handleImageLoad = useCallback(() => {
      setIsLoaded(true);
      onLoad?.();
    }, [onLoad]);

    // Handle image error
    const handleImageError = useCallback(() => {
      setImageError(true);
      console.warn('Failed to load hexagon SVG');
    }, []);

    // Animation setup dengan kombinasi Glow + Pulse + Rotation 180° (Reduced Brightness)
    const setupAnimation = useCallback(() => {
      if (!hexagonRef.current || disableAnimation || prefersReducedMotion) {
        return;
      }

      try {
        // Cleanup previous animation
        if (animationRef.current) {
          animationRef.current.kill();
        }

        // Throttled animation update function
        const throttledUpdate = throttle(() => {
          // Create master timeline untuk kombinasi animasi
          const masterTl = gsap.timeline({ repeat: -1 });

          // Set initial state dengan rotasi 180 derajat dan brightness lebih rendah
          gsap.set(hexagonRef.current, {
            scale: 1,
            opacity: 0.7,
            rotation: 180,
            filter:
              'brightness(0.9) saturate(1) drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
          });

          // Pulse/Breathing Effect (lebih halus dan lambat)
          const pulseTl = gsap.timeline({ repeat: -1, yoyo: true });
          pulseTl.to(hexagonRef.current, {
            scale: 1.08,
            opacity: 0.95,
            duration: 4.5,
            ease: 'power1.inOut',
          });

          // Glow/Shimmer Effect (brightness dikurangi)
          const glowTl = gsap.timeline({ repeat: -1, yoyo: true });
          glowTl.to(hexagonRef.current, {
            filter:
              'brightness(1.1) saturate(1.1) drop-shadow(0 0 12px rgba(59, 130, 246, 0.3))',
            duration: 5.5,
            ease: 'power1.inOut',
          });

          // Shimmer highlight effect (brightness dikurangi)
          const shimmerTl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
          shimmerTl
            .to(hexagonRef.current, {
              filter:
                'brightness(1.15) saturate(1.15) drop-shadow(0 0 15px rgba(59, 130, 246, 0.35)) hue-rotate(3deg)',
              duration: 0.8,
              ease: 'power1.out',
            })
            .to(hexagonRef.current, {
              filter:
                'brightness(1.1) saturate(1.1) drop-shadow(0 0 12px rgba(59, 130, 246, 0.3))',
              duration: 0.8,
              ease: 'power1.in',
            });

          // Jalankan semua animasi bersamaan
          masterTl.add(pulseTl, 0).add(glowTl, 1).add(shimmerTl, 3);

          animationRef.current = masterTl;
        }, 100); // Throttle ke 100ms

        throttledUpdate();
      } catch (error) {
        console.error('Failed to setup GSAP animation:', error);
      }
    }, [disableAnimation, prefersReducedMotion]);

    // Effect for animation setup
    useEffect(() => {
      if (isLoaded) {
        setupAnimation();
      }

      // Cleanup function
      return () => {
        if (animationRef.current) {
          animationRef.current.kill();
        }
      };
    }, [isLoaded, setupAnimation]);

    // Error fallback
    if (imageError) {
      return (
        <div
          className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}
          style={containerStyle}
          role="img"
          aria-label="Hexagon image unavailable"
        >
          <span className="text-gray-500 text-sm">Image unavailable</span>
        </div>
      );
    }

    return (
      <div
        ref={hexagonRef}
        className={`relative hover:scale-110 transition-transform duration-300 ease-out flex items-center justify-center ${className}`}
        style={{
          ...containerStyle,
          willChange: 'transform, opacity, filter' // Memberitahu browser untuk mengoptimalkan properti ini
        }}
        role="img"
        aria-label={ariaLabel}
      >
        <Image
          src="/assets/hexagon.svg"
          alt={ariaLabel}
          width={dimensions.width}
          height={dimensions.height}
          className={`w-full h-full object-contain ${className}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          priority={priority}
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
        />
      </div>
    );
  }
);

// Set display name for better debugging
HexagonSvg.displayName = 'HexagonSvg';
