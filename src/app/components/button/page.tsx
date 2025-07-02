"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/lib/components/Button";
import {
  Download,
  Settings,
  Plus,
  Trash2,
  Heart,
  Send,
  Save,
  Edit,
  ArrowRight,
  ChevronDown,
  Copy,
  Check,
  Github,
  ExternalLink,
  Loader2,
  Play,
  Pause,
  Star,
  Mail,
  Phone,
  User,
  Search,
  Filter,
  Upload,
  Eye,
  EyeOff,
  Palette,
  X,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";
import Image from "next/image";
import CodeSection from "../../../components/playground/CodeSection";

export default function ButtonPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("md");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [showLeftIcon, setShowLeftIcon] = useState(false);
  const [showRightIcon, setShowRightIcon] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#6366F1");
  const [radius, setRadius] = useState(6);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Copy state - individual for each code section
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  // Color picker popup ref
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Predefined colors
  const predefinedColors = [
    "#6B7280",
    "#EF4444",
    "#EC4899",
    "#A855F7",
    "#8B5CF6",
    "#3B82F6",
    "#06B6D4",
    "#10B981",
    "#84CC16",
    "#EAB308",
    "#F97316",
  ];

  // Size labels for slider
  const sizeLabels = ["xs", "sm", "md", "lg", "xl"];
  const sizeValues = ["sm", "md", "lg", "xl"];

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  const copyCode = async (code: string, key: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const generateCode = () => {
    const props = [];
    if (variant !== "primary") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (loading) props.push("loading");
    if (disabled) props.push("disabled");
    if (fullWidth) props.push("fullWidth");
    if (showLeftIcon) props.push("leftIcon={<Download />}");
    if (showRightIcon) props.push("rightIcon={<ArrowRight />}");

    const propsString = props.length > 0 ? " " + props.join(" ") : "";
    return `import { Button } from '@beeui';

<Button${propsString}>
  Button
</Button>`;
  };

  // Simple SyntaxHighlighter: just display code as plain text, no colors
  const SyntaxHighlighter = ({ code }: { code: string }) => (
    <pre className="p-4 text-sm overflow-x-auto bg-gray-50 rounded-b-lg">
      <code className="text-gray-800 leading-relaxed">{code}</code>
    </pre>
  );

  // Custom checkbox component
  const CustomCheckbox = ({
    checked,
    onChange,
    label,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
  }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
            checked
              ? "bg-blue-600 border-blue-600"
              : "border-gray-300 group-hover:border-gray-400"
          }`}
        >
          {checked && (
            <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
          )}
        </div>
      </div>
      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </label>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Button</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Button component to render button or link
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span className="text-blue-600 hover:underline cursor-pointer">
                View source code
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span className="text-red-600 hover:underline cursor-pointer">
                Edit this page
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-600">@beeui</span>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md">
              Documentation
            </button>
            <button className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-md">
              Props
            </button>
            <button className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-md">
              Styles API
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 flex items-center justify-center min-h-[200px]">
              <div className={fullWidth ? "w-full" : ""}>
                <Button
                  variant={variant as any}
                  size={size as any}
                  loading={loading}
                  disabled={disabled}
                  fullWidth={fullWidth}
                  leftIcon={showLeftIcon ? <Download /> : undefined}
                  rightIcon={showRightIcon ? <ArrowRight /> : undefined}
                  style={{
                    borderRadius: `${radius}px`,
                    ...(variant === "primary" && {
                      backgroundColor: primaryColor,
                      borderColor: primaryColor,
                    }),
                  }}
                  className={fullWidth ? "w-full" : ""}
                >
                  Button
                </Button>
              </div>
            </div>

            {/* Controls - Original Layout */}
            <div className="space-y-6">
              {/* Row 1: Variant and Size (side by side) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variant
                  </label>
                  <select
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="primary">Filled</option>
                    <option value="secondary">Light</option>
                    <option value="outline">Outline</option>
                    <option value="ghost">Subtle</option>
                    <option value="danger">Default</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Size: {size} ({sizeLabels[sizeValues.indexOf(size)]})
                  </label>
                  <div className="relative">
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
                      {sizeLabels.slice(1).map((label, index) => (
                        <span key={label} className="text-center">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Size and Radius */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Color
                  </label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-2">
                      {predefinedColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setPrimaryColor(color)}
                          className={`w-8 h-8 rounded border-2 transition-all ${
                            primaryColor === color
                              ? "border-gray-800 scale-110"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <button
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors bg-white flex items-center justify-center"
                      >
                        <Palette className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Color Picker Popup */}
                    {showColorPicker && (
                      <div
                        ref={colorPickerRef}
                        className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">
                            Custom Color
                          </span>
                          <button
                            onClick={() => setShowColorPicker(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-8 h-4" />
                          </button>
                        </div>
                        <HexColorPicker
                          color={primaryColor}
                          onChange={setPrimaryColor}
                          className="w-full"
                        />
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#000000"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 3: Radius (full width) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Size: {size} ({sizeLabels[sizeValues.indexOf(size)]})
                  </label>
                  <div className="relative">
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
                      {sizeLabels.slice(1).map((label, index) => (
                        <span key={label} className="text-center">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <CustomCheckbox
                    checked={loading}
                    onChange={setLoading}
                    label="Loading state"
                  />
                  <CustomCheckbox
                    checked={disabled}
                    onChange={setDisabled}
                    label="Disabled"
                  />
                  <CustomCheckbox
                    checked={fullWidth}
                    onChange={setFullWidth}
                    label="Full width"
                  />
                </div>
                <div className="space-y-4">
                  <CustomCheckbox
                    checked={showLeftIcon}
                    onChange={setShowLeftIcon}
                    label="Left icon"
                  />
                  <CustomCheckbox
                    checked={showRightIcon}
                    onChange={setShowRightIcon}
                    label="Right icon"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CodeSection
              code={generateCode()}
              title="Demo.tsx"
              sectionKey="interactive-demo"
              copiedStates={copiedStates}
              copyCode={copyCode}
            />
          </div>
        </section>

        {/* Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Variants
          </h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <Button variant="primary">Filled</Button>
            <Button variant="secondary">Light</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Subtle</Button>
            <Button variant="danger">Default</Button>
          </div>

          <CodeSection
            code={`import { Button } from '@beeui';

<Button variant="primary">Filled</Button>
<Button variant="secondary">Light</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="danger">Default</Button>`}
            title="Demo.tsx"
            sectionKey="variants"
            copiedStates={copiedStates}
            copyCode={copyCode}
          />
        </section>

        {/* Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sizes</h2>

          <div className="flex items-end gap-4 mb-6">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>

          <CodeSection
            code={`import { Button } from '@beeui';

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
            title="Demo.tsx"
            sectionKey="sizes"
            copiedStates={copiedStates}
            copyCode={copyCode}
          />
        </section>

        {/* With Icons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Icons
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <Button leftIcon={<Download />} variant="outline">
              Download
            </Button>
            <Button leftIcon={<Settings />} variant="secondary">
              Settings
            </Button>
            <Button leftIcon={<Plus />} variant="primary">
              Add Item
            </Button>
            <Button leftIcon={<Save />} variant="ghost">
              Save
            </Button>
            <Button rightIcon={<ArrowRight />} variant="primary">
              Continue
            </Button>
            <Button rightIcon={<Send />} variant="outline">
              Send
            </Button>
            <Button rightIcon={<Upload />} variant="secondary">
              Upload
            </Button>
            <Button rightIcon={<Search />} variant="ghost">
              Search
            </Button>
          </div>

          <CodeSection
            code={`import { Button } from '@beeui';
import { Download, Settings, ArrowRight, Send } from 'lucide-react';

<Button leftIcon={<Download />} variant="outline">Download</Button>
<Button leftIcon={<Settings />} variant="secondary">Settings</Button>
<Button rightIcon={<ArrowRight />} variant="primary">Continue</Button>
<Button rightIcon={<Send />} variant="outline">Send</Button>`}
            title="Demo.tsx"
            sectionKey="icons"
            copiedStates={copiedStates}
            copyCode={copyCode}
          />
        </section>

        {/* Loading States Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Loading States
          </h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <Button loading variant="primary">
              Loading
            </Button>
            <Button loading variant="outline">
              Processing
            </Button>
            <Button loading variant="secondary" loadingText="Saving...">
              Save
            </Button>
            <Button loading variant="ghost" leftIcon={<Upload />}>
              Upload
            </Button>
          </div>

          <CodeSection
            code={`import { Button } from '@beeui';
import { Upload } from 'lucide-react';

<Button loading variant="primary">Loading</Button>
<Button loading variant="outline">Processing</Button>
<Button loading variant="secondary" loadingText="Saving...">Save</Button>
<Button loading variant="ghost" leftIcon={<Upload />}>Upload</Button>`}
            title="Demo.tsx"
            sectionKey="loading"
            copiedStates={copiedStates}
            copyCode={copyCode}
          />
        </section>

        {/* Full Width Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Full width
          </h2>
          <p className="text-gray-600 mb-6">
            If{" "}
            <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
              fullWidth
            </code>{" "}
            prop is set{" "}
            <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
              Button
            </code>{" "}
            will take 100% of parent width:
          </p>

          <div className="space-y-4 mb-6">
            <Button fullWidth variant="primary" leftIcon={<Save />}>
              Save and Continue
            </Button>
            <Button fullWidth variant="outline" rightIcon={<ArrowRight />}>
              Next Step
            </Button>
          </div>

          <CodeSection
            code={`import { Button } from '@beeui';
import { Save, ArrowRight } from 'lucide-react';

<Button fullWidth variant="primary" leftIcon={<Save />}>
  Save and Continue
</Button>
<Button fullWidth variant="outline" rightIcon={<ArrowRight />}>
  Next Step
</Button>`}
            title="Demo.tsx"
            sectionKey="fullwidth"
            copiedStates={copiedStates}
            copyCode={copyCode}
          />
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <Button disabled variant="primary">
              Disabled Primary
            </Button>
            <Button disabled variant="outline">
              Disabled Outline
            </Button>
            <Button disabled variant="secondary" leftIcon={<Settings />}>
              Disabled with Icon
            </Button>
            <Button disabled loading variant="ghost">
              Disabled Loading
            </Button>
          </div>

          <CodeSection
            code={`import { Button } from '@beeui';
import { Settings } from 'lucide-react';

<Button disabled variant="primary">Disabled Primary</Button>
<Button disabled variant="outline">Disabled Outline</Button>
<Button disabled variant="secondary" leftIcon={<Settings />}>Disabled with Icon</Button>
<Button disabled loading variant="ghost">Disabled Loading</Button>`}
            title="Demo.tsx"
            sectionKey="disabled"
            copiedStates={copiedStates}
            copyCode={copyCode}
          />
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
