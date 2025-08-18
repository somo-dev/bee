import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload,
  File,
  X,
  AlertCircle,
  CheckCircle,
  Loader2,
  Image as ImageIcon,
  FileText,
  Music,
  Video,
  Archive,
} from "lucide-react";
import { FileInputProps } from "./FileInput.types";
import {
  fileInputVariants,
  fileInputSizes,
  labelStyles,
  descriptionStyles,
  errorStyles,
  requiredIndicatorStyles,
  filePreviewStyles,
  fileItemStyles,
  fileInfoStyles,
  fileNameStyles,
  fileSizeStyles,
  removeButtonStyles,
  progressBarStyles,
  progressFillStyles,
  loadingSpinnerStyles,
  dragActiveStyles,
  dragErrorStyles,
  fileInputAnimations,
  fadeInAnimation,
  slideInAnimation,
  shakeAnimation,
  bounceAnimation,
} from "./FileInput.styles";
import { cn } from "../utils/cn";

// Comprehensive file type mappings for better icon display
const FILE_TYPE_ICONS = {
  // Images
  'image/jpeg': ImageIcon,
  'image/jpg': ImageIcon,
  'image/png': ImageIcon,
  'image/gif': ImageIcon,
  'image/webp': ImageIcon,
  'image/svg+xml': ImageIcon,
  'image/bmp': ImageIcon,
  'image/tiff': ImageIcon,
  'image/avif': ImageIcon,
  'image/heic': ImageIcon,
  'image/heif': ImageIcon,
  
  // Videos
  'video/mp4': Video,
  'video/avi': Video,
  'video/mov': Video,
  'video/wmv': Video,
  'video/flv': Video,
  'video/webm': Video,
  'video/mkv': Video,
  'video/3gp': Video,
  'video/ogv': Video,
  
  // Audio
  'audio/mpeg': Music,
  'audio/mp3': Music,
  'audio/wav': Music,
  'audio/ogg': Music,
  'audio/aac': Music,
  'audio/flac': Music,
  'audio/m4a': Music,
  'audio/wma': Music,
  
  // Documents
  'application/pdf': FileText,
  'application/msword': FileText,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileText,
  'application/vnd.ms-excel': FileText,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileText,
  'application/vnd.ms-powerpoint': FileText,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': FileText,
  'text/plain': FileText,
  'text/csv': FileText,
  'application/json': FileText,
  'application/xml': FileText,
  
  // Archives
  'application/zip': Archive,
  'application/x-rar-compressed': Archive,
  'application/x-7z-compressed': Archive,
  'application/x-tar': Archive,
  'application/gzip': Archive,
  'application/x-bzip2': Archive,
  
  // Default
  'default': File,
} as const;

// Comprehensive MIME type patterns for validation
const MIME_TYPE_PATTERNS = {
  'image/*': /^image\//,
  'video/*': /^video\//,
  'audio/*': /^audio\//,
  'text/*': /^text\//,
  'application/*': /^application\//,
} as const;

// File type icons mapping with optimized logic
const getFileIcon = (file: File) => {
  const type = file.type.toLowerCase();
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  // First try exact MIME type match
  if (FILE_TYPE_ICONS[type as keyof typeof FILE_TYPE_ICONS]) {
    const IconComponent = FILE_TYPE_ICONS[type as keyof typeof FILE_TYPE_ICONS];
    return <IconComponent />;
  }
  
  // Fallback to extension-based detection for common formats
  const extensionMap: Record<string, React.ComponentType> = {
    // Images
    'jpg': ImageIcon,
    'jpeg': ImageIcon,
    'png': ImageIcon,
    'gif': ImageIcon,
    'webp': ImageIcon,
    'svg': ImageIcon,
    'bmp': ImageIcon,
    'tiff': ImageIcon,
    'tif': ImageIcon,
    'avif': ImageIcon,
    'heic': ImageIcon,
    'heif': ImageIcon,
    'ico': ImageIcon,
    
    // Videos
    'mp4': Video,
    'avi': Video,
    'mov': Video,
    'wmv': Video,
    'flv': Video,
    'webm': Video,
    'mkv': Video,
    '3gp': Video,
    'ogv': Video,
    'm4v': Video,
    
    // Audio
    'mp3': Music,
    'wav': Music,
    'ogg': Music,
    'aac': Music,
    'flac': Music,
    'm4a': Music,
    'wma': Music,
    
    // Documents
    'pdf': FileText,
    'doc': FileText,
    'docx': FileText,
    'xls': FileText,
    'xlsx': FileText,
    'ppt': FileText,
    'pptx': FileText,
    'txt': FileText,
    'csv': FileText,
    'json': FileText,
    'xml': FileText,
    'rtf': FileText,
    
    // Archives
    'zip': Archive,
    'rar': Archive,
    '7z': Archive,
    'tar': Archive,
    'gz': Archive,
    'bz2': Archive,
  };
  
  if (extension && extensionMap[extension]) {
    const IconComponent = extensionMap[extension];
    return <IconComponent />;
  }
  
  // Default file icon
  return <File />;
};

