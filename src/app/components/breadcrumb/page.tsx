"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/lib/components/Breadcrumbs";
import { Home, Folder, FileText, Copy, Check } from "lucide-react";

export default function BreadcrumbsPage() {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyCode = async (code: string, key: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const CodeSection = ({ code, title }: { code: string; title: string }) => {
    const key = title.toLowerCase().replace(/\s+/g, "-");
    const isCopied = copiedStates[key];

    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
          <button
            onClick={() => copyCode(code, key)}
            className="flex items-center gap-2 px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
        <pre className="p-4 text-sm overflow-x-auto">
          <code className="text-gray-800">{code}</code>
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

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Breadcrumbs items={basicItems} />
          </div>

          <CodeSection
            code={`import { Breadcrumbs } from '@mantine/core';

const items = [
  { label: 'Mantine', href: '/' },
  { label: 'Core', href: '/core' },
  { label: 'Breadcrumbs', href: '/breadcrumbs' }
];

function Demo() {
  return <Breadcrumbs items={items} />;
}`}
            title="Demo.tsx"
          />
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
            />
          </div>
        </section>
      </div>
    </div>
  );
}
