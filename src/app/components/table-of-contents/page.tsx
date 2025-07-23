"use client";

import React, { useState } from "react";
import { TableOfContents } from "@/lib/components/TableOfContents";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import {
  Copy,
  Check,
  Settings,
  FileText,
  Code,
  Palette,
  Zap,
  Shield,
  Users,
  Database,
  Globe,
  Smartphone,
  Camera,
  Music,
  Video,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  GraduationCap,
  Home,
  Car,
  Plane,
  Ship,
  Truck,
  Star,
  Heart,
  Award,
  Target,
  Lightbulb,
  Bookmark,
  List,
  Hash,
} from "lucide-react";

export default function TableOfContentsPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("minimal");
  const [size, setSize] = useState("md");
  const [position, setPosition] = useState("left");
  const [disabled, setDisabled] = useState(false);
  const [smoothScroll, setSmoothScroll] = useState(true);
  const [autoDetectActive, setAutoDetectActive] = useState(true);
  const [showIcons, setShowIcons] = useState(true);
  const [showNested, setShowNested] = useState(true);
  const [sticky, setSticky] = useState(false);
  const [highlightActive, setHighlightActive] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [collapsible, setCollapsible] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [height, setHeight] = useState(400);
  const [itemGap, setItemGap] = useState(4);
  const [scrollOffset, setScrollOffset] = useState(100);
  const [maxLevel, setMaxLevel] = useState(3);

  // Demo state
  const [activeSection, setActiveSection] = useState("usage");
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
    if (variant !== "minimal") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (position !== "left") props.push(`position="${position}"`);
    if (!smoothScroll) props.push("smoothScroll={false}");
    if (!autoDetectActive) props.push("autoDetectActive={false}");
    if (!showIcons) props.push("showIcons={false}");
    if (!showNested) props.push("showNested={false}");
    if (sticky) props.push("sticky");
    if (!highlightActive) props.push("highlightActive={false}");
    if (!showTitle) props.push("showTitle={false}");
    if (collapsible) props.push("collapsible");
    if (showNumbers) props.push("showNumbers");
    if (height !== 400) props.push(`height={${height}}`);
    if (itemGap !== 4) props.push(`itemGap={${itemGap}}`);
    if (scrollOffset !== 100) props.push(`scrollOffset={${scrollOffset}}`);
    if (maxLevel !== 3) props.push(`maxLevel={${maxLevel}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { TableOfContents } from '@beeui';

const tocItems = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: <FileText />
  },
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: <Zap />,
    children: [
      { id: 'installation', label: 'Installation' },
      { id: 'setup', label: 'Setup' }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    icon: <Code />,
    children: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'forms', label: 'Forms' },
      { id: 'navigation', label: 'Navigation' }
    ]
  }
];

<TableOfContents
  items={tocItems}
  activeId={activeId}
  onItemClick={handleItemClick}${propsString}
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

  // Sample table of contents data
  const sampleTocItems = [
    {
      id: "usage",
      label: "Usage",
      icon: <Zap />,
    },
    {
      id: "controlled",
      label: "Controlled",
      icon: <Settings />,
    },
    {
      id: "inner-labels",
      label: "Inner Labels",
      icon: <FileText />,
    },
    {
      id: "icon-labels",
      label: "Icon labels",
      icon: <Star />,
    },
    {
      id: "thumb-icon",
      label: "Thumb icon",
      icon: <Heart />,
    },
    {
      id: "with-tooltip",
      label: "With tooltip",
      icon: <Lightbulb />,
    },
    {
      id: "pointer-cursor",
      label: "Pointer cursor",
      icon: <Target />,
    },
    {
      id: "add-props",
      label: "Add props to the root element",
      icon: <Code />,
    },
    {
      id: "switch-group",
      label: "Switch.Group",
      icon: <Users />,
    },
    {
      id: "controlled-switch-group",
      label: "Controlled Switch.Group",
      icon: <Shield />,
    },
    {
      id: "change-styles",
      label: "Change styles based on checked state",
      icon: <Palette />,
    },
    {
      id: "styles-api",
      label: "Styles API",
      icon: <Database />,
    },
    {
      id: "get-input-ref",
      label: "Get input ref",
      icon: <Globe />,
    },
    {
      id: "accessibility",
      label: "Accessibility",
      icon: <Award />,
    },
  ];

  const nestedTocItems = [
    {
      id: "introduction",
      label: "Introduction",
      icon: <FileText />,
      children: [
        { id: "overview", label: "Overview" },
        { id: "features", label: "Features" },
      ],
    },
    {
      id: "getting-started",
      label: "Getting Started",
      icon: <Zap />,
      children: [
        { id: "installation", label: "Installation" },
        { id: "setup", label: "Setup" },
        { id: "configuration", label: "Configuration" },
      ],
    },
    {
      id: "components",
      label: "Components",
      icon: <Code />,
      children: [
        {
          id: "buttons",
          label: "Buttons",
          children: [
            { id: "button-variants", label: "Variants" },
            { id: "button-sizes", label: "Sizes" },
          ],
        },
        {
          id: "forms",
          label: "Forms",
          children: [
            { id: "inputs", label: "Inputs" },
            { id: "selects", label: "Selects" },
          ],
        },
        { id: "navigation", label: "Navigation" },
      ],
    },
    {
      id: "theming",
      label: "Theming",
      icon: <Palette />,
      children: [
        { id: "colors", label: "Colors" },
        { id: "typography", label: "Typography" },
      ],
    },
    {
      id: "api-reference",
      label: "API Reference",
      icon: <Database />,
    },
  ];

  const minimalTocItems = [
    { id: "overview", label: "Overview" },
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    { id: "examples", label: "Examples" },
    { id: "api", label: "API" },
  ];

  // Select data
  const variantOptions = [
    { value: "minimal", label: "Minimal" },
    { value: "sidebar", label: "Sidebar" },
    { value: "floating", label: "Floating" },
  ];

  const positionOptions = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Table of Contents
          </h1>
          <p className="text-gray-600">
            Scroll-controlled navigation component that automatically highlights
            active sections
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Preview Section */}
              <div className="xl:col-span-3 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-start justify-center h-full min-h-[500px]">
                    <div className="w-full max-w-sm">
                      <TableOfContents
                        items={sampleTocItems}
                        activeId={activeSection}
                        onItemClick={(item) => setActiveSection(item.id)}
                        variant={variant as any}
                        size={size as any}
                        position={position as any}
                        smoothScroll={smoothScroll}
                        autoDetectActive={autoDetectActive}
                        showIcons={showIcons}
                        showNested={showNested}
                        sticky={sticky}
                        highlightActive={highlightActive}
                        showTitle={showTitle}
                        collapsible={collapsible}
                        showNumbers={showNumbers}
                        height={height}
                        itemGap={itemGap}
                        scrollOffset={scrollOffset}
                        maxLevel={maxLevel}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 xl:order-2">
                <div className="bg-white rounded-xl border border-gray-200 pl-4 pt-6 pb-4 pr-2 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-indigo-600" />
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

                    {/* Row 3: Position */}
                    <div>
                      <Select
                        data={positionOptions}
                        value={position}
                        onChange={(value) => setPosition(value as string)}
                        label="Position"
                        size="sm"
                      />
                    </div>

                    {/* Row 4: Height */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Height: {height}px
                      </label>
                      <input
                        type="range"
                        min="200"
                        max="800"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>200px</span>
                        <span>800px</span>
                      </div>
                    </div>

                    {/* Row 5: Item Gap */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Item Gap: {itemGap}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="16"
                        value={itemGap}
                        onChange={(e) => setItemGap(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0px</span>
                        <span>16px</span>
                      </div>
                    </div>

                    {/* Row 6: Scroll Offset */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Scroll Offset: {scrollOffset}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={scrollOffset}
                        onChange={(e) =>
                          setScrollOffset(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0px</span>
                        <span>200px</span>
                      </div>
                    </div>

                    {/* Row 7: Max Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Max Level: {maxLevel}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={maxLevel}
                        onChange={(e) => setMaxLevel(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>5</span>
                      </div>
                    </div>

                    {/* Row 8: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={smoothScroll}
                        onChange={setSmoothScroll}
                        label="Smooth scroll"
                        size="sm"
                      />
                      <Checkbox
                        checked={autoDetectActive}
                        onChange={setAutoDetectActive}
                        label="Auto detect active"
                        size="sm"
                      />
                      <Checkbox
                        checked={showIcons}
                        onChange={setShowIcons}
                        label="Show icons"
                        size="sm"
                      />
                      <Checkbox
                        checked={showNested}
                        onChange={setShowNested}
                        label="Show nested"
                        size="sm"
                      />
                      <Checkbox
                        checked={sticky}
                        onChange={setSticky}
                        label="Sticky position"
                        size="sm"
                      />
                      <Checkbox
                        checked={highlightActive}
                        onChange={setHighlightActive}
                        label="Highlight active"
                        size="sm"
                      />
                      <Checkbox
                        checked={showTitle}
                        onChange={setShowTitle}
                        label="Show title"
                        size="sm"
                      />
                      <Checkbox
                        checked={collapsible}
                        onChange={setCollapsible}
                        label="Collapsible"
                        size="sm"
                      />
                      <Checkbox
                        checked={showNumbers}
                        onChange={setShowNumbers}
                        label="Show numbers"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TableOfContents
                  items={minimalTocItems}
                  activeId="usage"
                  variant="minimal"
                  height={300}
                  showTitle={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Minimal
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TableOfContents
                  items={minimalTocItems}
                  activeId="installation"
                  variant="minimal"
                  height={300}
                  showTitle={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Sidebar
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TableOfContents
                  items={minimalTocItems}
                  activeId="examples"
                  variant="sidebar"
                  height={300}
                  showTitle={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Floating
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TableOfContents
                  items={minimalTocItems}
                  activeId="api"
                  variant="floating"
                  height={300}
                  showTitle={false}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<TableOfContents variant="minimal" items={items} />
<TableOfContents variant="sidebar" items={items} />
<TableOfContents variant="floating" items={items} />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Nested Structure Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Nested Structure
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
                            <TableOfContents
                  items={nestedTocItems}
                  activeId="button-variants"
                  variant="minimal"
                  height={400}
                  showNested
                  collapsible
                  maxLevel={3}
                />
          </div>

          <CodeSection
            code={`const nestedItems = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: <FileText />,
    children: [
      { id: 'overview', label: 'Overview' },
      { id: 'features', label: 'Features' }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    icon: <Code />,
    children: [
      { 
        id: 'buttons', 
        label: 'Buttons',
        children: [
          { id: 'button-variants', label: 'Variants' },
          { id: 'button-sizes', label: 'Sizes' }
        ]
      }
    ]
  }
];