// Format file size with optimized precision
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Optimize precision based on size
  const precision = i <= 1 ? 0 : i === 2 ? 1 : 2;
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(precision));
  
  return `${value} ${sizes[i]}`;
};

// Optimized file type validation with comprehensive support
const validateFileType = (file: File, acceptedTypes: string[]): boolean => {
  if (!acceptedTypes.length) return true;

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.split('.').pop() || '';

  return acceptedTypes.some((acceptedType) => {
    // Handle wildcard patterns
    if (acceptedType.includes('*')) {
      const pattern = MIME_TYPE_PATTERNS[acceptedType as keyof typeof MIME_TYPE_PATTERNS];
      if (pattern) {
        return pattern.test(fileType);
      }
    }
    
    // Handle MIME type patterns (e.g., "image/*")
    if (acceptedType.includes('/')) {
      if (acceptedType.endsWith('/*')) {
        const baseType = acceptedType.slice(0, -1);
        return fileType.startsWith(baseType);
      }
      return fileType === acceptedType;
    }
    
    // Handle extension patterns (e.g., ".jpg", "jpg")
    if (acceptedType.startsWith('.')) {
      return fileExtension === acceptedType.slice(1);
    }
    
    // Handle extension without dot
    return fileExtension === acceptedType;
  });
};

// Validate file size with optimized error messages
const validateFileSize = (
  file: File,
  minSize?: number,
  maxSize?: number
): string | null => {
  if (minSize && file.size < minSize) {
    return `File size must be at least ${formatFileSize(minSize)}`;
  }

  if (maxSize && file.size > maxSize) {
    return `File size must be less than ${formatFileSize(maxSize)}`;
  }

  return null;
};

// Optimized file validation with better error handling
const validateFiles = (
  files: File[],
  accept: string[] = [],
  maxFiles?: number,
  minSize?: number,
  maxSize?: number,
  validator?: (file: File) => string | null
): string | null => {
  if (maxFiles && files.length > maxFiles) {
    return `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed`;
  }

  for (const file of files) {
    // File type validation
    if (!validateFileType(file, accept)) {
      const acceptedTypesStr = accept
        .map(type => type.startsWith('.') ? type : type.includes('*') ? type : `.${type}`)
        .join(", ");
      return `File type not allowed. Accepted types: ${acceptedTypesStr}`;
    }

    // File size validation
    const sizeError = validateFileSize(file, minSize, maxSize);
    if (sizeError) return sizeError;

    // Custom validation
    if (validator) {
      const customError = validator(file);
      if (customError) return customError;
    }
  }

  return null;
};

