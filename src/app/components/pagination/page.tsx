"use client";

import React, { useState } from "react";
import { Pagination } from "@/lib/components/Pagination";
import { Select } from "@/lib/components/Select";
import { Copy, Check, Settings } from "lucide-react";

export default function PaginationPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [showPageInfo, setShowPageInfo] = useState(false);
  const [showJumpTo, setShowJumpTo] = useState(false);
  const [showFirstLast, setShowFirstLast] = useState(true);
  const [showPrevNext, setShowPrevNext] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
    if (showPageInfo) props.push("showPageInfo");
    if (showJumpTo) props.push("showJumpTo");
    if (!showFirstLast) props.push("showFirstLast={false}");
    if (!showPrevNext) props.push("showPrevNext={false}");

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Pagination } from '@beeui';
import { useState } from 'react';

function Demo() {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}${propsString}
    />
  );
}`;
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

  // Custom checkbox component
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
    { value: "outline", label: "Outline" },
    { value: "minimal", label: "Minimal" },
    { value: "pills", label: "Pills" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pagination</h1>
          <p className="text-gray-600">Navigate between multiple pages</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="space-y-6">
              {/* Preview Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[100px]">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={4}
                      onPageChange={setCurrentPage}
                      variant={variant as any}
                      size={size as any}
                      showPageInfo={showPageInfo}
                      showJumpTo={showJumpTo}
                      showFirstLast={showFirstLast}
                      showPrevNext={showPrevNext}
                    />
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-orange-600" />
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

                    {/* Row 2: Checkboxes */}
                    <div className="space-y-3">
                      <CustomCheckbox
                        checked={showPageInfo}
                        onChange={setShowPageInfo}
                        label="Show page info"
                      />
                      <CustomCheckbox
                        checked={showJumpTo}
                        onChange={setShowJumpTo}
                        label="Show jump to page"
                      />
                      <CustomCheckbox
                        checked={showFirstLast}
                        onChange={setShowFirstLast}
                        label="Show first/last buttons"
                      />
                      <CustomCheckbox
                        checked={showPrevNext}
                        onChange={setShowPrevNext}
                        label="Show prev/next buttons"
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Pagination
                  currentPage={3}
                  totalPages={10}
                  onPageChange={() => {}}
                  variant="default"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Outline
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Pagination
                  currentPage={3}
                  totalPages={10}
                  onPageChange={() => {}}
                  variant="outline"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Minimal
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Pagination
                  currentPage={3}
                  totalPages={10}
                  onPageChange={() => {}}
                  variant="minimal"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Pills</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Pagination
                  currentPage={3}
                  totalPages={10}
                  onPageChange={() => {}}
                  variant="pills"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Pagination variant="default" currentPage={3} totalPages={10} onPageChange={setPage} />
<Pagination variant="outline" currentPage={3} totalPages={10} onPageChange={setPage} />
<Pagination variant="minimal" currentPage={3} totalPages={10} onPageChange={setPage} />
<Pagination variant="pills" currentPage={3} totalPages={10} onPageChange={setPage} />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sizes</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Small</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Pagination
                  currentPage={3}
                  totalPages={10}
                  onPageChange={() => {}}
                  size="sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Pagination
                  currentPage={3}
                  totalPages={10}
                  onPageChange={() => {}}
                  size="md"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Pagination
                  currentPage={3}
                  totalPages={10}
                  onPageChange={() => {}}
                  size="lg"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Pagination size="sm" currentPage={3} totalPages={10} onPageChange={setPage} />
<Pagination size="md" currentPage={3} totalPages={10} onPageChange={setPage} />
<Pagination size="lg" currentPage={3} totalPages={10} onPageChange={setPage} />`}
              title="Demo.tsx"
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* With Page Info Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Page Info
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Pagination
              currentPage={3}
              totalPages={10}
              onPageChange={() => {}}
              showPageInfo
            />
          </div>

          <CodeSection
            code={`<Pagination
  currentPage={3}
  totalPages={10}
  onPageChange={setPage}
  showPageInfo
/>`}
            title="Demo.tsx"
            sectionKey="page-info"
          />
        </section>

        {/* Jump to Page Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Jump to Page
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Pagination
              currentPage={3}
              totalPages={20}
              onPageChange={() => {}}
              showJumpTo
              showPageInfo
            />
          </div>

          <CodeSection
            code={`<Pagination
  currentPage={3}
  totalPages={20}
  onPageChange={setPage}
  showJumpTo
  showPageInfo
/>`}
            title="Demo.tsx"
            sectionKey="jump-to"
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
