import { ReactNode, ReactElement, HTMLAttributes } from "react";
import { BaseComponentProps, Size } from "../../types/common";

export type CardVariant =
  | "default"
  | "elevated"
  | "outlined"
  | "filled"
  | "glass"
  | "gradient";
export type CardShadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";
export type CardImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type CardImagePosition = "top" | "bottom" | "left" | "right";

export interface CardAction {
  /**
   * Action label
   */
  label: string;

  /**
   * Action handler
   */
  onClick: () => void;

  /**
   * Action variant
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";

  /**
   * Action size
   */
  size?: Size;

  /**
   * Action icon
   */
  icon?: ReactElement;

  /**
   * Whether action is disabled
   */
  disabled?: boolean;

  /**
   * Whether action is loading
   */
  loading?: boolean;
}

export interface CardBadge {
  /**
   * Badge text
   */
  text: string;

  /**
   * Badge color
   */
  color?: string;

  /**
   * Badge variant
   */
  variant?: "filled" | "outline" | "subtle";

  /**
   * Badge position
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export interface CardImage {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Image alt text
   */
  alt: string;

  /**
   * Image width
   */
  width?: number | string;

  /**
   * Image height
   */
  height?: number | string;

  /**
   * Image fit
   */
  fit?: CardImageFit;

  /**
   * Image position in card
   */
  position?: CardImagePosition;

  /**
   * Whether image should be clickable
   */
  clickable?: boolean;

  /**
   * Image click handler
   */
  onClick?: () => void;

  /**
   * Image overlay content
   */
  overlay?: ReactNode;

  /**
   * Whether to show overlay on hover only
   */
  overlayOnHover?: boolean;
}

export interface CardProps
  extends BaseComponentProps,
    Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Card variant
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Card size
   * @default 'md'
   */
  size?: Size;

  /**
   * Card shadow
   * @default 'md'
   */
  shadow?: CardShadow;

  /**
   * Custom border radius
   */
  radius?: number;

  /**
   * Card padding
   * @default 'md'
   */
  padding?: Size | number;

  /**
   * Whether card is interactive (hover effects)
   * @default false
   */
  interactive?: boolean;

  /**
   * Whether card is clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Card click handler
   */
  onClick?: () => void;

  /**
   * Card image configuration
   */
  image?: CardImage;

  /**
   * Card header content
   */
  header?: ReactNode;

  /**
   * Card title
   */
  title?: ReactNode;

  /**
   * Card subtitle
   */
  subtitle?: ReactNode;

  /**
   * Card description
   */
  description?: ReactNode;

  /**
   * Card content (main body)
   */
  children?: ReactNode;

  /**
   * Card footer content
   */
  footer?: ReactNode;

  /**
   * Card actions (buttons)
   */
  actions?: CardAction[];

  /**
   * Card badges
   */
  badges?: CardBadge[];

  /**
   * Card icon (in header)
   */
  icon?: ReactElement;

  /**
   * Whether card is loading
   * @default false
   */
  loading?: boolean;

  /**
   * Loading skeleton rows
   * @default 3
   */
  loadingRows?: number;

  /**
   * Whether card is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Card background color
   */
  backgroundColor?: string;

  /**
   * Card border color
   */
  borderColor?: string;

  /**
   * Gradient colors (for gradient variant)
   */
  gradientColors?: [string, string];

  /**
   * Custom styles for different sections
   */
  styles?: {
    root?: string;
    header?: string;
    image?: string;
    content?: string;
    footer?: string;
    actions?: string;
    badge?: string;
  };

  /**
   * Whether to show dividers between sections
   * @default false
   */
  withDividers?: boolean;

  /**
   * Custom divider color
   */
  dividerColor?: string;

  /**
   * Animation duration for hover effects
   * @default 200
   */
  animationDuration?: number;

  /**
   * Whether to show loading overlay
   * @default false
   */
  withLoadingOverlay?: boolean;

  /**
   * Custom loading content
   */
  loadingContent?: ReactNode;
}
