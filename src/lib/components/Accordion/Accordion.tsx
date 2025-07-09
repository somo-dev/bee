import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  ChevronDown,
  Search,
  GripVertical,
  Loader2,
  ChevronUp,
  ChevronRight,
  Package,
  Expand,
  Minimize2,
} from "lucide-react";
import { AccordionProps, AccordionItem } from "./Accordion.types";
import {
  accordionVariants,
  accordionSizes,
  baseTriggerStyles,
  baseContentStyles,
  chevronStyles,
  openChevronStyles,
  loadingSpinnerStyles,
  dragHandleStyles,
  searchInputStyles,
  expandAllButtonStyles,
  itemNumberStyles,
  highlightStyles,
  emptyStateStyles,
  rightSectionStyles,
  avatarStyles,
  nameStyles,
  descriptionStyles,
  contentWrapperStyles,
} from "./Accordion.styles";
import { cn } from "../../utils/cn";

// Default search filter function
const defaultSearchFilter = (query: string, item: AccordionItem): boolean => {
  const searchTerm = query.toLowerCase();
  const label = String(item.label).toLowerCase();
  return label.includes(searchTerm);
};

// Highlight search matches
const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = String(text).split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className={highlightStyles}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  items = [],
  value,
  onChange,
  multiple = false,
  collapsible = true,
  variant = "default",
  size = "md",
  chevronPosition = "right",
  chevron,
  showChevron = true,
  radius,
  disabled = false,
  transitionDuration = 300,
  loop = true,
  order,
  allowReorder = false,
  onReorder,
  persistent = false,
  persistentKey = "accordion-state",
  showItemNumbers = false,
  loading = false,
  emptyState,
  searchable = false,
  searchPlaceholder = "Search items...",
  searchFilter = defaultSearchFilter,
  highlightMatches = true,
  styles,
  showExpandAll = false,
  expandAllLabels = { expand: "Expand All", collapse: "Collapse All" },
  onItemClick,
  exclusive = false,
  className,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const triggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Initialize state from localStorage if persistent
  const [internalValue, setInternalValue] = useState<string | string[] | null>(
    () => {
      if (persistent && typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem(persistentKey);
          return stored ? JSON.parse(stored) : value;
        } catch {
          return value;
        }
      }
      return value;
    }
  );

  // Use controlled or internal state
  const currentValue = value !== undefined ? value : internalValue;

  // Save to localStorage when state changes
  useEffect(() => {
    if (persistent && typeof window !== "undefined" && value === undefined) {
      try {
        localStorage.setItem(persistentKey, JSON.stringify(internalValue));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [internalValue, persistent, persistentKey, value]);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return items;
    return items.filter((item) => searchFilter(searchQuery, item));
  }, [items, searchQuery, searchable, searchFilter]);

  // Apply custom order if provided
  const orderedItems = useMemo(() => {
    if (!order) return filteredItems;

    const itemMap = new Map(filteredItems.map((item) => [item.value, item]));
    const orderedList: AccordionItem[] = [];

    // Add items in specified order
    order.forEach((index) => {
      if (index < filteredItems.length) {
        orderedList.push(filteredItems[index]);
      }
    });

    // Add remaining items
    filteredItems.forEach((item) => {
      if (!orderedList.includes(item)) {
        orderedList.push(item);
      }
    });

    return orderedList;
  }, [filteredItems, order]);

  // Get open items
  const openItems = useMemo(() => {
    if (!currentValue) return new Set<string>();
    return new Set(Array.isArray(currentValue) ? currentValue : [currentValue]);
  }, [currentValue]);

  // Handle value change
  const handleChange = useCallback(
    (newValue: string | string[] | null) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [value, onChange]
  );

  // Toggle item
  const toggleItem = useCallback(
    (itemValue: string, item: AccordionItem) => {
      if (disabled || item.disabled) return;

      const isOpen = openItems.has(itemValue);

      // Call onItemClick callback
      onItemClick?.(item, !isOpen);

      if (multiple) {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];

        if (isOpen && collapsible && item.collapsible !== false) {
          // Close item
          const newValue = currentArray.filter((v) => v !== itemValue);
          handleChange(newValue.length > 0 ? newValue : null);
        } else if (!isOpen) {
          // Open item
          if (exclusive) {
            handleChange([itemValue]);
          } else {
            handleChange([...currentArray, itemValue]);
          }
        }
      } else {
        if (isOpen && collapsible && item.collapsible !== false) {
          // Close item
          handleChange(null);
        } else if (!isOpen) {
          // Open item
          handleChange(itemValue);
        }
      }
    },
    [
      currentValue,
      multiple,
      collapsible,
      disabled,
      openItems,
      handleChange,
      onItemClick,
      exclusive,
    ]
  );

  // Expand/Collapse all
  const handleExpandAll = useCallback(() => {
    if (disabled) return;

    const allValues = orderedItems
      .filter((item) => !item.disabled)
      .map((item) => item.value);

    const allOpen = allValues.every((val) => openItems.has(val));

    if (allOpen && collapsible) {
      handleChange(null);
    } else {
      handleChange(multiple ? allValues : allValues[0] || null);
    }
  }, [orderedItems, openItems, multiple, collapsible, disabled, handleChange]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, itemValue: string) => {
      const currentIndex = orderedItems.findIndex(
        (item) => item.value === itemValue
      );

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          const nextIndex = loop
            ? (currentIndex + 1) % orderedItems.length
            : Math.min(currentIndex + 1, orderedItems.length - 1);
          triggerRefs.current[orderedItems[nextIndex]?.value]?.focus();
          break;

        case "ArrowUp":
          event.preventDefault();
          const prevIndex = loop
            ? currentIndex === 0
              ? orderedItems.length - 1
              : currentIndex - 1
            : Math.max(currentIndex - 1, 0);
          triggerRefs.current[orderedItems[prevIndex]?.value]?.focus();
          break;

        case "Home":
          event.preventDefault();
          triggerRefs.current[orderedItems[0]?.value]?.focus();
          break;

        case "End":
          event.preventDefault();
          triggerRefs.current[
            orderedItems[orderedItems.length - 1]?.value
          ]?.focus();
          break;
      }
    },
    [orderedItems, loop]
  );

  const styles_variant = accordionVariants[variant];
  const sizeStyles = accordionSizes[size];

  // Render chevron
  const renderChevron = (item: AccordionItem, isOpen: boolean) => {
    if (!showChevron) return null;

    const ChevronIcon = item.chevron || chevron || ChevronDown;
    const isLoading = Array.isArray(loading)
      ? loading.includes(item.value)
      : loading;

    if (isLoading) {
      return (
        <Loader2 className={cn(loadingSpinnerStyles, sizeStyles.chevron)} />
      );
    }

    return (
      <span
        className={cn(chevronStyles, sizeStyles.chevron, {
          [openChevronStyles]: isOpen,
        })}
      >
        <ChevronIcon className={sizeStyles.chevron} />
      </span>
    );
  };

  // Generate avatar from name
  const generateAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return <div className={avatarStyles}>{initials}</div>;
  };

  // Render item content
  const renderContent = (item: AccordionItem, isOpen: boolean) => {
    const contentHeight = isOpen ? "auto" : "0px";

    return (
      <div
        className={cn(
          baseContentStyles,
          styles_variant.content,
          sizeStyles.content,
          styles?.content
        )}
        style={{
          maxHeight: isOpen ? "1000px" : "0px",
          opacity: isOpen ? 1 : 0,
          paddingTop: isOpen ? "16px" : "0px",
          paddingBottom: isOpen ? "16px" : "0px",
          transitionDuration: `${transitionDuration}ms`,
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          ref={(el) => (contentRefs.current[item.value] = el)}
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(-8px)",
            transition: `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            transitionDelay: isOpen ? "100ms" : "0ms",
          }}
        >
          {typeof item.content === "string" && highlightMatches && searchQuery
            ? highlightText(item.content, searchQuery)
            : item.content}
        </div>
      </div>
    );
  };

  // Render accordion item
  const renderItem = (item: AccordionItem, index: number) => {
    const isOpen = openItems.has(item.value);
    const isDragging = draggedItem === item.value;
    const isDragOver = dragOverIndex === index;

    return (
      <div
        key={item.value}
        className={cn(styles_variant.item, styles?.item, item.className, {
          "opacity-50": isDragging,
          "border-t-2 border-blue-500": isDragOver && allowReorder,
        })}
        style={{
          borderRadius: radius ? `${radius}px` : undefined,
        }}
        draggable={allowReorder && !disabled && !item.disabled}
        onDragStart={() => setDraggedItem(item.value)}
        onDragEnd={() => {
          setDraggedItem(null);
          setDragOverIndex(null);
        }}
      >
        {/* Trigger */}
        <button
          ref={(el) => (triggerRefs.current[item.value] = el)}
          className={cn(
            baseTriggerStyles,
            styles_variant.trigger,
            sizeStyles.trigger,
            sizeStyles.spacing,
            styles?.trigger,
            {
              "cursor-not-allowed opacity-50": disabled || item.disabled,
            }
          )}
          style={{
            borderRadius: radius
              ? `${radius}px ${radius}px ${
                  isOpen ? "0 0" : `${radius}px ${radius}px`
                }`
              : undefined,
          }}
          onClick={() => toggleItem(item.value, item)}
          onKeyDown={(e) => handleKeyDown(e, item.value)}
          disabled={disabled || item.disabled}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${item.value}`}
        >
          {/* Left side content */}
          <div className={cn("flex items-center", sizeStyles.spacing)}>
            {/* Drag handle */}
            {allowReorder && !disabled && !item.disabled && (
              <div className={cn(dragHandleStyles, sizeStyles.icon)}>
                <GripVertical className={sizeStyles.icon} />
              </div>
            )}

            {/* Item number */}
            {showItemNumbers && (
              <span className={itemNumberStyles}>{index + 1}</span>
            )}

            {/* Chevron (left position) */}
            {chevronPosition === "left" && renderChevron(item, isOpen)}

            {/* Avatar or Icon */}
            {item.icon ? (
              <span className={sizeStyles.icon}>
                {React.cloneElement(item.icon, {
                  className: cn(sizeStyles.icon, item.icon.props.className),
                })}
              </span>
            ) : (
              generateAvatar(String(item.label))
            )}

            {/* Content */}
            <div className={contentWrapperStyles}>
              <div className={nameStyles}>
                {typeof item.label === "string" &&
                highlightMatches &&
                searchQuery
                  ? highlightText(item.label, searchQuery)
                  : item.label}
              </div>
              {item.description && (
                <div className={descriptionStyles}>{item.description}</div>
              )}
            </div>
          </div>

          {/* Right side content */}
          <div className={cn("flex items-center", sizeStyles.spacing)}>
            {/* Right section */}
            {item.rightSection && (
              <div className={rightSectionStyles}>{item.rightSection}</div>
            )}

            {/* Chevron (right position) */}
            {chevronPosition === "right" && renderChevron(item, isOpen)}
          </div>
        </button>

        {/* Content */}
        {renderContent(item, isOpen)}
      </div>
    );
  };

  // Empty state
  if (orderedItems.length === 0) {
    return (
      <div
        className={cn(styles_variant.root, styles?.root, className)}
        {...props}
      >
        {searchable && (
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(searchInputStyles, "pl-10")}
                disabled={disabled}
              />
            </div>
          </div>
        )}

        <div className={emptyStateStyles}>
          {emptyState || (
            <>
              <Package className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-center text-gray-500">
                {searchQuery
                  ? "No items match your search"
                  : "No items to display"}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(styles_variant.root, styles?.root, className)}
      {...props}
    >
      {/* Search */}
      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(searchInputStyles, "pl-10")}
              disabled={disabled}
            />
          </div>
        </div>
      )}

      {/* Expand/Collapse All */}
      {showExpandAll && orderedItems.length > 1 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleExpandAll}
            disabled={disabled}
            className={expandAllButtonStyles}
          >
            {openItems.size === orderedItems.length ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Expand className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {/* Accordion Items */}
      <div className={cn(styles?.root)}>
        {orderedItems.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
};

Accordion.displayName = "Accordion";
