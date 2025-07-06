"use client";

import React, { useState } from "react";
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

  // Demo state
  const [selectedValue, setSelectedValue] = useState<
    string | number | (string | number)[] | null
  >("react");
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

  // Select data
  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "filled", label: "Filled" },
    { value: "unstyled", label: "Unstyled" },
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

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <div className="w-full max-w-sm">
                      <Select
                        data={basicData}
                        value={selectedValue || undefined}
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
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Interactive Controls
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Row 1: Variant and Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            {sizeLabels.slice(1).map((label) => (
                              <span key={label} className="text-center">
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Checkboxes */}
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
