import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from './Button.types';
import { buttonVariants, buttonSizes, iconSizes, baseButtonStyles } from './Button.styles';
import { cn } from '../../utils/cn';

// Helper function to darken a color
const darkenColor = (color: string, amount: number = 20): string => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
    const b = Math.max(0, (num & 0x0000FF) - amount);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
  
  // Handle rgb/rgba colors
  if (color.startsWith('rgb')) {
    const matches = color.match(/\d+/g);
    if (matches && matches.length >= 3) {
      const r = Math.max(0, parseInt(matches[0]) - amount);
      const g = Math.max(0, parseInt(matches[1]) - amount);
      const b = Math.max(0, parseInt(matches[2]) - amount);
      const a = matches[3] ? parseFloat(matches[3]) : 1;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
  }
  
  // For named colors or other formats, return as-is
  return color;
};

// Helper function to add opacity to a color
const addOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  if (color.startsWith('rgb')) {
    const matches = color.match(/\d+/g);
    if (matches && matches.length >= 3) {
      const r = parseInt(matches[0]);
      const g = parseInt(matches[1]);
      const b = parseInt(matches[2]);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }
  
  return color;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      color,
      fullWidth = false,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      iconOnly = false,
      className,
      children,
      disabled,
      type = 'button',
      style,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    
    // Determine what content to show
    const buttonContent = loading && loadingText ? loadingText : children;
    const showLeftIcon = leftIcon && !loading;
    const showRightIcon = rightIcon && !loading;
    const showLoadingIcon = loading;

    // Generate custom styles when color prop is provided
    const getCustomStyles = (): React.CSSProperties => {
      if (!color) return {};
      
      const hoverColor = darkenColor(color, 20);
      const focusRingColor = addOpacity(color, 0.2);
      
      const baseCustomStyles: React.CSSProperties = {
        '--tw-ring-color': focusRingColor,
      };
      
      switch (variant) {
        case 'primary':
          return {
            ...baseCustomStyles,
            backgroundColor: color,
            borderColor: color,
            color: 'white',
          };
          
        case 'secondary':
          return {
            ...baseCustomStyles,
            backgroundColor: addOpacity(color, 0.1),
            borderColor: addOpacity(color, 0.2),
            color: color,
          };
          
        case 'outline':
          return {
            ...baseCustomStyles,
            backgroundColor: 'transparent',
            borderColor: color,
            color: color,
          };
          
        case 'ghost':
          return {
            ...baseCustomStyles,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: color,
          };
          
        case 'danger':
          return {
            ...baseCustomStyles,
            backgroundColor: color,
            borderColor: color,
            color: 'white',
          };
          
        default:
          return baseCustomStyles;
      }
    };

    // Generate hover styles
    const getHoverStyles = (): React.CSSProperties => {
      if (!color) return {};
      
      const hoverColor = darkenColor(color, 20);
      
      switch (variant) {
        case 'primary':
        case 'danger':
          return {
            '--hover-bg-color': hoverColor,
            '--hover-border-color': hoverColor,
          };
          
        case 'secondary':
          return {
            '--hover-bg-color': addOpacity(color, 0.15),
            '--hover-border-color': addOpacity(color, 0.3),
            '--hover-text-color': hoverColor,
          };
          
        case 'outline':
          return {
            '--hover-bg-color': color,
            '--hover-border-color': color,
            '--hover-text-color': 'white',
          };
          
        case 'ghost':
          return {
            '--hover-bg-color': addOpacity(color, 0.1),
            '--hover-text-color': hoverColor,
          };
          
        default:
          return {};
      }
    };

    // Build class names - exclude default variant styles when custom color is used
    const buttonClasses = cn(
      baseButtonStyles,
      !color && buttonVariants[variant], // Only use default styles when no custom color
      buttonSizes[size],
      {
        'w-full': fullWidth,
        'gap-0': iconOnly,
        'gap-2': !iconOnly && (showLeftIcon || showRightIcon || showLoadingIcon)
      },
      className
    );

    // Icon sizing
    const iconSizeClass = iconSizes[size];

    // Combine all styles
    const combinedStyles: React.CSSProperties = {
      ...getCustomStyles(),
      ...getHoverStyles(),
      ...style,
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={buttonClasses}
        style={combinedStyles}
        aria-busy={loading}
        aria-disabled={isDisabled}
        onMouseEnter={(e) => {
          if (color && !isDisabled) {
            const target = e.currentTarget;
            const hoverBg = combinedStyles['--hover-bg-color'] as string;
            const hoverBorder = combinedStyles['--hover-border-color'] as string;
            const hoverText = combinedStyles['--hover-text-color'] as string;
            
            if (hoverBg) target.style.backgroundColor = hoverBg;
            if (hoverBorder) target.style.borderColor = hoverBorder;
            if (hoverText) target.style.color = hoverText;
          }
        }}
        onMouseLeave={(e) => {
          if (color && !isDisabled) {
            const target = e.currentTarget;
            const originalStyles = getCustomStyles();
            
            target.style.backgroundColor = originalStyles.backgroundColor as string || '';
            target.style.borderColor = originalStyles.borderColor as string || '';
            target.style.color = originalStyles.color as string || '';
          }
        }}
        {...props}
      >
        {showLoadingIcon && (
          <Loader2 
            className={cn(iconSizeClass, 'animate-spin')} 
            aria-hidden="true"
          />
        )}
        
        {showLeftIcon && (
          <span className={iconSizeClass} aria-hidden="true">
            {React.cloneElement(leftIcon, {
              className: cn(iconSizeClass, leftIcon.props.className)
            })}
          </span>
        )}
        
        {!iconOnly && buttonContent && (
          <span className={loading ? 'opacity-70' : ''}>
            {buttonContent}
          </span>
        )}
        
        {showRightIcon && (
          <span className={iconSizeClass} aria-hidden="true">
            {React.cloneElement(rightIcon, {
              className: cn(iconSizeClass, rightIcon.props.className)
            })}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';