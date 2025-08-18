"use client";

import React, { useState } from "react";
import { Skeleton, SkeletonGroup } from "@bee-ui/core";
import { Select } from "@bee-ui/core";
import { Checkbox } from "@bee-ui/core";
import { Button } from "@bee-ui/core";
import {
  Copy,
  Check,
  Settings,
  User,
  Image as ImageIcon,
  FileText,
  Package,
  Star,
  Heart,
  Play,
  Pause,
  RefreshCw,
} from "lucide-react";

export default function SkeletonPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("rectangular");
  const [animation, setAnimation] = useState("wave");
  const [size, setSize] = useState("md");
  const [direction, setDirection] = useState("ltr");
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);
  const [visible, setVisible] = useState(true);
  const [inline, setInline] = useState(false);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(20);
  const [radius, setRadius] = useState(8);
  const [duration, setDuration] = useState(1.5);
  const [delay, setDelay] = useState(0);
  const [lines, setLines] = useState(3);
  const [lineSpacing, setLineSpacing] = useState(8);
  const [lastLineWidth, setLastLineWidth] = useState(75);
  const [fadeInDuration, setFadeInDuration] = useState(300);

  // Demo state
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
    if (variant !== "rectangular") props.push(`variant="${variant}"`);
    if (animation !== "wave") props.push(`animation="${animation}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (direction !== "ltr") props.push(`direction="${direction}"`);
    if (!loading) props.push("loading={false}");
    if (!fadeIn) props.push("fadeIn={false}");
    if (!visible) props.push("visible={false}");
    if (inline) props.push("inline");
    if (width !== 200) props.push(`width={${width}}`);
    if (height !== 20) props.push(`height={${height}}`);
    if (radius !== 8) props.push(`radius={${radius}}`);
    if (duration !== 1.5) props.push(`duration={${duration}}`);
    if (delay !== 0) props.push(`delay={${delay}}`);
    if (lines !== 3 && variant === "text") props.push(`lines={${lines}}`);
    if (lineSpacing !== 8 && variant === "text")
      props.push(`lineSpacing={${lineSpacing}}`);
    if (lastLineWidth !== 75 && variant === "text")
      props.push(`lastLineWidth="${lastLineWidth}%"`);
    if (fadeInDuration !== 300)
      props.push(`fadeInDuration={${fadeInDuration}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Skeleton } from '@beeui';

<Skeleton${propsString}>
  <div>Your content here</div>
</Skeleton>`;
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
    { value: "text", label: "Text" },
    { value: "circular", label: "Circular" },
    { value: "rectangular", label: "Rectangular" },
    { value: "rounded", label: "Rounded" },
  ];

  const animationOptions = [
    { value: "wave", label: "Wave (Shimmer)" },
    { value: "pulse", label: "Pulse" },
    { value: "none", label: "None" },
  ];

  const directionOptions = [
    { value: "ltr", label: "Left to Right" },
    { value: "rtl", label: "Right to Left" },
    { value: "ttb", label: "Top to Bottom" },
    { value: "btt", label: "Bottom to Top" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Skeleton</h1>
          <p className="text-gray-600">
            Display placeholder loading states with shimmering effects for any
            content
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
                      <Skeleton
                        loading={loading}
                        variant={variant as any}
                        animation={animation as any}
                        size={size as any}
                        direction={direction as any}
                        fadeIn={fadeIn}
                        visible={visible}
                        inline={inline}
                        width={width}
                        height={height}
                        radius={radius}
                        duration={duration}
                        delay={delay}
                        lines={lines}
                        lineSpacing={lineSpacing}
                        lastLineWidth={lastLineWidth / 100}
                        fadeInDuration={fadeInDuration}
                      >
                        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">
                                Content Loaded!
                              </h3>
                              <p className="text-blue-100">
                                This content appears when loading is false
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-blue-100">
                            The skeleton component provides a smooth loading
                            experience with customizable animations and shapes.
                          </p>
                        </div>
                      </Skeleton>
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

                  <div className="space-y-4 max-h-[600px] overflow-y-auto p-2">
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

                    {/* Row 2: Animation */}
                    <div>
                      <Select
                        data={animationOptions}
                        value={animation}
                        onChange={(value) => setAnimation(value as string)}
                        label="Animation"
                        size="sm"
                      />
                    </div>

                    {/* Row 3: Direction */}
                    <div>
                      <Select
                        data={directionOptions}
                        value={direction}
                        onChange={(value) => setDirection(value as string)}
                        label="Direction"
                        size="sm"
                        disabled={animation !== "wave"}
                      />
                    </div>

                    {/* Row 4: Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Size: {size} ({sizeLabels[sizeValues.indexOf(size)]})
                      </label>
                      <div className="relative pr-2">
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

                    {/* Row 5: Dimensions */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Width: {width}px
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="50"
                            max="400"
                            value={width}
                            onChange={(e) => setWidth(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Height: {height}px
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="10"
                            max="200"
                            value={height}
                            onChange={(e) =>
                              setHeight(parseInt(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 6: Radius and Duration */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Radius: {radius}px
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="0"
                            max="50"
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
                          Duration: {duration}s
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="0.5"
                            max="5"
                            step="0.1"
                            value={duration}
                            onChange={(e) =>
                              setDuration(parseFloat(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 7: Text-specific controls */}
                    {variant === "text" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Lines: {lines}
                          </label>
                          <div className="pr-2">
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={lines}
                              onChange={(e) =>
                                setLines(parseInt(e.target.value))
                              }
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Last Line Width: {lastLineWidth}%
                          </label>
                          <div className="pr-2">
                            <input
                              type="range"
                              min="30"
                              max="100"
                              value={lastLineWidth}
                              onChange={(e) =>
                                setLastLineWidth(parseInt(e.target.value))
                              }
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Row 8: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={loading}
                        onChange={setLoading}
                        label="Loading state"
                        size="sm"
                      />
                      <Checkbox
                        checked={fadeIn}
                        onChange={setFadeIn}
                        label="Fade in content"
                        size="sm"
                      />
                      <Checkbox
                        checked={visible}
                        onChange={setVisible}
                        label="Visible"
                        size="sm"
                      />
                      <Checkbox
                        checked={inline}
                        onChange={setInline}
                        label="Inline display"
                        size="sm"
                      />
                    </div>

                    {/* Row 9: Quick Actions */}
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        leftIcon={loading ? <Pause /> : <Play />}
                        onClick={() => setLoading(!loading)}
                      >
                        {loading ? "Show Content" : "Show Skeleton"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        fullWidth
                        leftIcon={<RefreshCw />}
                        onClick={() => {
                          setLoading(true);
                          setTimeout(() => setLoading(false), 2000);
                        }}
                      >
                        Demo Loading
                      </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Text</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Skeleton variant="text" lines={3} width={200} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Circular
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex justify-center">
                <Skeleton variant="circular" width={80} height={80} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Rectangular
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Skeleton variant="rectangular" width={200} height={120} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Rounded
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Skeleton variant="rounded" width={200} height={120} />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Skeleton variant="text" lines={3} />
<Skeleton variant="circular" width={80} height={80} />
<Skeleton variant="rectangular" width={200} height={120} />
<Skeleton variant="rounded" width={200} height={120} />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Animations Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Animations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Wave (Shimmer)
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Skeleton animation="wave" width={200} height={20} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pulse</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Skeleton animation="pulse" width={200} height={20} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">None</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Skeleton animation="none" width={200} height={20} />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Skeleton animation="wave" />
<Skeleton animation="pulse" />
<Skeleton animation="none" />`}
              title="Demo.tsx"
              sectionKey="animations"
            />
          </div>
        </section>

        {/* Real-World Examples Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Real-World Examples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Card Example */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                User Card
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton variant="circular" width={48} height={48} />
                  <div className="flex-1">
                    <Skeleton variant="text" width="60%" height={16} />
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={14}
                      delay={0.1}
                    />
                  </div>
                </div>
                <Skeleton variant="text" lines={3} delay={0.2} />
              </div>
            </div>

            {/* Article Card Example */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Article Card
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Skeleton variant="rectangular" width="100%" height={120} />
                <div className="mt-4">
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={20}
                    delay={0.1}
                  />
                  <Skeleton variant="text" lines={2} delay={0.2} />
                  <div className="flex items-center gap-2 mt-3">
                    <Skeleton
                      variant="circular"
                      width={24}
                      height={24}
                      delay={0.3}
                    />
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={14}
                      delay={0.3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`// User Card Skeleton
<div className="flex items-center gap-4 mb-4">
  <Skeleton variant="circular" width={48} height={48} />
  <div className="flex-1">
    <Skeleton variant="text" width="60%" height={16} />
    <Skeleton variant="text" width="40%" height={14} delay={0.1} />
  </div>
</div>
<Skeleton variant="text" lines={3} delay={0.2} />

// Article Card Skeleton
<Skeleton variant="rectangular" width="100%" height={120} />
<div className="mt-4">
  <Skeleton variant="text" width="80%" height={20} delay={0.1} />
  <Skeleton variant="text" lines={2} delay={0.2} />
</div>`}
              title="Demo.tsx"
              sectionKey="examples"
            />
          </div>
        </section>

        {/* Skeleton Group Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Skeleton Group
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <SkeletonGroup
              count={5}
              spacing={16}
              stagger={true}
              staggerDelay={0.1}
              skeletonProps={{
                variant: "text",
                lines: 2,
                width: "100%",
              }}
            />
          </div>

          <CodeSection
            code={`<SkeletonGroup
  count={5}
  spacing={16}
  stagger={true}
  staggerDelay={0.1}
  skeletonProps={{
    variant: 'text',
    lines: 2,
    width: '100%'
  }}
/>`}
            title="Demo.tsx"
            sectionKey="group"
          />
        </section>

        {/* Advanced Features Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Advanced Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Shimmer Effects
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Beautiful wave animations with customizable direction, duration,
                and colors for engaging loading states.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Smooth Transitions
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Fade-in animations when content loads with customizable duration
                and easing for professional UX.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Flexible Shapes
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Support for text, circular, rectangular, and rounded variants
                with custom dimensions and aspect ratios.
              </p>
            </div>
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
