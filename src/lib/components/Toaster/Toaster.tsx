import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2,
} from "lucide-react";
import { ToasterProps, Toast, ToastType } from "./Toaster.types";
import {
  toastTypes,
  toastSizes,
  toastPositions,
  baseToasterStyles,
  baseToastStyles,
  toastContentStyles,
  toastHeaderStyles,
  toastActionsStyles,
  closeButtonStyles,
  actionButtonStyles,
  progressBarStyles,
  progressFillStyles,
  loadingSpinnerStyles,
  stackedToastStyles,
  expandedToastStyles,
  toasterAnimations,
  slideInRightAnimation,
  slideInLeftAnimation,
  slideInDownAnimation,
  slideInUpAnimation,
  fadeInAnimation,
  bounceInAnimation,
} from "./Toaster.styles";
import { cn } from "../../utils/cn";

// Default icons for each toast type
const defaultIcons: Record<ToastType, React.ReactElement> = {
  info: <Info />,
  success: <CheckCircle />,
  warning: <AlertTriangle />,
  error: <XCircle />,
  loading: <Loader2 />,
};

export const Toaster: React.FC<ToasterProps> = ({
  toasts = [],
  position = "top-right",
  maxToasts = 5,
  gap = 8,
  size = "md",
  reverseOrder = false,
  containerStyle,
  expandOnHover = true,
  offset = { top: 16, bottom: 16, left: 16, right: 16 },
  animationDuration = 300,
  pauseOnHover = true,
  pauseOnFocusLoss = true,
  renderToast,
  onDismiss,
  className,
  ...props
}) => {
  const [dismissingToasts, setDismissingToasts] = useState<Set<string>>(
    new Set()
  );
  const [hoveredToast, setHoveredToast] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const progressRef = useRef<Map<string, { start: number; duration: number }>>(
    new Map()
  );

  // Handle window focus/blur for pause functionality
  useEffect(() => {
    if (!pauseOnFocusLoss) return;

    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [pauseOnFocusLoss]);

  // Auto-dismiss logic
  const startTimer = useCallback((toast: Toast) => {
    if (toast.duration === 0) return;

    const duration = toast.duration || 4000;
    const startTime = Date.now();

    progressRef.current.set(toast.id, { start: startTime, duration });

    const timer = setTimeout(() => {
      handleDismiss(toast.id);
    }, duration);

    timersRef.current.set(toast.id, timer);
  }, []);

  const clearTimer = useCallback((toastId: string) => {
    const timer = timersRef.current.get(toastId);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(toastId);
    }
    progressRef.current.delete(toastId);
  }, []);

  const pauseTimer = useCallback(
    (toastId: string) => {
      clearTimer(toastId);
    },
    [clearTimer]
  );

  const resumeTimer = useCallback((toast: Toast) => {
    if (toast.duration === 0) return;

    const progress = progressRef.current.get(toast.id);
    if (!progress) return;

    const elapsed = Date.now() - progress.start;
    const remaining = Math.max(0, progress.duration - elapsed);

    if (remaining > 0) {
      const timer = setTimeout(() => {
        handleDismiss(toast.id);
      }, remaining);

      timersRef.current.set(toast.id, timer);
    }
  }, []);

  // Handle dismiss
  const handleDismiss = useCallback(
    (toastId: string) => {
      setDismissingToasts((prev) => {
        const newSet = new Set(prev);
        newSet.add(toastId);
        return newSet;
      });
      clearTimer(toastId);

      setTimeout(() => {
        onDismiss?.(toastId);
        setDismissingToasts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(toastId);
          return newSet;
        });
      }, animationDuration);
    },
    [onDismiss, animationDuration, clearTimer]
  );

  // Handle hover events
  const handleMouseEnter = useCallback(
    (toastId: string) => {
      if (expandOnHover) {
        setHoveredToast(toastId);
      }
      if (pauseOnHover) {
        setIsPaused(true);
        const toast = toasts.find((t) => t.id === toastId);
        if (toast) {
          pauseTimer(toastId);
        }
      }
    },
    [expandOnHover, pauseOnHover, toasts, pauseTimer]
  );

  const handleMouseLeave = useCallback(
    (toastId: string) => {
      if (expandOnHover) {
        setHoveredToast(null);
      }
      if (pauseOnHover) {
        setIsPaused(false);
        const toast = toasts.find((t) => t.id === toastId);
        if (toast && isWindowFocused) {
          resumeTimer(toast);
        }
      }
    },
    [expandOnHover, pauseOnHover, toasts, isWindowFocused, resumeTimer]
  );

  // Start timers for new toasts
  useEffect(() => {
    toasts.forEach((toast) => {
      if (!timersRef.current.has(toast.id) && !dismissingToasts.has(toast.id)) {
        if (!isPaused && isWindowFocused) {
          startTimer(toast);
        }
      }
    });

    // Clean up timers for removed toasts
    const currentToastIds = new Set(toasts.map((t) => t.id));
    timersRef.current.forEach((timer, id) => {
      if (!currentToastIds.has(id)) {
        clearTimer(id);
      }
    });
  }, [
    toasts,
    isPaused,
    isWindowFocused,
    startTimer,
    clearTimer,
    dismissingToasts,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
      progressRef.current.clear();
    };
  }, []);

  // Get visible toasts (limit by maxToasts)
  const visibleToasts = reverseOrder
    ? toasts.slice(-maxToasts).reverse()
    : toasts.slice(0, maxToasts);

  // Get position styles
  const positionStyles = toastPositions[position];
  const sizeStyles = toastSizes[size];

  // Calculate container position
  const getContainerStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      gap: `${gap}px`,
      ...containerStyle,
    };

    // Apply offsets based on position
    if (position.includes("top")) {
      style.top = `${offset.top}px`;
    }
    if (position.includes("bottom")) {
      style.bottom = `${offset.bottom}px`;
    }
    if (position.includes("left")) {
      style.left = `${offset.left}px`;
    }
    if (position.includes("right")) {
      style.right = `${offset.right}px`;
    }

    return style;
  };

  // Render individual toast
  const renderToastItem = (toast: Toast, index: number) => {
    if (renderToast) {
      return renderToast(toast, index);
    }

    const typeStyles = toastTypes[toast.type];
    const isDismissing = dismissingToasts.has(toast.id);
    const isHovered = hoveredToast === toast.id;
    const isExpanded = expandOnHover && isHovered;

    // Get progress for this toast
    const progress = progressRef.current.get(toast.id);
    const progressPercentage =
      progress && toast.duration && toast.duration > 0
        ? Math.max(
            0,
            100 - ((Date.now() - progress.start) / progress.duration) * 100
          )
        : 0;

    // Get icon
    const icon = toast.icon || defaultIcons[toast.type];

    return (
      <div
        key={toast.id}
        className={cn(
          baseToastStyles,
          typeStyles.background,
          typeStyles.border,
          typeStyles.text,
          sizeStyles.toast,
          sizeStyles.container,
          stackedToastStyles,
          {
            [expandedToastStyles]: isExpanded,
            "opacity-0 pointer-events-none": isDismissing,
          },
          fadeInAnimation,
          toast.className
        )}
        style={{
          zIndex: 1000 - index,
          animationDelay: `${index * 50}ms`,
        }}
        onMouseEnter={() => handleMouseEnter(toast.id)}
        onMouseLeave={() => handleMouseLeave(toast.id)}
        role="alert"
        aria-live="polite"
      >
        {/* Icon */}
        <div className={cn("flex-shrink-0", sizeStyles.icon, typeStyles.icon)}>
          {toast.type === "loading"
            ? React.cloneElement(icon, {
                className: cn(
                  sizeStyles.icon,
                  loadingSpinnerStyles,
                  icon.props.className
                ),
              })
            : React.cloneElement(icon, {
                className: cn(sizeStyles.icon, icon.props.className),
              })}
        </div>

        {/* Content */}
        <div className={toastContentStyles}>
          {/* Header */}
          {toast.title && (
            <div className={toastHeaderStyles}>
              <h4 className={cn(sizeStyles.title, "truncate")}>
                {toast.title}
              </h4>
            </div>
          )}

          {/* Message */}
          <div className={cn(sizeStyles.message, "leading-relaxed")}>
            {toast.message}
          </div>

          {/* Actions */}
          {toast.action && (
            <div className={toastActionsStyles}>
              <button
                onClick={toast.action.onClick}
                className={cn(actionButtonStyles, sizeStyles.action)}
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        {toast.dismissible !== false && (
          <button
            onClick={() => handleDismiss(toast.id)}
            className={cn(closeButtonStyles, "ml-2")}
            aria-label="Dismiss notification"
          >
            <X className={sizeStyles.close} />
          </button>
        )}

        {/* Progress Bar */}
        {toast.showProgress && toast.duration && toast.duration > 0 && (
          <div className={cn(progressBarStyles, sizeStyles.progress)}>
            <div
              className={cn(progressFillStyles, typeStyles.progress)}
              style={{
                width: `${progressPercentage}%`,
                transition: isPaused ? "none" : "width 100ms linear",
              }}
            />
          </div>
        )}
      </div>
    );
  };

  if (visibleToasts.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(baseToasterStyles, positionStyles.container, className)}
      style={getContainerStyle()}
      {...props}
    >
      {visibleToasts.map((toast, index) => renderToastItem(toast, index))}
      <style jsx>{`
        ${toasterAnimations}
      `}</style>
    </div>
  );
};

Toaster.displayName = "Toaster";
