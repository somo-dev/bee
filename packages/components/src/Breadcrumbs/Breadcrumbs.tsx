import React, { useState } from "react";
import {
  ChevronRight,
  Slash,
  ArrowRight,
  Dot,
  Home,
  MoreHorizontal,
} from "lucide-react";
import { BreadcrumbsProps, BreadcrumbItem } from "./Breadcrumbs.types";
import {
  breadcrumbVariants,
  breadcrumbSizes,
  breadcrumbItemStyles,
  separatorStyles,
  iconSizes,
  ellipsisButtonStyles,
} from "./Breadcrumbs.styles";
import { cn } from "../utils/cn";

const separatorIcons = {
  slash: Slash,
  chevron: ChevronRight,
  arrow: ArrowRight,
  dot: Dot,
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  variant = "default",
  size = "md",
  separator = "chevron",
  customSeparator,
  maxItems,
  showHomeIcon = false,
  homeIcon,
  onItemClick,
  className,
  children,
  ...props
}) => {
  const [showAllItems, setShowAllItems] = useState(false);

  // Handle item collapsing
  const shouldCollapse = maxItems && items.length > maxItems && !showAllItems;
  const displayItems = shouldCollapse
    ? [...items.slice(0, 1), ...items.slice(-(maxItems - 1))]
    : items;

  const renderSeparator = (index: number) => {
    if (separator === "custom" && customSeparator) {
      return (
        <span key={`separator-${index}`} className={separatorStyles.custom}>
          {React.cloneElement(customSeparator, {
            className: cn(iconSizes[size], customSeparator.props.className),
          })}
        </span>
      );
    }

    // Only access separatorIcons for non-custom separators
    if (separator !== "custom") {
      const SeparatorIcon =
        separatorIcons[separator as keyof typeof separatorIcons];
      return (
        <SeparatorIcon
          key={`separator-${index}`}
          className={cn(iconSizes[size], separatorStyles[separator])}
          aria-hidden="true"
        />
      );
    }

    // Fallback for custom separator without customSeparator prop
    return null;
  };

  const renderEllipsis = () => (
    <button
      key="ellipsis"
      onClick={() => setShowAllItems(true)}
      className={cn(ellipsisButtonStyles, breadcrumbSizes[size])}
      aria-label="Show all breadcrumb items"
      title="Show all items"
    >
      <MoreHorizontal className={iconSizes[size]} />
    </button>
  );

  const renderBreadcrumbItem = (
    item: BreadcrumbItem,
    index: number,
    isLast: boolean
  ) => {
    const isDisabled = item.disabled;
    const isCurrent = isLast && !item.href;

    let itemStyles = "";
    if (isDisabled) {
      itemStyles = breadcrumbItemStyles[variant].disabled;
    } else if (isCurrent) {
      itemStyles = breadcrumbItemStyles[variant].current;
    } else {
      itemStyles = breadcrumbItemStyles[variant].link;
    }

    const content = (
      <>
        {/* Home icon for first item */}
        {index === 0 && showHomeIcon && (
          <span className={cn(iconSizes[size], "mr-1")} aria-hidden="true">
            {homeIcon ? (
              React.cloneElement(homeIcon, {
                className: cn(iconSizes[size], homeIcon.props.className),
              })
            ) : (
              <Home className={iconSizes[size]} />
            )}
          </span>
        )}

        {/* Item icon */}
        {item.icon && (
          <span className={cn(iconSizes[size], "mr-1")} aria-hidden="true">
            {React.cloneElement(item.icon, {
              className: cn(iconSizes[size], item.icon.props.className),
            })}
          </span>
        )}

        {/* Item label */}
        <span>{item.label}</span>
      </>
    );

    const handleClick = (e: React.MouseEvent) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }

      if (onItemClick) {
        onItemClick(item, index);
      }
    };

    if (item.href && !isDisabled && !isCurrent) {
      return (
        <a
          key={`item-${index}`}
          href={item.href}
          onClick={handleClick}
          className={cn(
            itemStyles,
            breadcrumbSizes[size],
            "inline-flex items-center"
          )}
          aria-current={isCurrent ? "page" : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <span
        key={`item-${index}`}
        className={cn(
          itemStyles,
          breadcrumbSizes[size],
          "inline-flex items-center"
        )}
        aria-current={isCurrent ? "page" : undefined}
        onClick={!isDisabled ? handleClick : undefined}
      >
        {content}
      </span>
    );
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(breadcrumbVariants[variant], className)}
      {...props}
    >
      <ol className="flex items-center">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const actualIndex =
            shouldCollapse && index > 0
              ? items.length - (displayItems.length - index)
              : index;

          return (
            <li key={actualIndex} className="flex items-center">
              {/* Show ellipsis after first item if collapsed */}
              {shouldCollapse && index === 1 && (
                <>
                  {renderSeparator(0)}
                  {renderEllipsis()}
                  {renderSeparator(1)}
                </>
              )}

              {/* Regular separator for non-collapsed items */}
              {!shouldCollapse && index > 0 && renderSeparator(index - 1)}

              {/* Breadcrumb item */}
              {renderBreadcrumbItem(item, actualIndex, isLast)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = "Breadcrumbs";
