import React, { useState, useRef, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  Circle,
  GitBranch,
  GitCommit,
  GitPullRequest,
  MessageSquare,
  Package,
  User,
  Calendar,
  Activity,
} from "lucide-react";
import { TimelineProps, TimelineItem } from "./Timeline.types";
import {
  timelineVariants,
  timelineSizes,
  timelineAlignments,
  titleStyles,
  descriptionStyles,
  timestampStyles,
  activeItemStyles,
  completedItemStyles,
  disabledItemStyles,
  interactiveItemStyles,
  numberBadgeStyles,
  skeletonStyles,
  emptyStateStyles,
  timelineAnimations,
  slideInLeftAnimation,
  slideInRightAnimation,
  fadeInUpAnimation,
  scaleInAnimation,
  drawLineAnimation,
  pulseAnimation,
} from "./Timeline.styles";
import { cn } from "../../utils/cn";

// Default icon mapping for common timeline events
const defaultIcons = {
  branch: GitBranch,
  commit: GitCommit,
  pullrequest: GitPullRequest,
  review: MessageSquare,
  release: Package,
  user: User,
  calendar: Calendar,
  activity: Activity,
  completed: CheckCircle,
  pending: Circle,
  clock: Clock,
};

export const Timeline: React.FC<TimelineProps> = ({
  items = [],
  variant = "default",
  size = "md",
  align = "left",
  lineColor = "#e5e7eb",
  lineWidth = 2,
  lineType = "solid",
  bulletColor = "#6366f1",
  bulletSize = 12,
  showLine = true,
  showTimestamp = true,
  interactive = false,
  showNumbers = false,
  reverse = false,
  itemSpacing = 24,
  animateOnScroll = false,
  onItemClick,
  styles,
  emptyState,
  loading = false,
  loadingItems = 3,
  className,
  ...props
}) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle scroll animations
  useEffect(() => {
    if (!animateOnScroll) {
      setVisibleItems(new Set(items.map((_, index) => index)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [items, animateOnScroll]);

  const handleItemClick = (item: TimelineItem, index: number) => {
    if (interactive && !item.disabled && onItemClick) {
      onItemClick(item, index);
    }
  };

  // Get icon for item
  const getItemIcon = (item: TimelineItem) => {
    if (item.icon) return item.icon;

    // Auto-detect icon based on title content
    const title = String(item.title).toLowerCase();
    if (title.includes("branch")) return <GitBranch />;
    if (title.includes("commit")) return <GitCommit />;
    if (title.includes("pull") || title.includes("request"))
      return <GitPullRequest />;
    if (title.includes("review")) return <MessageSquare />;
    if (title.includes("release")) return <Package />;

    // Default based on status
    if (item.completed) return <CheckCircle />;
    if (item.active) return <Activity />;

    return <Circle />;
  };

  // Get bullet color
  const getBulletColor = (item: TimelineItem) => {
    if (item.color) return item.color;
    if (item.completed) return "#10b981"; // green
    if (item.active) return "#3b82f6"; // blue
    return bulletColor;
  };

  // Render skeleton loading
  const renderSkeleton = () => {
    return Array.from({ length: loadingItems }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className={cn(styles_variant.item, sizeStyles.spacing)}
      >
        <div
          className={cn(
            styles_variant.bullet,
            sizeStyles.bullet,
            skeletonStyles
          )}
        />
        <div className={styles_variant.content}>
          <div className={cn(skeletonStyles, "h-4 w-32 mb-2")} />
          <div className={cn(skeletonStyles, "h-3 w-48 mb-1")} />
          <div className={cn(skeletonStyles, "h-3 w-24")} />
        </div>
      </div>
    ));
  };

  // Render timeline item
  const renderItem = (item: TimelineItem, index: number) => {
    const isVisible = visibleItems.has(index);
    const isLast = index === items.length - 1;
    const itemColor = getBulletColor(item);
    const icon = getItemIcon(item);

    const itemClasses = cn(
      styles_variant.item,
      sizeStyles.spacing,
      alignmentStyles.item,
      {
        [activeItemStyles]: item.active,
        [completedItemStyles]: item.completed,
        [disabledItemStyles]: item.disabled,
        [interactiveItemStyles]: interactive && !item.disabled,
        [slideInLeftAnimation]:
          animateOnScroll && isVisible && align === "left",
        [slideInRightAnimation]:
          animateOnScroll && isVisible && align === "right",
        [fadeInUpAnimation]: animateOnScroll && isVisible && align === "center",
      },
      styles?.item,
      item.className
    );

    const bulletClasses = cn(
      styles_variant.bullet,
      sizeStyles.bullet,
      {
        [scaleInAnimation]: animateOnScroll && isVisible,
        [pulseAnimation]: item.active,
      },
      styles?.bullet
    );

    return (
      <div
        key={item.id}
        ref={(el) => (itemRefs.current[index] = el)}
        data-index={index}
        className={itemClasses}
        onClick={() => handleItemClick(item, index)}
        style={{
          paddingBottom: isLast ? 0 : `${itemSpacing}px`,
          opacity: animateOnScroll && !isVisible ? 0 : 1,
        }}
      >
        {/* Timeline Line */}
        {showLine && !isLast && (
          <div
            className={cn(
              styles_variant.line,
              sizeStyles.lineOffset,
              {
                [drawLineAnimation]: animateOnScroll && isVisible,
              },
              styles?.line
            )}
            style={{
              backgroundColor: lineColor,
              width: `${lineWidth}px`,
              borderStyle: lineType,
              transform: `translateX(${
                (sizeStyles.bulletSize - lineWidth) / 2
              }px)`,
            }}
          />
        )}

        {/* Bullet */}
        <div className="relative">
          <div
            className={bulletClasses}
            style={{
              backgroundColor: variant === "filled" ? itemColor : "white",
              borderColor: itemColor,
              width: item.bulletSize || bulletSize,
              height: item.bulletSize || bulletSize,
            }}
          >
            {React.cloneElement(icon, {
              className: cn(
                sizeStyles.icon,
                variant === "filled" ? "text-white" : "",
                icon.props.className
              ),
              style: { color: variant !== "filled" ? itemColor : undefined },
            })}
          </div>

          {/* Number Badge */}
          {showNumbers && <div className={numberBadgeStyles}>{index + 1}</div>}
        </div>

        {/* Content */}
        <div
          className={cn(
            styles_variant.content,
            alignmentStyles.content,
            styles?.content
          )}
        >
          {/* Title */}
          <div className={cn(titleStyles, sizeStyles.title)}>{item.title}</div>

          {/* Description */}
          {item.description && (
            <div className={cn(descriptionStyles, sizeStyles.description)}>
              {item.description}
            </div>
          )}

          {/* Timestamp */}
          {showTimestamp && item.timestamp && (
            <div
              className={cn(
                timestampStyles,
                sizeStyles.timestamp,
                "mt-2",
                styles?.timestamp
              )}
            >
              {item.timestamp}
            </div>
          )}

          {/* Additional Content */}
          {item.children && <div className="mt-3">{item.children}</div>}
        </div>
      </div>
    );
  };

  const styles_variant = timelineVariants[variant];
  const sizeStyles = timelineSizes[size];
  const alignmentStyles = timelineAlignments[align];

  const processedItems = reverse ? [...items].reverse() : items;

  // Empty state
  if (!loading && items.length === 0) {
    return (
      <div
        className={cn(styles_variant.root, alignmentStyles.root, className)}
        {...props}
      >
        <div className={emptyStateStyles}>
          {emptyState || (
            <>
              <Clock className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-center text-gray-500">
                No timeline items to display
              </p>
            </>
          )}
        </div>
        <style jsx>{`
          ${timelineAnimations}
        `}</style>
      </div>
    );
  }

  return (
    <div
      ref={timelineRef}
      className={cn(
        styles_variant.root,
        alignmentStyles.root,
        styles?.root,
        className
      )}
      {...props}
    >
      {loading ? renderSkeleton() : processedItems.map(renderItem)}
      <style jsx>{`
        ${timelineAnimations}
      `}</style>
    </div>
  );
};

Timeline.displayName = "Timeline";