export const FileInput: React.FC<FileInputProps> = ({
  value,
  onChange,
  variant = "button",
  label,
  description,
  error,
  size = "md",
  disabled = false,
  required = false,
  placeholder = "Drop files here or click to browse",
  buttonText = "Choose File",
  accept = [],
  multiple = false,
  maxSize,
  minSize,
  maxFiles,
  validator,
  showPreview = true,
  showFileSize = true,
  showProgress = false,
  icon,
  radius,
  height,
  onDrop,
  onDragEnter,
  onDragLeave,
  onRemove,
  styles,
  loading = false,
  loadingText = "Uploading...",
  className,
  enableImageOptimization = false,
  maxImageDimensions,
  imageQuality = 80,
  autoRotateImages = true,
  stripExifData = false,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onUploadError,
  uploadFunction,
  ...props
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  // Use controlled or internal state
  const currentFiles = value
    ? Array.isArray(value)
      ? value
      : [value]
    : internalFiles;
  const displayError = error || validationError;

  // Default upload function
  const defaultUploadFunction = useCallback(async (files: File[], onProgress: (progress: number) => void) => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      onProgress(i);
    }
  }, []);

  // Handle automatic upload
  const handleAutoUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    onUploadStart?.(files);

    try {
      const uploadFn = uploadFunction || defaultUploadFunction;
      await uploadFn(files, (progress) => {
        setUploadProgress(progress);
        onUploadProgress?.(progress, files);
      });
      
      onUploadComplete?.(files);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      onUploadError?.(errorMessage, files);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [uploadFunction, defaultUploadFunction, onUploadStart, onUploadProgress, onUploadComplete, onUploadError]);

  // Handle file selection with optimized validation
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const validationResult = validateFiles(
        fileArray,
        accept,
        maxFiles,
        minSize,
        maxSize,
        validator
      );

      if (validationResult) {
        setValidationError(validationResult);
        return;
      }

      setValidationError(null);

      // Handle multiple file selection properly
      if (multiple) {
        // For multiple files, merge with existing files if value is controlled
        if (value !== undefined && Array.isArray(value)) {
          const existingFiles = value;
          const newFiles = [...existingFiles, ...fileArray];
          onChange?.(newFiles);
          handleAutoUpload(newFiles);
        } else {
          // For uncontrolled or single file mode
          if (value === undefined) {
            setInternalFiles(fileArray);
          }
          onChange?.(fileArray);
          handleAutoUpload(fileArray);
        }
      } else {
        // Single file mode
        if (value === undefined) {
          setInternalFiles([fileArray[0]]);
        }
        onChange?.(fileArray[0]);
        handleAutoUpload([fileArray[0]]);
      }
    },
    [accept, maxFiles, minSize, maxSize, validator, multiple, value, onChange, handleAutoUpload]
  );

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files);
    // Clear the input value to allow selecting the same file again
    if (event.target) {
      event.target.value = '';
    }
  };

  // Optimized drag event handlers
  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Don't allow drag if loading or disabled
      if (isUploading || disabled) return;

      dragCounter.current++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDragActive(true);
        onDragEnter?.();
      }
    },
    [onDragEnter, isUploading, disabled]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      dragCounter.current--;
      if (dragCounter.current === 0) {
        setDragActive(false);
        onDragLeave?.();
      }
    },
    [onDragLeave]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setDragActive(false);
      dragCounter.current = 0;

      // Don't allow drop if loading or disabled
      if (isUploading || disabled) return;

      const files = e.dataTransfer.files;
      handleFileSelect(files);
      onDrop?.(Array.from(files));
    },
    [disabled, isUploading, handleFileSelect, onDrop]
  );

  // Handle file removal
  const handleRemoveFile = useCallback(
    (fileToRemove: File, index: number) => {
      // Don't allow removal if uploading
      if (isUploading) return;

      const newFiles = currentFiles.filter((_, i) => i !== index);

      if (value === undefined) {
        setInternalFiles(newFiles);
      }

      const result = multiple
        ? newFiles
        : newFiles.length > 0
        ? newFiles[0]
        : null;
      onChange?.(result);
      onRemove?.(fileToRemove, index);

      // Clear validation error if no files
      if (newFiles.length === 0) {
        setValidationError(null);
      }
    },
    [currentFiles, multiple, value, onChange, onRemove, isUploading]
  );

  // Handle click
  const handleClick = () => {
    // Don't allow clicks if uploading or disabled
    if (isUploading || disabled || !inputRef.current) return;
    inputRef.current.click();
  };

  const styles_variant = fileInputVariants[variant];
  const sizeStyles = fileInputSizes[size];

  // Build classes with loading state
  const wrapperClasses = cn(styles_variant.wrapper, styles?.wrapper, className);

  const inputClasses = cn(styles_variant.input, styles?.input);

  const buttonClasses = cn(
    styles_variant.button,
    sizeStyles.button,
    sizeStyles.text,
    {
      "opacity-50 cursor-not-allowed": disabled || isUploading,
    },
    styles?.button
  );

  const dropzoneClasses = cn(
    styles_variant.dropzone,
    sizeStyles.dropzone,
    sizeStyles.text,
    {
      [styles_variant.activeDropzone]: dragActive && !disabled && !isUploading,
      [styles_variant.errorDropzone]: displayError && !disabled,
      "opacity-50 cursor-not-allowed": disabled || isUploading,
      [shakeAnimation]: displayError,
    },
    styles?.dropzone
  );

  // Custom styles
  const customStyle: React.CSSProperties = {
    borderRadius: radius ? `${radius}px` : undefined,
    height: height ? `${height}px` : undefined,
  };

  // Render file preview with optimized rendering
  const renderFilePreview = () => {
    if (!showPreview || currentFiles.length === 0) return null;

    return (
      <div className={cn(filePreviewStyles, fadeInAnimation)}>
        {currentFiles.map((file, index) => (
          <div
            key={`${file.name}-${index}-${file.size}`}
            className={cn(fileItemStyles, slideInAnimation)}
          >
            <div className={fileInfoStyles}>
              <span className={sizeStyles.icon}>{getFileIcon(file)}</span>
              <div className="flex-1 min-w-0">
                <div className={cn(fileNameStyles, sizeStyles.text)}>
                  {file.name}
                </div>
                {showFileSize && (
                  <div className={cn(fileSizeStyles, sizeStyles.preview)}>
                    {formatFileSize(file.size)}
                  </div>
                )}
              </div>
            </div>

            {!disabled && !isUploading && (
              <button
                type="button"
                onClick={() => handleRemoveFile(file, index)}
                className={removeButtonStyles}
                aria-label={`Remove ${file.name}`}
                disabled={isUploading}
              >
                <X className={sizeStyles.icon} />
              </button>
            )}

            {/* Progress bar */}
            {showProgress && isUploading && (
              <div className={progressBarStyles}>
                <div
                  className={progressFillStyles}
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render button variant
  const renderButton = () => (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isUploading}
      className={buttonClasses}
      style={customStyle}
    >
      {isUploading ? (
        <>
          <Loader2 className={cn(sizeStyles.icon, loadingSpinnerStyles)} />
          {loadingText}
        </>
      ) : (
        <>
          {icon ? (
            React.cloneElement(icon, { className: sizeStyles.icon })
          ) : (
            <Upload className={sizeStyles.icon} />
          )}
          {buttonText}
        </>
      )}
    </button>
  );

  // Render dropzone variant
  const renderDropzone = () => (
    <div
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={dropzoneClasses}
      style={customStyle}
      role="button"
      tabIndex={disabled || isUploading ? -1 : 0}
      aria-label="File upload area"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {isUploading ? (
        <div className="text-center">
          <Loader2
            className={cn(
              sizeStyles.icon,
              loadingSpinnerStyles,
              "mx-auto mb-2"
            )}
          />
          <p className={sizeStyles.text}>{loadingText}</p>
          {showProgress && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{uploadProgress}%</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          {icon ? (
            React.cloneElement(icon, {
              className: cn(sizeStyles.icon, "mx-auto mb-3 text-gray-400"),
            })
          ) : (
            <Upload
              className={cn(sizeStyles.icon, "mx-auto mb-3 text-gray-400")}
            />
          )}
          <p className={cn(sizeStyles.text, "text-gray-600 mb-1")}>
            {placeholder}
          </p>
          {accept.length > 0 && (
            <p className={cn(sizeStyles.preview, "text-gray-500")}>
              Accepted: {accept.join(", ")}
            </p>
          )}
          {maxSize && (
            <p className={cn(sizeStyles.preview, "text-gray-500")}>
              Max size: {formatFileSize(maxSize)}
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={wrapperClasses}>
      {/* Label */}
      {label && (
        <label className={cn(labelStyles, sizeStyles.text)}>
          {label}
          {required && <span className={requiredIndicatorStyles}>*</span>}
        </label>
      )}

      {/* Description */}
      {description && (
        <div className={cn(descriptionStyles, sizeStyles.text)}>
          {description}
        </div>
      )}

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        onChange={handleInputChange}
        disabled={disabled}
        required={required}
        multiple={multiple}
        accept={accept.join(",")}
        className={inputClasses}
        {...props}
      />

      {/* File Input UI */}
      {variant === "button" ? renderButton() : renderDropzone()}

      {/* File Preview */}
      {renderFilePreview()}

      {/* Error */}
      {displayError && (
        <div className={cn(errorStyles, sizeStyles.text, fadeInAnimation)}>
          <AlertCircle className="w-4 h-4 inline mr-1" />
          {displayError}
        </div>
      )}

      <style>{`
        ${fileInputAnimations}
      `}</style>
    </div>
  );
};

FileInput.displayName = "FileInput";
