"use client";

import React, { useState } from "react";
import { Drawer } from "@/lib/components/Drawer";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { Button } from "@/lib/components/Button";
import {
  Copy,
  Check,
  Settings,
  User,
  Folder,
  Share2,
  Star,
  Clock,
  Download,
  Upload,
  Archive,
  Trash2,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function DrawerPage() {
  // Interactive controls state
  const [position, setPosition] = useState("left");
  const [size, setSize] = useState("lg");
  const [variant, setVariant] = useState("default");
  const [withOverlay, setWithOverlay] = useState(true);
  const [closeOnClickOutside, setCloseOnClickOutside] = useState(true);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [withCloseButton, setWithCloseButton] = useState(true);
  const [resizable, setResizable] = useState(false);
  const [lockScroll, setLockScroll] = useState(true);
  const [trapFocus, setTrapFocus] = useState(true);

  // Demo state
  const [opened, setOpened] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyCode = async (code: string, key: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const generateCode = () => {
    const props = [];
    if (position !== "left") props.push(`position="${position}"`);
    if (size !== "lg") props.push(`size="${size}"`);
    if (variant !== "default") props.push(`variant="${variant}"`);
    if (!withOverlay) props.push("withOverlay={false}");
    if (!closeOnClickOutside) props.push("closeOnClickOutside={false}");
    if (!closeOnEscape) props.push("closeOnEscape={false}");
    if (!withCloseButton) props.push("withCloseButton={false}");
    if (resizable) props.push("resizable");
    if (!lockScroll) props.push("lockScroll={false}");
    if (!trapFocus) props.push("trapFocus={false}");

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Drawer } from '@beeui';

<Drawer
  opened={opened}
  onClose={() => setOpened(false)}
  title="File Manager"${propsString}
>
  <DrawerContent />
</Drawer>`;
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
  const positionOptions = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
  ];

  const sizeOptions = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
  ];

  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "overlay", label: "Overlay" },
    { value: "push", label: "Push" },
    { value: "mini", label: "Mini" },
  ];

  const DrawerContent = () => (
    <>
      {/* User Profile Section */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100 bg-white flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0 shadow-sm">
          SA
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-base truncate">
            Sandra Adams
          </div>
          <div className="text-sm text-gray-500 truncate mt-0.5">
            sandra_a88@gmail.com
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      {/* Navigation Items - Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-4 mx-3 px-3 py-3 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 group relative">
            <Folder className="w-5 h-5 text-purple-600 flex-shrink-0" />
            <span className="font-medium text-sm">My Files</span>
          </div>

          <div className="flex items-center gap-4 mx-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative">
            <Share2 className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span className="font-medium text-sm">Shared with me</span>
          </div>

          <div className="flex items-center gap-4 mx-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative">
            <Star className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span className="font-medium text-sm">Starred</span>
          </div>

          <div className="flex items-center gap-4 mx-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative">
            <Clock className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span className="font-medium text-sm">Recent</span>
          </div>

          <div className="flex items-center gap-4 mx-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative">
            <Download className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span className="font-medium text-sm">Offline</span>
          </div>

          <div className="flex items-center gap-4 mx-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative">
            <Upload className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span className="font-medium text-sm">Uploads</span>
          </div>

          <div className="flex items-center gap-4 mx-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative">
            <Archive className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span className="font-medium text-sm">Backups</span>
          </div>

          <div className="flex items-center gap-4 mx-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative">
            <Trash2 className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span className="font-medium text-sm">Trash</span>
          </div>
        </div>
      </div>

      {/* Settings Section - Fixed Bottom */}
      <div className="px-6 py-4 border-t border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-center gap-4 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer">
          <Settings className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
          <span className="font-medium text-sm">Settings & account</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Drawer</h1>
          <p className="text-gray-600">
            Overlay panel that slides out from the edge of the screen
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Preview Section */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <Button
                      onClick={() => setOpened(true)}
                      leftIcon={<Menu />}
                      size="lg"
                    >
                      Open File Manager
                    </Button>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Controls
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Position */}
                    <div>
                      <Select
                        data={positionOptions}
                        value={position}
                        onChange={(value) => setPosition(value as string)}
                        label="Position"
                        size="sm"
                      />
                    </div>

                    {/* Size */}
                    <div>
                      <Select
                        data={sizeOptions}
                        value={size}
                        onChange={(value) => setSize(value as string)}
                        label="Size"
                        size="sm"
                      />
                    </div>

                    {/* Variant */}
                    <div>
                      <Select
                        data={variantOptions}
                        value={variant}
                        onChange={(value) => setVariant(value as string)}
                        label="Variant"
                        size="sm"
                      />
                    </div>

                    {/* Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={withOverlay}
                        onChange={setWithOverlay}
                        label="Show overlay"
                        size="sm"
                      />
                      <Checkbox
                        checked={closeOnClickOutside}
                        onChange={setCloseOnClickOutside}
                        label="Close on outside click"
                        size="sm"
                      />
                      <Checkbox
                        checked={closeOnEscape}
                        onChange={setCloseOnEscape}
                        label="Close on escape"
                        size="sm"
                      />
                      <Checkbox
                        checked={withCloseButton}
                        onChange={setWithCloseButton}
                        label="Show close button"
                        size="sm"
                      />
                      <Checkbox
                        checked={resizable}
                        onChange={setResizable}
                        label="Resizable"
                        size="sm"
                      />
                      <Checkbox
                        checked={lockScroll}
                        onChange={setLockScroll}
                        label="Lock body scroll"
                        size="sm"
                      />
                      <Checkbox
                        checked={trapFocus}
                        onChange={setTrapFocus}
                        label="Trap focus"
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

        {/* Positions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Positions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {positionOptions.map((pos) => (
              <div
                key={pos.value}
                className="bg-gray-50 rounded-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {pos.label}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setPosition(pos.value);
                    setOpened(true);
                  }}
                >
                  Open {pos.label} Drawer
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Drawer position="left" opened={opened} onClose={() => setOpened(false)} />
<Drawer position="right" opened={opened} onClose={() => setOpened(false)} />
<Drawer position="top" opened={opened} onClose={() => setOpened(false)} />
<Drawer position="bottom" opened={opened} onClose={() => setOpened(false)} />`}
              title="Demo.tsx"
              sectionKey="positions"
            />
          </div>
        </section>

        {/* Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Variants
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {variantOptions.map((variant) => (
              <div
                key={variant.value}
                className="bg-gray-50 rounded-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {variant.label}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setVariant(variant.value);
                    setOpened(true);
                  }}
                >
                  Open {variant.label} Drawer
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Drawer variant="default" opened={opened} onClose={() => setOpened(false)} />
<Drawer variant="overlay" opened={opened} onClose={() => setOpened(false)} />
<Drawer variant="push" opened={opened} onClose={() => setOpened(false)} />
<Drawer variant="mini" opened={opened} onClose={() => setOpened(false)} />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>
      </div>

      {/* Live Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position={position as any}
        size={size as any}
        variant={variant as any}
        title="File Manager"
        withOverlay={withOverlay}
        closeOnClickOutside={closeOnClickOutside}
        closeOnEscape={closeOnEscape}
        withCloseButton={withCloseButton}
        resizable={resizable}
        lockScroll={lockScroll}
        trapFocus={trapFocus}
      >
        <DrawerContent />
      </Drawer>
    </div>
  );
}
