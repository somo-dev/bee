import { ReactNode, InputHTMLAttributes, ReactElement } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export type FileInputVariant = "button" | "dropzone";

// Predefined accept types for common use cases
export const FILE_ACCEPT_PRESETS = {
  // Image presets
  images: [
    "image/*",
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".tiff", ".tif", 
    ".avif", ".heic", ".heif", ".ico"
  ],
  imagesBasic: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  imagesAdvanced: [
    "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml",
    "image/bmp", "image/tiff", "image/avif", "image/heic", "image/heif"
  ],
  
  // Video presets
  videos: [
    "video/*",
    ".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv", ".3gp", ".ogv", ".m4v"
  ],
  videosBasic: [".mp4", ".avi", ".mov", ".webm"],
  
  // Audio presets
  audio: [
    "audio/*",
    ".mp3", ".wav", ".ogg", ".aac", ".flac", ".m4a", ".wma"
  ],
  audioBasic: [".mp3", ".wav", ".ogg"],
  
  // Document presets
  documents: [
    ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".csv", ".json", ".xml", ".rtf"
  ],
  documentsBasic: [".pdf", ".doc", ".docx", ".txt"],
  
  // Archive presets
  archives: [
    ".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"
  ],
  
  // All files
  all: ["*/*"]
};

export interface FileInputProps
  extends BaseComponentProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "size" | "type" | "value" | "onChange" | "accept" | "onDrop" | "onDragEnter" | "onDragLeave"
    > {
  /**
   * Current file(s) value
   */
  value?: File | File[] | null;

  /**
   * Callback when files change
   */
  onChange?: (files: File | File[] | null) => void;

  /**
   * Visual variant of the file input
   * @default 'button'
   */
  variant?: FileInputVariant;

  /**
   * Label for the file input
   */
  label?: ReactNode;

  /**
   * Description text
   */
  description?: ReactNode;

  /**
   * Error message to display
   */
  error?: ReactNode;

  /**
   * Size of the file input
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;

  /**
   * Placeholder text for dropzone
   */
  placeholder?: string;

  /**
   * Button text for button variant
   */
  buttonText?: string;

  /**
   * Accepted file types (MIME types or extensions)
   * You can also use predefined presets from FILE_ACCEPT_PRESETS
   */
  accept?: string[];

  /**
   * Whether to allow multiple files
   * @default false
   */
  multiple?: boolean;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Minimum file size in bytes
   */
  minSize?: number;

  /**
   * Maximum number of files (for multiple)
   */
  maxFiles?: number;

  /**
   * Custom file validator function
   */
  validator?: (file: File) => string | null;

  /**
   * Whether to show file preview
   * @default true
   */
  showPreview?: boolean;

  /**
   * Whether to show file size
   * @default true
   */
  showFileSize?: boolean;

  /**
   * Whether to show upload progress
   * @default false
   */
  showProgress?: boolean;

  /**
   * Custom icon for the file input
   */
  icon?: ReactElement;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Custom height for dropzone
   */
  height?: number;

  /**
   * Callback when files are dropped
   */
  onDrop?: (files: File[]) => void;

  /**
   * Callback when drag enters
   */
  onDragEnter?: () => void;

  /**
   * Callback when drag leaves
   */
  onDragLeave?: () => void;

  /**
   * Callback when file is removed
   */
  onRemove?: (file: File, index?: number) => void;

  /**
   * Callback when upload starts (automatically called when files are selected)
   */
  onUploadStart?: (files: File[]) => void;

  /**
   * Callback when upload progress updates (automatically called during upload)
   */
  onUploadProgress?: (progress: number, files: File[]) => void;

  /**
   * Callback when upload completes
   */
  onUploadComplete?: (files: File[]) => void;

  /**
   * Callback when upload fails
   */
  onUploadError?: (error: string, files: File[]) => void;

  /**
   * Custom upload function (if not provided, uses default behavior)
   */
  uploadFunction?: (files: File[], onProgress: (progress: number) => void) => Promise<void>;

  /**
   * Custom styles for different parts
   */
  styles?: {
    wrapper?: string;
    input?: string;
    button?: string;
    dropzone?: string;
    preview?: string;
    error?: string;
  };

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Custom loading text
   */
  loadingText?: string;

  /**
   * Whether to enable image optimization features
   * @default false
   */
  enableImageOptimization?: boolean;

  /**
   * Maximum image dimensions (width x height) for optimization
   */
  maxImageDimensions?: {
    width: number;
    height: number;
  };

  /**
   * Image quality for optimization (0-100)
   * @default 80
   */
  imageQuality?: number;

  /**
   * Whether to auto-rotate images based on EXIF data
   * @default true
   */
  autoRotateImages?: boolean;

  /**
   * Whether to strip EXIF data from images
   * @default false
   */
  stripExifData?: boolean;
}
