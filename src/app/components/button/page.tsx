"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { HexColorPicker } from "react-colorful";
import Image from "next/image";

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

  // Copy state
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

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
    "#F59E0B",
  ];

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
    return `<Button${propsString}>
  Button
</Button>`;
  };

  const CodeSection = ({ code, title }: { code: string; title: string }) => {
    const key = title.toLowerCase().replace(/\s+/g, "-");
    const isCopied = copiedStates[key];

    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
          <button
            onClick={() => copyCode(code, key)}
            className="flex items-center gap-2 px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
        <pre className="p-4 text-sm overflow-x-auto">
          <code className="text-gray-800">
            <span className="text-red-600">import</span>{" "}
            <span className="text-gray-800">{"{ Button }"}</span>{" "}
            <span className="text-red-600">from</span>{" "}
            <span className="text-green-600">'@mantine/core'</span>
            <span className="text-gray-800">;</span>
            {"\n\n"}
            <span className="text-red-600">function</span>{" "}
            <span className="text-purple-600">Demo</span>
            <span className="text-gray-800">() {"{"}</span>
            {"\n  "}
            <span className="text-red-600">return</span>{" "}
            <span className="text-blue-600">&lt;Button</span>
            {variant !== "primary" && (
              <>
                {" "}
                <span className="text-green-600">variant</span>
                <span className="text-gray-800">=</span>
                <span className="text-orange-600">"{variant}"</span>
              </>
            )}
            {size !== "md" && (
              <>
                {" "}
                <span className="text-green-600">size</span>
                <span className="text-gray-800">=</span>
                <span className="text-orange-600">"{size}"</span>
              </>
            )}
            {loading && (
              <>
                {" "}
                <span className="text-green-600">loading</span>
              </>
            )}
            {disabled && (
              <>
                {" "}
                <span className="text-green-600">disabled</span>
              </>
            )}
            {fullWidth && (
              <>
                {" "}
                <span className="text-green-600">fullWidth</span>
              </>
            )}
            {showLeftIcon && (
              <>
                {" "}
                <span className="text-green-600">leftIcon</span>
                <span className="text-gray-800">=</span>
                <span className="text-blue-600">{"{"}</span>
                <span className="text-gray-800">&lt;Download /&gt;</span>
                <span className="text-blue-600">{"}"}</span>
              </>
            )}
            {showRightIcon && (
              <>
                {" "}
                <span className="text-green-600">rightIcon</span>
                <span className="text-gray-800">=</span>
                <span className="text-blue-600">{"{"}</span>
                <span className="text-gray-800">&lt;ArrowRight /&gt;</span>
                <span className="text-blue-600">{"}"}</span>
              </>
            )}
            <span className="text-blue-600">&gt;</span>
            <span className="text-gray-800">Button</span>
            <span className="text-blue-600">&lt;/Button&gt;</span>
            <span className="text-gray-800">;</span>
            {"\n"}
            <span className="text-gray-800">{"}"}</span>
          </code>
        </pre>
      </div>
    );
  };

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
              <span className="text-gray-600">@mantine/core</span>
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
              <div
                style={
                  { "--primary-color": primaryColor } as React.CSSProperties
                }
              >
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
                >
                  Button
                </Button>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
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
                  Color
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-8 gap-2">
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
                      className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors bg-gradient-to-br from-red-400 to-blue-500 flex items-center justify-center"
                    >
                      {showColorPicker ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Plus className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>

                  {showColorPicker && (
                    <div className="p-4 border border-gray-200 rounded-lg bg-white">
                      <HexColorPicker
                        color={primaryColor}
                        onChange={setPrimaryColor}
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="#000000"
                      />
                    </div>
                  )}
                </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Radius: {radius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0px</span>
                  <span>20px</span>
                </div>
              </div>

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

          <div className="mt-8">
            <CodeSection code={generateCode()} title="Demo.tsx" />
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
            code={`<Button variant="primary">Filled</Button>
<Button variant="secondary">Light</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="danger">Default</Button>`}
            title="Demo.tsx"
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
            code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
            title="Demo.tsx"
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
            code={`<Button leftIcon={<Download />} variant="outline">Download</Button>
<Button leftIcon={<Settings />} variant="secondary">Settings</Button>
<Button rightIcon={<ArrowRight />} variant="primary">Continue</Button>
<Button rightIcon={<Send />} variant="outline">Send</Button>`}
            title="Demo.tsx"
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
            code={`<Button loading variant="primary">Loading</Button>
<Button loading variant="outline">Processing</Button>
<Button loading variant="secondary" loadingText="Saving...">Save</Button>
<Button loading variant="ghost" leftIcon={<Upload />}>Upload</Button>`}
            title="Demo.tsx"
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
            code={`<Button fullWidth variant="primary" leftIcon={<Save />}>
  Save and Continue
</Button>
<Button fullWidth variant="outline" rightIcon={<ArrowRight />}>
  Next Step
</Button>`}
            title="Demo.tsx"
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
            code={`<Button disabled variant="primary">Disabled Primary</Button>
<Button disabled variant="outline">Disabled Outline</Button>
<Button disabled variant="secondary" leftIcon={<Settings />}>Disabled with Icon</Button>
<Button disabled loading variant="ghost">Disabled Loading</Button>`}
            title="Demo.tsx"
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
