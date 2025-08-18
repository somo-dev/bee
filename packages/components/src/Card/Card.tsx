import React, { useState, useCallback } from "react";
import { Loader2, MoreHorizontal } from "lucide-react";
import { CardProps, CardAction, CardBadge } from "./Card.types";
import {
  cardVariants,
  cardShadows,
  cardSizes,
  baseCardStyles,
  interactiveCardStyles,
  disabledCardStyles,
  headerStyles,
  titleSectionStyles,
  titleStyles,
  subtitleStyles,
  descriptionStyles,
  imageContainerStyles,
  imageStyles,
  imageOverlayStyles,
  imageOverlayContentStyles,
  contentSectionStyles,
  footerStyles,
  actionsContainerStyles,
  actionButtonStyles,
  actionVariants,
  badgeContainerStyles,
  badgePositions,
  badgeStyles,
  badgeVariants,
  loadingOverlayStyles,
  loadingSpinnerStyles,
  skeletonStyles,
  dividerStyles,
  cardAnimations,
  fadeInAnimation,
  slideInAnimation,
  scaleInAnimation,
  shimmerAnimation,
} from "./Card.styles";
import { cn } from "../utils/cn";

export const Card: React.FC<CardProps> = ({
  variant = "default",
  size = "md",
  shadow = "md",
  radius,
  padding = "md",
  interactive = false,
  clickable = false,
  onClick,
  image,
  header,
  title,
  subtitle,
  description,
  children,
  footer,
  actions = [],
  badges = [],
  icon,
  loading = false,
  loadingRows = 3,
  disabled = false,
  backgroundColor,
  borderColor,
  gradientColors,
  styles,
  withDividers = false,
  dividerColor,
  animationDuration = 200,
  withLoadingOverlay = false,
  loadingContent,
  className,
  style,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled || loading) return;
    onClick?.();
  }, [disabled, loading, onClick]);

  const handleMouseDown = useCallback(() => {
    if (clickable && !disabled) {
      setIsPressed(true);
    }
  }, [clickable, disabled]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);

  // Generate custom styles
  const getCustomStyles = (): React.CSSProperties => {
    const customStyles: React.CSSProperties = {
      transitionDuration: `${animationDuration}ms`,
    };

    if (backgroundColor) {
      customStyles.backgroundColor = backgroundColor;
    }

    if (borderColor) {
      customStyles.borderColor = borderColor;
    }

    if (radius !== undefined) {
      customStyles.borderRadius = `${radius}px`;
    }

    if (variant === "gradient" && gradientColors) {
      customStyles.background = `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`;
    }

    return customStyles;
  };

  // Get padding value
  const getPaddingValue = (): string => {
    if (typeof padding === "number") {
      return `p-[${padding}px]`;
    }
    return cardSizes[padding].padding;
  };

  const styles_variant = cardVariants[variant];
  const sizeStyles = cardSizes[size];
  const shadowClass = cardShadows[shadow];

  // Build card classes
  const cardClasses = cn(
    baseCardStyles,
    styles_variant.root,
    sizeStyles.root,
    shadowClass,
    {
      [interactiveCardStyles]: interactive || clickable,
      [disabledCardStyles]: disabled,
      "cursor-pointer": clickable && !disabled,
      "transform scale-95": isPressed,
    },
    styles?.root,
    className
  );

  // Render loading skeleton
  const renderSkeleton = () => (
    <div className={cn(getPaddingValue(), "space-y-4")}>
      {/* Header skeleton */}
      <div className="flex items-center gap-3">
        <div className={cn(skeletonStyles, "w-10 h-10 rounded-full")} />
        <div className="flex-1 space-y-2">
          <div className={cn(skeletonStyles, "h-4 w-3/4")} />
          <div className={cn(skeletonStyles, "h-3 w-1/2")} />
        </div>
      </div>

      {/* Content skeleton */}
      {Array.from({ length: loadingRows }).map((_, index) => (
        <div key={index} className={cn(skeletonStyles, "h-4 w-full")} />
      ))}

      {/* Actions skeleton */}
      <div className="flex gap-2">
        <div className={cn(skeletonStyles, "h-9 w-24 rounded-lg")} />
        <div className={cn(skeletonStyles, "h-9 w-20 rounded-lg")} />
      </div>
    </div>
  );

  // Render image section
  const renderImage = () => {
    if (!image) return null;

    const imageClasses = cn(imageStyles, {
      "cursor-pointer": image.clickable,
    });

    const containerClasses = cn(imageContainerStyles, {
      "rounded-t-lg": image.position === "top",
      "rounded-b-lg": image.position === "bottom",
      "rounded-l-lg": image.position === "left",
      "rounded-r-lg": image.position === "right",
    });

    return (
      <div className={cn(containerClasses, styles?.image)}>
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={imageClasses}
          style={{
            objectFit: image.fit || "cover",
          }}
          onClick={image.clickable ? image.onClick : undefined}
        />

        {/* Image overlay */}
        {image.overlay && (
          <div
            className={cn(imageOverlayStyles, {
              "opacity-0 hover:opacity-100": image.overlayOnHover,
            })}
          >
            <div className={imageOverlayContentStyles}>{image.overlay}</div>
          </div>
        )}
      </div>
    );
  };

  // Render badges
  const renderBadges = () => {
    if (badges.length === 0) return null;

    return badges.map((badge, index) => (
      <div
        key={index}
        className={cn(
          badgeContainerStyles,
          badgePositions[badge.position || "top-right"]
        )}
      >
        <span
          className={cn(
            badgeStyles,
            sizeStyles.badge,
            badgeVariants[badge.variant || "filled"],
            styles?.badge
          )}
          style={{
            backgroundColor: badge.color || "#3B82F6",
            borderColor: badge.color || "#3B82F6",
          }}
        >
          {badge.text}
        </span>
      </div>
    ));
  };

  // Render header section
  const renderHeader = () => {
    if (!header && !title && !subtitle && !icon) return null;

    return (
      <div className={cn(headerStyles, styles?.header)}>
        <div className={titleSectionStyles}>
          {icon && (
            <div className={sizeStyles.icon}>
              {React.cloneElement(icon, {
                className: cn(sizeStyles.icon, icon.props.className),
              })}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {title && (
              <h3 className={cn(titleStyles, sizeStyles.title)}>{title}</h3>
            )}
            {subtitle && (
              <p className={cn(subtitleStyles, sizeStyles.subtitle)}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {header && <div className="flex-shrink-0">{header}</div>}
      </div>
    );
  };

  // Render actions
  const renderActions = () => {
    if (actions.length === 0) return null;

    return (
      <div className={cn(actionsContainerStyles, styles?.actions)}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled || disabled}
            className={cn(
              actionButtonStyles,
              actionVariants[action.variant || "primary"],
              sizeStyles.action,
              {
                "opacity-50 cursor-not-allowed": action.disabled,
              }
            )}
          >
            {action.loading ? (
              <Loader2 className={cn(sizeStyles.icon, "animate-spin")} />
            ) : action.icon ? (
              React.cloneElement(action.icon, {
                className: cn(sizeStyles.icon, action.icon.props.className),
              })
            ) : null}
            {action.label}
          </button>
        ))}
      </div>
    );
  };

  // Render divider
  const renderDivider = () => {
    if (!withDividers) return null;

    return (
      <hr className={dividerStyles} style={{ borderColor: dividerColor }} />
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div
        className={cardClasses}
        style={{ ...getCustomStyles(), ...style }}
        {...props}
      >
        {renderSkeleton()}
        <style>{`
          ${cardAnimations}
        `}</style>
      </div>
    );
  }

  return (
    <div
      className={cardClasses}
      style={{ ...getCustomStyles(), ...style }}
      onClick={clickable ? handleClick : undefined}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      role={clickable ? "button" : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      {...props}
    >
      {/* Badges */}
      {renderBadges()}

      {/* Image Section */}
      {image && image.position === "top" && renderImage()}

      {/* Card Content */}
      <div
        className={cn(getPaddingValue(), contentSectionStyles, styles?.content)}
      >
        {/* Header Section */}
        {renderHeader()}

        {withDividers && (title || subtitle || header) && renderDivider()}

        {/* Description */}
        {description && (
          <div
            className={cn(
              descriptionStyles,
              sizeStyles.description,
              slideInAnimation
            )}
          >
            {description}
          </div>
        )}

        {withDividers && description && renderDivider()}

        {/* Main Content */}
        {children && <div className={fadeInAnimation}>{children}</div>}

        {withDividers && children && renderDivider()}

        {/* Footer Section */}
        {footer && (
          <div className={cn(footerStyles, styles?.footer, slideInAnimation)}>
            {footer}
          </div>
        )}

        {/* Actions Section */}
        {actions.length > 0 && (
          <>
            {withDividers && renderDivider()}
            <div className={scaleInAnimation}>{renderActions()}</div>
          </>
        )}
      </div>

      {/* Image Section (other positions) */}
      {image && image.position !== "top" && renderImage()}

      {/* Loading Overlay */}
      {withLoadingOverlay && loading && (
        <div className={loadingOverlayStyles}>
          {loadingContent || (
            <Loader2 className={cn(loadingSpinnerStyles, sizeStyles.icon)} />
          )}
        </div>
      )}

      <style>{`
        ${cardAnimations}
      `}</style>
    </div>
  );
};

Card.displayName = "Card";
