"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ImageIcon, AlertCircle, Loader2, Eye } from "lucide-react";
import { ImageProps } from "./Image.types";
import {
  imageVariants,
  imageSizes,
  imageFits,
  imagePositions,
  overlayPositions,
  shadowStyles,
  baseImageStyles,
  baseContainerStyles,
  overlayStyles,
  hoverOverlayStyles,
  clickableStyles,
  zoomStyles,
  zoomImageStyles,
  skeletonStyles,
  captionStyles,
  errorStateStyles,
  loadingSpinnerStyles,
  progressiveImageStyles,
  progressiveImageLoadedStyles,
  imageAnimations,
  fadeInAnimation,
  slideInAnimation,
  zoomInAnimation,
  shimmerAnimation,
} from "./Image.styles";
import { cn } from "../utils/cn";

// Helper function to convert number to px string
const toPx = (value: number | string): string => {
  return typeof value === "number" ? `${value}px` : value;
};

// Helper function to detect WebP support
const supportsWebP = (): boolean => {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
};

// Helper function to optimize image URL
const optimizeImageUrl = (
  src: string,
  width?: number | string,
  height?: number | string,
  quality = 75,
  useWebP = true
): string => {
  // This is a placeholder for image optimization logic
  // In a real implementation, you'd integrate with services like:
  // - Cloudinary
  // - ImageKit
  // - Next.js Image Optimization
  // - Custom CDN with query parameters

  if (src.includes("unsplash.com") || src.includes("pexels.com")) {
    const url = new URL(src);
    if (width) url.searchParams.set("w", String(width));
    if (height) url.searchParams.set("h", String(height));
    if (quality !== 75) url.searchParams.set("q", String(quality));
    if (useWebP && supportsWebP()) url.searchParams.set("fm", "webp");
    return url.toString();
  }

  return src;
};

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  radius,
  transparency = 1,
  overlayTransparency = 0,
  overlayColor,
  shadow,
  fit = "cover",
  position = "center",
  variant = "default",
  size,
  loading = "lazy",
  placeholder,
  fallback,
  fallbackSrc,
  withSkeleton = true,
  skeletonColor,
  overlay,
  overlayPosition = "center",
  overlayOnHover = false,
  caption,
  clickable = false,
  zoomOnHover = false,
  zoomScale = 1.1,
  blur,
  brightness = 1,
  contrast = 1,
  saturation = 1,
  grayscale = 0,
  sepia = 0,
  hueRotate = 0,
  invert = 0,
  progressive = false,
  placeholderSrc,
  onLoad,
  onError,
  onClick,
  styles,
  preload = false,
  srcSet,
  sizes,
  useWebP = true,
  quality = 75,
  optimize = true,
  className,
  style,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(!loading || loading === "eager");
  const [progressiveLoaded, setProgressiveLoaded] = useState(!progressive);

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === "eager" || isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading, isInView]);

  // Preload image
  useEffect(() => {
    if (preload && src) {
      const img = new window.Image();
      img.src = optimize
        ? optimizeImageUrl(src, width, height, quality, useWebP)
        : src;
    }
  }, [preload, src, width, height, quality, useWebP, optimize]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
    onLoad?.();

    // Handle progressive loading
    if (progressive) {
      setTimeout(() => setProgressiveLoaded(true), 100);
    }
  }, [onLoad, progressive]);

  // Handle image error
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
    onError?.();
  }, [onError]);

  // Handle click
  const handleClick = useCallback(() => {
    if (clickable && onClick) {
      onClick();
    }
  }, [clickable, onClick]);

  // Generate filter styles
  const getFilterStyles = (): string => {
    const filters: string[] = [];

    if (blur) filters.push(`blur(${blur}px)`);
    if (brightness !== 1) filters.push(`brightness(${brightness})`);
    if (contrast !== 1) filters.push(`contrast(${contrast})`);
    if (saturation !== 1) filters.push(`saturate(${saturation})`);
    if (grayscale > 0) filters.push(`grayscale(${grayscale})`);
    if (sepia > 0) filters.push(`sepia(${sepia})`);
    if (hueRotate !== 0) filters.push(`hue-rotate(${hueRotate}deg)`);
    if (invert > 0) filters.push(`invert(${invert})`);

    return filters.length > 0 ? filters.join(" ") : "";
  };

  // Generate shadow class
  const getShadowClass = (): string => {
    if (!shadow) return "";
    if (typeof shadow === "boolean") return shadowStyles.md;
    if (typeof shadow === "string" && shadow in shadowStyles) {
      return shadowStyles[shadow as keyof typeof shadowStyles];
    }
    return "";
  };

  // Get optimized image source
  const getImageSrc = (): string => {
    if (!optimize) return src;
    return optimizeImageUrl(src, width, height, quality, useWebP);
  };

  // Get placeholder image source
  const getPlaceholderSrc = (): string => {
    if (!placeholderSrc) return "";
    if (!optimize) return placeholderSrc;
    return optimizeImageUrl(placeholderSrc, width, height, 10, useWebP);
  };

  const variantStyles = imageVariants[variant];
  const sizeStyles = size ? imageSizes[size] : null;
  const fitClass = imageFits[fit];
  const positionClass = imagePositions[position];
  const overlayPositionClass = overlayPositions[overlayPosition];
  const shadowClass = getShadowClass();
  const filterStyle = getFilterStyles();

  // Container styles
  const containerClasses = cn(
    baseContainerStyles,
    variantStyles.container,
    sizeStyles?.container,
    shadowClass,
    {
      [clickableStyles]: clickable,
      [zoomStyles]: zoomOnHover,
    },
    styles?.container,
    className
  );

  // Image styles
  const imageClasses = cn(
    baseImageStyles,
    variantStyles.image,
    fitClass,
    positionClass,
    {
      [zoomImageStyles]: zoomOnHover,
      [progressiveImageStyles]: progressive && !progressiveLoaded,
      [progressiveImageLoadedStyles]: progressive && progressiveLoaded,
      [fadeInAnimation]: imageLoaded,
    },
    styles?.image
  );

  // Overlay styles
  const overlayClasses = cn(
    overlayStyles,
    overlayPositionClass,
    {
      [hoverOverlayStyles]: overlayOnHover,
    },
    styles?.overlay
  );

  // Container inline styles
  const containerStyle: React.CSSProperties = {
    width: width ? toPx(width) : undefined,
    height: height ? toPx(height) : undefined,
    borderRadius: radius ? toPx(radius) : undefined,
    opacity: transparency,
    ...style,
  };

  // Image inline styles
  const imageStyle: React.CSSProperties = {
    filter: filterStyle || undefined,
    transform: zoomOnHover ? undefined : `scale(${zoomScale})`,
  };

  // Overlay inline styles
  const overlayBackgroundStyle: React.CSSProperties = {
    backgroundColor: overlayColor || "transparent",
    opacity: overlayTransparency,
  };

  // Render skeleton
  const renderSkeleton = () => {
    if (!withSkeleton) return null;

    return (
      <div
        className={cn(skeletonStyles, styles?.skeleton)}
        style={{
          backgroundColor: skeletonColor || undefined,
          width: width ? toPx(width) : "100%",
          height: height ? toPx(height) : "100%",
          borderRadius: radius ? toPx(radius) : undefined,
        }}
      >
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
    );
  };

  // Render error state
  const renderError = () => {
    if (fallback) return fallback;

    return (
      <div
        className={cn(errorStateStyles, styles?.skeleton)}
        style={{
          width: width ? toPx(width) : "100%",
          height: height ? toPx(height) : "100%",
          borderRadius: radius ? toPx(radius) : undefined,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-500">Failed to load</span>
        </div>
      </div>
    );
  };

  // Render placeholder
  const renderPlaceholder = () => {
    if (placeholder) return placeholder;
    return renderSkeleton();
  };

  // Main image element
  const renderImage = () => {
    const imageSrc = getImageSrc();
    const placeholderImageSrc = getPlaceholderSrc();

    return (
      <>
        {/* Progressive placeholder */}
        {progressive && placeholderImageSrc && !progressiveLoaded && (
          <img
            src={placeholderImageSrc}
            alt=""
            className={cn(imageClasses, "absolute inset-0")}
            style={imageStyle}
            aria-hidden="true"
          />
        )}

        {/* Main image */}
        <img
          ref={imageRef}
          src={imageSrc}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          loading={loading}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={imageClasses}
          style={imageStyle}
          {...props}
        />
      </>
    );
  };

  // Render overlay
  const renderOverlay = () => {
    if (!overlay && !overlayColor) return null;

    return (
      <div className={overlayClasses}>
        {/* Color overlay */}
        {overlayColor && (
          <div className="absolute inset-0" style={overlayBackgroundStyle} />
        )}

        {/* Content overlay */}
        {overlay && <div className="relative z-10">{overlay}</div>}
      </div>
    );
  };

  return (
    <div className="inline-block">
      {/* Image Container */}
      <div
        ref={containerRef}
        className={containerClasses}
        style={containerStyle}
        onClick={handleClick}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={
          clickable
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick();
                }
              }
            : undefined
        }
      >
        {/* Loading State */}
        {!isInView && renderPlaceholder()}

        {/* Error State */}
        {isInView && imageError && !fallbackSrc && renderError()}

        {/* Fallback Image */}
        {isInView && imageError && fallbackSrc && (
          <img
            src={fallbackSrc}
            alt={alt}
            className={imageClasses}
            style={imageStyle}
            onError={() => setImageError(true)}
          />
        )}

        {/* Loading Skeleton */}
        {isInView && !imageLoaded && !imageError && renderPlaceholder()}

        {/* Main Image */}
        {isInView && !imageError && renderImage()}

        {/* Overlay */}
        {renderOverlay()}

        {/* Loading Indicator */}
        {isInView && !imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className={cn(loadingSpinnerStyles, "w-6 h-6")} />
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <div
          className={cn(captionStyles, sizeStyles?.caption, styles?.caption)}
        >
          {caption}
        </div>
      )}

      <style>{`
        ${imageAnimations}
      `}</style>
    </div>
  );
};

Image.displayName = "Image";
