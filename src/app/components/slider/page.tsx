"use client";

import React, { useState } from "react";
import { Slider } from "@/lib/components/Slider";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { ColorPicker } from "@/lib/components/ColorPicker";
import {
  Copy,
  Check,
  Settings,
  Volume2,
  Copyright as Brightness,
  Thermometer,
  DollarSign,
  Star,
  Heart,
  Zap,
} from "lucide-react";

export default function SliderPage() {
  // Interactive controls state
  const [size, setSize] = useState("md");
  const [value, setValue] = useState(22);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showMinMax, setShowMinMax] = useState(true);
  const [showMarks, setShowMarks] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipAlwaysOn, setTooltipAlwaysOn] = useState(false);
  const [range, setRange] = useState(false);
  const [inverted, setInverted] = useState(false);
  const [showThumbIcon, setShowThumbIcon] = useState(false);
  const [color, setColor] = useState("#3B82F6");
  const [trackColor, setTrackColor] = useState("#E5E7EB");
  const [thumbColor, setThumbColor] = useState("#FFFFFF");
  const [radius, setRadius] = useState(9999);

  // Demo state
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
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
    if (size !== "md") props.push(`size="${size}"`);
    if (min !== 0) props.push(`min={${min}}`);
    if (max !== 100) props.push(`max={${max}}`);
    if (step !== 1) props.push(`step={${step}}`);
    if (disabled) props.push("disabled");
    if (required) props.push("required");
    if (showLabels) props.push("showLabels");
    if (!showMinMax) props.push("showMinMax={false}");
    if (showMarks) props.push("showMarks");
    if (showTooltip) props.push("showTooltip");
    if (tooltipAlwaysOn) props.push("tooltipAlwaysOn");
    if (range) props.push("range");
    if (inverted) props.push("inverted");
    if (showThumbIcon) props.push("thumbIcon={<Volume2 />}");
    if (color !== "#3B82F6") props.push(`color="${color}"`);
    if (trackColor !== "#E5E7EB") props.push(`trackColor="${trackColor}"`);
    if (thumbColor !== "#FFFFFF") props.push(`thumbColor="${thumbColor}"`);
    if (radius !== 9999) props.push(`radius={${radius}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Slider } from '@beeui';

<Slider
  label="Volume"
  description="Adjust the volume level"
  value={${range ? JSON.stringify(rangeValue) : value}}
  onChange={${range ? "setRangeValue" : "setValue"}}${propsString}
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



  // Sample marks
  const marks = [
    { value: 0, label: "0" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 75, label: "75" },
    { value: 100, label: "100" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Slider</h1>
          <p className="text-gray-600">
            Capture user input from a range of values with smooth animations and
            customizable styling
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
                      <Slider
                        label="Volume"
                        description="Adjust the volume level"
                        value={range ? rangeValue : value}
                        onChange={
                          range
                            ? (v) => setRangeValue(v as [number, number])
                            : (v) => setValue(v as number)
                        }
                        min={min}
                        max={max}
                        step={step}
                        size={size as any}
                        disabled={disabled}
                        required={required}
                        showLabels={showLabels}
                        showMinMax={showMinMax}
                        showMarks={showMarks}
                        marks={showMarks ? marks : undefined}
                        showTooltip={showTooltip}
                        tooltipAlwaysOn={tooltipAlwaysOn}
                        range={range}
                        inverted={inverted}
                        color={color}
                        trackColor={trackColor}
                        thumbColor={thumbColor}
                        radius={radius}
                        thumbIcon={showThumbIcon ? <Volume2 /> : undefined}
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
                    {/* Row 1: Size */}
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

                    {/* Row 3: Value Controls */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Min: {min}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="0"
                            max="50"
                            value={min}
                            onChange={(e) => setMin(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Max: {max}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="50"
                            max="200"
                            value={max}
                            onChange={(e) => setMax(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Step and Radius */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Step: {step}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={step}
                            onChange={(e) => setStep(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Radius: {radius === 9999 ? "Full" : `${radius}px`}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={radius === 9999 ? 20 : radius}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setRadius(val === 20 ? 9999 : val);
                            }}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Colors */}
                    <div className="space-y-4">
                      <ColorPicker
                        value={color}
                        onChange={setColor}
                        label="Slider Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                      <ColorPicker
                        value={trackColor}
                        onChange={setTrackColor}
                        label="Track Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                      <ColorPicker
                        value={thumbColor}
                        onChange={setThumbColor}
                        label="Thumb Color"
                        size="sm"
                        colorGridColumns={4}
                      />
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
                      <Checkbox
                        checked={showLabels}
                        onChange={setShowLabels}
                        label="Show labels"
                        size="sm"
                      />
                      <Checkbox
                        checked={showMinMax}
                        onChange={setShowMinMax}
                        label="Show min/max"
                        size="sm"
                      />
                      <Checkbox
                        checked={showMarks}
                        onChange={setShowMarks}
                        label="Show marks"
                        size="sm"
                      />
                      <Checkbox
                        checked={showTooltip}
                        onChange={setShowTooltip}
                        label="Show tooltip"
                        size="sm"
                      />
                      <Checkbox
                        checked={tooltipAlwaysOn}
                        onChange={setTooltipAlwaysOn}
                        label="Tooltip always on"
                        size="sm"
                        disabled={!showTooltip}
                      />
                      <Checkbox
                        checked={range}
                        onChange={setRange}
                        label="Range slider"
                        size="sm"
                      />
                      <Checkbox
                        checked={inverted}
                        onChange={setInverted}
                        label="Inverted"
                        size="sm"
                      />
                      <Checkbox
                        checked={showThumbIcon}
                        onChange={setShowThumbIcon}
                        label="Thumb icon"
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
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <Slider
                  label="Default Slider"
                  value={65}
                  onChange={() => {}}
                  showMinMax
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <Slider
                  label="Filled Slider"
                  value={45}
                  onChange={() => {}}
                  showMinMax
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Minimal
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <Slider
                  label="Minimal Slider"
                  value={80}
                  onChange={() => {}}
                  showMinMax
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Slider value={65} onChange={setValue} />
<Slider value={45} onChange={setValue} />
<Slider value={80} onChange={setValue} />`}
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
                <Slider value={70} onChange={() => {}} size="sm" showMinMax />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Slider value={70} onChange={() => {}} size="md" showMinMax />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Slider value={70} onChange={() => {}} size="lg" showMinMax />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Extra Large
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Slider value={70} onChange={() => {}} size="xl" showMinMax />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Slider size="sm" value={70} onChange={setValue} />
<Slider size="md" value={70} onChange={setValue} />
<Slider size="lg" value={70} onChange={setValue} />
<Slider size="xl" value={70} onChange={setValue} />`}
              title="Demo.tsx"
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* Range Slider Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Range Slider
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Slider
              label="Price Range"
              description="Select your budget range"
              value={[25, 75]}
              onChange={() => {}}
              range
              showLabels
              showMinMax
              labelFormatter={(val) => `$${val}`}
            />
          </div>

          <CodeSection
            code={`<Slider
  label="Price Range"
  description="Select your budget range"
  value={[25, 75]}
  onChange={setRangeValue}
  range
  showLabels
  showMinMax
  labelFormatter={(val) => \`$\${val}\`}
/>`}
            title="Demo.tsx"
            sectionKey="range"
          />
        </section>

        {/* With Marks Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Marks
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Slider
              label="Temperature"
              value={50}
              onChange={() => {}}
              showMarks
              marks={marks}
              step={25}
              thumbIcon={<Thermometer />}
            />
          </div>

          <CodeSection
            code={`const marks = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' }
];

<Slider
  label="Temperature"
  value={50}
  onChange={setValue}
  showMarks
  marks={marks}
  step={25}
  thumbIcon={<Thermometer />}
/>`}
            title="Demo.tsx"
            sectionKey="marks"
          />
        </section>

        {/* Custom Colors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Custom Colors
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
              <div className="space-y-6">
                <Slider
                  label="Volume"
                  value={60}
                  onChange={() => {}}
                  color="#10B981"
                  thumbIcon={<Volume2 />}
                  showMinMax
                />
                <Slider
                  label="Brightness"
                  value={80}
                  onChange={() => {}}
                  color="#F59E0B"
                  thumbIcon={<Brightness />}
                  showMinMax
                />
                <Slider
                  label="Price"
                  value={45}
                  onChange={() => {}}
                  color="#EF4444"
                  thumbIcon={<DollarSign />}
                  showMinMax
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Slider color="#10B981" thumbIcon={<Volume2 />} />
<Slider color="#F59E0B" thumbIcon={<Brightness />} />
<Slider color="#EF4444" thumbIcon={<DollarSign />} />`}
              title="Demo.tsx"
              sectionKey="colors"
            />
          </div>
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="space-y-6">
              <Slider
                label="Disabled Slider"
                description="This slider is disabled"
                value={30}
                onChange={() => {}}
                disabled
                showMinMax
              />
              <Slider
                label="Disabled Range"
                value={[20, 70]}
                onChange={() => {}}
                range
                disabled
                showMinMax
              />
            </div>
          </div>

          <CodeSection
            code={`<Slider disabled label="Disabled Slider" value={30} />
<Slider disabled range value={[20, 70]} label="Disabled Range" />`}
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
