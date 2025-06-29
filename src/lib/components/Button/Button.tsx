import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from './Button.types';
import { buttonVariants, buttonSizes, iconSizes, baseButtonStyles } from './Button.styles';
import { cn } from '../../utils/cn';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
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

    // Build class names
    const buttonClasses = cn(
      baseButtonStyles,
      buttonVariants[variant],
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

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={buttonClasses}
        aria-busy={loading}
        aria-disabled={isDisabled}
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