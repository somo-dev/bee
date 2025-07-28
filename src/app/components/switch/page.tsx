"use client";

import React, { useState } from "react";
import { Switch } from "@/lib/components/Switch";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { ColorPicker } from "@/lib/components/ColorPicker";
import {
  Copy,
  Check,
  Settings,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Play,
  Pause,
  Heart,
  Star,
  Zap,
  Shield,
  X,
} from "lucide-react";

export default function SwitchPage() {
  // Interactive controls state
  const [size, setSize] = useState("md");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [labelPosition, setLabelPosition] = useState("right");
  const [showInnerLabels, setShowInnerLabels] = useState(false);
  const [color, setColor] = useState("#3B82F6");
  const [offColor, setOffColor] = useState("#E5E7EB");
  const [thumbColor, setThumbColor] = useState("#FFFFFF");
  const [radius, setRadius] = useState(9999);
  const [animationDuration, setAnimationDuration] = useState(200);

  // Demo state
  const [checked, setChecked] = useState(false);
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
    if (disabled) props.push("disabled");
    if (required) props.push("required");
    if (labelPosition !== "right")
      props.push(`labelPosition="${labelPosition}"`);
    if (showInnerLabels) props.push("showInnerLabels");
    if (color !== "#3B82F6") props.push(`color="${color}"`);
    if (offColor !== "#E5E7EB") props.push(`offColor="${offColor}"`);
    if (thumbColor !== "#FFFFFF") props.push(`thumbColor="${thumbColor}"`);
    if (radius !== 9999) props.push(`radius={${radius}}`);
    if (animationDuration !== 200)
      props.push(`animationDuration={${animationDuration}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Switch } from '@beeui';
import { Sun, Moon, Check, X } from 'lucide-react';

<Switch
  label="Dark Mode"
  description="Toggle dark mode on/off"
  onLabel={<Sun size={16} />}
  offLabel={<Moon size={16} />}
  thumbIcon={checked ? <Check size={12} /> : <X size={12} />}${propsString}
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



  const labelPositionOptions = [
    { value: "right", label: "Right" },
    { value: "left", label: "Left" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Switch</h1>
          <p className="text-gray-600">
            Toggle between two states with smooth animations and customizable
            icons
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Preview Section */}
              <div className="xl:col-span-2 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="w-full max-w-md">
                      <Switch
                        checked={checked}
                        onChange={setChecked}
                        label="Dark Mode"
                        description="Toggle dark mode on/off"
                        size={size as any}
                        disabled={disabled}
                        required={required}
                        labelPosition={labelPosition as any}
                        showInnerLabels={showInnerLabels}
                        color={color}
                        offColor={offColor}
                        thumbColor={thumbColor}
                        radius={radius}
                        animationDuration={animationDuration}
                        onLabel={
                          showInnerLabels ? <Sun size={16} /> : undefined
                        }
                        offLabel={
                          showInnerLabels ? <Moon size={16} /> : undefined
                        }
                        thumbIcon={
                          checked ? (
                            <Check size={12} className="text-green-600" />
                          ) : (
                            <X size={12} className="text-red-600" />
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 xl:order-2">
                <div className="bg-white rounded-xl border border-gray-200 pl-4 pt-6 pb-4 pr-2 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-600" />
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

                    {/* Row 4: Radius and Animation */}
                    <div className="grid grid-cols-2 gap-3">
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Animation: {animationDuration}ms
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="100"
                            max="500"
                            step="50"
                            value={animationDuration}
                            onChange={(e) =>
                              setAnimationDuration(parseInt(e.target.value))
                            }
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
                        label="On Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                      <ColorPicker
                        value={offColor}
                        onChange={setOffColor}
                        label="Off Color"
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
                        checked={showInnerLabels}
                        onChange={setShowInnerLabels}
                        label="Show inner labels"
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
                <div className="space-y-4">
                  <Switch label="Default unchecked" />
                  <Switch label="Default checked" checked />
                </div>
              </div>
            </div>


          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Switch label="Default unchecked" />
<Switch label="Default checked" checked />`}
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
              <Switch label="Small switch" size="sm" checked />
              <Switch label="Medium switch" size="md" checked />
              <Switch label="Large switch" size="lg" checked />
              <Switch label="Extra large switch" size="xl" checked />
            </div>
          </div>

          <CodeSection
            code={`<Switch label="Small switch" size="sm" checked />
<Switch label="Medium switch" size="md" checked />
<Switch label="Large switch" size="lg" checked />
<Switch label="Extra large switch" size="xl" checked />`}
            title="Demo.tsx"
            sectionKey="sizes"
          />
        </section>

        {/* With Icons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Icons
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Inner Labels
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="space-y-4">
                  <Switch
                    label="Dark Mode"
                    onLabel={<Sun size={16} className="text-yellow-400" />}
                    offLabel={<Moon size={16} className="text-blue-600" />}
                    showInnerLabels
                    checked
                  />
                  <Switch
                    label="WiFi"
                    onLabel={<Wifi size={16} className="text-green-500" />}
                    offLabel={<WifiOff size={16} className="text-red-500" />}
                    showInnerLabels
                  />
                  <Switch
                    label="Sound"
                    onLabel={<Volume2 size={16} className="text-blue-500" />}
                    offLabel={<VolumeX size={16} className="text-gray-500" />}
                    showInnerLabels
                    checked
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Thumb Icons
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="space-y-4">
                  <Switch
                    label="Notifications"
                    thumbIcon={
                      checked ? (
                        <Bell size={12} className="text-green-600" />
                      ) : (
                        <BellOff size={12} className="text-red-600" />
                      )
                    }
                    checked={checked}
                    onChange={setChecked}
                  />
                  <Switch
                    label="Privacy"
                    thumbIcon={<Lock size={12} className="text-blue-600" />}
                    checked
                  />
                  <Switch
                    label="Auto Play"
                    thumbIcon={<Play size={12} className="text-purple-600" />}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`// Inner Labels
<Switch
  label="Dark Mode"
  onLabel={<Sun size={16} className="text-yellow-400" />}
  offLabel={<Moon size={16} className="text-blue-600" />}
  showInnerLabels
/>

// Thumb Icons
<Switch
  label="Notifications"
  thumbIcon={
    checked ? (
      <Bell size={12} className="text-green-600" />
    ) : (
      <BellOff size={12} className="text-red-600" />
    )
  }
/>`}
              title="Demo.tsx"
              sectionKey="icons"
            />
          </div>
        </section>

        {/* Custom Colors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Custom Colors
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="space-y-4">
              <Switch label="Green" color="#10B981" checked />
              <Switch label="Red" color="#EF4444" checked />
              <Switch label="Purple" color="#8B5CF6" checked />
              <Switch label="Orange" color="#F97316" checked />
            </div>
          </div>

          <CodeSection
            code={`<Switch label="Green" color="#10B981" checked />
<Switch label="Red" color="#EF4444" checked />
<Switch label="Purple" color="#8B5CF6" checked />
<Switch label="Orange" color="#F97316" checked />`}
            title="Demo.tsx"
            sectionKey="colors"
          />
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="space-y-4">
              <Switch label="Disabled unchecked" disabled />
              <Switch label="Disabled checked" disabled checked />
              <Switch
                label="Disabled with description"
                description="This option is not available"
                disabled
                checked
              />
            </div>
          </div>

          <CodeSection
            code={`<Switch label="Disabled unchecked" disabled />
<Switch label="Disabled checked" disabled checked />
<Switch 
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