<TableOfContents
  items={nestedItems}
  showNested
  collapsible
  maxLevel={3}
/>`}
            title="Demo.tsx"
            sectionKey="nested"
          />
        </section>

        {/* With Numbers Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Numbers
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <TableOfContents
              items={sampleTocItems.slice(0, 8)}
              activeId="icon-labels"
              variant="minimal"
              height={350}
              showNumbers
              showIcons={false}
            />
          </div>

          <CodeSection
            code={`<TableOfContents
  items={items}
  showNumbers
  showIcons={false}
  variant="minimal"
/>`}
            title="Demo.tsx"
            sectionKey="numbers"
          />
        </section>

        {/* Sticky Position Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Sticky Position
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <TableOfContents
                  items={minimalTocItems}
                  activeId="usage"
                  variant="sidebar"
                  height={300}
                  sticky
                  stickyTop={20}
                />
              </div>
              <div className="lg:col-span-3">
                <div className="space-y-8">
                  <div className="h-32 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">
                      Content area - scroll to see sticky behavior
                    </p>
                  </div>
                  <div className="h-32 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">More content...</p>
                  </div>
                  <div className="h-32 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Even more content...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CodeSection
            code={`<TableOfContents
  items={items}
  variant="sidebar"
  sticky
  stickyTop={20}
