"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, X, Search, Check } from "lucide-react";
import { SelectProps, SelectOption, SelectGroup } from "./Select.types";
import {
  selectVariants,
  selectSizes,
  baseInputStyles,
  dropdownStyles,
  optionStyles,
  selectedOptionStyles,
  groupLabelStyles,
  searchInputStyles,
  multiValueStyles,
  clearButtonStyles,
  nothingFoundStyles,
  checkmarkStyles,
} from "./Select.styles";
import { cn } from "../utils/cn";

export const Select: React.FC<SelectProps> = ({
  data = [],
  value,
  onChange,
  placeholder = "Pick value",
  label,
  description,
  error,
  required = false,
  disabled = false,
  size = "md",
  variant = "default",
  searchable = false,
  clearable = false,
  allowDeselect = false,
  multiple = false,
  maxDisplayedValues = 4,
  nothingFound = "Nothing found",
  filter,
  showCheckmark = true,
  radius,
  maxDropdownHeight = 220,
  dropup = false,
  rightSection,
  closeOnSelect = true,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalize data to consistent format
  const normalizedData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    // Handle string array
    if (typeof data[0] === "string") {
      return [
        {
          label: "",
          options: (data as string[]).map((item) => ({
            value: item,
            label: item,
          })),
        },
      ] as SelectGroup[];
    }

    // Handle SelectOption array
    if (data.length > 0 && "value" in data[0]) {
      const options = data as SelectOption[];
      const grouped: { [key: string]: SelectOption[] } = {};

      options.forEach((option) => {
        const group = option.group || "";
        if (!grouped[group]) grouped[group] = [];
        grouped[group].push(option);
      });

      return Object.entries(grouped).map(([groupLabel, groupOptions]) => ({
        label: groupLabel,
        options: groupOptions,
      }));
    }

    // Handle SelectGroup array
    return data as SelectGroup[];
  }, [data]);

  // Flatten all options for easier searching
  const allOptions = useMemo(() => {
    return normalizedData.flatMap((group) => group.options);
  }, [normalizedData]);

  // Filter options based on search
  const filteredData = useMemo(() => {
    if (!searchable || !searchValue.trim()) return normalizedData;

    const filterFn =
      filter ||
      ((searchTerm: string, option: SelectOption) => {
        const term = searchTerm.toLowerCase();
        const label = String(option.label).toLowerCase();
        const value = String(option.value).toLowerCase();
        return label.includes(term) || value.includes(term);
      });

    return normalizedData
      .map((group) => ({
        ...group,
        options: group.options.filter((option) =>
          filterFn(searchValue, option)
        ),
      }))
      .filter((group) => group.options.length > 0);
  }, [normalizedData, searchValue, searchable, filter]);

  // Get selected options
  const selectedOptions = useMemo(() => {
    if (!value) return [];
    const values = Array.isArray(value) ? value : [value];
    return allOptions.filter((option) => values.includes(option.value));
  }, [value, allOptions]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchValue("");
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      const flatOptions = filteredData.flatMap((group) => group.options);

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev < flatOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : flatOptions.length - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (focusedIndex >= 0 && flatOptions[focusedIndex]) {
            handleOptionSelect(flatOptions[focusedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSearchValue("");
          setFocusedIndex(-1);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, filteredData, focusedIndex]);

  const handleOptionSelect = (option: SelectOption) => {
    if (option.disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.includes(option.value);

      let newValues;
      if (isSelected && allowDeselect) {
        newValues = currentValues.filter((v) => v !== option.value);
      } else if (!isSelected) {
        newValues = [...currentValues, option.value];
      } else {
        return; // No change
      }

      onChange?.(newValues.length > 0 ? newValues : null);
    } else {
      const isSelected = value === option.value;
      const newValue = isSelected && allowDeselect ? null : option.value;
      onChange?.(newValue);

      if (closeOnSelect) {
        setIsOpen(false);
        setSearchValue("");
        setFocusedIndex(-1);
      }
    }
  };

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange?.(null);
    setSearchValue("");
  };

  const handleRemoveValue = (
    valueToRemove: string | number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    if (!multiple || !Array.isArray(value)) return;

    const newValues = value.filter((v) => v !== valueToRemove);
    onChange?.(newValues.length > 0 ? newValues : null);
  };

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchValue("");
      setFocusedIndex(-1);
    }
  };

  const renderDisplayValue = () => {
    if (!selectedOptions.length) {
      return <span className="text-gray-400 truncate">{placeholder}</span>;
    }

    if (multiple) {
      const displayedOptions = selectedOptions.slice(0, maxDisplayedValues);
      const remainingCount = selectedOptions.length - maxDisplayedValues;

      return (
        <div className="flex items-center gap-1 flex-wrap min-w-0">
          {displayedOptions.map((option) => (
            <span key={option.value} className={cn(multiValueStyles)}>
              <span className="truncate">{option.label}</span>
              <button
                onClick={(e) => handleRemoveValue(option.value, e)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {remainingCount > 0 && (
            <span className={cn(multiValueStyles)}>+{remainingCount} more</span>
          )}
        </div>
      );
    }

    return (
      <span className="truncate flex items-center gap-2">
        {selectedOptions[0].icon && (
          <span className={selectSizes[size].icon}>
            {React.cloneElement(selectedOptions[0].icon, {
              className: selectSizes[size].icon,
            })}
          </span>
        )}
        {selectedOptions[0].label}
      </span>
    );
  };

  const renderOption = (option: SelectOption, index: number) => {
    const isSelected = multiple
      ? Array.isArray(value) && value.includes(option.value)
      : value === option.value;
    const isFocused = index === focusedIndex;

    return (
      <div
        key={option.value}
        className={cn(optionStyles, selectSizes[size].text, {
          [selectedOptionStyles]: isSelected,
          "bg-gray-100": isFocused && !isSelected,
          "opacity-50 cursor-not-allowed": option.disabled,
        })}
        onClick={() => handleOptionSelect(option)}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {option.icon && (
            <span className={selectSizes[size].icon}>
              {React.cloneElement(option.icon, {
                className: selectSizes[size].icon,
              })}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate">{option.label}</div>
            {option.description && (
              <div className="text-xs text-gray-500 truncate">
                {option.description}
              </div>
            )}
          </div>
        </div>
        {showCheckmark && isSelected && (
          <Check className={cn(checkmarkStyles, selectSizes[size].icon)} />
        )}
      </div>
    );
  };

  const styles = selectVariants[variant];
  const sizeStyles = selectSizes[size];

  return (
    <div className={cn("relative", className)} ref={containerRef} {...props}>
      {/* Label */}
      {label && (
        <label
          className={cn(
            "block font-medium text-gray-700 mb-1",
            sizeStyles.text
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <div
        className={cn(
          baseInputStyles,
          styles.input,
          sizeStyles.input,
          sizeStyles.padding,
          {
            "ring-2 ring-blue-500 ring-opacity-20 border-blue-500":
              isOpen && variant !== "unstyled",
            "border-red-500 ring-2 ring-red-500 ring-opacity-20":
              error && variant !== "unstyled",
          }
        )}
        style={{ borderRadius: radius ? `${radius}px` : undefined }}
        onClick={toggleDropdown}
      >
        <div className="flex-1 min-w-0">{renderDisplayValue()}</div>

        <div className="flex items-center gap-1 ml-2">
          {clearable && selectedOptions.length > 0 && !disabled && (
            <button
              className={clearButtonStyles}
              onClick={handleClear}
              type="button"
            >
              <X className={sizeStyles.icon} />
            </button>
          )}

          <div className="text-gray-400">
            {rightSection || (
              <ChevronDown
                className={cn(
                  sizeStyles.icon,
                  "transition-transform duration-200",
                  { "rotate-180": isOpen }
                )}
              />
            )}
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(dropdownStyles, styles.dropdown, {
            "bottom-full mb-1": dropup,
          })}
          style={{
            maxHeight: maxDropdownHeight,
            borderRadius: radius ? `${radius}px` : undefined,
          }}
        >
          {/* Search Input */}
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className={cn(searchInputStyles, "pl-10")}
              />
            </div>
          )}

          {/* Options */}
          <div className="max-h-full overflow-y-auto">
            {filteredData.length === 0 ? (
              <div className={nothingFoundStyles}>{nothingFound}</div>
            ) : (
              filteredData.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.label && (
                    <div className={groupLabelStyles}>{group.label}</div>
                  )}
                  {group.options.map((option, optionIndex) => {
                    const globalIndex =
                      filteredData
                        .slice(0, groupIndex)
                        .reduce((acc, g) => acc + g.options.length, 0) +
                      optionIndex;
                    return renderOption(option, globalIndex);
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Description */}
      {description && !error && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}

      {/* Error */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

Select.displayName = "Select";
