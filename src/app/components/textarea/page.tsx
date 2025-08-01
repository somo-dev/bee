"use client";

import React, { useState } from "react";
import { Textarea } from "@/lib/components/Textarea";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { ColorPicker } from "@/lib/components/ColorPicker";
import {
  Copy,
  Check,
  Settings,
  FileText,
  MessageSquare,
  Edit,
  Mail,
  User,
  Star,
  Heart,
} from "lucide-react";

export default function TextareaPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [resize, setResize] = useState("vertical");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [autosize, setAutosize] = useState(false);
  const [showCharacterCount, setShowCharacterCount] = useState(false);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [validateOnBlur, setValidateOnBlur] = useState(true);
  const [spellCheck, setSpellCheck] = useState(true);
  const [radius, setRadius] = useState(6);
  const [minRows, setMinRows] = useState(3);
  const [maxRows, setMaxRows] = useState(8);
  const [maxLength, setMaxLength] = useState(0);

  // Demo state
  const [textareaValue, setTextareaValue] = useState("");
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
    if (resize !== "vertical") props.push(`resize="${resize}"`);
    if (disabled) props.push("disabled");
    if (required) props.push("required");
    if (readOnly) props.push("readOnly");
    if (autosize) props.push("autosize");
    if (showCharacterCount) props.push("showCharacterCount");
    if (validateOnChange) props.push("validateOnChange");
    if (!validateOnBlur) props.push("validateOnBlur={false}");
    if (!spellCheck) props.push("spellCheck={false}");
    if (radius !== 6) props.push(`radius={${radius}}`);
    if (minRows !== 3) props.push(`minRows={${minRows}}`);
    if (maxRows !== 8 && autosize) props.push(`maxRows={${maxRows}}`);
    if (maxLength > 0) props.push(`maxLength={${maxLength}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Textarea } from '@beeui';

<Textarea
  label="Message"
  description="Enter your message here"
  placeholder="Type your message..."
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

  const resizeOptions = [
    { value: "none", label: "None" },
    { value: "vertical", label: "Vertical" },
    { value: "horizontal", label: "Horizontal" },
    { value: "both", label: "Both" },
    { value: "auto", label: "Auto" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Textarea</h1>
          <p className="text-gray-600">
            Highly customizable textarea component with auto-resize, validation,
            and semantic HTML
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Preview Section */}
              <div className="xl:col-span-2 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="w-full max-w-md">
                      <Textarea
                        label="Message"
                        description="Enter your message here"
                        placeholder="Type your message..."
                        value={textareaValue}
                        onChange={setTextareaValue}
                        variant={variant as any}
                        size={size as any}
                        resize={resize as any}
                        disabled={disabled}
                        required={required}
                        readOnly={readOnly}
                        autosize={autosize}
                        showCharacterCount={showCharacterCount}
                        validateOnChange={validateOnChange}
                        validateOnBlur={validateOnBlur}
                        spellCheck={spellCheck}
                        radius={radius}
                        minRows={minRows}
                        maxRows={autosize ? maxRows : undefined}
                        maxLength={maxLength > 0 ? maxLength : undefined}
                        error={
                          textareaValue === "error"
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
                    <Settings className="w-5 h-5 text-green-600" />
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

                    {/* Row 3: Resize */}
                    <div>
                      <Select
                        data={resizeOptions}
                        value={resize}
                        onChange={(value) => setResize(value as string)}
                        label="Resize"
                        size="sm"
                      />
                    </div>

                    {/* Row 4: Dimensions */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Min Rows: {minRows}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={minRows}
                            onChange={(e) =>
                              setMinRows(parseInt(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Max Rows: {maxRows}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="3"
                            max="20"
                            value={maxRows}
                            onChange={(e) =>
                              setMaxRows(parseInt(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            disabled={!autosize}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Styling */}
                    <div className="grid grid-cols-2 gap-3">
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
                            onChange={(e) =>
                              setRadius(parseInt(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Max Length: {maxLength || "None"}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="0"
                            max="500"
                            value={maxLength}
                            onChange={(e) =>
                              setMaxLength(parseInt(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
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
                        checked={autosize}
                        onChange={setAutosize}
                        label="Auto resize"
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
                        checked={spellCheck}
                        onChange={setSpellCheck}
                        label="Spell check"
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
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Default Textarea"
                  description="Standard textarea with border"
                  placeholder="Enter your text here..."
                  variant="default"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Filled Textarea"
                  description="Textarea with filled background"
                  placeholder="Enter your text here..."
                  variant="filled"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Outline
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Outline Textarea"
                  description="Textarea with prominent border"
                  placeholder="Enter your text here..."
                  variant="outline"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Unstyled
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Unstyled Textarea"
                  description="Minimal textarea without styling"
                  placeholder="Enter your text here..."
                  variant="unstyled"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Textarea variant="default" label="Default" placeholder="Enter text..." />
<Textarea variant="filled" label="Filled" placeholder="Enter text..." />
<Textarea variant="outline" label="Outline" placeholder="Enter text..." />
<Textarea variant="unstyled" label="Unstyled" placeholder="Enter text..." />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Auto-resize Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Auto-resize
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Textarea
              label="Auto-resizing Textarea"
              description="This textarea automatically adjusts its height based on content"
              placeholder="Start typing and watch the textarea grow..."
              autosize
              minRows={2}
              maxRows={8}
            />
          </div>

          <CodeSection
            code={`<Textarea
  label="Auto-resizing Textarea"
  description="Automatically adjusts height"
  autosize
  minRows={2}
  maxRows={8}
/>`}
            title="Demo.tsx"
            sectionKey="autosize"
          />
        </section>

        {/* With Validation Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Validation
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Required Field
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Required Message"
                  description="This field is required"
                  placeholder="Enter your message..."
                  required
                  validateOnChange
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Character Limit
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Limited Message"
                  description="Maximum 200 characters allowed"
                  placeholder="Enter your message..."
                  maxLength={200}
                  showCharacterCount
                  validateOnChange
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Error State
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Message with Error"
                  description="This field has validation errors"
                  placeholder="Enter your message..."
                  error="This field contains invalid content"
                  value="Some invalid content"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Textarea required validateOnChange label="Required Message" />
<Textarea maxLength={200} showCharacterCount label="Limited Message" />
<Textarea error="Invalid content" label="Message with Error" />`}
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
                <Textarea
                  label="Small Textarea"
                  placeholder="Small size textarea..."
                  size="sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Medium Textarea"
                  placeholder="Medium size textarea..."
                  size="md"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Large Textarea"
                  placeholder="Large size textarea..."
                  size="lg"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Extra Large
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Extra Large Textarea"
                  placeholder="Extra large size textarea..."
                  size="xl"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Textarea size="sm" label="Small" placeholder="Small size..." />
<Textarea size="md" label="Medium" placeholder="Medium size..." />
<Textarea size="lg" label="Large" placeholder="Large size..." />
<Textarea size="xl" label="Extra Large" placeholder="Extra large size..." />`}
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
                <Textarea
                  label="Disabled Textarea"
                  description="This textarea is disabled"
                  placeholder="Cannot edit this..."
                  disabled
                  value="This content cannot be edited"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Read-only
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Textarea
                  label="Read-only Textarea"
                  description="This textarea is read-only"
                  readOnly
                  value="This content is read-only and cannot be modified, but can be selected and copied."
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Textarea disabled label="Disabled" value="Cannot edit" />
<Textarea readOnly label="Read-only" value="Cannot modify" />`}
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
