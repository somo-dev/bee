import React, { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { X, GripVertical } from "lucide-react";
import { DrawerProps } from "./Drawer.types";
import {
  drawerSizes,
  drawerPositions,
  baseDrawerStyles,
  overlayStyles,
  contentStyles,
  headerStyles,
  bodyStyles,
  footerStyles,
  closeButtonStyles,
  resizeHandleStyles,
  scrollableBodyStyles,
  drawerAnimations,
  slideInLeftAnimation,
  slideInRightAnimation,
  slideInTopAnimation,
  slideInBottomAnimation,
  fadeInAnimation,
  scaleInAnimation,
  userProfileStyles,
  avatarStyles,
  userInfoStyles,
  userNameStyles,
  userEmailStyles,
  navigationStyles,
  navItemStyles,
  activeNavItemStyles,
  navIconStyles,
  activeNavIconStyles,
  navLabelStyles,
  settingsStyles,
  settingsItemStyles,
} from "./Drawer.styles";
import { cn } from "../../utils/cn";

// Focus trap utility
const useFocusTrap = (
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  }, [enabled, containerRef]);
};

// Body scroll lock utility
const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [locked]);
};

export const Drawer: React.FC<DrawerProps> = ({
  opened,
  onClose,
  position = "left",
  size = "md",
  color,
  title,
  withCloseButton = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  trapFocus = true,
  withOverlay = true,
  overlayOpacity = 0.6,
  overlayColor = "#000000",
  transitionDuration = 300,
  zIndex = 1000,
  resizable = false,
  minSize = 200,
  maxSize = 800,
  header,
  footer,
  withShadow = true,
  radius,
  lockScroll = true,
  styles,
  onOpen,
  onOpened,
  onClosing,
  onClosed,
  closeIcon,
  scrollable = true,
  padding = "md",
  children,
  className,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSize, setCurrentSize] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const resizeStartRef = useRef<{ size: number; mouse: number } | null>(null);

  // Focus trap
  useFocusTrap(trapFocus && opened, contentRef);

  // Body scroll lock
  useBodyScrollLock(lockScroll && opened);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !opened) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeOnEscape, opened, onClose]);

  // Handle animation lifecycle
  useEffect(() => {
    if (opened) {
      setIsAnimating(true);
      onOpen?.();

      const timer = setTimeout(() => {
        setIsAnimating(false);
        onOpened?.();
      }, transitionDuration);

      return () => clearTimeout(timer);
    } else {
      onClosing?.();

      const timer = setTimeout(() => {
        onClosed?.();
      }, transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [opened, transitionDuration, onOpen, onOpened, onClosing, onClosed]);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnClickOutside && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnClickOutside, onClose]
  );

  // Resize functionality
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      if (!resizable) return;

      e.preventDefault();
      setIsResizing(true);

      const rect = contentRef.current?.getBoundingClientRect();
      if (!rect) return;

      const isHorizontal = position === "left" || position === "right";
      const currentSize = isHorizontal ? rect.width : rect.height;
      const mousePos = isHorizontal ? e.clientX : e.clientY;

      resizeStartRef.current = { size: currentSize, mouse: mousePos };
    },
    [resizable, position]
  );

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizeStartRef.current) return;

      const isHorizontal = position === "left" || position === "right";
      const mousePos = isHorizontal ? e.clientX : e.clientY;
      const delta = mousePos - resizeStartRef.current.mouse;

      let newSize = resizeStartRef.current.size;
      if (position === "left" || position === "top") {
        newSize += delta;
      } else {
        newSize -= delta;
      }

      newSize = Math.max(minSize, Math.min(maxSize, newSize));
      setCurrentSize(newSize);
    },
    [isResizing, position, minSize, maxSize]
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    resizeStartRef.current = null;
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);

      return () => {
        document.removeEventListener("mousemove", handleResizeMove);
        document.removeEventListener("mouseup", handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  // Get size value
  const getSizeValue = (): string => {
    if (currentSize) {
      const isHorizontal = position === "left" || position === "right";
      return isHorizontal ? `${currentSize}px` : `${currentSize}px`;
    }

    if (typeof size === "number") {
      return `${size}px`;
    }

    const sizeStyles = drawerSizes[size];
    const isHorizontal = position === "left" || position === "right";
    return isHorizontal ? sizeStyles.width : sizeStyles.height;
  };

  // Get padding value
  const getPaddingValue = (): string => {
    if (typeof padding === "number") {
      return `${padding}px`;
    }
    return drawerSizes[padding].padding;
  };

  if (!opened) return null;

  const sizeStyles =
    typeof size === "string" ? drawerSizes[size] : drawerSizes.md;
  const positionStyles = drawerPositions[position];

  // Generate custom styles when color prop is provided
  const getCustomStyles = (): React.CSSProperties => {
    if (!color) return {};

    return {
      "--drawer-color": color,
      backgroundColor: color,
    };
  };

  const overlayClasses = cn(overlayStyles, fadeInAnimation, styles?.overlay);

  const contentClasses = cn(
    contentStyles,
    positionStyles.content,
    {
      "shadow-2xl": withShadow,
      [slideInLeftAnimation]: position === "left",
      [slideInRightAnimation]: position === "right",
      [slideInTopAnimation]: position === "top",
      [slideInBottomAnimation]: position === "bottom",
    },
    styles?.content
  );

  const headerClasses = cn(headerStyles, sizeStyles.header, styles?.header);

  const bodyClasses = cn(
    bodyStyles,
    scrollable ? scrollableBodyStyles : "overflow-hidden",
    styles?.body
  );

  const footerClasses = cn(footerStyles, sizeStyles.header, styles?.footer);

  const drawerContent = (
    <div
      ref={drawerRef}
      className={cn(baseDrawerStyles, className)}
      style={{
        zIndex,
        transitionDuration: `${transitionDuration}ms`,
        ...getCustomStyles(),
      }}
      onClick={handleOverlayClick}
      {...props}
    >
      {/* Overlay */}
      {withOverlay && (
        <div
          className={overlayClasses}
          style={{
            backgroundColor: overlayColor || "rgba(139, 92, 246, 0.2)",
            opacity: overlayOpacity,
          }}
        />
      )}

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(contentClasses, positionStyles.container)}
        style={{
          width:
            position === "left" || position === "right"
              ? getSizeValue()
              : undefined,
          height:
            position === "top" || position === "bottom"
              ? getSizeValue()
              : undefined,
          borderRadius: radius ? `${radius}px` : undefined,
          transitionDuration: `${transitionDuration}ms`,
          ...getCustomStyles(),
        }}
      >
        {/* Resize Handle */}
        {resizable && (
          <div
            className={cn(
              resizeHandleStyles,
              position === "left"
                ? "right-0 top-0 bottom-0 w-1 cursor-col-resize"
                : "",
              position === "right"
                ? "left-0 top-0 bottom-0 w-1 cursor-col-resize"
                : "",
              position === "top"
                ? "bottom-0 left-0 right-0 h-1 cursor-row-resize"
                : "",
              position === "bottom"
                ? "top-0 left-0 right-0 h-1 cursor-row-resize"
                : ""
            )}
            onMouseDown={handleResizeStart}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <GripVertical className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        )}

        {/* Header */}
        {(title || header || withCloseButton) && (
          <div className={headerClasses}>
            <div className="flex-1">
              {header || (
                <h2 className={cn(sizeStyles.title, "text-gray-900")}>
                  {title}
                </h2>
              )}
            </div>

            {withCloseButton && (
              <button
                onClick={onClose}
                className={cn(closeButtonStyles, sizeStyles.closeButton)}
                aria-label="Close drawer"
              >
                {closeIcon ? (
                  React.cloneElement(closeIcon, {
                    className: cn("w-5 h-5", closeIcon.props.className),
                  })
                ) : (
                  <X className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={bodyClasses}>{children}</div>

        {/* Footer */}
        {footer && <div className={footerClasses}>{footer}</div>}
      </div>

      <style jsx>{`
        ${drawerAnimations}
      `}</style>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

Drawer.displayName = "Drawer";
