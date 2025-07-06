"use client";

import React, { useState, useRef, useEffect } from "react";
import { Select } from "@/lib/components/Select";
import {
  Copy,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Heart,
  Settings,
  Shield,
  Zap,
  Globe,
  Code,
  Database,
  Palette,
  X,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";

export default function SelectPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [searchable, setSearchable] = useState(false);
  const [clearable, setClearable] = useState(false);
  const [allowDeselect, setAllowDeselect] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [radius, setRadius] = useState(6);
  const [primaryColor, setPrimaryColor] = useState("#6366F1");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Demo state
  const [selectedValue, setSelectedValue] = useState<
    string | number | (string | number)[] | null
  >("react");
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
    if (variant !== "default") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (searchable) props.push("searchable");
    if (clearable) props.push("clearable");
    if (allowDeselect) props.push("allowDeselect");
    if (multiple) props.push("multiple");
    if (!showCheckmark) props.push("showCheckmark={false}");
    if (disabled) props.push("disabled");

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Select } from '@beeui';

const data = [
  'React', 'Angular', 'Vue', 'Svelte'
];

<Select
  data={data}
  placeholder="Your favorite library"${propsString}
/>`;
  };

  // Enhanced syntax highlighting component
  const SyntaxHighlighter = ({ code }: { code: string }) => {
    const highlightCode = (code: string) => {
      let highlighted = code;

      // Keywords (purple)
      highlighted = highlighted.replace(
        /\b(import|from|export|const|let|var|function|return|if|else|for|while|class|extends|interface|type)\b/g,
        '<span style="color: #8B5CF6; font-weight: 600;">$1</span>'
      );

      // Strings (green)
      highlighted = highlighted.replace(
        /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        '<span style="color: #10B981;">$1$2$3</span>'
      );

      // JSX tags (red/orange)
      highlighted = highlighted.replace(
        /(<\/?[A-Z][a-zA-Z0-9]*)/g,
        '<span style="color: #EF4444; font-weight: 500;">$1</span>'
      );

      // JSX closing brackets
      highlighted = highlighted.replace(
        /(\/?>)/g,
        '<span style="color: #EF4444;">$1</span>'
      );

      // Props/attributes (blue)
      highlighted = highlighted.replace(
        /\s([a-zA-Z][a-zA-Z0-9]*)(=)/g,
        ' <span style="color: #3B82F6;">$1</span><span style="color: #6B7280;">$2</span>'
      );

      // Curly braces (yellow/orange)
      highlighted = highlighted.replace(
        /(\{[^}]*\})/g,
        '<span style="color: #F59E0B;">$1</span>'
      );

      // Comments (gray italic)
      highlighted = highlighted.replace(
        /(\/\/.*$)/gm,
        '<span style="color: #6B7280; font-style: italic;">$1</span>'
      );

      return highlighted;
    };

    return (
      <pre className="p-4 text-sm overflow-x-auto bg-gray-50 rounded-b-lg">
        <code
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </pre>
    );
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
        <SyntaxHighlighter code={code} />
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

  // Sample data
  const basicData = ["React", "Angular", "Vue", "Svelte"];

  const frameworkData = [
    { value: "react", label: "React", icon: <Code /> },
    { value: "angular", label: "Angular", icon: <Shield /> },
    { value: "vue", label: "Vue.js", icon: <Zap /> },
    { value: "svelte", label: "Svelte", icon: <Star /> },
  ];

  const groupedData = [
    {
      label: "Frontend",
      options: [
        { value: "react", label: "React", icon: <Code /> },
        { value: "vue", label: "Vue.js", icon: <Zap /> },
        { value: "angular", label: "Angular", icon: <Shield /> },
      ],
    },
    {
      label: "Backend",
      options: [
        { value: "node", label: "Node.js", icon: <Database /> },
        { value: "python", label: "Python", icon: <Globe /> },
        { value: "java", label: "Java", icon: <Settings /> },
      ],
    },
  ];

  const countryData = [
    { value: "us", label: "United States", description: "North America" },
    { value: "uk", label: "United Kingdom", description: "Europe" },
    { value: "ca", label: "Canada", description: "North America" },
    { value: "de", label: "Germany", description: "Europe" },
    { value: "fr", label: "France", description: "Europe" },
    { value: "jp", label: "Japan", description: "Asia" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Select</h1>
          <p className="text-gray-600">
            Capture user input based on suggestions
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 flex items-center justify-center min-h-[200px]">
              <div className="w-full max-w-sm">
                <Select
                  data={basicData}
                  value={selectedValue === null ? undefined : selectedValue}
                  onChange={setSelectedValue}
                  placeholder="Your favorite library"
                  variant={variant as any}
                  size={size as any}
                  searchable={searchable}
                  clearable={clearable}
                  allowDeselect={allowDeselect}
                  multiple={multiple}
                  showCheckmark={showCheckmark}
                  disabled={disabled}
                  radius={radius}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              {/* Row 1: Variant and Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variant
                  </label>
                  <select
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="default">Default</option>
                    <option value="filled">Filled</option>
                    <option value="unstyled">Unstyled</option>
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
                      {sizeLabels.slice(1).map((label) => (
                        <span key={label} className="text-center">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Color */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Color
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-6 gap-1">
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
                    <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Custom Color
                        </span>
                        <button
                          onClick={() => setShowColorPicker(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <HexColorPicker
                        color={primaryColor}
                        onChange={setPrimaryColor}
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
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0px</span>
                  <span>20px</span>
                </div>
              </div>

              {/* Row 4: Checkboxes */}
              <div className="space-y-3">
                <CustomCheckbox
                  checked={searchable}
                  onChange={setSearchable}
                  label="Searchable"
                />
                <CustomCheckbox
                  checked={clearable}
                  onChange={setClearable}
                  label="Clearable"
                />
                <CustomCheckbox
                  checked={allowDeselect}
                  onChange={setAllowDeselect}
                  label="Allow deselect"
                />
                <CustomCheckbox
                  checked={multiple}
                  onChange={setMultiple}
                  label="Multiple selection"
                />
                <CustomCheckbox
                  checked={showCheckmark}
                  onChange={setShowCheckmark}
                  label="Show checkmark"
                />
                <CustomCheckbox
                  checked={disabled}
                  onChange={setDisabled}
                  label="Disabled"
                />
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

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Select
                  data={basicData}
                  placeholder="Pick value"
                  variant="default"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Select
                  data={basicData}
                  placeholder="Pick value"
                  variant="filled"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Unstyled
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Select
                  data={basicData}
                  placeholder="Pick value"
                  variant="unstyled"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Select data={data} variant="default" placeholder="Pick value" />
<Select data={data} variant="filled" placeholder="Pick value" />
<Select data={data} variant="unstyled" placeholder="Pick value" />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sizes</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Small</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Select data={basicData} placeholder="Pick value" size="sm" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Select data={basicData} placeholder="Pick value" size="md" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Select data={basicData} placeholder="Pick value" size="lg" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Extra Large
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Select data={basicData} placeholder="Pick value" size="xl" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Select data={data} size="sm" placeholder="Pick value" />
<Select data={data} size="md" placeholder="Pick value" />
<Select data={data} size="lg" placeholder="Pick value" />
<Select data={data} size="xl" placeholder="Pick value" />`}
              title="Demo.tsx"
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* Searchable Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Searchable
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Select
              data={countryData}
              placeholder="Search countries"
              searchable
              clearable
            />
          </div>

          <CodeSection
            code={`const data = [
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'uk', label: 'United Kingdom', description: 'Europe' },
  { value: 'ca', label: 'Canada', description: 'North America' },
  { value: 'de', label: 'Germany', description: 'Europe' },
];

<Select
  data={data}
  placeholder="Search countries"
  searchable
  clearable
/>`}
            title="Demo.tsx"
            sectionKey="searchable"
          />
        </section>

        {/* With Icons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Icons
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Select
              data={frameworkData}
              placeholder="Choose framework"
              clearable
            />
          </div>

          <CodeSection
            code={`import { Code, Shield, Zap, Star } from 'lucide-react';

const data = [
  { value: 'react', label: 'React', icon: <Code /> },
  { value: 'angular', label: 'Angular', icon: <Shield /> },
  { value: 'vue', label: 'Vue.js', icon: <Zap /> },
  { value: 'svelte', label: 'Svelte', icon: <Star /> },
];

<Select
  data={data}
  placeholder="Choose framework"
  clearable
/>`}
            title="Demo.tsx"
            sectionKey="icons"
          />
        </section>

        {/* Grouped Options Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Grouped Options
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Select
              data={groupedData}
              placeholder="Choose technology"
              searchable
              clearable
            />
          </div>

          <CodeSection
            code={`const data = [
  {
    label: 'Frontend',
    options: [
      { value: 'react', label: 'React', icon: <Code /> },
      { value: 'vue', label: 'Vue.js', icon: <Zap /> },
      { value: 'angular', label: 'Angular', icon: <Shield /> },
    ]
  },
  {
    label: 'Backend',
    options: [
      { value: 'node', label: 'Node.js', icon: <Database /> },
      { value: 'python', label: 'Python', icon: <Globe /> },
      { value: 'java', label: 'Java', icon: <Settings /> },
    ]
  }
];

<Select
  data={data}
  placeholder="Choose technology"
  searchable
  clearable
/>`}
            title="Demo.tsx"
            sectionKey="grouped"
          />
        </section>

        {/* Multiple Selection Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Multiple Selection
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Select
              data={frameworkData}
              placeholder="Choose frameworks"
              multiple
              searchable
              clearable
            />
          </div>

          <CodeSection
            code={`<Select
  data={data}
  placeholder="Choose frameworks"
  multiple
  searchable
  clearable
/>`}
            title="Demo.tsx"
            sectionKey="multiple"
          />
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Select
              data={basicData}
              placeholder="Disabled select"
              disabled
              value="react"
            />
          </div>

          <CodeSection
            code={`<Select
  data={data}
  placeholder="Disabled select"
  disabled
  value="react"
/>`}
            title="Demo.tsx"
            sectionKey="disabled"
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