/>`}
            title="Demo.tsx"
            sectionKey="sticky"
          />
        </section>

        {/* Customization Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Customization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Custom Gap
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TableOfContents
                  items={minimalTocItems}
                  activeId="installation"
                  variant="minimal"
                  height={250}
                  itemGap={12}
                  showTitle={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Custom Height
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TableOfContents
                  items={sampleTocItems.slice(0, 6)}
                  activeId="thumb-icon"
                  variant="minimal"
                  height={200}
                  showTitle={false}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<TableOfContents itemGap={12} height={250} />
<TableOfContents height={200} scrollOffset={50} />`}
              title="Demo.tsx"
              sectionKey="customization"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Hash className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Auto-Detection
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Automatically detects and highlights the currently visible
                section based on scroll position.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Smooth Scrolling
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Smooth animated scrolling to sections with customizable offset
                and behavior.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <List className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Nested Structure
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Support for multi-level nested items with collapsible sections
                and level limits.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sticky Position
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Optional sticky positioning that follows the user as they scroll
                through content.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Highly Customizable
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Adjustable height, gap, scroll offset, and many other properties
                for perfect integration.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Multiple Variants
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Four beautiful variants: default, minimal, sidebar, and floating
                styles.
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Example Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Real-World Example
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <TableOfContents
                  items={nestedTocItems}
                  activeId="setup"
                  variant="sidebar"
                  height={500}
                  sticky
                  collapsible
                  showNumbers
                  title="Documentation"
                />
              </div>
              <div className="lg:col-span-3">
                <div className="prose max-w-none">
                  <div id="introduction" className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Introduction
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Welcome to our comprehensive documentation. This section
                      provides an overview of the entire system and its
                      capabilities.
                    </p>
                    <div className="h-32 bg-white rounded border border-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">
                        Introduction content...
                      </span>
                    </div>
                  </div>

                  <div id="getting-started" className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Getting Started
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Follow these steps to get up and running quickly with our
                      platform.
                    </p>
                    <div className="h-40 bg-white rounded border border-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">
                        Getting started content...
                      </span>
                    </div>
                  </div>

                  <div id="components" className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Components
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Explore our extensive library of reusable components.
                    </p>
                    <div className="h-48 bg-white rounded border border-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">
                        Components content...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CodeSection
            code={`// Real documentation layout
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
  <div className="lg:col-span-1">
    <TableOfContents
      items={documentationItems}
      variant="sidebar"
      sticky
      collapsible
      showNumbers
      title="Documentation"
      autoDetectActive
      smoothScroll
    />
  </div>
  <div className="lg:col-span-3">
    <article className="prose max-w-none">
      {/* Your content sections */}
    </article>
  </div>
</div>`}
            title="Demo.tsx"
            sectionKey="real-world"
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
