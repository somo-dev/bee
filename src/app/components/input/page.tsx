"use client";

import React, { useState } from "react";
import { Input } from "@/lib/components/Input";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { InstallationSection } from "@/components/playground/InstallationSection";
import {
  Copy,
  Check,
  Settings,
  User,
  Mail,
  Phone,
  Lock,
  Search,
  Globe,
  Calendar,
  Hash,
  Eye,
  EyeOff,
  Star,
  Heart,
  Shield,
} from "lucide-react";

export default function InputPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [type, setType] = useState("text");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [showValidationIcon, setShowValidationIcon] = useState(false);
  const [showCharacterCount, setShowCharacterCount] = useState(false);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [validateOnBlur, setValidateOnBlur] = useState(true);
  const [hasLeftSection, setHasLeftSection] = useState(false);
  const [hasRightSection, setHasRightSection] = useState(false);
  const [radius, setRadius] = useState(6);
  const [maxLength, setMaxLength] = useState(0);

  // Demo state
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
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
    if (type !== "text") props.push(`type="${type}"`);
    if (disabled) props.push("disabled");
    if (required) props.push("required");
    if (readOnly) props.push("readOnly");
    if (showValidationIcon) props.push("showValidationIcon");
    if (showCharacterCount) props.push("showCharacterCount");
    if (validateOnChange) props.push("validateOnChange");
    if (!validateOnBlur) props.push("validateOnBlur={false}");
    if (hasLeftSection) props.push("leftSection={<User />}");
    if (hasRightSection) props.push("rightSection={<Eye />}");
    if (radius !== 6) props.push(`radius={${radius}}`);
    if (maxLength > 0) props.push(`maxLength={${maxLength}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Input } from '@beeui';

<Input
  label="Label"
  description="Description"
  placeholder="Enter text"
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

  // Select data
  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "filled", label: "Filled" },
    { value: "outline", label: "Outline" },
    { value: "unstyled", label: "Unstyled" },
  ];

  const typeOptions = [
    { value: "text", label: "Text" },
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
    { value: "number", label: "Number" },
    { value: "tel", label: "Phone" },
    { value: "url", label: "URL" },
    { value: "search", label: "Search" },
    { value: "date", label: "Date" },
    { value: "time", label: "Time" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Input</h1>
          <p className="text-gray-600">
            Highly customizable input component with validation, different
            types, and advanced features
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
                      <Input
                        label="Label"
                        description="Description"
                        placeholder="Enter text"
                        value={inputValue}
                        onChange={setInputValue}
                        variant={variant as any}
                        size={size as any}
                        type={type as any}
                        disabled={disabled}
                        required={required}
                        readOnly={readOnly}
                        showValidationIcon={showValidationIcon}
                        showCharacterCount={showCharacterCount}
                        validateOnChange={validateOnChange}
                        validateOnBlur={validateOnBlur}
                        leftSection={hasLeftSection ? <User /> : undefined}
                        rightSection={hasRightSection ? <Eye /> : undefined}
                        radius={radius}
                        maxLength={maxLength > 0 ? maxLength : undefined}
                        error={
                          inputValue === "error"
                            ? "This is an error message"
                            : undefined
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

                    {/* Row 2: Type */}
                    <div>
                      <Select
                        data={typeOptions}
                        value={type}
                        onChange={(value) => setType(value as string)}
                        label="Type"
                        size="sm"
                      />
                    </div>

                    {/* Row 3: Size */}
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

                    {/* Row 4: Radius */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Radius: {radius}px
                      </label>
                      <div className="pr-2">
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
                    </div>

                    {/* Row 5: Max Length */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Max Length: {maxLength || "None"}
                      </label>
                      <div className="pr-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={maxLength}
                          onChange={(e) =>
                            setMaxLength(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0</span>
                          <span>100</span>
                        </div>
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
                      <Checkbox
                        checked={readOnly}
                        onChange={setReadOnly}
                        label="Read only"
                        size="sm"
                      />
                      <Checkbox
                        checked={showValidationIcon}
                        onChange={setShowValidationIcon}
                        label="Validation icon"
                        size="sm"
                      />
                      <Checkbox
                        checked={showCharacterCount}
                        onChange={setShowCharacterCount}
                        label="Character count"
                        size="sm"
                      />
                      <Checkbox
                        checked={validateOnChange}
                        onChange={setValidateOnChange}
                        label="Validate on change"
                        size="sm"
                      />
                      <Checkbox
                        checked={validateOnBlur}
                        onChange={setValidateOnBlur}
                        label="Validate on blur"
                        size="sm"
                      />
                      <Checkbox
                        checked={hasLeftSection}
                        onChange={setHasLeftSection}
                        label="Left section"
                        size="sm"
                      />
                      <Checkbox
                        checked={hasRightSection}
                        onChange={setHasRightSection}
                        label="Right section"
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

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <Input
                    label="Default Input"
                    placeholder="Enter text"
                    variant="default"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <Input
                    label="Filled Input"
                    placeholder="Enter text"
                    variant="filled"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Outline
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <Input
                    label="Outline Input"
                    placeholder="Enter text"
                    variant="outline"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Unstyled
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <Input
                    label="Unstyled Input"
                    placeholder="Enter text"
                    variant="unstyled"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Input variant="default" label="Default" placeholder="Enter text" />
<Input variant="filled" label="Filled" placeholder="Enter text" />
<Input variant="outline" label="Outline" placeholder="Enter text" />
<Input variant="unstyled" label="Unstyled" placeholder="Enter text" />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Input Types Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Input Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={emailValue}
                  onChange={setEmailValue}
                  showValidationIcon
                  required
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Password
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  value={passwordValue}
                  onChange={setPasswordValue}
                  leftSection={<Lock />}
                  minLength={8}
                  showCharacterCount
                  maxLength={50}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Number</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Input
                  type="number"
                  label="Age"
                  placeholder="Enter your age"
                  value={numberValue}
                  onChange={setNumberValue}
                  min={0}
                  max={120}
                  showValidationIcon
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Search</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Input
                  type="search"
                  label="Search"
                  placeholder="Search anything..."
                  variant="filled"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Input type="email" label="Email" showValidationIcon required />
<Input type="password" label="Password" leftSection={<Lock />} minLength={8} />
<Input type="number" label="Age" min={0} max={120} showValidationIcon />
<Input type="search" label="Search" variant="filled" />`}
              title="Demo.tsx"
              sectionKey="types"
            />
          </div>
        </section>

        {/* With Sections Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Sections
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Left Section
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Username"
                    placeholder="Enter username"
                    leftSection={<User />}
                  />
                  <Input
                    label="Phone"
                    placeholder="Enter phone"
                    leftSection={<Phone />}
                    type="tel"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Right Section
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Website"
                    placeholder="Enter URL"
                    rightSection={<Globe />}
                    type="url"
                  />
                  <Input
                    label="Rating"
                    placeholder="Rate 1-5"
                    rightSection={<Star />}
                    type="number"
                    min={1}
                    max={5}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Both Sections
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Input
                  label="Secure Input"
                  placeholder="Enter secure data"
                  leftSection={<Shield />}
                  rightSection={<Heart />}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Input leftSection={<User />} label="Username" placeholder="Enter username" />
<Input rightSection={<Globe />} label="Website" type="url" />
<Input leftSection={<Shield />} rightSection={<Heart />} label="Secure Input" />`}
              title="Demo.tsx"
              sectionKey="sections"
            />
          </div>
        </section>

        {/* Validation Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Validation
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Built-in Validation
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    label="Email (Required)"
                    placeholder="Enter valid email"
                    required
                    showValidationIcon
                    validateOnChange
                  />
                  <Input
                    type="number"
                    label="Age (18-65)"
                    placeholder="Enter age"
                    min={18}
                    max={65}
                    showValidationIcon
                    validateOnChange
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Character Limits
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Username (3-20 chars)"
                    placeholder="Enter username"
                    minLength={3}
                    maxLength={20}
                    showCharacterCount
                    validateOnChange
                  />
                  <Input
                    label="Bio (max 100 chars)"
                    placeholder="Tell us about yourself"
                    maxLength={100}
                    showCharacterCount
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Error States
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="space-y-4">
                  <Input
                    label="Input with Error"
                    placeholder="This has an error"
                    error="This field has an error"
                    value="invalid input"
                  />
                  <Input
                    label="Required Field"
                    placeholder="This is required"
                    required
                    showValidationIcon
                    description="This field is required and will show validation"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Input type="email" required showValidationIcon validateOnChange />
<Input minLength={3} maxLength={20} showCharacterCount validateOnChange />
<Input error="This field has an error" />
<Input required showValidationIcon description="Required field" />`}
              title="Demo.tsx"
              sectionKey="validation"
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
                  <Input
                    label="Small Input"
                    placeholder="Small size"
                    size="sm"
                    leftSection={<User />}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <Input
                    label="Medium Input"
                    placeholder="Medium size"
                    size="md"
                    leftSection={<User />}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="max-w-sm">
                  <Input
                    label="Large Input"
                    placeholder="Large size"
                    size="lg"
                    leftSection={<User />}
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
                  <Input
                    label="Extra Large Input"
                    placeholder="Extra large size"
                    size="xl"
                    leftSection={<User />}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Input size="sm" label="Small" placeholder="Small size" />
<Input size="md" label="Medium" placeholder="Medium size" />
<Input size="lg" label="Large" placeholder="Large size" />
<Input size="xl" label="Extra Large" placeholder="Extra large size" />`}
              title="Demo.tsx"
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled & Read-only States
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Disabled
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Disabled Input"
                    placeholder="Cannot edit"
                    disabled
                    value="Disabled value"
                  />
                  <Input
                    label="Disabled with Icon"
                    placeholder="Cannot edit"
                    disabled
                    leftSection={<Mail />}
                    value="disabled@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Read-only
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Read-only Input"
                    placeholder="Cannot edit"
                    readOnly
                    value="Read-only value"
                  />
                  <Input
                    label="Read-only with Description"
                    description="This field cannot be edited"
                    readOnly
                    value="readonly@example.com"
                    leftSection={<Mail />}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Input disabled label="Disabled" value="Cannot edit" />
<Input readOnly label="Read-only" value="Cannot edit" />
<Input disabled leftSection={<Mail />} value="disabled@example.com" />
<Input readOnly description="Cannot be edited" value="readonly@example.com" />`}
              title="Demo.tsx"
              sectionKey="disabled"
            />
          </div>
        </section>

        {/* Installation Section */}
        <InstallationSection componentName="Input" />
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
