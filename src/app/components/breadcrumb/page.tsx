"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/lib/components/Breadcrumbs";
import { Select } from "@/lib/components/Select";
import { Home, Folder, FileText, Copy, Check, Settings } from "lucide-react";
import { Checkbox } from "@/lib/components/Checkbox";

export default function BreadcrumbsPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [separator, setSeparator] = useState("chevron");
  const [showHomeIcon, setShowHomeIcon] = useState(false);
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
    if (separator !== "chevron") props.push(`separator="${separator}"`);
    if (showHomeIcon) props.push("showHomeIcon");

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Breadcrumbs } from '@beeui';

const items = [
  { label: 'Mantine', href: '/' },
  { label: 'Core', href: '/core' },
  { label: 'Breadcrumbs', href: '/breadcrumbs' }
];

<Breadcrumbs
  items={items}${propsString}
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

  const basicItems = [
    { label: "Mantine", href: "/" },
    { label: "Core", href: "/core" },
    { label: "Breadcrumbs", href: "/breadcrumbs" },
  ];

  const iconItems = [
    { label: "Home", href: "/", icon: <Home /> },
    { label: "Documents", href: "/docs", icon: <Folder /> },
    { label: "README.md", icon: <FileText /> },
  ];

  // Select data
  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "pills", label: "Pills" },
    { value: "minimal", label: "Minimal" },
    { value: "cards", label: "Cards" },
  ];

  const separatorOptions = [
    { value: "chevron", label: "Chevron" },
    { value: "slash", label: "Slash" },
    { value: "arrow", label: "Arrow" },
    { value: "dot", label: "Dot" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Breadcrumbs</h1>
          <p className="text-gray-600">
            Display current page location within a navigational hierarchy
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <Breadcrumbs
                      items={basicItems}
                      variant={variant as any}
                      size={size as any}
                      separator={separator as any}
                      showHomeIcon={showHomeIcon}
                    />
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-green-600" />
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

                    {/* Row 2: Separator */}
                    <div>
                      <Select
                        data={separatorOptions}
                        value={separator}
                        onChange={(value) => setSeparator(value as string)}
                        label="Separator"
                        size="sm"
                      />
                    </div>

                    {/* Row 3: Checkboxes */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={showHomeIcon}
                        onChange={setShowHomeIcon}
                        label="Show home icon"
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
                <Breadcrumbs items={basicItems} variant="default" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Pills</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} variant="pills" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Minimal
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} variant="minimal" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Cards</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} variant="cards" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Breadcrumbs items={items} variant="default" />
<Breadcrumbs items={items} variant="pills" />
<Breadcrumbs items={items} variant="minimal" />
<Breadcrumbs items={items} variant="cards" />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* With Icons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Icons
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Breadcrumbs items={iconItems} showHomeIcon />
          </div>

          <CodeSection
            code={`import { Home, Folder, FileText } from 'lucide-react';

const items = [
  { label: 'Home', href: '/', icon: <Home /> },
  { label: 'Documents', href: '/docs', icon: <Folder /> },
  { label: 'README.md', icon: <FileText /> }
];

function Demo() {
  return <Breadcrumbs items={items} showHomeIcon />;
}`}
            title="Demo.tsx"
            sectionKey="icons"
          />
        </section>

        {/* Separators Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Separators
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Chevron (default)
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} separator="chevron" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Slash</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} separator="slash" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Arrow</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} separator="arrow" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Dot</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} separator="dot" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Breadcrumbs items={items} separator="chevron" />
<Breadcrumbs items={items} separator="slash" />
<Breadcrumbs items={items} separator="arrow" />
<Breadcrumbs items={items} separator="dot" />`}
              title="Demo.tsx"
              sectionKey="separators"
            />
          </div>
        </section>

        {/* Sizes Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sizes</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Small</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} size="sm" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Medium (default)
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} size="md" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Breadcrumbs items={basicItems} size="lg" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Breadcrumbs items={items} size="sm" />
<Breadcrumbs items={items} size="md" />
<Breadcrumbs items={items} size="lg" />`}
              title="Demo.tsx"
              sectionKey="sizes"
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
