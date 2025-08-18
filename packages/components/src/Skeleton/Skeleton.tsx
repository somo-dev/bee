import React, { useState, useEffect, useMemo } from "react";
import { SkeletonProps } from "./Skeleton.types";
import {
  skeletonVariants,
  skeletonSizes,
  baseSkeletonStyles,
  shimmerStyles,
  contentWrapperStyles,
  skeletonAnimations_keyframes,
  waveAnimationLTR,
  waveAnimationRTL,
  waveAnimationTTB,
  waveAnimationBTT,
  fadeInAnimation,
} from "./Skeleton.styles";
import { cn } from "../utils/cn";

// Helper function to convert value to CSS unit
const toCSSUnit = (value: number | string): string => {
  if (typeof value === "number") return `${value}px`;
  return value;
};

// Helper function to get random width for last line
const getLastLineWidth = (lastLineWidth: number | string | boolean): string => {
  if (typeof lastLineWidth === "boolean") {
    return lastLineWidth ? "75%" : "100%";
  }
  return toCSSUnit(lastLineWidth);
};

export const Skeleton: React.FC<SkeletonProps> = ({
  loading = true,
  children,
  width,
  height,
  variant = "rectangular",
  animation = "wave",
  size,
  radius,
  baseColor = "#f3f4f6",
  highlightColor = "#ffffff",
  duration = 1.5,
  delay = 0,
  lines = 1,
  lastLineWidth = true,
  lineSpacing = 8,
  fadeIn = true,
  fadeInDuration = 300,
  skeletonStyle,
  contentStyle,
  aspectRatio,
  visible = true,
  direction = "ltr",
  inline = false,
  onLoadingChange,
  className,
  style,
  ...props
}) => {
  const [isContentVisible, setIsContentVisible] = useState(!loading);
  const [shouldShowContent, setShouldShowContent] = useState(!loading);

  // Handle loading state changes
  useEffect(() => {
    if (loading !== undefined) {
      onLoadingChange?.(loading);

      if (!loading && fadeIn) {
        // Start fade in transition
        setTimeout(() => {
          setIsContentVisible(true);
        }, 50);

        setTimeout(() => {
          setShouldShowContent(true);
        }, fadeInDuration);
      } else if (!loading) {
        setIsContentVisible(true);
        setShouldShowContent(true);
      } else {
        setIsContentVisible(false);
        setShouldShowContent(false);
      }
    }
  }, [loading, fadeIn, fadeInDuration, onLoadingChange]);

  // Get size-based dimensions
  const sizeStyles = useMemo(() => {
    if (!size) return null;
    return skeletonSizes[size][variant];
  }, [size, variant]);

  // Calculate dimensions
  const dimensions = useMemo(() => {
    let finalWidth = width || sizeStyles?.width || "100%";
    let finalHeight = height || sizeStyles?.height || "20px";

    // Handle aspect ratio
    if (aspectRatio && width && !height) {
      const widthValue = typeof width === "string" ? parseInt(width) : width;
      finalHeight = `${widthValue / aspectRatio}px`;
    }

    return {
      width: toCSSUnit(finalWidth),
      height: toCSSUnit(finalHeight),
    };
  }, [width, height, sizeStyles, aspectRatio]);

  // Generate shimmer animation class
  const getShimmerAnimation = () => {
    switch (direction) {
      case "rtl":
        return waveAnimationRTL;
      case "ttb":
        return waveAnimationTTB;
      case "btt":
        return waveAnimationBTT;
      default:
        return waveAnimationLTR;
    }
  };

  // Generate skeleton styles
  const skeletonClasses = cn(
    baseSkeletonStyles,
    skeletonVariants[variant],
    animation === "pulse" && "animate-pulse",
    {
      "inline-block": inline,
      block: !inline,
    },
    className
  );

  const skeletonInlineStyles: React.CSSProperties = {
    backgroundColor: baseColor,
    borderRadius: radius ? toCSSUnit(radius) : undefined,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    ...dimensions,
    ...skeletonStyle,
    ...style,
  };

  const shimmerInlineStyles: React.CSSProperties = {
    background: `linear-gradient(90deg, transparent, ${highlightColor}, transparent)`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };

  const contentWrapperInlineStyles: React.CSSProperties = {
    opacity: isContentVisible ? 1 : 0,
    animationDuration: `${fadeInDuration}ms`,
    ...contentStyle,
  };

  // Render single skeleton
  const renderSkeleton = () => (
    <div className={skeletonClasses} style={skeletonInlineStyles} {...props}>
      {animation === "wave" && (
        <div
          className={cn(shimmerStyles, getShimmerAnimation())}
          style={shimmerInlineStyles}
        />
      )}
    </div>
  );

  // Render multiple skeleton lines (for text variant)
  const renderSkeletonLines = () => {
    const skeletonLines = [];

    for (let i = 0; i < lines; i++) {
      const isLastLine = i === lines - 1;
      const lineWidth =
        isLastLine && lines > 1
          ? getLastLineWidth(lastLineWidth)
          : dimensions.width;

      skeletonLines.push(
        <div
          key={i}
          className={skeletonClasses}
          style={{
            ...skeletonInlineStyles,
            width: lineWidth,
            marginBottom: i < lines - 1 ? `${lineSpacing}px` : 0,
            animationDelay: `${delay + i * 0.1}s`,
          }}
        >
          {animation === "wave" && (
            <div
              className={cn(shimmerStyles, getShimmerAnimation())}
              style={{
                ...shimmerInlineStyles,
                animationDelay: `${delay + i * 0.1}s`,
              }}
            />
          )}
        </div>
      );
    }

    return (
      <div className={inline ? "inline-block" : "block"}>{skeletonLines}</div>
    );
  };

  // Don't render if not visible
  if (!visible) return null;

  // Show content if not loading
  if (!loading && shouldShowContent) {
    return (
      <div
        className={cn(
          contentWrapperStyles,
          fadeIn && isContentVisible && fadeInAnimation
        )}
        style={contentWrapperInlineStyles}
      >
        {children}
        <style>{`
          ${skeletonAnimations_keyframes}
        `}</style>
      </div>
    );
  }

  // Show skeleton
  return (
    <>
      {variant === "text" && lines > 1
        ? renderSkeletonLines()
        : renderSkeleton()}
      <style>{`
        ${skeletonAnimations_keyframes}
      `}</style>
    </>
  );
};

Skeleton.displayName = "Skeleton";
