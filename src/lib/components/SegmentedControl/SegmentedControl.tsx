"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  SegmentedControlProps,
  SegmentedControlItem,
} from "./SegmentedControl.types";
import {
  segmentedControlVariants,
  segmentedControlSizes,
  segmentedControlRadius,
  segmentedControlOrientations,
  baseSegmentedControlStyles,
  segmentStyles,
  indicatorStyles,
  disabledSegmentStyles,
  badgeStyles,
  activeBadgeStyles,
  segmentedControlAnimations,
  slideIndicatorAnimation,
  fadeInAnimation,
  lastSegmentNoPadding,
} from "./SegmentedControl.styles";
import { cn } from "../../utils/cn";

// Add utility classes for pills variant spacing
const pillsFirstSegmentMargin = "first:ml-1";
const pillsLastSegmentMargin = "last:mr-1";

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  data = [],
  value,
  onChange,
  variant = "default",
  size = "md",
  orientation = "horizontal",
  radius = "md",
  disabled = false,
  fullWidth = false,
  color,
  transitionDuration = 300,
  styles,
  equalWidth = true,
  indicator,
  showIcons = true,
  iconPosition = "left",
  allowDeselect = false,
  onSegmentClick,
  className,
  ...props
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Memoize normalizedData for performance
  const normalizedData = React.useMemo(
    () => data.map((item) => (typeof item === "string" ? { value: item, label: item } : item)),
    [data]
  );

  // Memoize activeIndex
  const activeIndex = React.useMemo(
    () => normalizedData.findIndex((item) => item.value === value),
    [normalizedData, value]
  );

  // Update indicator position
  const updateIndicator = useCallback(() => {
    if (
      activeIndex === -1 ||
      !segmentRefs.current[activeIndex] ||
      !rootRef.current
    ) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }

    const activeSegment = segmentRefs.current[activeIndex];
    const rootRect = rootRef.current.getBoundingClientRect();
    const segmentRect = activeSegment.getBoundingClientRect();

    const isHorizontal = orientation === "horizontal";

    if (isHorizontal) {
      setIndicatorStyle({
        opacity: 1,
        transform: `translateX(${segmentRect.left - rootRect.left}px)`,
        width: segmentRect.width,
        height: segmentRect.height,
        transition: `all ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1)`
      });
    } else {
      setIndicatorStyle({
        opacity: 1,
        transform: `translateY(${segmentRect.top - rootRect.top}px)`,
        width: segmentRect.width,
        height: segmentRect.height,
        transition: `all ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1)`
      });
    }
  }, [activeIndex, orientation, transitionDuration]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator, value, orientation, normalizedData.length, size]);

  useEffect(() => {
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (disabled) return;
    let nextIdx = idx;
    if (e.key === "ArrowRight" || (e.key === "ArrowDown" && orientation === "vertical")) {
      nextIdx = (idx + 1) % normalizedData.length;
      segmentRefs.current[nextIdx]?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || (e.key === "ArrowUp" && orientation === "vertical")) {
      nextIdx = (idx - 1 + normalizedData.length) % normalizedData.length;
      segmentRefs.current[nextIdx]?.focus();
      e.preventDefault();
    } else if (e.key === "Home") {
      segmentRefs.current[0]?.focus();
      e.preventDefault();
    } else if (e.key === "End") {
      segmentRefs.current[normalizedData.length - 1]?.focus();
      e.preventDefault();
    } else if (e.key === "Enter" || e.key === " ") {
      handleSegmentClick(normalizedData[idx], idx);
      e.preventDefault();
    }
  };

  const handleSegmentClick = (item: SegmentedControlItem, index: number) => {
    if (disabled || item.disabled) return;
    const newValue = allowDeselect && value === item.value ? undefined : item.value;
    onChange?.(newValue!);
    onSegmentClick?.(item, index);
  };

  // Generate custom styles when color prop is provided
  const getCustomStyles = (isActive: boolean): React.CSSProperties => {
    if (!color) return {};
    if (isActive) {
      return {
        backgroundColor: color,
        color: "white",
      };
    }
    return {
      color: color,
    };
  };

  const styles_variant = segmentedControlVariants[variant];
  const sizeStyles = segmentedControlSizes[size];
  const orientationStyles = segmentedControlOrientations[orientation];
  const radiusClass = segmentedControlRadius[radius];

  const rootClasses = cn(
    baseSegmentedControlStyles,
    styles_variant.root,
    sizeStyles.root,
    orientationStyles.root,
    radiusClass,
    {
      "w-full": fullWidth,
      "opacity-50 cursor-not-allowed": disabled,
      "flex": true,
      "flex-row": orientation === "horizontal",
      "flex-col": orientation === "vertical",
    },
    styles?.root,
    className
  );

  return (
    <div
      ref={rootRef}
      className={rootClasses}
      role="tablist"
      aria-orientation={orientation}
      {...props}
    >
      {/* Indicator */}
      {activeIndex !== -1 && (
        <div
          className={cn(
            indicatorStyles,
            !color && styles_variant.indicator,
            radiusClass,
            styles?.indicator
          )}
          style={{
            ...indicatorStyle,
            ...(color && { backgroundColor: color }),
          }}
          aria-hidden="true"
        />
      )}

      {/* Segments */}
      {normalizedData.map((item, index) => {
        const isActive = value === item.value;
        const isDisabled = disabled || item.disabled;
        const isLast = index === normalizedData.length - 1;
        const isFirst = index === 0;
        const shouldRemoveLastPadding =
          isLast && orientation === "horizontal" && variant === "default";
        // Pills variant: add margin to first and last segments for uniform spacing
        const pillsSpacing =
          variant === "pills" && orientation === "horizontal"
            ? [isFirst && pillsFirstSegmentMargin, isLast && pillsLastSegmentMargin]
            : [];
        const segmentClasses = cn(
          segmentStyles,
          !color && styles_variant.segment,
          sizeStyles.segment,
          sizeStyles.padding,
          sizeStyles.gap,
          orientationStyles.segment,
          radiusClass,
          {
            [styles_variant.activeSegment]: isActive && !color,
            [disabledSegmentStyles]: isDisabled,
            "flex-1": equalWidth,
            "flex-col": iconPosition === "top" || iconPosition === "bottom",
            "flex-row-reverse": iconPosition === "right",
          },
          shouldRemoveLastPadding && lastSegmentNoPadding,
          ...pillsSpacing,
          styles?.segment,
          isActive && styles?.activeSegment
        );
        const customStyles = getCustomStyles(isActive);
        return (
          <button
            key={item.value}
            ref={(el) => {
              segmentRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            className={segmentClasses}
            style={customStyles}
            onClick={() => handleSegmentClick(item, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={isActive ? 0 : -1}
            title={item.description}
          >
            {/* Icon */}
            {showIcons && item.icon && (
              <span
                className={cn(sizeStyles.icon, {
                  "mb-1": iconPosition === "top",
                  "mt-1": iconPosition === "bottom",
                })}
                aria-hidden="true"
              >
                {React.cloneElement(item.icon, {
                  className: cn(sizeStyles.icon, item.icon.props.className),
                })}
              </span>
            )}
            {/* Label */}
            <span className={cn(sizeStyles.text, styles?.label)}>
              {item.label}
            </span>
            {/* Badge */}
            {item.badge && (
              <span
                className={cn(badgeStyles, { [activeBadgeStyles]: isActive })}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
      <style jsx>{`
        ${segmentedControlAnimations}
      `}</style>
    </div>
  );
};

SegmentedControl.displayName = "SegmentedControl";
