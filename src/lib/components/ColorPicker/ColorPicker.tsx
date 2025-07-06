import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Palette, X } from "lucide-react";
import { ColorPickerProps } from "./ColorPicker.types";
import {
  colorPickerSizes,
  popoverStyles,
  colorBoxStyles,
  selectedColorBoxStyles,
  defaultColorBoxStyles,
  triggerButtonStyles,
  hexInputStyles,
  headerStyles,
  labelStyles,
  closeButtonStyles,
} from "./ColorPicker.styles";
import { cn } from "../../utils/cn";

const DEFAULT_COLORS = [
  "#6B7280",
  "#EF4444",
  "#EC4899",
  "#A855F7",
  "#8B5CF6",
  "#3B82F6",
  "#06B6D4",
  "#10B981",
  "#84CC16",
  "#EAB308",
  "#F97316",
  "#F59E0B",
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  size = "md",
  disabled = false,
  predefinedColors = DEFAULT_COLORS,
  showCustomPicker = true,
  showPredefinedColors = true,
  colorGridColumns = 6,
  placeholder = "#000000",
  trigger,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const sizeStyles = colorPickerSizes[size];

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleColorSelect = (color: string) => {
    onChange(color);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const renderTrigger = () => {
    if (trigger) {
      return (
        <div ref={triggerRef} onClick={handleToggle} className="cursor-pointer">
          {trigger}
        </div>
      );
    }

    return (
      <button
        ref={triggerRef}
        onClick={handleToggle}
        disabled={disabled}
        className={cn(triggerButtonStyles, sizeStyles.trigger, {
          "opacity-50 cursor-not-allowed": disabled,
          "hover:border-gray-400": !disabled,
        })}
        style={{ backgroundColor: value }}
      >
        {!value && <Palette className={cn("text-gray-600", sizeStyles.icon)} />}
      </button>
    );
  };

  const renderPredefinedColors = () => {
    if (!showPredefinedColors) return null;

    return (
      <div className="mb-4">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${colorGridColumns}, minmax(0, 1fr))`,
          }}
        >
          {predefinedColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={cn(
                colorBoxStyles,
                sizeStyles.colorBox,
                value === color ? selectedColorBoxStyles : defaultColorBoxStyles
              )}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderCustomPicker = () => {
    if (!showCustomPicker) return null;

    return (
      <div className="space-y-3">
        <HexColorPicker color={value} onChange={handleColorSelect} />
        <input
          type="text"
          value={value}
          onChange={(e) => handleColorSelect(e.target.value)}
          className={cn(hexInputStyles, sizeStyles.input)}
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <div className={cn("relative", className)} {...props}>
      {/* Label */}
      {label && (
        <label className={cn(labelStyles, "block mb-2")}>{label}</label>
      )}

      {/* Trigger */}
      {renderTrigger()}

      {/* Popover */}
      {isOpen && (
        <div ref={popoverRef} className={popoverStyles}>
          <div className="p-4">
            {/* Header */}
            <div className={headerStyles}>
              <span className={labelStyles}>
                {showCustomPicker ? "Choose Color" : "Pick Color"}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className={closeButtonStyles}
              >
                <X className={sizeStyles.icon} />
              </button>
            </div>

            {/* Predefined Colors */}
            {renderPredefinedColors()}

            {/* Custom Color Picker */}
            {renderCustomPicker()}
          </div>
        </div>
      )}
    </div>
  );
};

ColorPicker.displayName = "ColorPicker";
