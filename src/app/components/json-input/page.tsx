"use client";

import React, { useState } from "react";
import { JSONInput } from "@/lib/components/JSONInput";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { ColorPicker } from "@/lib/components/ColorPicker";
import {
  Copy,
  Check,
  Settings,
  Code,
  FileText,
  Database,
  Zap,
  Shield,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";

export default function JSONInputPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [autoFormat, setAutoFormat] = useState(true);
  const [realTimeValidation, setRealTimeValidation] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(true);
  const [showValidationStatus, setShowValidationStatus] = useState(true);
  const [enableKeyboardShortcuts, setEnableKeyboardShortcuts] = useState(true);
  const [allowComments, setAllowComments] = useState(false);
  const [showFormatButton, setShowFormatButton] = useState(true);
  const [showCopyButton, setShowCopyButton] = useState(true);
  const [showClearButton, setShowClearButton] = useState(true);
  const [autoResize, setAutoResize] = useState(false);
  const [height, setHeight] = useState(300);
  const [indentSize, setIndentSize] = useState(2);
  const [radius, setRadius] = useState(8);

  // Demo state
  const [jsonValue, setJsonValue] = useState(`{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "coding", "traveling"],
  "isActive": true,
  "metadata": null
}`);
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
    if (required) props.push("required");
    if (!autoFormat) props.push("autoFormat={false}");
    if (!realTimeValidation) props.push("realTimeValidation={false}");
    if (!showLineNumbers) props.push("showLineNumbers={false}");
    if (!syntaxHighlighting) props.push("syntaxHighlighting={false}");
    if (!showValidationStatus) props.push("showValidationStatus={false}");
    if (!enableKeyboardShortcuts) props.push("enableKeyboardShortcuts={false}");
    if (allowComments) props.push("allowComments");
    if (!showFormatButton) props.push("showFormatButton={false}");
    if (!showCopyButton) props.push("showCopyButton={false}");
    if (!showClearButton) props.push("showClearButton={false}");
    if (autoResize) props.push("autoResize");
    if (height !== 300) props.push(`height={${height}}`);
    if (indentSize !== 2) props.push(`indentSize={${indentSize}}`);
    if (radius !== 8) props.push(`radius={${radius}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { JSONInput } from '@beeui';

<JSONInput
  label="JSON Configuration"
  description="Enter your JSON configuration data"
  placeholder="Enter JSON..."
  value={jsonValue}
  onChange={setJsonValue}
  onValidJSON={(parsed) => console.log('Valid JSON:', parsed)}
  onInvalidJSON={(error) => console.error('Invalid JSON:', error)}${propsString}
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

  // Sample JSON data
  const sampleData = {
    simple: `{
  "message": "Hello World",
  "count": 42,
  "active": true
}`,
    complex: `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "theme": "dark",
      "notifications": true,
      "language": "en"
    }
  },
  "posts": [
    {
      "id": 1,
      "title": "First Post",
      "content": "This is my first post",
      "tags": ["intro", "welcome"],
      "published": true,
      "publishedAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "title": "Second Post",
      "content": "Another interesting post",
      "tags": ["update", "news"],
      "published": false,
      "publishedAt": null
    }
  ],
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2024-01-15T12:00:00Z",
    "totalUsers": 1250,
    "features": ["auth", "posts", "comments"]
  }
}`,
    config: `{
  "app": {
    "name": "My Application",
    "version": "2.1.0",
    "environment": "production"
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "myapp_db",
    "ssl": true
  },
  "api": {
    "baseUrl": "https://api.example.com",
    "timeout": 30000,
    "retries": 3
  },
  "features": {
    "authentication": true,
    "analytics": true,
    "caching": false
  }
}`,
    invalid: `{
  "name": "Invalid JSON",
  "missing": "closing quote,
  "extra": "comma",
}`,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">JSON Input</h1>
          <p className="text-gray-600">
            Advanced JSON editor with syntax highlighting, validation, and VS
            Code-like features
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
              {/* Preview Section */}
              <div className="xl:col-span-3 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <JSONInput
                    label="JSON Configuration"
                    description="Enter your JSON configuration data"
                    value={jsonValue}
                    onChange={setJsonValue}
                    variant={variant as any}
                    size={size as any}
                    disabled={disabled}
                    required={required}
                    autoFormat={autoFormat}
                    realTimeValidation={realTimeValidation}
                    showLineNumbers={showLineNumbers}
                    syntaxHighlighting={syntaxHighlighting}
                    showValidationStatus={showValidationStatus}
                    enableKeyboardShortcuts={enableKeyboardShortcuts}
                    allowComments={allowComments}
                    showFormatButton={showFormatButton}
                    showCopyButton={showCopyButton}
                    showClearButton={showClearButton}
                    autoResize={autoResize}
                    height={height}
                    indentSize={indentSize}
                    radius={radius}
                    onValidJSON={(parsed) => console.log("Valid JSON:", parsed)}
                    onInvalidJSON={(error) =>
                      console.error("Invalid JSON:", error)
                    }
                  />
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

                  <div className="space-y-6 max-h-[600px] overflow-y-auto p-2">
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

                    {/* Row 3: Height */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Height: {height}px
                      </label>
                      <input
                        type="range"
                        min="200"
                        max="600"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>200px</span>
                        <span>600px</span>
                      </div>
                    </div>

                    {/* Row 4: Indent Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Indent: {indentSize} spaces
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="8"
                        value={indentSize}
                        onChange={(e) =>
                          setIndentSize(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>2</span>
                        <span>8</span>
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
                        checked={autoFormat}
                        onChange={setAutoFormat}
                        label="Auto format"
                        size="sm"
                      />
                      <Checkbox
                        checked={realTimeValidation}
                        onChange={setRealTimeValidation}
                        label="Real-time validation"
                        size="sm"
                      />
                      <Checkbox
                        checked={showLineNumbers}
                        onChange={setShowLineNumbers}
                        label="Line numbers"
                        size="sm"
                      />
                      <Checkbox
                        checked={syntaxHighlighting}
                        onChange={setSyntaxHighlighting}
                        label="Syntax highlighting"
                        size="sm"
                      />
                      <Checkbox
                        checked={showValidationStatus}
                        onChange={setShowValidationStatus}
                        label="Validation status"
                        size="sm"
                      />
                      <Checkbox
                        checked={enableKeyboardShortcuts}
                        onChange={setEnableKeyboardShortcuts}
                        label="Keyboard shortcuts"
                        size="sm"
                      />
                      <Checkbox
                        checked={allowComments}
                        onChange={setAllowComments}
                        label="Allow comments"
                        size="sm"
                      />
                      <Checkbox
                        checked={showFormatButton}
                        onChange={setShowFormatButton}
                        label="Format button"
                        size="sm"
                      />
                      <Checkbox
                        checked={showCopyButton}
                        onChange={setShowCopyButton}
                        label="Copy button"
                        size="sm"
                      />
                      <Checkbox
                        checked={showClearButton}
                        onChange={setShowClearButton}
                        label="Clear button"
                        size="sm"
                      />
                      <Checkbox
                        checked={autoResize}
                        onChange={setAutoResize}
                        label="Auto resize"
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
                <JSONInput
                  label="Default Variant"
                  value={sampleData.simple}
                  onChange={() => {}}
                  variant="default"
                  height={200}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <JSONInput
                  label="Filled Variant"
                  value={sampleData.simple}
                  onChange={() => {}}
                  variant="filled"
                  height={200}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Outline
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <JSONInput
                  label="Outline Variant"
                  value={sampleData.simple}
                  onChange={() => {}}
                  variant="outline"
                  height={200}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<JSONInput variant="default" value={jsonValue} onChange={setJsonValue} />
<JSONInput variant="filled" value={jsonValue} onChange={setJsonValue} />
<JSONInput variant="outline" value={jsonValue} onChange={setJsonValue} />`}
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
                <JSONInput
                  label="Small Size"
                  value={sampleData.simple}
                  onChange={() => {}}
                  size="sm"
                  height={150}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <JSONInput
                  label="Medium Size"
                  value={sampleData.simple}
                  onChange={() => {}}
                  size="md"
                  height={200}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <JSONInput
                  label="Large Size"
                  value={sampleData.simple}
                  onChange={() => {}}
                  size="lg"
                  height={250}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<JSONInput size="sm" value={jsonValue} onChange={setJsonValue} />
