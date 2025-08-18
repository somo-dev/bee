"use client";

import React, { useState } from "react";
import { PasswordInput, OTPInput } from "@bee-ui/core";
import { Select } from "@bee-ui/core";
import { Checkbox } from "@bee-ui/core";
import { ColorPicker } from "@bee-ui/core";
import {
  Copy,
  Check,
  Settings,
  Lock,
  Shield,
  Key,
  Fingerprint,
  Smartphone,
} from "lucide-react";

export default function PasswordInputPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [showStrengthMeter, setShowStrengthMeter] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#6366F1");
  const [radius, setRadius] = useState(6);

  // Demo state
  const [passwordValue, setPasswordValue] = useState("");
  const [otpValue, setOTPValue] = useState("");
  const [otpLength, setOTPLength] = useState(6);
  const [otpMask, setOTPMask] = useState(false);
  const [otpType, setOTPType] = useState("numeric");
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

  const generatePasswordCode = () => {
    const props = [];
    if (variant !== "default") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");
    if (required) props.push("required");
    if (showStrengthMeter) props.push("showStrengthMeter");
    if (primaryColor !== "#6366F1") props.push(`color="${primaryColor}"`);
    if (radius !== 6) props.push(`radius={${radius}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { PasswordInput } from '@beeui';

<PasswordInput
  label="Password"
  placeholder="Enter your password"${propsString}
/>`;
  };

  const generateOTPCode = () => {
    const props = [];
    if (variant !== "default") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (otpLength !== 6) props.push(`length={${otpLength}}`);
    if (otpMask) props.push("mask");
    if (otpType !== "numeric") props.push(`type="${otpType}"`);
    if (disabled) props.push("disabled");
    if (required) props.push("required");
    if (radius !== 6) props.push(`radius={${radius}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { OTPInput } from '@beeui';

<OTPInput
  label="Enter OTP"
  description="Please enter the verification code sent to your device"${propsString}
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
    { value: "default", label: "Default" },
    { value: "filled", label: "Filled" },
    { value: "outline", label: "Outline" },
  ];

  const otpTypeOptions = [
    { value: "numeric", label: "Numeric" },
    { value: "alphanumeric", label: "Alphanumeric" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Password Input
          </h1>
          <p className="text-gray-600">
            Secure password input with visibility toggle, strength meter, and
            OTP support
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Password Input Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Password Input
          </h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <div className="w-full max-w-sm">
                      <PasswordInput
                        value={passwordValue}
                        onChange={setPasswordValue}
                        label="Password"
                        placeholder="Enter your password"
                        description="Your password must be at least 8 characters long"
                        variant={variant as any}
                        size={size as any}
                        disabled={disabled}
                        required={required}
                        showStrengthMeter={showStrengthMeter}
                        radius={radius}
                        leftSection={<Lock />}
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

                    {/* Row 2: Radius */}
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

                    {/* Row 3: Checkboxes */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={disabled}
                        onChange={setDisabled}
                        label="Disabled"
                      />
                      <Checkbox
                        checked={required}
                        onChange={setRequired}
                        label="Required"
                      />
                      <Checkbox
                        checked={showStrengthMeter}
                        onChange={setShowStrengthMeter}
                        label="Show strength meter"
                      />
                    </div>

                    {/* Row 4: Color */}
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
              code={generatePasswordCode()}
              title="Demo.tsx"
              sectionKey="password-demo"
            />
          </div>
        </section>

        {/* OTP Input Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            OTP Input
          </h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <div className="w-full max-w-md">
                      <OTPInput
                        value={otpValue}
                        onChange={setOTPValue}
                        length={otpLength}
                        label="Enter OTP"
                        description="Please enter the verification code sent to your device"
                        variant={variant as any}
                        size={size as any}
                        disabled={disabled}
                        required={required}
                        mask={otpMask}
                        type={otpType as any}
                        radius={radius}
                        onComplete={(value) =>
                          console.log("OTP Complete:", value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      OTP Controls
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Row 1: Length and Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Length: {otpLength} digits
                        </label>
                        <input
                          type="range"
                          min="4"
                          max="8"
                          value={otpLength}
                          onChange={(e) =>
                            setOTPLength(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>4</span>
                          <span>8</span>
                        </div>
                      </div>

                      <div>
                        <Select
                          data={otpTypeOptions}
                          value={otpType}
                          onChange={(value) => setOTPType(value as string)}
                          label="Type"
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Row 2: Checkboxes */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={otpMask}
                        onChange={setOTPMask}
                        label="Mask input"
                      />
                      <Checkbox
                        checked={disabled}
                        onChange={setDisabled}
                        label="Disabled"
                      />
                      <Checkbox
                        checked={required}
                        onChange={setRequired}
                        label="Required"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CodeSection
              code={generateOTPCode()}
              title="Demo.tsx"
              sectionKey="otp-demo"
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
                <div className="max-w-sm">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    variant="default"
                    leftSection={<Lock />}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="max-w-sm">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    variant="filled"
                    leftSection={<Shield />}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Outline
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <div className="max-w-sm">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    variant="outline"
                    leftSection={<Key />}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<PasswordInput variant="default" label="Password" placeholder="Enter password" />
<PasswordInput variant="filled" label="Password" placeholder="Enter password" />
<PasswordInput variant="outline" label="Password" placeholder="Enter password" />`}
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
                <div className="max-w-sm">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    size="sm"
                    leftSection={<Lock />}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    size="md"
                    leftSection={<Lock />}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    size="lg"
                    leftSection={<Lock />}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Extra Large
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    size="xl"
                    leftSection={<Lock />}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<PasswordInput size="sm" label="Password" placeholder="Enter password" />
<PasswordInput size="md" label="Password" placeholder="Enter password" />
<PasswordInput size="lg" label="Password" placeholder="Enter password" />
<PasswordInput size="xl" label="Password" placeholder="Enter password" />`}
              title="Demo.tsx"
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* With Strength Meter Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Strength Meter
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="max-w-sm">
              <PasswordInput
                label="Create Password"
                placeholder="Enter a strong password"
                showStrengthMeter
                leftSection={<Shield />}
                description="Password must contain at least 8 characters with uppercase, lowercase, numbers, and symbols"
              />
            </div>
          </div>

          <CodeSection
            code={`<PasswordInput
  label="Create Password"
  placeholder="Enter a strong password"
  showStrengthMeter
  leftSection={<Shield />}
  description="Password must contain at least 8 characters"
/>`}
            title="Demo.tsx"
            sectionKey="strength-meter"
          />
        </section>

        {/* OTP Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            OTP Variants
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                6-Digit Numeric
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <OTPInput
                  label="Enter OTP"
                  description="6-digit verification code"
                  length={6}
                  type="numeric"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                4-Digit PIN
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <OTPInput
                  label="Enter PIN"
                  description="4-digit security PIN"
                  length={4}
                  type="numeric"
                  mask
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                8-Digit Alphanumeric
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                <OTPInput
                  label="Enter Code"
                  description="8-character verification code"
                  length={8}
                  type="alphanumeric"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<OTPInput length={6} type="numeric" label="Enter OTP" />
<OTPInput length={4} type="numeric" mask label="Enter PIN" />
<OTPInput length={8} type="alphanumeric" label="Enter Code" />`}
              title="Demo.tsx"
              sectionKey="otp-variants"
            />
          </div>
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Password Input
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    disabled
                    value="disabled123"
                    leftSection={<Lock />}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                OTP Input
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <OTPInput
                  label="Enter OTP"
                  description="Verification code input is disabled"
                  disabled
                  value="123456"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<PasswordInput disabled label="Password" value="disabled123" />
<OTPInput disabled label="Enter OTP" value="123456" />`}
              title="Demo.tsx"
              sectionKey="disabled"
            />
          </div>
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
