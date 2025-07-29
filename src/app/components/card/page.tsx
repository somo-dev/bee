"use client";

import React, { useState } from "react";
import { Card } from "@/lib/components/Card";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { ColorPicker } from "@/lib/components/ColorPicker";
import {
  Copy,
  Check,
  Settings,
  Heart,
  Star,
  Share2,
  Bookmark,
  Play,
  Download,
  Eye,
  MessageCircle,
  ThumbsUp,
  Calendar,
  MapPin,
  Clock,
  User,
  Mail,
  Phone,
  Globe,
  Camera,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Package,
  ShoppingCart,
  CreditCard,
  Award,
  Zap,
  Shield,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";

export default function CardPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [shadow, setShadow] = useState("md");
  const [interactive, setInteractive] = useState(true);
  const [clickable, setClickable] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [withDividers, setWithDividers] = useState(false);
  const [withLoadingOverlay, setWithLoadingOverlay] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [showBadges, setShowBadges] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [borderColor, setBorderColor] = useState("#E5E7EB");
  const [radius, setRadius] = useState(8);
  const [animationDuration, setAnimationDuration] = useState(200);

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
    if (variant !== "default") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (shadow !== "md") props.push(`shadow="${shadow}"`);
    if (!interactive) props.push("interactive={false}");
    if (clickable) props.push("clickable");
    if (disabled) props.push("disabled");
    if (loading) props.push("loading");
    if (withDividers) props.push("withDividers");
    if (withLoadingOverlay) props.push("withLoadingOverlay");
    if (backgroundColor !== "#FFFFFF")
      props.push(`backgroundColor="${backgroundColor}"`);
    if (borderColor !== "#E5E7EB") props.push(`borderColor="${borderColor}"`);
    if (radius !== 8) props.push(`radius={${radius}}`);
    if (animationDuration !== 200)
      props.push(`animationDuration={${animationDuration}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Card } from '@beeui';

<Card
  title="Norway Fjord Adventures"
  subtitle="Explore magical landscapes"
  description="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway"
  image={{
    src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
    alt: "Norway Fjords",
    height: 200
  }}
  badges={[
    { text: "ON SALE", color: "#EF4444", position: "top-right" }
  ]}
  actions={[
    { 
      label: "Book classic tour now", 
      variant: "primary",
      icon: <Calendar />
    }
  ]}${propsString}
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
    { value: "elevated", label: "Elevated" },
    { value: "outlined", label: "Outlined" },
    { value: "filled", label: "Filled" },
    { value: "glass", label: "Glass" },
    { value: "gradient", label: "Gradient" },
  ];

  const shadowOptions = [
    { value: "none", label: "None" },
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
    { value: "2xl", label: "2X Large" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Card</h1>
          <p className="text-gray-600">
            Highly optimized card component with advanced features, animations,
            and customizable sections
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Preview Section */}
              <div className="xl:col-span-2 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex items-center justify-center h-full min-h-[500px]">
                    <Card
                      variant={variant as any}
                      size={size as any}
                      shadow={shadow as any}
                      interactive={interactive}
                      clickable={clickable}
                      disabled={disabled}
                      loading={loading}
                      withDividers={withDividers}
                      withLoadingOverlay={withLoadingOverlay}
                      backgroundColor={backgroundColor}
                      borderColor={borderColor}
                      radius={radius}
                      animationDuration={animationDuration}
                      title="Norway Fjord Adventures"
                      subtitle="Explore magical landscapes"
                      description="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway"
                      icon={<MapPin />}
                      image={
                        showImage
                          ? {
                              src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
                              alt: "Norway Fjords",
                              height: 200,
                              position: "top",
                            }
                          : undefined
                      }
                      badges={
                        showBadges
                          ? [
                              {
                                text: "ON SALE",
                                color: "#EF4444",
                                position: "top-right",
                              },
                            ]
                          : []
                      }
                      actions={
                        showActions
                          ? [
                              {
                                label: "Book classic tour now",
                                variant: "primary",
                                icon: <Calendar />,
                                onClick: () =>
                                  console.log("Book tour clicked!"),
                              },
                              {
                                label: "Learn more",
                                variant: "outline",
                                icon: <Eye />,
                                onClick: () =>
                                  console.log("Learn more clicked!"),
                              },
                            ]
                          : []
                      }
                      onClick={
                        clickable
                          ? () => console.log("Card clicked!")
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 xl:order-2">
                <div className="bg-white rounded-xl border border-gray-200 pl-4 pt-6 pb-4 pr-2 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Controls
                    </h3>
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
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
                      <div className="pr-2">
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

                    {/* Row 3: Shadow */}
                    <div>
                      <Select
                        data={shadowOptions}
                        value={shadow}
                        onChange={(value) => setShadow(value as string)}
                        label="Shadow"
                        size="sm"
                      />
                    </div>

                    {/* Row 4: Styling */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Radius: {radius}px
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="0"
                            max="24"
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
                          Animation: {animationDuration}ms
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="100"
                            max="500"
                            step="50"
                            value={animationDuration}
                            onChange={(e) =>
                              setAnimationDuration(parseInt(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Colors */}
                    <div className="space-y-4">
                      <ColorPicker
                        value={backgroundColor}
                        onChange={setBackgroundColor}
                        label="Background Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                      <ColorPicker
                        value={borderColor}
                        onChange={setBorderColor}
                        label="Border Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                    </div>

                    {/* Row 6: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={interactive}
                        onChange={setInteractive}
                        label="Interactive"
                        size="sm"
                      />
                      <Checkbox
                        checked={clickable}
                        onChange={setClickable}
                        label="Clickable"
                        size="sm"
                      />
                      <Checkbox
                        checked={disabled}
                        onChange={setDisabled}
                        label="Disabled"
                        size="sm"
                      />
                      <Checkbox
                        checked={loading}
                        onChange={setLoading}
                        label="Loading"
                        size="sm"
                      />
                      <Checkbox
                        checked={withDividers}
                        onChange={setWithDividers}
                        label="With dividers"
                        size="sm"
                      />
                      <Checkbox
                        checked={withLoadingOverlay}
                        onChange={setWithLoadingOverlay}
                        label="Loading overlay"
                        size="sm"
                      />
                      <Checkbox
                        checked={showImage}
                        onChange={setShowImage}
                        label="Show image"
                        size="sm"
                      />
                      <Checkbox
                        checked={showBadges}
                        onChange={setShowBadges}
                        label="Show badges"
                        size="sm"
                      />
                      <Checkbox
                        checked={showActions}
                        onChange={setShowActions}
                        label="Show actions"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              variant="default"
              title="Default Card"
              description="Clean and simple card with subtle border"
              actions={[
                { label: "Action", variant: "primary", onClick: () => {} },
              ]}
            />

            <Card
              variant="elevated"
              title="Elevated Card"
              description="Card with shadow and hover effects"
              interactive
              actions={[
                { label: "Action", variant: "primary", onClick: () => {} },
              ]}
            />

            <Card
              variant="outlined"
              title="Outlined Card"
              description="Card with prominent border styling"
              actions={[
                { label: "Action", variant: "primary", onClick: () => {} },
              ]}
            />

            <Card
              variant="filled"
              title="Filled Card"
              description="Card with filled background color"
              actions={[
                { label: "Action", variant: "primary", onClick: () => {} },
              ]}
            />

            <Card
              variant="glass"
              title="Glass Card"
              description="Modern glassmorphism effect"
              actions={[
                { label: "Action", variant: "primary", onClick: () => {} },
              ]}
            />

            <Card
              variant="gradient"
              title="Gradient Card"
              description="Beautiful gradient background"
              actions={[
                { label: "Action", variant: "secondary", onClick: () => {} },
              ]}
            />
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Card variant="default" title="Default Card" />
<Card variant="elevated" title="Elevated Card" interactive />
<Card variant="outlined" title="Outlined Card" />
<Card variant="filled" title="Filled Card" />
<Card variant="glass" title="Glass Card" />
<Card variant="gradient" title="Gradient Card" />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Complex Examples Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Complex Examples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Travel Card (like your image) */}
            <Card
              variant="elevated"
              size="lg"
              interactive
              image={{
                src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
                alt: "Norway Fjords",
                height: 200,
                position: "top",
              }}
              badges={[
                { text: "ON SALE", color: "#EF4444", position: "top-right" },
              ]}
              title="Norway Fjord Adventures"
              description="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway"
              actions={[
                {
                  label: "Book classic tour now",
                  variant: "primary",
                  icon: <Calendar />,
                  onClick: () => console.log("Book tour!"),
                },
              ]}
            />

            {/* Gallery Card (like your second image) */}
            <Card
              variant="default"
              size="lg"
              title="Review pictures"
              header={
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              }
              description="200+ images uploaded since last visit, review them to select which one should be added to your gallery"
              image={{
                src: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
                alt: "Gallery",
                height: 180,
                position: "top",
              }}
              footer={
                <div className="grid grid-cols-3 gap-2">
                  <img
                    src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"
                    alt="Thumb 1"
                    className="w-full h-16 object-cover rounded"
                  />
                  <img
                    src="https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg"
                    alt="Thumb 2"
                    className="w-full h-16 object-cover rounded"
                  />
                  <img
                    src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg"
                    alt="Thumb 3"
                    className="w-full h-16 object-cover rounded"
                  />
                </div>
              }
            />
          </div>

          <div className="mt-6">
            <CodeSection
              code={`// Travel Card Example
<Card
  variant="elevated"
  interactive
  image={{
    src: "norway-fjords.jpg",
    alt: "Norway Fjords",
    height: 200,
    position: 'top'
  }}
  badges={[
    { text: "ON SALE", color: "#EF4444", position: "top-right" }
  ]}
  title="Norway Fjord Adventures"
  description="Explore magical fjord landscapes..."
  actions={[
    { 
      label: "Book classic tour now", 
      variant: "primary",
      icon: <Calendar />
    }
  ]}
/>

// Gallery Card Example
<Card
  title="Review pictures"
  header={<MoreButton />}
  description="200+ images uploaded since last visit..."
  image={{ src: "gallery.jpg", height: 180 }}
  footer={<ThumbnailGrid />}
/>`}
              title="Demo.tsx"
              sectionKey="complex-examples"
            />
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Interactive Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              variant="elevated"
              interactive
              clickable
              title="Clickable Card"
              description="This entire card is clickable with hover effects"
              icon={<Zap />}
              onClick={() => alert("Card clicked!")}
            />

            <Card
              variant="default"
              title="Action Card"
              description="Card with multiple action buttons"
              actions={[
                {
                  label: "Like",
                  variant: "ghost",
                  icon: <ThumbsUp />,
                  onClick: () => {},
                },
                {
                  label: "Share",
                  variant: "ghost",
                  icon: <Share2 />,
                  onClick: () => {},
                },
                {
                  label: "Save",
                  variant: "primary",
                  icon: <Bookmark />,
                  onClick: () => {},
                },
              ]}
            />

            <Card
              variant="glass"
              title="Loading Card"
              description="Card with loading overlay"
              loading={true}
              withLoadingOverlay
              actions={[
                {
                  label: "Loading...",
                  variant: "primary",
                  loading: true,
                  onClick: () => {},
                },
              ]}
            />
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Card clickable interactive onClick={() => alert('Clicked!')} />
<Card actions={[
  { label: "Like", icon: <ThumbsUp />, onClick: handleLike },
  { label: "Share", icon: <Share2 />, onClick: handleShare }
]} />
<Card loading withLoadingOverlay />`}
              title="Demo.tsx"
              sectionKey="interactive"
            />
          </div>
        </section>

        {/* Advanced Styling Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Advanced Styling
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card
              variant="gradient"
              gradientColors={["#667eea", "#764ba2"]}
              title="Custom Gradient"
              description="Card with custom gradient colors"
              icon={<Sparkles />}
              actions={[
                { label: "Explore", variant: "secondary", onClick: () => {} },
              ]}
            />

            <Card
              variant="outlined"
              backgroundColor="#FEF3C7"
              borderColor="#F59E0B"
              title="Custom Colors"
              description="Card with custom background and border colors"
              icon={<Award />}
              badges={[
                { text: "PREMIUM", color: "#F59E0B", position: "top-right" },
              ]}
              actions={[
                { label: "Upgrade", variant: "primary", onClick: () => {} },
              ]}
            />
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Card 
  variant="gradient" 
  gradientColors={['#667eea', '#764ba2']}
  title="Custom Gradient"
/>

<Card 
  backgroundColor="#FEF3C7" 
  borderColor="#F59E0B"
  title="Custom Colors"
/>`}
              title="Demo.tsx"
              sectionKey="advanced-styling"
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
