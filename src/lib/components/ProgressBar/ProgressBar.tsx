import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { ProgressBarProps } from "./ProgressBar.types";
import {
  progressBarVariants,
  progressBarSizes,
  baseProgressBarStyles,
  trackStyles,
  fillStyles,
  stripedStyles,
  animatedStripesStyles,
  labelStyles,
  insideLabelStyles,
  outsideLabelStyles,
  glowStyles,
  pulseStyles,
  indeterminateStyles,
  loadingStyles,
  disabledStyles,
  progressBarAnimations,
  stripedAnimation,
  pulseAnimation,
  indeterminateAnimation,
  loadingAnimation,
  glowAnimation,
} from "./ProgressBar.styles";
import { cn } from "../../utils/cn";

// Helper function to clamp value between min and max
const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Helper function to calculate percentage
const calculatePercentage = (
  value: number,
  min: number,
  max: number
): number => {
  const clampedValue = clamp(value, min, max);
  return ((clampedValue - min) / (max - min)) * 100;
};

// Default formatters
const defaultPercentageFormatter = (value: number, max: number): string => {
  const percentage = calculatePercentage(value, 0, max);
  return `${Math.round(percentage)}%`;
};

const defaultValueFormatter = (value: number, max: number): string => {
  return `${value}/${max}`;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  min = 0,
  size = "md",
  variant = "default",
  color,
  trackColor,
  striped = false,
  animated = false,
  radius,
  disabled = false,
  label,
  labelPosition = "inside",
  showPercentage = false,
  formatPercentage = defaultPercentageFormatter,
  showValue = false,
  formatValue = defaultValueFormatter,
  transitionDuration = 300,
  smoothTransition = true,
  gradientColors,
  pulseOnComplete = false,
  onComplete,
  onValueChange,
  styles,
  glow = false,
  thickness,
  indeterminate = false,
  ariaLabel,
  loading = false,
  className,
  style,
  ...props
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const previousValueRef = useRef<number>(value);
  const hasCompletedRef = useRef<boolean>(false);

  // Calculate percentage
  const percentage = useMemo(() => {
    if (indeterminate) return 0;
    return calculatePercentage(value, min, max);
  }, [value, min, max, indeterminate]);

  // Check if progress is complete
  const isComplete = useMemo(() => {
    return !indeterminate && value >= max;
  }, [value, max, indeterminate]);

  // Handle completion callback
  useEffect(() => {
    if (isComplete && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete?.();
    } else if (!isComplete) {
      hasCompletedRef.current = false;
    }
  }, [isComplete, onComplete]);

  // Handle value change callback
  useEffect(() => {
    if (previousValueRef.current !== value) {
      onValueChange?.(value, percentage);
      previousValueRef.current = value;
    }
  }, [value, percentage, onValueChange]);

  // Generate custom styles when color prop is provided
  const getCustomStyles = (isGlow = false): React.CSSProperties => {
    const customStyles: React.CSSProperties = {};

    if (color) {
      if (variant === "gradient" && gradientColors) {
        customStyles.background = `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`;
      } else {
        customStyles.backgroundColor = color;
      }
    }

    if (trackColor) {
      (customStyles as any)["--track-color"] = trackColor;
    }

    if (thickness) {
      customStyles.height = `${thickness}px`;
    }

    if (radius !== undefined) {
      customStyles.borderRadius = `${radius}px`;
    }

    if (isGlow && color) {
      customStyles.filter = `drop-shadow(0 0 8px ${color}66) drop-shadow(0 0 16px ${color}33)`;
    }

    if (!smoothTransition) {
      customStyles.transition = "none";
    } else if (transitionDuration !== 300) {
      customStyles.transitionDuration = `${transitionDuration}ms`;
    }

    return customStyles;
  };

  // Get text size based on thickness or size
  const getTextSize = (): string => {
    if (thickness) {
      if (thickness <= 8) return "text-xs";
      if (thickness <= 12) return "text-sm";
      if (thickness <= 20) return "text-base";
      return "text-lg";
    }
    return sizeStyles.text;
  };

  // Generate fill width
  const getFillWidth = (): string => {
    if (indeterminate) return "30%";
    return `${percentage}%`;
  };

  // Generate display text
  const getDisplayText = (): string => {
    if (label) return String(label);
    if (showPercentage) return formatPercentage(value, max);
    if (showValue) return formatValue(value, max);
    return "";
  };

  const styles_variant = progressBarVariants[variant];
  const sizeStyles = progressBarSizes[size];

  // Build container classes
  const containerClasses = cn(
    baseProgressBarStyles,
    styles_variant.container,
    sizeStyles.container,
    {
      [disabledStyles]: disabled,
      [glowStyles]: glow && !disabled,
      [pulseStyles]: pulseOnComplete && isComplete && !disabled,
      [loadingStyles]: loading,
    },
    styles?.container,
    className
  );

  // Build track classes
  const trackClasses = cn(
    trackStyles,
    styles_variant.track,
    sizeStyles.track,
    styles?.track
  );

  // Build fill classes
  const fillClasses = cn(
    fillStyles,
    {
      [stripedStyles]: striped || variant === "striped",
      [indeterminateStyles]: indeterminate,
    },
    styles?.fill
  );

  // Build label classes
  const labelClasses = cn(
    labelStyles,
    getTextSize(),
    {
      [insideLabelStyles]: labelPosition === "inside",
      [outsideLabelStyles]: labelPosition === "outside",
    },
    styles?.label
  );

  // Combine all styles
  const containerStyles: React.CSSProperties = {
    height: thickness ? `${thickness}px` : undefined,
    borderRadius: radius !== undefined ? `${radius}px` : undefined,
    ...style,
  };

  const trackStyle: React.CSSProperties = {
    backgroundColor: trackColor || undefined,
    height: thickness ? `${thickness}px` : undefined,
    borderRadius: radius !== undefined ? `${radius}px` : undefined,
  };

  const fillStyle: React.CSSProperties = {
    width: getFillWidth(),
    ...getCustomStyles(glow),
    borderRadius: radius !== undefined ? `${radius}px` : undefined,
    animation:
      [
        animated && (striped || variant === "striped")
          ? "progress-stripes 2s linear infinite"
          : "",
        indeterminate ? "progress-indeterminate 2s ease-in-out infinite" : "",
        pulseOnComplete && isComplete
          ? "progress-pulse 0.8s ease-in-out 3"
          : "",
        glow ? "progress-glow 2s ease-in-out infinite" : "",
      ]
        .filter(Boolean)
        .join(", ") || undefined,
  };

  const displayText = getDisplayText();

  return (
    <div className="w-full">
      {/* Container */}
      <div
        ref={progressRef}
        className={containerClasses}
        style={containerStyles}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel || `Progress: ${percentage.toFixed(0)}%`}
        aria-busy={loading || indeterminate}
        {...props}
      >
        {/* Track */}
        <div className={trackClasses} style={trackStyle}>
          {/* Fill */}
          <div className={fillClasses} style={fillStyle} />

          {/* Inside Label */}
          {labelPosition === "inside" && displayText && (
            <div className={labelClasses}>{displayText}</div>
          )}
        </div>
      </div>

      {/* Outside Label */}
      {labelPosition === "outside" && displayText && (
        <div className={cn(labelClasses, "mt-2")}>{displayText}</div>
      )}

      <style jsx>{`
        ${progressBarAnimations}
      `}</style>
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";
