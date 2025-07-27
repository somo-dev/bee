"use client";

import React, { useState } from "react";
import { FileInput } from "@/lib/components/FileInput";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { FILE_ACCEPT_PRESETS } from "@/lib/components/FileInput/FileInput.types";
import {
  Copy,
  Check,
  Settings,
  Upload,
  File,
  Image as ImageIcon,
  FileText,
  Music,
  Video,
  Archive,
  Camera,
  Folder,
  Download,
} from "lucide-react";

export default function FileInputPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("button");
  const [size, setSize] = useState("md");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showFileSize, setShowFileSize] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptImages, setAcceptImages] = useState(true);
  const [acceptDocuments, setAcceptDocuments] = useState(false);
  const [acceptVideos, setAcceptVideos] = useState(false);
  const [maxSize, setMaxSize] = useState(5); // MB
  const [maxFiles, setMaxFiles] = useState(3);
  const [radius, setRadius] = useState(8);
  const [height, setHeight] = useState(160);

  // Demo state
  const [files, setFiles] = useState<File | File[] | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  // Size labels for slider
  const sizeLabels = ["xs", "sm", "md", "lg", "xl"];
  const sizeValues = ["sm", "md", "lg", "xl"];

  const copyCode = async (code: string, key: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  // Generate accept array based on selections with improved image support
  const getAcceptTypes = () => {
    const types: string[] = [];
    if (acceptImages) types.push(...FILE_ACCEPT_PRESETS.images);
    if (acceptDocuments) types.push(...FILE_ACCEPT_PRESETS.documents);
    if (acceptVideos) types.push(...FILE_ACCEPT_PRESETS.videos);
    return types;
  };

  const generateCode = () => {
    const props = [];
    if (variant !== "button") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");
    if (required) props.push("required");
    if (multiple) props.push("multiple");
    if (!showPreview) props.push("showPreview={false}");
    if (!showFileSize) props.push("showFileSize={false}");
    if (showProgress) props.push("showProgress");
    if (loading) props.push("loading");

    const acceptTypes = getAcceptTypes();
    if (acceptTypes.length > 0) {
      props.push(`accept={${JSON.stringify(acceptTypes)}}`);
    }

    if (maxSize !== 5) props.push(`maxSize={${maxSize * 1024 * 1024}}`);
    if (maxFiles !== 3 && multiple) props.push(`maxFiles={${maxFiles}}`);
    if (radius !== 8) props.push(`radius={${radius}}`);
    if (height !== 160 && variant === "dropzone")
      props.push(`height={${height}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { FileInput } from '@beeui';

<FileInput
  label="Upload Files"
  description="Choose files to upload"
  value={files}
  onChange={setFiles}${propsString}
/>`;
  };

  const CodeSection = ({
    code,
    title,
    sectionKey,
  }: {
    code: string;
    title: string;
    sectionKey: string;
  }) => {
    const isCopied = copiedStates[sectionKey];

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
          <button
            onClick={() => copyCode(code, sectionKey)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isCopied ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
        <pre className="p-4 text-sm overflow-x-auto bg-gray-50 rounded-b-lg">
          <code className="text-gray-800 leading-relaxed font-mono">
            {code}
          </code>
        </pre>
      </div>
    );
  };

  // Select data
  const variantOptions = [
    { value: "button", label: "Button" },
    { value: "dropzone", label: "Drop Zone" },
  ];

  // Handle file changes with automatic upload
  const handleFileChange = (newFiles: File | File[] | null) => {
    setFiles(newFiles);
    console.log("Files selected:", newFiles);
  };

  // Upload callbacks for demonstration
  const handleUploadStart = (files: File[]) => {
    console.log("Upload started for files:", files);
  };

  const handleUploadProgress = (progress: number, files: File[]) => {
    console.log(`Upload progress: ${progress}% for files:`, files);
  };

  const handleUploadComplete = (files: File[]) => {
    console.log("Upload completed for files:", files);
  };

  const handleUploadError = (error: string, files: File[]) => {
    console.error("Upload failed:", error, "for files:", files);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">File Input</h1>
          <p className="text-gray-600">
            Highly optimized file upload component with drag & drop, validation,
            and comprehensive image format support
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Preview Section */}
              <div className="xl:col-span-2 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="w-full max-w-md">
                      <FileInput
                        label="Upload Files"
                        description="Choose files to upload"
                        value={files}
                        onChange={handleFileChange}
                        variant={variant as any}
                        size={size as any}
                        disabled={disabled}
                        required={required}
                        multiple={multiple}
                        showPreview={showPreview}
                        showFileSize={showFileSize}
                        showProgress={showProgress}
                        loading={loading}
                        accept={getAcceptTypes()}
                        maxSize={maxSize * 1024 * 1024} // Convert MB to bytes
                        maxFiles={multiple ? maxFiles : undefined}
                        radius={radius}
                        height={variant === "dropzone" ? height : undefined}
                        onUploadStart={handleUploadStart}
                        onUploadProgress={handleUploadProgress}
                        onUploadComplete={handleUploadComplete}
                        onUploadError={handleUploadError}
                        placeholder="Drop files here or click to browse"
                        buttonText="Choose Files"
                        onDrop={(droppedFiles) => {
                          console.log("Files dropped:", droppedFiles);
                        }}
                      />

                      {/* Demo Upload Button */}
                      {files && (
                        <div className="mt-4 text-center">
                          <p className="text-sm text-gray-500">
                            Upload starts automatically when files are selected
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 xl:order-2">
                <div className="bg-white rounded-xl border border-gray-200 pl-4 pt-6 pb-4 pr-2 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Controls
                    </h3>
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {/* Row 1: Variant */}
                    <div>
                      <Select
                        data={variantOptions}
                        value={variant}
                        onChange={(value) => setVariant(value as string)}
                        label="Variant"
                        size="sm"
                      />
                    </div>

                    {/* Row 2: Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Size: {size} ({sizeLabels[sizeValues.indexOf(size)]})
                      </label>
                      <div className="pr-2">
                        <input
                          type="range"
                          min="0"
                          max="3"
                          value={sizeValues.indexOf(size)}
                          onChange={(e) =>
                            setSize(sizeValues[parseInt(e.target.value)])
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {sizeLabels.slice(1).map((label) => (
                            <span key={label} className="text-center">
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row 3: File Types */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Accepted File Types
                      </label>
                      <div className="space-y-2">
                        <Checkbox
                          checked={acceptImages}
                          onChange={setAcceptImages}
                          label="Images (PNG, JPG, GIF, WebP, SVG, AVIF, HEIC)"
                          size="sm"
                        />
                        <Checkbox
                          checked={acceptDocuments}
                          onChange={setAcceptDocuments}
                          label="Documents (PDF, DOC, TXT, CSV, JSON)"
                          size="sm"
                        />
                        <Checkbox
                          checked={acceptVideos}
                          onChange={setAcceptVideos}
                          label="Videos (MP4, AVI, MOV, WebM, MKV)"
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Row 4: Size Limits */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Max File Size: {maxSize}MB
                      </label>
                      <div className="pr-2">
                        <input
                          type="range"
                          min="1"
                          max="50"
                          value={maxSize}
                          onChange={(e) => setMaxSize(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1MB</span>
                          <span>50MB</span>
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Max Files (if multiple) */}
                    {multiple && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Max Files: {maxFiles}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={maxFiles}
                            onChange={(e) =>
                              setMaxFiles(parseInt(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>10</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Row 6: Styling */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Radius: {radius}px
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={radius}
                            onChange={(e) =>
                              setRadius(parseInt(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                      {variant === "dropzone" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Height: {height}px
                          </label>
                          <div className="pr-2">
                            <input
                              type="range"
                              min="120"
                              max="300"
                              value={height}
                              onChange={(e) =>
                                setHeight(parseInt(e.target.value))
                              }
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Row 7: Progress (if enabled) */}
                    {showProgress && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Auto Upload: Enabled
                        </label>
                        <div className="pr-2">
                          <Checkbox
                            checked={true} // Always true for auto-upload
                            onChange={() => {}} // No-op
                            label="Enable automatic upload"
                            size="sm"
                          />
                        </div>
                      </div>
                    )}

                    {/* Row 8: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={disabled}
                        onChange={setDisabled}
                        label="Disabled"
                        size="sm"
                      />
                      <Checkbox
                        checked={required}
                        onChange={setRequired}
                        label="Required"
                        size="sm"
                      />
                      <Checkbox
                        checked={multiple}
                        onChange={setMultiple}
                        label="Multiple files"
                        size="sm"
                      />
                      <Checkbox
                        checked={showPreview}
                        onChange={setShowPreview}
                        label="Show preview"
                        size="sm"
                      />
                      <Checkbox
                        checked={showFileSize}
                        onChange={setShowFileSize}
                        label="Show file size"
                        size="sm"
                      />
                      <Checkbox
                        checked={showProgress}
                        onChange={setShowProgress}
                        label="Show progress"
                        size="sm"
                      />
                      <Checkbox
                        checked={loading}
                        onChange={setLoading}
                        label="Loading state"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CodeSection
              code={generateCode()}
              title="Demo.tsx"
              sectionKey="interactive-demo"
            />
          </div>
        </section>

        {/* Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Variants
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Button Variant
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <FileInput
                  variant="button"
                  label="Upload Document"
                  description="Choose a file to upload"
                  accept={FILE_ACCEPT_PRESETS.documents}
                  maxSize={10 * 1024 * 1024} // 10MB
                  buttonText="Browse Files"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Dropzone Variant
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <FileInput
                  variant="dropzone"
                  label="Upload Images"
                  description="Drag and drop images or click to browse"
                  accept={FILE_ACCEPT_PRESETS.images}
                  multiple
                  maxFiles={5}
                  maxSize={5 * 1024 * 1024} // 5MB
                  placeholder="Drop images here or click to browse"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<FileInput variant="button" buttonText="Browse Files" />
<FileInput variant="dropzone" placeholder="Drop files here" />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Enhanced File Types Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Enhanced File Type Support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                All Image Formats
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="dropzone"
                  accept={FILE_ACCEPT_PRESETS.images}
                  placeholder="Drop any image format here"
                  icon={<ImageIcon />}
                  height={140}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supports: JPG, PNG, GIF, WebP, SVG, BMP, TIFF, AVIF, HEIC, HEIF, ICO
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Images Only
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="dropzone"
                  accept={FILE_ACCEPT_PRESETS.imagesBasic}
                  placeholder="Drop basic images here"
                  icon={<ImageIcon />}
                  height={140}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supports: JPG, PNG, GIF, WebP
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                All Video Formats
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="dropzone"
                  accept={FILE_ACCEPT_PRESETS.videos}
                  placeholder="Drop any video format here"
                  icon={<Video />}
                  height={140}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supports: MP4, AVI, MOV, WMV, FLV, WebM, MKV, 3GP, OGV, M4V
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                All Document Formats
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="dropzone"
                  accept={FILE_ACCEPT_PRESETS.documents}
                  placeholder="Drop any document here"
                  icon={<FileText />}
                  height={140}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supports: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV, JSON, XML, RTF
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`// Using predefined presets
import { FILE_ACCEPT_PRESETS } from '@beeui';

<FileInput accept={FILE_ACCEPT_PRESETS.images} placeholder="All image formats" />
<FileInput accept={FILE_ACCEPT_PRESETS.imagesBasic} placeholder="Basic images only" />
<FileInput accept={FILE_ACCEPT_PRESETS.videos} placeholder="All video formats" />
<FileInput accept={FILE_ACCEPT_PRESETS.documents} placeholder="All document formats" />

// Or use custom arrays
<FileInput accept={['image/*', '.jpg', '.png', '.webp']} placeholder="Custom types" />`}
              title="Demo.tsx"
              sectionKey="file-types"
            />
          </div>
        </section>

        {/* Multiple Files Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Multiple Files
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <FileInput
              variant="dropzone"
              label="Upload Multiple Images"
              description="You can upload up to 5 images at once"
              accept={FILE_ACCEPT_PRESETS.images}
              multiple
              maxFiles={5}
              maxSize={2 * 1024 * 1024} // 2MB per file
              placeholder="Drop up to 5 images here"
              showPreview
              showFileSize
            />
          </div>

          <CodeSection
            code={`<FileInput
  multiple
  maxFiles={5}
  accept={FILE_ACCEPT_PRESETS.images}
  maxSize={2 * 1024 * 1024} // 2MB per file
  placeholder="Drop up to 5 images here"
/>`}
            title="Demo.tsx"
            sectionKey="multiple"
          />
        </section>

        {/* With Progress Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Upload Progress
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
                          <FileInput
                variant="dropzone"
                label="Upload with Progress"
                description="Shows automatic upload progress"
                accept={[...FILE_ACCEPT_PRESETS.images, ...FILE_ACCEPT_PRESETS.documents]}
                showProgress
                placeholder="Upload files with automatic progress tracking"
              />
          </div>

          <CodeSection
            code={`<FileInput
  showProgress
  placeholder="Upload with automatic progress tracking"
/>`}
            title="Demo.tsx"
            sectionKey="progress"
          />
        </section>

        {/* Error States Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Error States
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                File Type Error
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="dropzone"
                  accept={FILE_ACCEPT_PRESETS.images}
                  error="File type not allowed. Only images are accepted."
                  placeholder="Images only"
                  height={120}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Size Limit Error
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="button"
                  error="File size too large. Maximum size is 5MB."
                  buttonText="Choose File"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Required Field
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="dropzone"
                  label="Required Upload"
                  description="This field is required"
                  required
                  error="Please select a file to upload."
                  placeholder="File required"
                  height={120}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<FileInput error="File type not allowed" accept={FILE_ACCEPT_PRESETS.images} />
<FileInput error="File size too large" maxSize={5 * 1024 * 1024} />
<FileInput required error="Please select a file" />`}
              title="Demo.tsx"
              sectionKey="errors"
            />
          </div>
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Disabled Button
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="button"
                  label="Disabled Upload"
                  description="This upload is currently disabled"
                  disabled
                  buttonText="Cannot Upload"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Disabled Dropzone
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="dropzone"
                  label="Disabled Dropzone"
                  description="Drag and drop is disabled"
                  disabled
                  placeholder="Upload disabled"
                  height={140}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<FileInput disabled variant="button" buttonText="Cannot Upload" />
<FileInput disabled variant="dropzone" placeholder="Upload disabled" />`}
              title="Demo.tsx"
              sectionKey="disabled"
            />
          </div>
        </section>

        {/* Loading State Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Loading State
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Loading Button (All interactions disabled)
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="button"
                  label="Uploading Files"
                  description="All interactions are disabled during upload"
                  loading
                  loadingText="Uploading..."
                  buttonText="Choose Files"
                  accept={FILE_ACCEPT_PRESETS.images}
                  multiple
                  showProgress
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Loading Dropzone (All interactions disabled)
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="dropzone"
                  label="Uploading Files"
                  description="Cannot add or remove files during upload"
                  loading
                  loadingText="Processing files..."
                  accept={FILE_ACCEPT_PRESETS.images}
                  multiple
                  showProgress
                  placeholder="Upload in progress"
                  height={140}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Multiple Files with Loading State
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <FileInput
                  variant="dropzone"
                  label="Multiple File Upload"
                  description="Try to interact with files during upload - all disabled"
                  loading
                  loadingText="Uploading multiple files..."
                  accept={FILE_ACCEPT_PRESETS.images}
                  multiple
                  maxFiles={5}
                  showPreview
                  showProgress
                  placeholder="Files are being uploaded"
                  height={160}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<FileInput 
  loading 
  loadingText="Uploading..." 
  accept={FILE_ACCEPT_PRESETS.images}
  multiple
  showProgress
/>`}
              title="Demo.tsx"
              sectionKey="loading"
            />
          </div>
        </section>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
