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
import { drawerSizes } from "@/lib/components/Drawer/Drawer.styles";
import { cn } from "@/lib/utils/cn";

export default function DrawerPage() {
  // Interactive controls state
  const [position, setPosition] = useState("left");
  const [size, setSize] = useState("lg");
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

  // Get current size styles for dynamic sizing
  const sizeStyles =
    drawerSizes[size as keyof typeof drawerSizes] || drawerSizes.md;

  const DrawerContent = () => (
    <>
      {/* User Profile Section */}
      <div
        className={cn(
          "flex items-center gap-4 border-b border-gray-100 bg-white flex-shrink-0",
          sizeStyles.header
        )}
      >
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
      <div
        className={cn(
          "flex-1 overflow-y-auto",
          size === "sm"
            ? "px-2 py-2"
            : size === "md"
            ? "px-3 py-3"
            : size === "lg"
            ? "px-4 py-4"
            : "px-5 py-5"
        )}
      >
        <div className="space-y-1">
          <div
            className={cn(
              "flex items-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200 group relative",
              size === "sm"
                ? "gap-2 mx-2 px-2 py-2"
                : size === "md"
                ? "gap-3 mx-2 px-3 py-2.5"
                : size === "lg"
                ? "gap-4 mx-3 px-3 py-3"
                : "gap-4 mx-4 px-4 py-4"
            )}
          >
            <Folder className="w-5 h-5 text-purple-600 flex-shrink-0" />
            <span
              className={cn(
                "font-medium",
                size === "sm"
                  ? "text-xs"
                  : size === "md"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-sm"
                  : "text-base"
              )}
            >
              My Files
            </span>
          </div>

          <div
            className={cn(
              "flex items-center rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative",
              size === "sm"
                ? "gap-2 mx-2 px-2 py-2"
                : size === "md"
                ? "gap-3 mx-2 px-3 py-2.5"
                : size === "lg"
                ? "gap-4 mx-3 px-3 py-3"
                : "gap-4 mx-4 px-4 py-4"
            )}
          >
            <Share2 className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span
              className={cn(
                "font-medium",
                size === "sm"
                  ? "text-xs"
                  : size === "md"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-sm"
                  : "text-base"
              )}
            >
              Shared with me
            </span>
          </div>

          <div
            className={cn(
              "flex items-center rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative",
              size === "sm"
                ? "gap-2 mx-2 px-2 py-2"
                : size === "md"
                ? "gap-3 mx-2 px-3 py-2.5"
                : size === "lg"
                ? "gap-4 mx-3 px-3 py-3"
                : "gap-4 mx-4 px-4 py-4"
            )}
          >
            <Star className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span
              className={cn(
                "font-medium",
                size === "sm"
                  ? "text-xs"
                  : size === "md"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-sm"
                  : "text-base"
              )}
            >
              Starred
            </span>
          </div>

          <div
            className={cn(
              "flex items-center rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative",
              size === "sm"
                ? "gap-2 mx-2 px-2 py-2"
                : size === "md"
                ? "gap-3 mx-2 px-3 py-2.5"
                : size === "lg"
                ? "gap-4 mx-3 px-3 py-3"
                : "gap-4 mx-4 px-4 py-4"
            )}
          >
            <Clock className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span
              className={cn(
                "font-medium",
                size === "sm"
                  ? "text-xs"
                  : size === "md"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-sm"
                  : "text-base"
              )}
            >
              Recent
            </span>
          </div>

          <div
            className={cn(
              "flex items-center rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative",
              size === "sm"
                ? "gap-2 mx-2 px-2 py-2"
                : size === "md"
                ? "gap-3 mx-2 px-3 py-2.5"
                : size === "lg"
                ? "gap-4 mx-3 px-3 py-3"
                : "gap-4 mx-4 px-4 py-4"
            )}
          >
            <Download className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span
              className={cn(
                "font-medium",
                size === "sm"
                  ? "text-xs"
                  : size === "md"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-sm"
                  : "text-base"
              )}
            >
              Offline
            </span>
          </div>

          <div
            className={cn(
              "flex items-center rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative",
              size === "sm"
                ? "gap-2 mx-2 px-2 py-2"
                : size === "md"
                ? "gap-3 mx-2 px-3 py-2.5"
                : size === "lg"
                ? "gap-4 mx-3 px-3 py-3"
                : "gap-4 mx-4 px-4 py-4"
            )}
          >
            <Upload className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span
              className={cn(
                "font-medium",
                size === "sm"
                  ? "text-xs"
                  : size === "md"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-sm"
                  : "text-base"
              )}
            >
              Uploads
            </span>
          </div>

          <div
            className={cn(
              "flex items-center rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative",
              size === "sm"
                ? "gap-2 mx-2 px-2 py-2"
                : size === "md"
                ? "gap-3 mx-2 px-3 py-2.5"
                : size === "lg"
                ? "gap-4 mx-3 px-3 py-3"
                : "gap-4 mx-4 px-4 py-4"
            )}
          >
            <Archive className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span
              className={cn(
                "font-medium",
                size === "sm"
                  ? "text-xs"
                  : size === "md"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-sm"
                  : "text-base"
              )}
            >
              Backups
            </span>
          </div>

          <div
            className={cn(
              "flex items-center rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer group relative",
              size === "sm"
                ? "gap-2 mx-2 px-2 py-2"
                : size === "md"
                ? "gap-3 mx-2 px-3 py-2.5"
                : size === "lg"
                ? "gap-4 mx-3 px-3 py-3"
                : "gap-4 mx-4 px-4 py-4"
            )}
          >
            <Trash2 className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            <span
              className={cn(
                "font-medium",
                size === "sm"
                  ? "text-xs"
                  : size === "md"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-sm"
                  : "text-base"
              )}
            >
              Trash
            </span>
          </div>
        </div>
      </div>

      {/* Settings Section - Fixed Bottom */}
      <div
        className={cn(
          "border-t border-gray-100 bg-white flex-shrink-0",
          size === "sm"
            ? "px-4 py-3"
            : size === "md"
            ? "px-5 py-4"
            : size === "lg"
            ? "px-6 py-4"
            : "px-7 py-5"
        )}
      >
        <div
          className={cn(
            "flex items-center rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer",
            size === "sm"
              ? "gap-2 px-2 py-2"
              : size === "md"
              ? "gap-3 px-3 py-2.5"
              : size === "lg"
              ? "gap-4 px-3 py-3"
              : "gap-4 px-4 py-4"
          )}
        >
          <Settings className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
          <span
            className={cn(
              "font-medium",
              size === "sm"
                ? "text-xs"
                : size === "md"
                ? "text-sm"
                : size === "lg"
                ? "text-sm"
                : "text-base"
            )}
          >
            Settings & account
          </span>
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

        {/* Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sizes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sizeOptions.map((sizeOption) => (
              <div
                key={sizeOption.value}
                className="bg-gray-50 rounded-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {sizeOption.label}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setSize(sizeOption.value);
                    setOpened(true);
                  }}
                >
                  Open {sizeOption.label} Drawer
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Drawer size="sm" opened={opened} onClose={() => setOpened(false)} />
<Drawer size="md" opened={opened} onClose={() => setOpened(false)} />
<Drawer size="lg" opened={opened} onClose={() => setOpened(false)} />
<Drawer size="xl" opened={opened} onClose={() => setOpened(false)} />`}
              title="Demo.tsx"
              sectionKey="sizes"
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
