"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/lib/components/Button";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { ColorPicker } from "@/lib/components/ColorPicker";
import { InstallationSection } from "@/components/playground/InstallationSection";
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

  // Copy state - individual for each code section
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

  const generateCode = () => {
    const props = [];
    if (variant !== "primary") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (loading) props.push("loading");
    if (disabled) props.push("disabled");
    if (fullWidth) props.push("fullWidth");
    if (showLeftIcon) props.push("leftIcon={<Download />}");
    if (showRightIcon) props.push("rightIcon={<ArrowRight />}");
    if (primaryColor !== "#6366F1") props.push(`color="${primaryColor}"`);

    const propsString = props.length > 0 ? " " + props.join(" ") : "";
    return `import { Button } from '@beeui';

<Button${propsString}>
  Button
</Button>`;
  };

  // Reusable CodeSection component with enhanced styling
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
    { value: "primary", label: "Filled" },
    { value: "secondary", label: "Light" },
    { value: "outline", label: "Outline" },
    { value: "ghost", label: "Subtle" },
    { value: "danger", label: "Default" },
  ];

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
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <div className={fullWidth ? "w-full" : ""}>
                      <Button
                        variant={variant as any}
                        size={size as any}
                        loading={loading}
                        disabled={disabled}
                        fullWidth={fullWidth}
                        leftIcon={showLeftIcon ? <Download /> : undefined}
                        rightIcon={showRightIcon ? <ArrowRight /> : undefined}
                        color={primaryColor}
                        style={{
                          borderRadius: `${radius}px`,
                        }}
                        className={fullWidth ? "w-full" : ""}
                      >
                        Button
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Interactive Controls
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Row 1: Variant and Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Select
                          data={variantOptions}
                          value={variant}
                          onChange={(value) => setVariant(value as string)}
                          label="Variant"
                          size="sm"
                        />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Row 4: Checkboxes */}
                      <div className="space-y-3">
                        <Checkbox
                          checked={loading}
                          onChange={setLoading}
                          label="Loading state"
                        />
                        <Checkbox
                          checked={disabled}
                          onChange={setDisabled}
                          label="Disabled"
                        />
                        <Checkbox
                          checked={fullWidth}
                          onChange={setFullWidth}
                          label="Full width"
                        />
                        <Checkbox
                          checked={showLeftIcon}
                          onChange={setShowLeftIcon}
                          label="Left icon"
                        />
                        <Checkbox
                          checked={showRightIcon}
                          onChange={setShowRightIcon}
                          label="Right icon"
                        />
                      </div>
                      {/* Row 2: Color */}
                      <div className="space-y-3">
                        <ColorPicker
                          value={primaryColor}
                          onChange={setPrimaryColor}
                          label="Color"
                          size="md"
                          colorGridColumns={4}
                        />
                        {/* Row 3: Radius */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Radius: {radius}px
                          </label>
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
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0px</span>
                            <span>20px</span>
                          </div>
                        </div>
                      </div>
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
          />
        </section>

        {/* Colors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Colors</h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <Button color="#6366F1">Indigo</Button>
            <Button color="#EF4444">Red</Button>
            <Button color="#10B981">Green</Button>
            <Button color="#F59E0B">Yellow</Button>
            <Button color="#8B5CF6">Purple</Button>
            <Button color="#EC4899">Pink</Button>
          </div>

          <CodeSection
            code={`import { Button } from '@beeui';

<Button color="#6366F1">Indigo</Button>
<Button color="#EF4444">Red</Button>
<Button color="#10B981">Green</Button>
<Button color="#F59E0B">Yellow</Button>
<Button color="#8B5CF6">Purple</Button>
<Button color="#EC4899">Pink</Button>`}
            title="Demo.tsx"
            sectionKey="colors"
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
          />
        </section>

        {/* Installation Section */}
        <InstallationSection componentName="Button" />
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
