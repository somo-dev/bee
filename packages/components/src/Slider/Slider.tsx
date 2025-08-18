import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { SliderProps, SliderMark } from "./Slider.types";
import {
  sliderStyles,
  sliderSizes,
  labelStyles,
  descriptionStyles,
  errorStyles,
  requiredIndicatorStyles,
  minMaxLabelStyles,
  markStyles,
  markLabelStyles,
  tooltipStyles,
  tooltipVisibleStyles,
  thumbIconStyles,
  sliderAnimations,
  thumbBounceAnimation,
  fadeInAnimation,
  slideInAnimation,
} from "./Slider.styles";
import { cn } from "../utils/cn";

// Helper function to clamp value between min and max
const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Helper function to round to step
const roundToStep = (value: number, step: number): number => {
  return Math.round(value / step) * step;
};

// Helper function to get percentage
const getPercentage = (value: number, min: number, max: number): number => {
  return ((value - min) / (max - min)) * 100;
};

// Helper function to get value from percentage
const getValueFromPercentage = (
  percentage: number,
  min: number,
  max: number
): number => {
  return min + (percentage / 100) * (max - min);
};

export const Slider: React.FC<SliderProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  description,
  error,
  size = "md",
  color,
  trackColor,
  thumbColor,
  disabled = false,
  required = false,
  radius,
  showLabels = false,
  showMinMax = false,
  labelFormatter = (val) => val.toString(),
  marks = [],
  showMarks = false,
  range = false,
  showTooltip = false,
  tooltipFormatter = (val) => val.toString(),
  tooltipAlwaysOn = false,
  onChangeStart,
  onChangeEnd,
  styles,
  inverted = false,
  thumbIcon,
  className,
  style,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number>(0);
  const [showTooltips, setShowTooltips] = useState(tooltipAlwaysOn);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Normalize value to array for consistent handling
  const normalizedValue = useMemo(() => {
    if (range) {
      return Array.isArray(value) ? value : [min, value as number];
    }
    return [Array.isArray(value) ? value[0] : (value as number)];
  }, [value, range, min]);

  // Calculate percentages for positioning
  const percentages = useMemo(() => {
    return normalizedValue.map((val) => getPercentage(val, min, max));
  }, [normalizedValue, min, max]);

  // Handle mouse/touch events
  const handlePointerDown = useCallback(
    (event: React.PointerEvent, index: number) => {
      if (disabled) return;

      event.preventDefault();
      setIsDragging(true);
      setDragIndex(index);
      setShowTooltips(true);

      onChangeStart?.(
        range ? (normalizedValue as [number, number]) : normalizedValue[0]
      );

      // Add bounce animation
      if (thumbRefs.current[index]) {
        thumbRefs.current[index]!.style.animation = "none";
        thumbRefs.current[index]!.offsetHeight; // Trigger reflow
        thumbRefs.current[index]!.style.animation =
          "thumbBounce 0.6s ease-in-out";
      }
    },
    [disabled, range, normalizedValue, onChangeStart]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDragging || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = clamp(
        ((event.clientX - rect.left) / rect.width) * 100,
        0,
        100
      );

      let newValue = getValueFromPercentage(percentage, min, max);
      newValue = roundToStep(newValue, step);
      newValue = clamp(newValue, min, max);

      const newValues = [...normalizedValue];
      newValues[dragIndex] = newValue;

      // Ensure proper order for range sliders
      if (range && newValues.length === 2) {
        newValues.sort((a, b) => a - b);
      }

      const result = range ? (newValues as [number, number]) : newValues[0];
      onChange?.(result);
    },
    [isDragging, min, max, step, normalizedValue, dragIndex, range, onChange]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragIndex(0);
    if (!tooltipAlwaysOn) {
      setShowTooltips(false);
    }

    onChangeEnd?.(
      range ? (normalizedValue as [number, number]) : normalizedValue[0]
    );
  }, [isDragging, tooltipAlwaysOn, range, normalizedValue, onChangeEnd]);

  // Handle track click
  const handleTrackClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || isDragging) return;

      const rect = trackRef.current!.getBoundingClientRect();
      const percentage = ((event.clientX - rect.left) / rect.width) * 100;
      let newValue = getValueFromPercentage(percentage, min, max);
      newValue = roundToStep(newValue, step);
      newValue = clamp(newValue, min, max);

      if (range) {
        // Find closest thumb for range slider
        const distances = normalizedValue.map((val) =>
          Math.abs(val - newValue)
        );
        const closestIndex = distances.indexOf(Math.min(...distances));

        const newValues = [...normalizedValue];
        newValues[closestIndex] = newValue;
        newValues.sort((a, b) => a - b);

        onChange?.(newValues as [number, number]);
      } else {
        onChange?.(newValue);
      }
    },
    [disabled, isDragging, min, max, step, range, normalizedValue, onChange]
  );

  // Global pointer events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (disabled) return;

      let newValue = normalizedValue[index];

      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          event.preventDefault();
          newValue = Math.min(newValue + step, max);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          event.preventDefault();
          newValue = Math.max(newValue - step, min);
          break;
        case "Home":
          event.preventDefault();
          newValue = min;
          break;
        case "End":
          event.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }

      const newValues = [...normalizedValue];
      newValues[index] = newValue;

      if (range && newValues.length === 2) {
        newValues.sort((a, b) => a - b);
      }

      const result = range ? (newValues as [number, number]) : newValues[0];
      onChange?.(result);
    },
    [disabled, normalizedValue, step, min, max, range, onChange]
  );

  // Generate custom styles
  const getCustomStyles = () => {
    const customStyles: any = {};

    if (color) {
      customStyles["--slider-color"] = color;
    }
    if (trackColor) {
      customStyles["--track-color"] = trackColor;
    }
    if (thumbColor) {
      customStyles["--thumb-color"] = thumbColor;
    }

    return customStyles;
  };

  const sizeStyles = sliderSizes[size];

  const trackStyle: React.CSSProperties = {
    borderRadius: radius ? `${radius}px` : undefined,
    backgroundColor: trackColor || undefined,
  };

  const filledTrackStyle: React.CSSProperties = {
    width: range ? `${percentages[1] - percentages[0]}%` : `${percentages[0]}%`,
    left: range ? `${percentages[0]}%` : "0%",
    backgroundColor: color || undefined,
    borderRadius: radius ? `${radius}px` : undefined,
  };

  const renderThumb = (index: number) => {
    const percentage = percentages[index];
    const thumbValue = normalizedValue[index];

    const thumbStyle: React.CSSProperties = {
      left: `${percentage}%`,
      backgroundColor: thumbColor || "#FFFFFF",
      borderColor: color || "#3B82F6",
      borderRadius: radius ? `${radius}px` : undefined,
    };

    return (
      <div
        key={index}
        ref={(el) => {
          thumbRefs.current[index] = el;
        }}
        className={cn(
          sliderStyles.thumb,
          sizeStyles.thumb,
          {
            "opacity-50 cursor-not-allowed": disabled,
            "scale-110": isDragging && dragIndex === index,
          },
          styles?.thumb
        )}
        style={thumbStyle}
        onPointerDown={(e) => handlePointerDown(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuenow={thumbValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled}
      >
        {/* Thumb Icon */}
        {thumbIcon && (
          <div className={thumbIconStyles}>
            {React.cloneElement(thumbIcon, {
              className: cn("w-3 h-3", thumbIcon.props.className),
            })}
          </div>
        )}

        {/* Tooltip */}
        {(showTooltip || showTooltips) && (
          <div
            className={cn(
              tooltipStyles,
              sizeStyles.tooltip,
              {
                [tooltipVisibleStyles]: showTooltips || tooltipAlwaysOn,
              },
              styles?.tooltip
            )}
          >
            {tooltipFormatter(thumbValue)}
          </div>
        )}
      </div>
    );
  };

  const renderMarks = () => {
    if (!showMarks || marks.length === 0) return null;

    return marks.map((mark) => {
      const percentage = getPercentage(mark.value, min, max);

      return (
        <div key={mark.value}>
          <div
            className={cn(markStyles, sizeStyles.mark, styles?.mark)}
            style={{ left: `${percentage}%` }}
          />
          {mark.label && (
            <div
              className={cn(markLabelStyles, sizeStyles.label)}
              style={{ left: `${percentage}%` }}
            >
              {mark.label}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={cn(sliderStyles.wrapper, className)}
      style={{ ...getCustomStyles(), ...style }}
      {...props}
    >
      {/* Label */}
      {label && (
        <label className={cn(labelStyles, sizeStyles.label)}>
          {label}
          {required && <span className={requiredIndicatorStyles}>*</span>}
        </label>
      )}

      {/* Description */}
      {description && (
        <div className={cn(descriptionStyles, sizeStyles.label)}>
          {description}
        </div>
      )}

      {/* Value Labels */}
      {showLabels && (
        <div className={cn("flex justify-between mb-3", sizeStyles.label)}>
          {range ? (
            <>
              <span className="text-gray-600">{labelFormatter(normalizedValue[0])}</span>
              <span className="text-gray-600">{labelFormatter(normalizedValue[1])}</span>
            </>
          ) : (
            <span className="text-gray-600">{labelFormatter(normalizedValue[0])}</span>
          )}
        </div>
      )}

      {/* Slider Track */}
      <div className="relative py-2">
        <div
          ref={trackRef}
          className={cn(
            sliderStyles.track,
            sizeStyles.track,
            {
              "cursor-not-allowed opacity-50": disabled,
            },
            styles?.track
          )}
          style={trackStyle}
          onClick={handleTrackClick}
        >
          {/* Filled Track */}
          <div
            className={cn(sliderStyles.filledTrack, sizeStyles.track)}
            style={filledTrackStyle}
          />

          {/* Marks */}
          {renderMarks()}

          {/* Thumbs */}
          {normalizedValue.map((_, index) => renderThumb(index))}
        </div>
      </div>

      {/* Min/Max Labels */}
      {showMinMax && (
        <div className={minMaxLabelStyles}>
          <span className="text-gray-500">min</span>
          <span className="text-gray-500">max</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className={cn(errorStyles, sizeStyles.label, fadeInAnimation)}>
          {error}
        </div>
      )}

      <style>{`
        ${sliderAnimations}
      `}</style>
    </div>
  );
};

Slider.displayName = "Slider";
