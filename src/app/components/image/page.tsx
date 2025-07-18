"use client";

import React, { useState } from "react";
import { Image } from "@/lib/components/Image";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { ColorPicker } from "@/lib/components/ColorPicker";
import {
  Copy,
  Check,
  Settings,
  Heart,
  Star,
  Play,
  Download,
  Share,
  Eye,
  Camera,
  Image as ImageIcon,
  Palette,
  Zap,
  Shield,
  Award,
} from "lucide-react";

export default function ImagePage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [fit, setFit] = useState("cover");
  const [position, setPosition] = useState("center");
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [radius, setRadius] = useState(8);
  const [transparency, setTransparency] = useState(1);
  const [overlayTransparency, setOverlayTransparency] = useState(0);
  const [overlayColor, setOverlayColor] = useState("#000000");
  const [shadow, setShadow] = useState("md");
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [grayscale, setGrayscale] = useState(0);
  const [zoomOnHover, setZoomOnHover] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [withSkeleton, setWithSkeleton] = useState(true);
  const [progressive, setProgressive] = useState(false);
  const [overlayOnHover, setOverlayOnHover] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
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
    if (variant !== "default") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (fit !== "cover") props.push(`fit="${fit}"`);
    if (position !== "center") props.push(`position="${position}"`);
    if (width !== 300) props.push(`width={${width}}`);
    if (height !== 200) props.push(`height={${height}}`);
    if (radius !== 8) props.push(`radius={${radius}}`);
    if (transparency !== 1) props.push(`transparency={${transparency}}`);
    if (overlayTransparency > 0)
      props.push(`overlayTransparency={${overlayTransparency}}`);
    if (overlayColor !== "#000000")
      props.push(`overlayColor="${overlayColor}"`);
    if (shadow !== "md") props.push(`shadow="${shadow}"`);
    if (blur > 0) props.push(`blur={${blur}}`);
    if (brightness !== 1) props.push(`brightness={${brightness}}`);
    if (contrast !== 1) props.push(`contrast={${contrast}}`);
    if (saturation !== 1) props.push(`saturation={${saturation}}`);
    if (grayscale > 0) props.push(`grayscale={${grayscale}}`);
    if (zoomOnHover) props.push("zoomOnHover");
    if (clickable) props.push("clickable");
    if (!withSkeleton) props.push("withSkeleton={false}");
    if (progressive) props.push("progressive");
    if (overlayOnHover) props.push("overlayOnHover");
    if (showOverlay) props.push("overlay={<div>Overlay Content</div>}");
    if (showCaption) props.push('caption="Beautiful landscape"');

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Image } from '@beeui';

