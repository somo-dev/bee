"use client";

import React, { useState } from "react";
import { Pagination } from "@/lib/components/Pagination";
import { Copy, Check } from "lucide-react";

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1);
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

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </div>

          <CodeSection
            code={`import { Pagination } from '@mantine/core';
import { useState } from 'react';

function Demo() {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  );
}`}
            title="Demo.tsx"
          />
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
          />
        </section>
      </div>
    </div>
  );
}
