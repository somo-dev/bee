"use client";

import React, { useState } from "react";
import { SegmentedControl } from "@bee-ui/core";
import { Select } from "@bee-ui/core";
import { Checkbox } from "@bee-ui/core";
import { ColorPicker } from "@bee-ui/core";
import {
  Copy,
  Check,
  Settings,
  Code,
  Smartphone,
  Globe,
  Zap,
  Star,
  Heart,
  Shield,
  Users,
  Calendar,
  Mail,
  Phone,
  Camera,
  Music,
  Video,
  Image,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Edit,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

export default function SegmentedControlPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [orientation, setOrientation] = useState("horizontal");
  const [radius, setRadius] = useState("md");
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [equalWidth, setEqualWidth] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [iconPosition, setIconPosition] = useState("left");
  const [allowDeselect, setAllowDeselect] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [transitionDuration, setTransitionDuration] = useState(300);

  // Demo state
  const [selectedValue, setSelectedValue] = useState("svelte");
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
    if (orientation !== "horizontal")
      props.push(`orientation="${orientation}"`);
    if (radius !== "md") props.push(`radius="${radius}"`);
    if (disabled) props.push("disabled");
    if (fullWidth) props.push("fullWidth");
    if (!equalWidth) props.push("equalWidth={false}");
    if (!showIcons) props.push("showIcons={false}");
    if (iconPosition !== "left") props.push(`iconPosition="${iconPosition}"`);
    if (allowDeselect) props.push("allowDeselect");
    if (primaryColor !== "#3B82F6") props.push(`color="${primaryColor}"`);
    if (transitionDuration !== 300)
      props.push(`transitionDuration={${transitionDuration}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { SegmentedControl } from '@beeui';

const data = [
  'React',
  'Angular', 
  'Vue',
  'Svelte'
];

<SegmentedControl
  data={data}
  value={value}
  onChange={setValue}${propsString}
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

  // Sample data
  const basicData = ["React", "Angular", "Vue", "Svelte"];

  const frameworkData = [
    { value: "react", label: "React", icon: <Code /> },
    { value: "angular", label: "Angular", icon: <Shield /> },
    { value: "vue", label: "Vue", icon: <Zap /> },
    { value: "svelte", label: "Svelte", icon: <Star /> },
  ];

  const deviceData = [
    { value: "mobile", label: "Mobile", icon: <Smartphone /> },
    { value: "tablet", label: "Tablet", icon: <Globe /> },
    { value: "desktop", label: "Desktop", icon: <Code /> },
  ];

  const actionData = [
    { value: "edit", label: "Edit", icon: <Edit /> },
    { value: "delete", label: "Delete", icon: <Trash2 /> },
    { value: "share", label: "Share", icon: <Upload /> },
  ];

  // Select data
  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "pills", label: "Pills" },
    { value: "outline", label: "Outline" },
    { value: "minimal", label: "Minimal" },
  ];

  const orientationOptions = [
    { value: "horizontal", label: "Horizontal" },
    { value: "vertical", label: "Vertical" },
  ];

  const radiusOptions = [
    { value: "none", label: "None" },
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
    { value: "full", label: "Full" },
  ];

  const iconPositionOptions = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Segmented Control
          </h1>
          <p className="text-gray-600">
            Linear set of segments, each of which functions as a mutually
            exclusive button
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Preview Section */}
              <div className="xl:col-span-3 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <div className={fullWidth ? "w-full" : ""}>
                      <SegmentedControl
                        data={showIcons ? frameworkData : basicData}
                        value={selectedValue}
                        onChange={setSelectedValue}
                        variant={variant as any}
                        size={size as any}
                        orientation={orientation as any}
                        radius={radius as any}
                        disabled={disabled}
                        fullWidth={fullWidth}
                        equalWidth={equalWidth}
                        showIcons={showIcons}
                        iconPosition={iconPosition as any}
                        allowDeselect={allowDeselect}
                        color={primaryColor}
                        transitionDuration={transitionDuration}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 xl:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Controls
                    </h3>
                  </div>

                  <div className="space-y-6">
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

                    {/* Row 3: Orientation */}
                    <div>
                      <Select
                        data={orientationOptions}
                        value={orientation}
                        onChange={(value) => setOrientation(value as string)}
                        label="Orientation"
                        size="sm"
                      />
                    </div>

                    {/* Row 4: Radius */}
                    <div>
                      <Select
                        data={radiusOptions}
                        value={radius}
                        onChange={(value) => setRadius(value as string)}
                        label="Radius"
                        size="sm"
                      />
                    </div>

                    {/* Row 5: Icon Position */}
                    <div>
                      <Select
                        data={iconPositionOptions}
                        value={iconPosition}
                        onChange={(value) => setIconPosition(value as string)}
                        label="Icon Position"
                        size="sm"
                        disabled={!showIcons}
                      />
                    </div>

                    {/* Row 6: Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Animation: {transitionDuration}ms
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="800"
                        step="50"
                        value={transitionDuration}
                        onChange={(e) =>
                          setTransitionDuration(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>100ms</span>
                        <span>800ms</span>
                      </div>
                    </div>

                    {/* Row 7: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={disabled}
                        onChange={setDisabled}
                        label="Disabled"
                        size="sm"
                      />
                      <Checkbox
                        checked={fullWidth}
                        onChange={setFullWidth}
                        label="Full width"
                        size="sm"
                      />
                      <Checkbox
                        checked={equalWidth}
                        onChange={setEqualWidth}
                        label="Equal width"
                        size="sm"
                      />
                      <Checkbox
                        checked={showIcons}
                        onChange={setShowIcons}
                        label="Show icons"
                        size="sm"
                      />
                      <Checkbox
                        checked={allowDeselect}
                        onChange={setAllowDeselect}
                        label="Allow deselect"
                        size="sm"
                      />
                    </div>

                    {/* Row 8: Color */}
                    <div>
                      <ColorPicker
                        value={primaryColor}
                        onChange={setPrimaryColor}
                        label="Color"
                        size="md"
                        colorGridColumns={4}
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
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="flex justify-center">
                  <SegmentedControl
                    data={basicData}
                    value="svelte"
                    onChange={() => {}}
                    variant="default"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pills</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="flex justify-center">
                  <SegmentedControl
                    data={basicData}
                    value="svelte"
                    onChange={() => {}}
                    variant="pills"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Outline
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="flex justify-center">
                  <SegmentedControl
                    data={basicData}
                    value="svelte"
                    onChange={() => {}}
                    variant="outline"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Minimal
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="flex justify-center">
                  <SegmentedControl
                    data={basicData}
                    value="svelte"
                    onChange={() => {}}
                    variant="minimal"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<SegmentedControl variant="default" data={data} value={value} onChange={setValue} />
<SegmentedControl variant="pills" data={data} value={value} onChange={setValue} />
<SegmentedControl variant="outline" data={data} value={value} onChange={setValue} />
<SegmentedControl variant="minimal" data={data} value={value} onChange={setValue} />`}
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
                <div className="flex justify-center">
                  <SegmentedControl
                    data={basicData}
                    value="svelte"
                    onChange={() => {}}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="flex justify-center">
                  <SegmentedControl
                    data={basicData}
                    value="svelte"
                    onChange={() => {}}
                    size="md"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="flex justify-center">
                  <SegmentedControl
                    data={basicData}
                    value="svelte"
                    onChange={() => {}}
                    size="lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Extra Large
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="flex justify-center">
                  <SegmentedControl
                    data={basicData}
                    value="svelte"
                    onChange={() => {}}
                    size="xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<SegmentedControl size="sm" data={data} value={value} onChange={setValue} />
<SegmentedControl size="md" data={data} value={value} onChange={setValue} />
<SegmentedControl size="lg" data={data} value={value} onChange={setValue} />
<SegmentedControl size="xl" data={data} value={value} onChange={setValue} />`}
              title="Demo.tsx"
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* With Icons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Icons
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="flex justify-center">
              <SegmentedControl
                data={frameworkData}
                value="svelte"
                onChange={() => {}}
                showIcons={true}
              />
            </div>
          </div>

          <CodeSection
            code={`import { Code, Shield, Zap, Star } from 'lucide-react';

const data = [
  { value: 'react', label: 'React', icon: <Code /> },
  { value: 'angular', label: 'Angular', icon: <Shield /> },
  { value: 'vue', label: 'Vue', icon: <Zap /> },
  { value: 'svelte', label: 'Svelte', icon: <Star /> },
];

<SegmentedControl
  data={data}
  value={value}
  onChange={setValue}
  showIcons={true}
/>`}
            title="Demo.tsx"
            sectionKey="icons"
          />
        </section>

        {/* Vertical Orientation Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Vertical Orientation
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="flex justify-center">
              <SegmentedControl
                data={deviceData}
                value="mobile"
                onChange={() => {}}
                orientation="vertical"
                showIcons={true}
              />
            </div>
          </div>

          <CodeSection
            code={`<SegmentedControl
  data={data}
  value={value}
  onChange={setValue}
  orientation="vertical"
  showIcons={true}
/>`}
            title="Demo.tsx"
            sectionKey="vertical"
          />
        </section>

        {/* Custom Colors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Custom Colors
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
              <div className="flex justify-center mb-4">
                <SegmentedControl
                  data={basicData}
                  value="svelte"
                  onChange={() => {}}
                  color="#10B981"
                />
              </div>
              <div className="flex justify-center mb-4">
                <SegmentedControl
                  data={basicData}
                  value="svelte"
                  onChange={() => {}}
                  color="#F59E0B"
                />
              </div>
              <div className="flex justify-center">
                <SegmentedControl
                  data={basicData}
                  value="svelte"
                  onChange={() => {}}
                  color="#EF4444"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<SegmentedControl color="#10B981" data={data} value={value} onChange={setValue} />
<SegmentedControl color="#F59E0B" data={data} value={value} onChange={setValue} />
<SegmentedControl color="#EF4444" data={data} value={value} onChange={setValue} />`}
              title="Demo.tsx"
              sectionKey="colors"
            />
          </div>
        </section>

        {/* Full Width Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Full Width
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <SegmentedControl
              data={actionData}
              value="edit"
              onChange={() => {}}
              fullWidth
              showIcons={true}
            />
          </div>

          <CodeSection
            code={`<SegmentedControl
  data={data}
  value={value}
  onChange={setValue}
  fullWidth
  showIcons={true}
/>`}
            title="Demo.tsx"
            sectionKey="fullwidth"
          />
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="flex justify-center">
              <SegmentedControl
                data={basicData}
                value="svelte"
                onChange={() => {}}
                disabled
              />
            </div>
          </div>

          <CodeSection
            code={`<SegmentedControl
  data={data}
  value={value}
  onChange={setValue}
  disabled
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
