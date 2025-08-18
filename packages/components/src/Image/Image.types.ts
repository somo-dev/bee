import { ImgHTMLAttributes, ReactNode, CSSProperties } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export type ImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";
export type ImagePosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
export type ImageVariant =
  | "default"
  | "rounded"
  | "circular"
  | "thumbnail"
  | "polaroid";
export type ImageLoadingStrategy = "lazy" | "eager";
export type ImageOverlayPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface ImageProps
  extends BaseComponentProps,
    Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height" | "loading"> {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Alternative text for accessibility
   */
  alt: string;

  /**
   * Width of the image (number for pixels, string for CSS units)
   */
  width?: number | string;

  /**
   * Height of the image (number for pixels, string for CSS units)
   */
  height?: number | string;

  /**
   * Border radius in pixels or CSS value
   */
  radius?: number | string;

  /**
   * Image transparency (0-1)
   * @default 1
   */
  transparency?: number;

  /**
   * Overlay transparency (0-1)
   * @default 0
   */
  overlayTransparency?: number;

  /**
   * Overlay color (hex, rgb, rgba, or CSS color name)
   */
  overlayColor?: string;

  /**
   * Shadow configuration
   */
  shadow?: boolean | "sm" | "md" | "lg" | "xl" | "2xl" | string;

  /**
   * How the image should fit within its container
   * @default 'cover'
   */
  fit?: ImageFit;

  /**
   * Position of the image within its container
   * @default 'center'
   */
  position?: ImagePosition;

  /**
   * Visual variant of the image
   * @default 'default'
   */
  variant?: ImageVariant;

  /**
   * Size preset for the image
   */
  size?: Size;

  /**
   * Loading strategy
   * @default 'lazy'
   */
  loading?: ImageLoadingStrategy;

  /**
   * Placeholder content while image loads
   */
  placeholder?: ReactNode;

  /**
   * Error fallback content
   */
  fallback?: ReactNode;

  /**
   * Fallback image URL
   */
  fallbackSrc?: string;

  /**
   * Whether to show loading skeleton
   * @default true
   */
  withSkeleton?: boolean;

  /**
   * Custom skeleton color
   */
  skeletonColor?: string;

  /**
   * Overlay content
   */
  overlay?: ReactNode;

  /**
   * Position of overlay content
   * @default 'center'
   */
  overlayPosition?: ImageOverlayPosition;

  /**
   * Whether overlay should only show on hover
   * @default false
   */
  overlayOnHover?: boolean;

  /**
   * Caption text below the image
   */
  caption?: ReactNode;

  /**
   * Whether the image is clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Zoom effect on hover
   * @default false
   */
  zoomOnHover?: boolean;

  /**
   * Zoom scale factor
   * @default 1.1
   */
  zoomScale?: number;

  /**
   * Blur effect in pixels
   */
  blur?: number;

  /**
   * Brightness adjustment (0-2, 1 is normal)
   * @default 1
   */
  brightness?: number;

  /**
   * Contrast adjustment (0-2, 1 is normal)
   * @default 1
   */
  contrast?: number;

  /**
   * Saturation adjustment (0-2, 1 is normal)
   * @default 1
   */
  saturation?: number;

  /**
   * Grayscale effect (0-1)
   * @default 0
   */
  grayscale?: number;

  /**
   * Sepia effect (0-1)
   * @default 0
   */
  sepia?: number;

  /**
   * Hue rotation in degrees
   * @default 0
   */
  hueRotate?: number;

  /**
   * Invert effect (0-1)
   * @default 0
   */
  invert?: number;

  /**
   * Whether to enable progressive loading
   * @default false
   */
  progressive?: boolean;

  /**
   * Low quality placeholder image URL
   */
  placeholderSrc?: string;

  /**
   * Callback when image loads successfully
   */
  onLoad?: () => void;

  /**
   * Callback when image fails to load
   */
  onError?: () => void;

  /**
   * Callback when image is clicked
   */
  onClick?: () => void;

  /**
   * Custom styles for different parts
   */
  styles?: {
    container?: string;
    image?: string;
    overlay?: string;
    caption?: string;
    skeleton?: string;
  };

  /**
   * Whether to preload the image
   * @default false
   */
  preload?: boolean;

  /**
   * Responsive image sources
   */
  srcSet?: string;

  /**
   * Image sizes for responsive loading
   */
  sizes?: string;

  /**
   * Whether to use WebP format when supported
   * @default true
   */
  useWebP?: boolean;

  /**
   * Quality for image optimization (1-100)
   * @default 75
   */
  quality?: number;

  /**
   * Whether to enable image optimization
   * @default true
   */
  optimize?: boolean;
}
