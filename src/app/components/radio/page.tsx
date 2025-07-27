"use client";

import React, { useState } from "react";
import { Radio, RadioGroup } from "@/lib/components/Radio";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { ColorPicker } from "@/lib/components/ColorPicker";
import {
  Copy,
  Check,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Heart,
  Shield,
  Zap,
  Globe,
  Code,
} from "lucide-react";

export default function RadioPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("filled");
  const [size, setSize] = useState("md");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [labelPosition, setLabelPosition] = useState("right");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [dotColor, setDotColor] = useState("#FFFFFF");
  const [radius, setRadius] = useState(50); // Default to round (50%)

  // Demo state
  const [selectedValue, setSelectedValue] = useState("option1");
  const [groupValue, setGroupValue] = useState("react");
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
    if (variant !== "filled") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");
    if (required) props.push("required");
    if (labelPosition !== "right")
      props.push(`labelPosition="${labelPosition}"`);
    if (primaryColor !== "#3B82F6") props.push(`color="${primaryColor}"`);
    if (dotColor !== "#FFFFFF" && variant === "filled") props.push(`dotColor="${dotColor}"`);
    if (radius !== 50) props.push(`radius={${radius}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Radio } from '@beeui';

<Radio
  label="I agree to terms and conditions"
  description="Please read our terms carefully before proceeding"${propsString}
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
    { value: "filled", label: "Filled" },
    { value: "outlined", label: "Outlined" },
  ];

  const labelPositionOptions = [
    { value: "right", label: "Right" },
    { value: "left", label: "Left" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Radio</h1>
          <p className="text-gray-600">
            Capture user input from a set of related options with single
            selection
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
                    <div className="w-full max-w-md space-y-6">
                      <Radio
                        checked={selectedValue === "option1"}
                        onChange={(checked) =>
                          checked && setSelectedValue("option1")
                        }
                        label="I agree to terms and conditions"
                        description="Please read our terms carefully before proceeding"
                        variant={variant as any}
                        size={size as any}
                        disabled={disabled}
                        required={required}
                        labelPosition={labelPosition as any}
                        color={primaryColor}
                        dotColor={dotColor}
                        radius={radius}
                        value="option1"
                      />

                      <Radio
                        checked={selectedValue === "option2"}
                        onChange={(checked) =>
                          checked && setSelectedValue("option2")
                        }
                        label="Subscribe to newsletter"
                        description="Get updates about new features and releases"
                        variant={variant as any}
                        size={size as any}
                        disabled={disabled}
                        labelPosition={labelPosition as any}
                        color={primaryColor}
                        dotColor={dotColor}
                        radius={radius}
                        value="option2"
                      />
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

                    {/* Row 3: Label Position */}
                    <div>
                      <Select
                        data={labelPositionOptions}
                        value={labelPosition}
                        onChange={(value) => setLabelPosition(value as string)}
                        label="Label Position"
                        size="sm"
                      />
                    </div>

                    {/* Row 4: Radius */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Radius: {radius}% {radius === 50 ? "(Round)" : ""}
                      </label>
                      <div className="pr-2">
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={radius}
                          onChange={(e) => setRadius(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>50% (Round)</span>
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Colors */}
                    <div className="space-y-4">
                      <ColorPicker
                        value={primaryColor}
                        onChange={setPrimaryColor}
                        label="Radio Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                      <div className="h-[120px]">
                        {variant === "filled" && (
                          <ColorPicker
                            value={dotColor}
                            onChange={setDotColor}
                            label="Dot Color"
                            size="sm"
                            colorGridColumns={4}
                          />
                        )}
                      </div>
                    </div>

                    {/* Row 6: Feature Toggles */}
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="space-y-4">
                  <Radio label="Unchecked filled" variant="filled" radius={50} />
                  <Radio label="Checked filled" variant="filled" checked radius={50} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Outlined
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="space-y-4">
                  <Radio label="Unchecked outlined" variant="outlined" radius={50} />
                  <Radio label="Checked outlined (default blue)" variant="outlined" checked radius={50} />
                  <Radio label="Custom color outlined" variant="outlined" checked color="#EF4444" radius={50} />
                  <Radio label="Green outlined" variant="outlined" checked color="#10B981" radius={50} />
                  <Radio label="Purple outlined" variant="outlined" checked color="#8B5CF6" radius={50} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Radio label="Unchecked filled" variant="filled" radius={50} />
<Radio label="Checked filled" variant="filled" checked radius={50} />

<Radio label="Unchecked outlined" variant="outlined" radius={50} />
<Radio label="Checked outlined (default blue)" variant="outlined" checked radius={50} />
<Radio label="Custom color outlined" variant="outlined" checked color="#EF4444" radius={50} />
<Radio label="Green outlined" variant="outlined" checked color="#10B981" radius={50} />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sizes</h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="space-y-4">
              <Radio label="Small radio" size="sm" checked radius={50} />
              <Radio label="Medium radio" size="md" checked radius={50} />
              <Radio label="Large radio" size="lg" checked radius={50} />
              <Radio label="Extra large radio" size="xl" checked radius={50} />
            </div>
          </div>

          <CodeSection
            code={`<Radio label="Small radio" size="sm" checked radius={50} />
<Radio label="Medium radio" size="md" checked radius={50} />
<Radio label="Large radio" size="lg" checked radius={50} />
<Radio label="Extra large radio" size="xl" checked radius={50} />`}
            title="Demo.tsx"
            sectionKey="sizes"
          />
        </section>

        {/* Colors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Custom Colors
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Filled Variant</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Radio label="Blue" color="#3B82F6" checked variant="filled" radius={50} />
                  <Radio label="Red" color="#EF4444" checked variant="filled" radius={50} />
                  <Radio label="Green" color="#10B981" checked variant="filled" radius={50} />
                  <Radio label="Purple" color="#8B5CF6" checked variant="filled" radius={50} />
                  <Radio label="Pink" color="#EC4899" checked variant="filled" radius={50} />
                  <Radio label="Orange" color="#F97316" checked variant="filled" radius={50} />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Outlined Variant</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Radio label="Blue" color="#3B82F6" checked variant="outlined" radius={50} />
                  <Radio label="Red" color="#EF4444" checked variant="outlined" radius={50} />
                  <Radio label="Green" color="#10B981" checked variant="outlined" radius={50} />
                  <Radio label="Purple" color="#8B5CF6" checked variant="outlined" radius={50} />
                  <Radio label="Pink" color="#EC4899" checked variant="outlined" radius={50} />
                  <Radio label="Orange" color="#F97316" checked variant="outlined" radius={50} />
                </div>
              </div>
            </div>
          </div>

          <CodeSection
            code={`// Filled variant - color controls background and border
<Radio label="Blue" color="#3B82F6" checked variant="filled" radius={50} />
<Radio label="Red" color="#EF4444" checked variant="filled" radius={50} />

// Outlined variant - color controls border and dot
<Radio label="Blue" color="#3B82F6" checked variant="outlined" radius={50} />
<Radio label="Red" color="#EF4444" checked variant="outlined" radius={50} />`}
            title="Demo.tsx"
            sectionKey="colors"
          />
        </section>

        {/* Radio Group Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Radio Group
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <RadioGroup
              value={groupValue}
              onChange={(value) => setGroupValue(String(value))}
              label="Choose your favorite framework"
              description="Select one option from the list below"
              name="framework"
            >
              <Radio
                value="react"
                label="React"
                description="JavaScript library for building user interfaces"
                radius={50}
              />
              <Radio
                value="vue"
                label="Vue.js"
                description="Progressive JavaScript framework"
                radius={50}
              />
              <Radio
                value="angular"
                label="Angular"
                description="Platform for building mobile and desktop web applications"
                radius={50}
              />
              <Radio
                value="svelte"
                label="Svelte"
                description="Cybernetically enhanced web apps"
                radius={50}
              />
            </RadioGroup>
          </div>

          <CodeSection
            code={`import { Radio, RadioGroup } from '@beeui';

function Demo() {
  const [value, setValue] = useState('react');

  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      label="Choose your favorite framework"
      description="Select one option from the list below"
      name="framework"
    >
      <Radio value="react" label="React" description="JavaScript library" radius={50} />
      <Radio value="vue" label="Vue.js" description="Progressive framework" radius={50} />
      <Radio value="angular" label="Angular" description="Platform for web apps" radius={50} />
      <Radio value="svelte" label="Svelte" description="Enhanced web apps" radius={50} />
    </RadioGroup>
  );
}`}
            title="Demo.tsx"
            sectionKey="group"
          />
        </section>

        {/* Horizontal Layout Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Horizontal Layout
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <RadioGroup
              value="medium"
              onChange={() => {}}
              label="Choose size"
              orientation="horizontal"
              spacing="lg"
            >
              <Radio value="small" label="Small" radius={50} />
              <Radio value="medium" label="Medium" radius={50} />
              <Radio value="large" label="Large" radius={50} />
            </RadioGroup>
          </div>

          <CodeSection
            code={`<RadioGroup
  value={value}
  onChange={setValue}
  label="Choose size"
  orientation="horizontal"
  spacing="lg"
>
  <Radio value="small" label="Small" radius={50} />
  <Radio value="medium" label="Medium" radius={50} />
  <Radio value="large" label="Large" radius={50} />
</RadioGroup>`}
            title="Demo.tsx"
            sectionKey="horizontal"
          />
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="space-y-4">
              <Radio label="Disabled unchecked" disabled radius={50} />
              <Radio label="Disabled checked" disabled checked radius={50} />
              <Radio
                label="Disabled with description"
                description="This option is not available"
                disabled
                checked
                radius={50}
              />
            </div>
          </div>

          <CodeSection
            code={`<Radio label="Disabled unchecked" disabled radius={50} />
<Radio label="Disabled checked" disabled checked radius={50} />
<Radio 
  label="Disabled with description" 
  description="This option is not available"
  disabled 
  checked 
  radius={50}
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
