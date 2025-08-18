import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  List,
  ChevronDown,
  ChevronRight,
  Hash,
  FileText,
  Bookmark,
} from "lucide-react";
import {
  TableOfContentsProps,
  TableOfContentsItem,
} from "./TableOfContents.types";
import {
  tableOfContentsVariants,
  tableOfContentsSizes,
  tableOfContentsPositions,
  baseTocStyles,
  tocItemStyles,
  tocScrollAreaStyles,
  tocTitleStyles,
  tocNumberStyles,
  tocActiveNumberStyles,
  tocNestedIndicatorStyles,
  tocActiveIndicatorStyles,
  tocCollapseButtonStyles,
  tocStickyStyles,
  tocFloatingStyles,
  tocAnimations,
  slideInLeftAnimation,
  slideInRightAnimation,
  fadeInAnimation,
  highlightAnimation,
} from "./TableOfContents.styles";
import { cn } from "../utils/cn";

// Utility function to get element by ID
const getElementById = (id: string): HTMLElement | null => {
  return document.getElementById(id);
};

// Utility function for smooth scrolling
const smoothScrollTo = (element: HTMLElement, offset = 0) => {
  const elementPosition = element.offsetTop - offset;
  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });
};

// Utility function to check if element is in viewport
const isElementInViewport = (element: HTMLElement, offset = 0): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return rect.top >= -offset && rect.top <= windowHeight / 2;
};

