"use client";

import React, { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxCard,
} from "@bee-ui/core";
import { Select } from "@bee-ui/core";
import { ColorPicker } from "@bee-ui/core";
import {
  Copy,
  Check,
  Settings,
  Heart,
  Star,
  Shield,
  Zap,
  Globe,
  Code,
} from "lucide-react";

export default function CheckboxPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [disabled, setDisabled] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [labelPosition, setLabelPosition] = useState("right");
  const [primaryColor, setPrimaryColor] = useState("#6366F1");
  const [radius, setRadius] = useState(4);

  // Demo state
  const [checked, setChecked] = useState(false);
  const [groupValue, setGroupValue] = useState<string[]>(["react"]);
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
    if (disabled) props.push("disabled");
    if (indeterminate) props.push("indeterminate");
    if (labelPosition !== "right")
      props.push(`labelPosition="${labelPosition}"`);
    if (primaryColor !== "#6366F1") props.push(`color="${primaryColor}"`);
    if (radius !== 4) props.push(`radius={${radius}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Checkbox } from '@beeui';

<Checkbox
  label="I agree to terms and conditions"${propsString}
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

  // Custom checkbox component for controls
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

  // Select data
  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "filled", label: "Filled" },
    { value: "outline", label: "Outline" },
  ];

  const labelPositionOptions = [
    { value: "right", label: "Right" },
    { value: "left", label: "Left" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkbox</h1>
          <p className="text-gray-600">
            Capture boolean input from user with optional indeterminate state
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <Checkbox
                      checked={checked}
                      onChange={setChecked}
                      label="I agree to terms and conditions"
                      description="Please read our terms carefully before proceeding"
                      variant={variant as any}
                      size={size as any}
                      disabled={disabled}
                      indeterminate={indeterminate}
                      labelPosition={labelPosition as any}
                      color={primaryColor}
                      radius={radius}
                    />
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Interactive Controls
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Row 1: Label Position */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Label Position
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setLabelPosition("right")}
                          className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                            labelPosition === "right"
                              ? "bg-blue-50 border-blue-200 text-blue-700"
                              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Right
                        </button>
                        <button
                          onClick={() => setLabelPosition("left")}
                          className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                            labelPosition === "left"
                              ? "bg-blue-50 border-blue-200 text-blue-700"
                              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Left
                        </button>
                      </div>
                    </div>

                    {/* Row 2: Label Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label
                      </label>
                      <input
                        type="text"
                        value="I agree to terms and conditions"
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                      />
                    </div>

                    {/* Row 3: Description Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        placeholder="Enter prop value"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Row 4: Variant and Size */}
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

                    {/* Row 5: Radius */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Radius: {radius}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="12"
                        value={radius}
                        onChange={(e) => setRadius(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0px</span>
                        <span>12px</span>
                      </div>
                    </div>

                    {/* Row 6: Checkboxes */}
                    <div className="space-y-3">
                      <CustomCheckbox
                        checked={disabled}
                        onChange={setDisabled}
                        label="Disabled"
                      />
                      <CustomCheckbox
                        checked={indeterminate}
                        onChange={setIndeterminate}
                        label="Indeterminate state"
                      />
                    </div>

                    {/* Row 7: Color (moved to last) */}
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

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="space-y-3">
                  <Checkbox label="Unchecked" variant="default" />
                  <Checkbox label="Checked" variant="default" checked />
                  <Checkbox
                    label="Indeterminate"
                    variant="default"
                    indeterminate
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="space-y-3">
                  <Checkbox label="Unchecked" variant="filled" />
                  <Checkbox label="Checked" variant="filled" checked />
                  <Checkbox
                    label="Indeterminate"
                    variant="filled"
                    indeterminate
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Outline
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="space-y-3">
                  <Checkbox label="Unchecked" variant="outline" />
                  <Checkbox label="Checked" variant="outline" checked />
                  <Checkbox
                    label="Indeterminate"
                    variant="outline"
                    indeterminate
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Checkbox label="Unchecked" variant="default" />
<Checkbox label="Checked" variant="default" checked />
<Checkbox label="Indeterminate" variant="default" indeterminate />

<Checkbox label="Unchecked" variant="filled" />
<Checkbox label="Checked" variant="filled" checked />
<Checkbox label="Indeterminate" variant="filled" indeterminate />

<Checkbox label="Unchecked" variant="outline" />
<Checkbox label="Checked" variant="outline" checked />
<Checkbox label="Indeterminate" variant="outline" indeterminate />`}
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
              <Checkbox label="Small checkbox" size="sm" checked />
              <Checkbox label="Medium checkbox" size="md" checked />
              <Checkbox label="Large checkbox" size="lg" checked />
              <Checkbox label="Extra large checkbox" size="xl" checked />
            </div>
          </div>

          <CodeSection
            code={`<Checkbox label="Small checkbox" size="sm" checked />
<Checkbox label="Medium checkbox" size="md" checked />
<Checkbox label="Large checkbox" size="lg" checked />
<Checkbox label="Extra large checkbox" size="xl" checked />`}
            title="Demo.tsx"
            sectionKey="sizes"
          />
        </section>

        {/* Colors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Colors</h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Checkbox label="Blue" color="#3B82F6" checked />
              <Checkbox label="Red" color="#EF4444" checked />
              <Checkbox label="Green" color="#10B981" checked />
              <Checkbox label="Purple" color="#8B5CF6" checked />
              <Checkbox label="Pink" color="#EC4899" checked />
              <Checkbox label="Orange" color="#F97316" checked />
            </div>
          </div>

          <CodeSection
            code={`<Checkbox label="Blue" color="#3B82F6" checked />
<Checkbox label="Red" color="#EF4444" checked />
<Checkbox label="Green" color="#10B981" checked />
<Checkbox label="Purple" color="#8B5CF6" checked />
<Checkbox label="Pink" color="#EC4899" checked />
<Checkbox label="Orange" color="#F97316" checked />`}
            title="Demo.tsx"
            sectionKey="colors"
          />
        </section>

        {/* Indeterminate State Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Indeterminate State
          </h2>
          <p className="text-gray-600 mb-6">
            The indeterminate state is useful for "select all" checkboxes when
            only some items are selected.
          </p>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <IndeterminateExample />
          </div>

          <CodeSection
            code={`import { useState } from 'react';
import { Checkbox } from '@beeui';

function IndeterminateExample() {
  const [items, setItems] = useState([
    { id: 'react', label: 'React', checked: true },
    { id: 'vue', label: 'Vue', checked: false },
    { id: 'angular', label: 'Angular', checked: false },
  ]);

  const checkedItems = items.filter(item => item.checked);
  const allChecked = checkedItems.length === items.length;
  const indeterminate = checkedItems.length > 0 && !allChecked;

  const handleSelectAll = (checked: boolean) => {
    setItems(items.map(item => ({ ...item, checked })));
  };

  const handleItemChange = (id: string, checked: boolean) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked } : item
    ));
  };

  return (
    <div className="space-y-3">
      <Checkbox
        label="Select all frameworks"
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={handleSelectAll}
      />
      <div className="ml-6 space-y-2">
        {items.map(item => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={item.checked}
            onChange={(checked) => handleItemChange(item.id, checked)}
          />
        ))}
      </div>
    </div>
  );
}`}
            title="Demo.tsx"
            sectionKey="indeterminate"
          />
        </section>

        {/* Checkbox Group Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Checkbox Group
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <CheckboxGroup
              value={groupValue}
              onChange={setGroupValue}
              label="Choose your favorite frameworks"
              description="Select all that apply"
            >
              <Checkbox value="react" label="React" />
              <Checkbox value="vue" label="Vue.js" />
              <Checkbox value="angular" label="Angular" />
              <Checkbox value="svelte" label="Svelte" />
            </CheckboxGroup>
          </div>

          <CodeSection
            code={`import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@beeui';

function Demo() {
  const [value, setValue] = useState(['react']);

  return (
    <CheckboxGroup
      value={value}
      onChange={setValue}
      label="Choose your favorite frameworks"
      description="Select all that apply"
    >
      <Checkbox value="react" label="React" />
      <Checkbox value="vue" label="Vue.js" />
      <Checkbox value="angular" label="Angular" />
      <Checkbox value="svelte" label="Svelte" />
    </CheckboxGroup>
  );
}`}
            title="Demo.tsx"
            sectionKey="group"
          />
        </section>

        {/* Checkbox Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Checkbox Cards
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxCard
                label="Frontend Development"
                description="React, Vue, Angular, and more"
                icon={<Code />}
                checked
              />
              <CheckboxCard
                label="Backend Development"
                description="Node.js, Python, Java, and more"
                icon={<Globe />}
              />
              <CheckboxCard
                label="DevOps & Infrastructure"
                description="Docker, Kubernetes, AWS, and more"
                icon={<Shield />}
              />
              <CheckboxCard
                label="Mobile Development"
                description="React Native, Flutter, Swift, and more"
                icon={<Zap />}
              />
            </div>
          </div>

          <CodeSection
            code={`import { CheckboxCard } from '@beeui';
import { Code, Globe, Shield, Zap } from 'lucide-react';

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <CheckboxCard
    label="Frontend Development"
    description="React, Vue, Angular, and more"
    icon={<Code />}
    checked
  />
  <CheckboxCard
    label="Backend Development"
    description="Node.js, Python, Java, and more"
    icon={<Globe />}
  />
  <CheckboxCard
    label="DevOps & Infrastructure"
    description="Docker, Kubernetes, AWS, and more"
    icon={<Shield />}
  />
  <CheckboxCard
    label="Mobile Development"
    description="React Native, Flutter, Swift, and more"
    icon={<Zap />}
  />
</div>`}
            title="Demo.tsx"
            sectionKey="cards"
          />
        </section>

        {/* Custom Icons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Custom Icons
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="space-y-4">
              <Checkbox
                label="Favorite this item"
                icon={<Heart className="w-3 h-3 text-white" />}
                color="#EC4899"
                checked
              />
              <Checkbox
                label="Star this repository"
                icon={<Star className="w-3 h-3 text-white" />}
                color="#F59E0B"
                checked
              />
              <Checkbox
                label="Enable notifications"
                indeterminateIcon={<Zap className="w-3 h-3 text-white" />}
                color="#8B5CF6"
                indeterminate
              />
            </div>
          </div>

          <CodeSection
            code={`import { Checkbox } from '@beeui';
import { Heart, Star, Zap } from 'lucide-react';

<Checkbox 
  label="Favorite this item" 
  icon={<Heart className="w-3 h-3 text-white" />}
  color="#EC4899"
  checked 
/>
<Checkbox 
  label="Star this repository" 
  icon={<Star className="w-3 h-3 text-white" />}
  color="#F59E0B"
  checked 
/>
<Checkbox 
  label="Enable notifications" 
  indeterminateIcon={<Zap className="w-3 h-3 text-white" />}
  color="#8B5CF6"
  indeterminate 
/>`}
            title="Demo.tsx"
            sectionKey="custom-icons"
          />
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="space-y-4">
              <Checkbox label="Disabled unchecked" disabled />
              <Checkbox label="Disabled checked" disabled checked />
              <Checkbox label="Disabled indeterminate" disabled indeterminate />
              <Checkbox
                label="Disabled with description"
                description="This option is not available"
                disabled
                checked
              />
            </div>
          </div>

          <CodeSection
            code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled checked />
<Checkbox label="Disabled indeterminate" disabled indeterminate />
<Checkbox 
  label="Disabled with description" 
  description="This option is not available"
  disabled 
  checked 
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

// Indeterminate example component
function IndeterminateExample() {
  const [items, setItems] = useState([
    { id: "react", label: "React", checked: true },
    { id: "vue", label: "Vue", checked: false },
    { id: "angular", label: "Angular", checked: false },
  ]);

  const checkedItems = items.filter((item) => item.checked);
  const allChecked = checkedItems.length === items.length;
  const indeterminate = checkedItems.length > 0 && !allChecked;

  const handleSelectAll = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })));
  };

  const handleItemChange = (id: string, checked: boolean) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, checked } : item))
    );
  };

  return (
    <div className="space-y-3">
      <Checkbox
        label="Select all frameworks"
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={handleSelectAll}
      />
      <div className="ml-6 space-y-2">
        {items.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={item.checked}
            onChange={(checked) => handleItemChange(item.id, checked)}
          />
        ))}
      </div>
    </div>
  );
}