<Image
  src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
  alt="Beautiful landscape"${propsString}
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
    { value: "rounded", label: "Rounded" },
    { value: "circular", label: "Circular" },
    { value: "thumbnail", label: "Thumbnail" },
    { value: "polaroid", label: "Polaroid" },
  ];

  const fitOptions = [
    { value: "cover", label: "Cover" },
    { value: "contain", label: "Contain" },
    { value: "fill", label: "Fill" },
    { value: "none", label: "None" },
    { value: "scale-down", label: "Scale Down" },
  ];

  const positionOptions = [
    { value: "center", label: "Center" },
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "top-left", label: "Top Left" },
    { value: "top-right", label: "Top Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "bottom-right", label: "Bottom Right" },
  ];

  const shadowOptions = [
    { value: "none", label: "None" },
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
    { value: "2xl", label: "2X Large" },
  ];

  const sampleImages = [
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
    "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
    "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
    "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Image</h1>
          <p className="text-gray-600">
            Highly optimized image component with advanced features and effects
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Preview Section */}
              <div className="xl:col-span-2 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <Image
                      src={sampleImages[0]}
                      alt="Beautiful landscape"
                      width={width}
                      height={height}
                      variant={variant as any}
                      size={size as any}
                      fit={fit as any}
                      position={position as any}
                      radius={radius}
                      transparency={transparency}
                      overlayTransparency={overlayTransparency}
                      overlayColor={overlayColor}
                      shadow={shadow === "none" ? false : (shadow as any)}
                      blur={blur}
                      brightness={brightness}
                      contrast={contrast}
                      saturation={saturation}
                      grayscale={grayscale}
                      zoomOnHover={zoomOnHover}
                      clickable={clickable}
                      withSkeleton={withSkeleton}
                      progressive={progressive}
                      overlayOnHover={overlayOnHover}
                      overlay={
                        showOverlay ? (
                          <div className="text-white text-center">
                            <Play className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-lg font-semibold">Play Video</p>
                          </div>
                        ) : undefined
                      }
                      caption={
                        showCaption
                          ? "Beautiful mountain landscape at sunset"
                          : undefined
                      }
                      onClick={() => console.log("Image clicked!")}
                    />
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="xl:col-span-2 order-1 xl:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Controls
                    </h3>
                  </div>

                  <div className="space-y-6 max-h-[600px] overflow-y-auto">
                    {/* Row 1: Variant and Fit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Select
                          data={fitOptions}
                          value={fit}
                          onChange={(value) => setFit(value as string)}
                          label="Object Fit"
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Row 2: Position and Shadow */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Select
                          data={positionOptions}
                          value={position}
                          onChange={(value) => setPosition(value as string)}
                          label="Position"
                          size="sm"
                        />
                      </div>
                      <div>
                        <Select
                          data={shadowOptions}
                          value={shadow}
                          onChange={(value) => setShadow(value as string)}
                          label="Shadow"
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Row 3: Dimensions */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Width: {width}px
                        </label>
                        <input
                          type="range"
                          min="100"
                          max="600"
                          value={width}
                          onChange={(e) => setWidth(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Height: {height}px
                        </label>
                        <input
                          type="range"
                          min="100"
                          max="400"
                          value={height}
                          onChange={(e) => setHeight(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>

                    {/* Row 4: Radius and Transparency */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Radius: {radius}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={radius}
                          onChange={(e) => setRadius(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Transparency: {Math.round(transparency * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={transparency}
                          onChange={(e) =>
                            setTransparency(parseFloat(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>

                    {/* Row 5: Overlay Controls */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Overlay Transparency:{" "}
                          {Math.round(overlayTransparency * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={overlayTransparency}
                          onChange={(e) =>
                            setOverlayTransparency(parseFloat(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div>
                        <ColorPicker
                          value={overlayColor}
                          onChange={setOverlayColor}
                          label="Overlay Color"
                          size="sm"
                          colorGridColumns={6}
                        />
                      </div>
                    </div>

                    {/* Row 6: Filters */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Blur: {blur}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={blur}
                          onChange={(e) => setBlur(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Brightness: {Math.round(brightness * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={brightness}
                          onChange={(e) =>
                            setBrightness(parseFloat(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Contrast: {Math.round(contrast * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={contrast}
                          onChange={(e) =>
                            setContrast(parseFloat(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Saturation: {Math.round(saturation * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={saturation}
                          onChange={(e) =>
                            setSaturation(parseFloat(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Grayscale: {Math.round(grayscale * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={grayscale}
                        onChange={(e) =>
                          setGrayscale(parseFloat(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Row 7: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={zoomOnHover}
                        onChange={setZoomOnHover}
                        label="Zoom on hover"
                        size="sm"
                      />
                      <Checkbox
                        checked={clickable}
                        onChange={setClickable}
                        label="Clickable"
                        size="sm"
                      />
                      <Checkbox
                        checked={withSkeleton}
                        onChange={setWithSkeleton}
                        label="Loading skeleton"
                        size="sm"
                      />
                      <Checkbox
                        checked={progressive}
                        onChange={setProgressive}
                        label="Progressive loading"
                        size="sm"
                      />
                      <Checkbox
                        checked={overlayOnHover}
                        onChange={setOverlayOnHover}
                        label="Overlay on hover"
                        size="sm"
                      />
                      <Checkbox
                        checked={showOverlay}
                        onChange={setShowOverlay}
                        label="Show overlay content"
                        size="sm"
                      />
                      <Checkbox
                        checked={showCaption}
                        onChange={setShowCaption}
                        label="Show caption"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex justify-center">
                <Image
                  src={sampleImages[0]}
                  alt="Default variant"
                  width={200}
                  height={150}
                  variant="default"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Rounded
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex justify-center">
                <Image
                  src={sampleImages[1]}
                  alt="Rounded variant"
                  width={200}
                  height={150}
                  variant="rounded"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Circular
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex justify-center">
                <Image
                  src={sampleImages[2]}
                  alt="Circular variant"
                  width={150}
                  height={150}
                  variant="circular"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Thumbnail
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex justify-center">
                <Image
                  src={sampleImages[3]}
                  alt="Thumbnail variant"
                  width={200}
                  height={150}
                  variant="thumbnail"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Polaroid
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex justify-center">
                <Image
                  src={sampleImages[0]}
                  alt="Polaroid variant"
                  width={200}
                  height={150}
                  variant="polaroid"
                  caption="Vintage Photo"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Image variant="default" src={src} alt="Default" />
<Image variant="rounded" src={src} alt="Rounded" />
<Image variant="circular" src={src} alt="Circular" />
<Image variant="thumbnail" src={src} alt="Thumbnail" />
<Image variant="polaroid" src={src} alt="Polaroid" caption="Vintage Photo" />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Object Fit Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Object Fit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["cover", "contain", "fill", "none", "scale-down"].map(
              (fitType) => (
                <div key={fitType}>
                  <h3 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                    {fitType}
                  </h3>
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <Image
                      src={sampleImages[1]}
                      alt={`${fitType} fit example`}
                      width={250}
                      height={150}
                      fit={fitType as any}
                      variant="rounded"
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Image fit="cover" src={src} alt="Cover fit" />
<Image fit="contain" src={src} alt="Contain fit" />
<Image fit="fill" src={src} alt="Fill fit" />
<Image fit="none" src={src} alt="None fit" />
<Image fit="scale-down" src={src} alt="Scale down fit" />`}
              title="Demo.tsx"
              sectionKey="object-fit"
            />
          </div>
        </section>

        {/* Effects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Effects & Filters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Blur Effect
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <Image
                  src={sampleImages[2]}
                  alt="Blur effect"
                  width={200}
                  height={150}
                  blur={5}
                  variant="rounded"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Grayscale
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <Image
                  src={sampleImages[3]}
                  alt="Grayscale effect"
                  width={200}
                  height={150}
                  grayscale={1}
                  variant="rounded"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                High Contrast
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <Image
                  src={sampleImages[0]}
                  alt="High contrast"
                  width={200}
                  height={150}
                  contrast={1.5}
                  saturation={1.3}
                  variant="rounded"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Image blur={5} src={src} alt="Blur effect" />
<Image grayscale={1} src={src} alt="Grayscale" />
<Image contrast={1.5} saturation={1.3} src={src} alt="High contrast" />`}
              title="Demo.tsx"
              sectionKey="effects"
            />
          </div>
        </section>

        {/* Overlays Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Overlays
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Color Overlay
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <Image
                  src={sampleImages[1]}
                  alt="Color overlay"
                  width={200}
                  height={150}
                  overlayColor="#3B82F6"
                  overlayTransparency={0.3}
                  variant="rounded"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Content Overlay
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <Image
                  src={sampleImages[2]}
                  alt="Content overlay"
                  width={200}
                  height={150}
                  variant="rounded"
                  overlay={
                    <div className="text-white text-center">
                      <Play className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Play</p>
                    </div>
                  }
                  overlayColor="#000000"
                  overlayTransparency={0.4}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Hover Overlay
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <Image
                  src={sampleImages[3]}
                  alt="Hover overlay"
                  width={200}
                  height={150}
                  variant="rounded"
                  overlayOnHover
                  overlay={
                    <div className="text-white text-center">
                      <div className="flex gap-2 justify-center">
                        <Heart className="w-6 h-6" />
                        <Star className="w-6 h-6" />
                        <Download className="w-6 h-6" />
                      </div>
                    </div>
                  }
                  overlayColor="#000000"
                  overlayTransparency={0.6}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Image 
  overlayColor="#3B82F6" 
  overlayTransparency={0.3} 
  src={src} 
  alt="Color overlay" 
/>

<Image 
  overlay={<Play className="w-8 h-8 text-white" />}
  overlayColor="#000000"
  overlayTransparency={0.4}
  src={src} 
  alt="Content overlay" 
/>

<Image 
  overlayOnHover
  overlay={<Heart className="w-6 h-6 text-white" />}
  src={src} 
  alt="Hover overlay" 
/>`}
              title="Demo.tsx"
              sectionKey="overlays"
            />
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Interactive Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Zoom on Hover
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <Image
                  src={sampleImages[0]}
                  alt="Zoom on hover"
                  width={200}
                  height={150}
                  zoomOnHover
                  variant="rounded"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Clickable
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <Image
                  src={sampleImages[1]}
                  alt="Clickable image"
                  width={200}
                  height={150}
                  clickable
                  variant="rounded"
                  onClick={() => alert("Image clicked!")}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                With Caption
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <Image
                  src={sampleImages[2]}
                  alt="Image with caption"
                  width={200}
                  height={150}
                  variant="rounded"
                  caption="Beautiful mountain landscape"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Image zoomOnHover src={src} alt="Zoom on hover" />

<Image 
  clickable 
  onClick={() => alert('Clicked!')} 
  src={src} 
  alt="Clickable" 
/>

<Image 
  caption="Beautiful landscape" 
  src={src} 
  alt="With caption" 
/>`}
              title="Demo.tsx"
              sectionKey="interactive"
            />
          </div>
        </section>

        {/* Performance Features Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Performance Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Lazy Loading
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Image
                  src={sampleImages[3]}
                  alt="Lazy loaded image"
                  width={250}
                  height={180}
                  loading="lazy"
                  withSkeleton
                  variant="rounded"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Progressive Loading
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Image
                  src={sampleImages[0]}
                  alt="Progressive loading"
                  width={250}
                  height={180}
                  progressive
                  placeholderSrc="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?w=50&h=30&q=10"
                  variant="rounded"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Image 
  loading="lazy" 
  withSkeleton 
  src={src} 
  alt="Lazy loaded" 
/>

<Image 
  progressive 
  placeholderSrc={lowQualitySrc}
  src={src} 
  alt="Progressive loading" 
/>`}
              title="Demo.tsx"
              sectionKey="performance"
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