// Flatten nested items for easier processing
const flattenItems = (
  items: TableOfContentsItem[],
  level = 0
): (TableOfContentsItem & { level: number })[] => {
  const result: (TableOfContentsItem & { level: number })[] = [];

  items.forEach((item) => {
    result.push({ ...item, level });
    if (item.children) {
      result.push(...flattenItems(item.children, level + 1));
    }
  });

  return result;
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items = [],
  activeId,
  onItemClick,
  variant = "minimal",
  size = "md",
  position = "left",
  height = "auto",
  itemGap = 4,
  smoothScroll = true,
  scrollOffset = 100,
  autoDetectActive = true,
  showIcons = true,
  showNested = true,
  maxLevel = 3,
  sticky = false,
  stickyTop = 20,
  scrollContainer,
  highlightActive = true,
  styles,
  title = "Table of contents",
  showTitle = true,
  collapsible = false,
  showNumbers = false,
  className,
  ...props
}) => {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Use controlled or internal active state
  const currentActiveId = activeId !== undefined ? activeId : internalActiveId;

  // Flatten items for easier processing
  const flatItems = useMemo(() => {
    return flattenItems(items)
      .filter((item) => showNested || item.level === 0)
      .filter((item) => item.level <= maxLevel);
  }, [items, showNested, maxLevel]);

  // Auto-detect active section based on scroll position
  useEffect(() => {
    if (!autoDetectActive || activeId !== undefined) return;

    const handleScroll = () => {
      const scrollContainer = document.documentElement || document.body;
      const scrollTop = scrollContainer.scrollTop;

      // Find the section that's currently in view
      let currentSection: string | null = null;

      for (const item of flatItems) {
        const element = getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;

          if (elementTop <= scrollTop + scrollOffset) {
            currentSection = item.id;
          } else {
            break;
          }
        }
      }

      if (currentSection && currentSection !== internalActiveId) {
        setInternalActiveId(currentSection);
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [
    autoDetectActive,
    activeId,
    flatItems,
    scrollOffset,
    internalActiveId,
  ]);

  // Handle item click
  const handleItemClick = useCallback(
    (item: TableOfContentsItem) => {
      if (item.disabled) return;

      

      // Update active state
      if (activeId === undefined) {
        setInternalActiveId(item.id);
      }

      // Call callback
      onItemClick?.(item);

      // Navigate to section
      const targetElement = getElementById(item.id);
      if (targetElement) {
        if (smoothScroll) {
          smoothScrollTo(targetElement, scrollOffset);
        } else {
          const href = item.href || `#${item.id}`;
          window.location.hash = href.replace("#", "");
        }
      }
    },
    [activeId, onItemClick, smoothScroll, scrollOffset]
  );

  // Handle collapse toggle
  const handleCollapseToggle = useCallback(
    (itemId: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setCollapsedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    },
    []
  );

  // Check if item should be visible (not collapsed by parent)
  const isItemVisible = useCallback(
    (item: TableOfContentsItem & { level: number }): boolean => {
      if (item.level === 0) return true;

      // Find parent items and check if any are collapsed
      const parentItems = flatItems.filter(
        (parent) =>
          parent.level < item.level &&
          parent.children?.some((child) => child.id === item.id)
      );

      return !parentItems.some((parent) => collapsedItems.has(parent.id));
    },
    [flatItems, collapsedItems]
  );

  // Generate item number
  const getItemNumber = useCallback(
    (item: TableOfContentsItem & { level: number }): string => {
      if (!showNumbers) return "";

      // Simple numbering for now - could be enhanced for hierarchical numbering
      const sameLevel = flatItems.filter((i) => i.level === item.level);
      const itemIndex = sameLevel.findIndex((i) => i.id === item.id) + 1;

      return `${itemIndex}`;
    },
    [flatItems, showNumbers]
  );

  const styles_variant = tableOfContentsVariants[variant];
  const sizeStyles = tableOfContentsSizes[size];
  const positionClass = tableOfContentsPositions[position];

  const containerClasses = cn(
    baseTocStyles,
    styles_variant.container,
    sizeStyles.container,
    {
      [tocStickyStyles]: sticky,
      [tocFloatingStyles]: variant === "floating",
      [slideInLeftAnimation]: position === "left",
      [slideInRightAnimation]: position === "right",
    },
    styles?.container,
    className
  );

  const containerStyle: React.CSSProperties = {
    height: typeof height === "number" ? `${height}px` : height,
    top: sticky ? `${stickyTop}px` : undefined,
    gap: `${itemGap}px`,
  };

  const renderItem = (
    item: TableOfContentsItem & { level: number },
    index: number
  ) => {
    const isActive = currentActiveId === item.id;
    const isCollapsed = collapsedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isVisible = isItemVisible(item);
    const itemNumber = getItemNumber(item);

    if (!isVisible) return null;

    const itemClasses = cn(
      tocItemStyles,
      styles_variant.item,
      sizeStyles.item,
      sizeStyles.text,
      {
        [styles_variant.activeItem]: isActive && highlightActive,
        [styles_variant.nestedItem]: item.level > 0,
        "opacity-50 cursor-not-allowed": item.disabled,
        [highlightAnimation]: isActive,
      },
      styles?.item,
      isActive && styles?.activeItem,
      item.level > 0 && styles?.nestedItem
    );

    const paddingLeft = item.level * 16; // 16px per level

    return (
      <div key={item.id} className={fadeInAnimation}>
        <div
          className={itemClasses}
          style={{
            paddingLeft: item.level > 0 ? `${paddingLeft}px` : undefined,
          }}
          onClick={() => handleItemClick(item)}
          role="button"
          tabIndex={item.disabled ? -1 : 0}
          aria-current={isActive ? "location" : undefined}

        >
          {/* Nested indicator line */}
          {item.level > 0 && (
            <div
              className={cn(tocNestedIndicatorStyles, {
                [tocActiveIndicatorStyles]: isActive,
              })}
              style={{ left: `${(item.level - 1) * 16 + 12}px` }}
            />
          )}

          {/* Collapse button for items with children */}
          {collapsible && hasChildren && (
            <button
              className={cn(tocCollapseButtonStyles, sizeStyles.icon)}
              onClick={(e) => handleCollapseToggle(item.id, e)}
              aria-label={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? (
                <ChevronRight className={sizeStyles.icon} />
              ) : (
                <ChevronDown className={sizeStyles.icon} />
              )}
            </button>
          )}

          {/* Item number */}
          {showNumbers && itemNumber && (
            <span
              className={cn(tocNumberStyles, sizeStyles.number, {
                [tocActiveNumberStyles]: isActive,
              })}
            >
              {itemNumber}
            </span>
          )}

          {/* Icon */}
          {showIcons && item.icon && (
            <span
              className={cn(sizeStyles.icon, styles?.icon)}
              aria-hidden="true"
            >
              {React.cloneElement(item.icon, {
                className: cn(sizeStyles.icon, item.icon.props.className),
              })}
            </span>
          )}

          {/* Label */}
          <span
            className={cn("flex-1 truncate", sizeStyles.text, styles?.label)}
            title={typeof item.label === "string" ? item.label : undefined}
          >
            {item.label}
          </span>

          {/* Hash icon for active item */}
          {isActive && highlightActive && (
            <Hash className={cn(sizeStyles.icon, "text-blue-500 opacity-60")} />
          )}
        </div>

        {/* Render children if not collapsed */}
        {hasChildren && !isCollapsed && showNested && (
          <div className="relative">
            {item.children!.map((child, childIndex) =>
              renderItem({ ...child, level: item.level + 1 }, childIndex)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      ref={containerRef}
      className={containerClasses}
      style={containerStyle}
      aria-label="Table of contents"
      {...props}
    >
      {/* Title */}
      {showTitle && title && (
        <div className={cn(tocTitleStyles, sizeStyles.title)}>
          <List className={sizeStyles.icon} />
          <span>{title}</span>
        </div>
      )}

      {/* Items */}
      <div
        className={cn(tocScrollAreaStyles, "flex-1")}
        style={{
          maxHeight:
            typeof height === "number" ? `${height - 60}px` : undefined,
        }}
      >
        <div className="space-y-1 p-1" style={{ gap: `${itemGap}px` }}>
          {flatItems.map((item, index) => renderItem(item, index))}
        </div>
      </div>

      <style>{`
        ${tocAnimations}
      `}</style>
    </nav>
  );
};

TableOfContents.displayName = "TableOfContents";