<JSONInput size="md" value={jsonValue} onChange={setJsonValue} />
<JSONInput size="lg" value={jsonValue} onChange={setJsonValue} />
<JSONInput size="xl" value={jsonValue} onChange={setJsonValue} />`}
              title="Demo.tsx"
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* Complex JSON Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Complex JSON
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <JSONInput
              label="Complex JSON Data"
              description="Example with nested objects, arrays, and various data types"
              value={sampleData.complex}
              onChange={() => {}}
              height={400}
              showValidationStatus
              enableKeyboardShortcuts
            />
          </div>

          <CodeSection
            code={`<JSONInput
  label="Complex JSON Data"
  description="Example with nested objects, arrays, and various data types"
  value={complexJson}
  onChange={setComplexJson}
  height={400}
  showValidationStatus
  enableKeyboardShortcuts
/>`}
            title="Demo.tsx"
            sectionKey="complex"
          />
        </section>

        {/* Configuration Example Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Configuration Example
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <JSONInput
              label="Application Configuration"
              description="JSON configuration for application settings"
              value={sampleData.config}
              onChange={() => {}}
              height={350}
              indentSize={4}
              autoFormat
              showFormatButton
            />
          </div>

          <CodeSection
            code={`<JSONInput
  label="Application Configuration"
  description="JSON configuration for application settings"
  value={configJson}
  onChange={setConfigJson}
  height={350}
  indentSize={4}
  autoFormat
  showFormatButton
/>`}
            title="Demo.tsx"
            sectionKey="config"
          />
        </section>

        {/* Validation Example Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Validation Example
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <JSONInput
              label="Invalid JSON Example"
              description="This example shows validation errors for invalid JSON"
              value={sampleData.invalid}
              onChange={() => {}}
              height={200}
              realTimeValidation
              showValidationStatus
            />
          </div>

          <CodeSection
            code={`<JSONInput
  label="Invalid JSON Example"
  description="This example shows validation errors for invalid JSON"
  value={invalidJson}
  onChange={setInvalidJson}
  height={200}
  realTimeValidation
  showValidationStatus
/>`}
            title="Demo.tsx"
            sectionKey="validation"
          />
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Advanced Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Syntax Highlighting
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                VS Code-like syntax highlighting with color-coded strings,
                numbers, booleans, and keys for better readability.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Real-time Validation
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Instant JSON validation with detailed error messages and visual
                indicators for valid/invalid states.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Keyboard Shortcuts
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                VS Code-style shortcuts: Ctrl+Shift+F to format,
                auto-indentation, bracket completion, and more.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Auto-formatting
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Automatic JSON formatting with customizable indentation and
                beautiful code structure.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Error Handling
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Comprehensive error handling with precise error messages and
                visual feedback for debugging.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Line Numbers
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Optional line numbers for easier navigation and debugging of
                large JSON structures.
              </p>
            </div>
          </div>
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <JSONInput
              label="Disabled JSON Input"
              description="This input is disabled and cannot be edited"
              value={sampleData.simple}
              onChange={() => {}}
              disabled
              height={200}
            />
          </div>

          <CodeSection
            code={`<JSONInput
  label="Disabled JSON Input"
  description="This input is disabled and cannot be edited"
  value={jsonValue}
  onChange={setJsonValue}
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
