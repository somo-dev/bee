import React from "react";
import Link from "next/link";
import {
  MousePointer,
  Navigation,
  ChevronRight,
  ArrowRight,
  Zap,
  Shield,
  Code,
  Layers,
  Palette,
  Smartphone,
  Type,
  Camera,
  CheckSquare,
  ChevronLeft,
  Eye,
  List,
} from "lucide-react";
import { Button } from "@/lib/components/Button";
import { Select } from "@/lib/components/Select";
import { SegmentedControl } from "@/lib/components/SegmentedControl";
import { Image } from "@/lib/components/Image";
import { JSONInput } from "@/lib/components/JSONInput";

const components = [
  {
    name: "Button",
    description:
      "Interactive button component with multiple variants, sizes, loading states, and icon support.",
    icon: MousePointer,
    href: "/components/button",
    color: "from-blue-500 to-blue-600",
    features: ["5 Variants", "Loading States", "Icon Support", "Full Width"],
    status: "Stable",
    examples: [
      { name: "Primary", variant: "primary" },
      { name: "Secondary", variant: "secondary" },
      { name: "Outline", variant: "outline" },
    ],
  },
  {
    name: "Select",
    description:
      "Dropdown select component with search, multiple selection, grouping, and customizable options.",
    icon: Type,
    href: "/components/select",
    color: "from-purple-500 to-purple-600",
    features: ["Searchable", "Multiple Selection", "Grouping", "Icons"],
    status: "Stable",
    content: (
      <div className="space-y-2">
        <Select
          data={["React", "Vue", "Angular"]}
          placeholder="Choose framework"
          size="sm"
        />
        <Select
          data={[
            { value: "js", label: "JavaScript" },
            { value: "ts", label: "TypeScript" },
          ]}
          placeholder="Choose language"
          size="sm"
        />
      </div>
    ),
  },
  {
    name: "SegmentedControl",
    description:
      "Linear set of segments, each functioning as a mutually exclusive button with smooth animations.",
    icon: Type,
    href: "/components/segmented-control",
    color: "from-cyan-500 to-cyan-600",
    features: [
      "4 Variants",
      "Icon Support",
      "Vertical Layout",
      "Custom Colors",
    ],
    status: "Stable",
    content: (
      <div className="space-y-4">
        <SegmentedControl
          data={["React", "Vue", "Angular"]}
          value="React"
          onChange={() => {}}
          size="sm"
        />
        <SegmentedControl
          data={["Mobile", "Desktop"]}
          value="Mobile"
          onChange={() => {}}
          variant="pills"
          size="sm"
        />
      </div>
    ),
  },
  {
    name: "Breadcrumbs",
    description:
      "Navigation breadcrumb component with customizable separators, icons, and collapsible items.",
    icon: Navigation,
    href: "/components/breadcrumbs",
    color: "from-green-500 to-green-600",
    features: [
      "4 Variants",
      "Custom Separators",
      "Icon Support",
      "Collapsible",
    ],
    status: "Stable",
  },
  {
    name: "Checkbox",
    description:
      "Capture boolean input from user with optional indeterminate state and custom styling.",
    icon: CheckSquare,
    href: "/components/checkbox",
    color: "from-indigo-500 to-indigo-600",
    features: ["3 Variants", "Custom Icons", "Indeterminate", "Group Support"],
    status: "Stable",
  },
  {
    name: "Image",
    description:
      "Highly optimized image component with advanced effects, overlays, filters, and performance features.",
    icon: Camera,
    href: "/components/image",
    color: "from-pink-500 to-pink-600",
    features: ["5 Variants", "Advanced Filters", "Overlays", "Lazy Loading"],
    status: "Stable",
    content: (
      <div className="space-y-3">
        <Image
          src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
          alt="Sample image"
          width={180}
          height={120}
          variant="rounded"
          radius={8}
        />
        <div className="flex gap-2">
          <Image
            src="https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg"
            alt="Circular"
            width={40}
            height={40}
            variant="circular"
          />
          <Image
            src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"
            alt="Thumbnail"
            width={40}
            height={40}
            variant="thumbnail"
          />
          <Image
            src="https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg"
            alt="Grayscale"
            width={40}
            height={40}
            variant="rounded"
            grayscale={1}
          />
        </div>
      </div>
    ),
  },
  {
    name: "JSONInput",
    description:
      "Advanced JSON editor with VS Code-like features, syntax highlighting, validation, and keyboard shortcuts.",
    icon: Code,
    href: "/components/json-input",
    color: "from-emerald-500 to-emerald-600",
    features: [
      "Syntax Highlighting",
      "Real-time Validation",
      "Auto-formatting",
      "Keyboard Shortcuts",
    ],
    status: "Stable",
    content: (
      <div className="space-y-3">
        <JSONInput
          value='{\n  "name": "Demo",\n  "active": true\n}'
          onChange={() => {}}
          height={120}
          showLineNumbers={false}
          showValidationStatus={false}
          size="sm"
        />
      </div>
    ),
  },
  {
    name: "PasswordInput",
    description:
      "Secure password input with visibility toggle, strength meter, and OTP support for authentication.",
    icon: Shield,
    href: "/components/password-input",
    color: "from-red-500 to-red-600",
    features: [
      "Show/Hide Toggle",
      "Strength Meter",
      "OTP Support",
      "3 Variants",
    ],
    status: "Stable",
    content: (
      <div className="space-y-4">
        <div className="relative">
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-8 h-8 border-2 border-gray-300 rounded text-center text-sm flex items-center justify-center font-mono"
            >
              {i <= 3 ? "•" : ""}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "TransferList",
    description:
      "Move items between two lists with search, sort, drag-and-drop, and multi-selection capabilities.",
    icon: List,
    href: "/components/transfer-list",
    color: "from-teal-500 to-teal-600",
    features: ["Drag & Drop", "Search & Filter", "Multi-Select", "Grouping"],
    status: "Stable",
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 border border-gray-200 rounded p-2">
            <div className="text-xs font-medium text-gray-600 mb-2">
              Available
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-1 bg-white rounded text-xs">
                <div className="w-2 h-2 bg-blue-500 rounded"></div>
                React
              </div>
              <div className="flex items-center gap-2 p-1 bg-white rounded text-xs">
                <div className="w-2 h-2 bg-green-500 rounded"></div>
                Vue.js
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded p-2">
            <div className="text-xs font-medium text-gray-600 mb-2">
              Selected
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-1 bg-blue-50 border border-blue-200 rounded text-xs">
                <div className="w-2 h-2 bg-purple-500 rounded"></div>
                Angular
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              <ChevronRight className="w-3 h-3 text-blue-600" />
            </div>
            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              <ChevronLeft className="w-3 h-3 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Pagination",
    description:
      "Advanced pagination component with jump-to-page functionality and responsive design.",
    icon: ChevronRight,
    href: "/components/pagination",
    color: "from-orange-500 to-orange-600",
    features: ["4 Variants", "Jump to Page", "Page Info", "Responsive"],
    status: "Stable",
  },
];

const stats = [
  { label: "Total Components", value: "4", icon: Code },
  { label: "Variants Available", value: "16", icon: Zap },
  { label: "Accessibility Score", value: "100%", icon: Shield },
];

const upcomingComponents = [
  "Input",
  "Textarea",
  "Modal",
  "Tooltip",
  "Card",
  "Table",
  "Tabs",
  "Accordion",
  "Dropdown",
  "Avatar",
];

export default function ComponentsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Image
                  src="/bee.png"
                  alt="Bee UI Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Component Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Explore our collection of accessible, customizable, and
              production-ready React components. Each component comes with
              extensive documentation and interactive playground.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((component) => {
            const Icon = component.icon;

            return (
              <div
                key={component.name}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
              >
                {/* Component Header */}
                <div
                  className={`h-40 bg-gradient-to-br ${component.color} flex items-center justify-center relative`}
                >
                  <Icon className="w-16 h-16 text-white" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs font-medium rounded-full">
                      {component.status}
                    </span>
                  </div>
                </div>

                {/* Component Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {component.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {component.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {component.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  {component.examples && (
                    <div className="mb-6 space-y-2">
                      {component.examples.map((example) => (
                        <Button
                          key={example.name}
                          variant={example.variant as any}
                          size="sm"
                          fullWidth
                        >
                          {example.name}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Custom Content */}
                  {component.content && (
                    <div className="mb-6">{component.content}</div>
                  )}

                  {/* Action Button */}
                  <Link href={component.href}>
                    <Button
                      variant="outline"
                      rightIcon={<ArrowRight />}
                      fullWidth
                      className="group-hover:border-blue-500 group-hover:text-blue-600 transition-colors"
                    >
                      Explore Component
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More Components Coming Soon
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're actively working on expanding our component library. Stay
              tuned for more exciting components!
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-dashed border-gray-200 p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Code className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Under Development
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                These components are currently in development and will be
                available soon.
              </p>
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                {upcomingComponents.map((component) => (
                  <span
                    key={component}
                    className="px-4 py-2 bg-white text-gray-600 font-medium rounded-lg shadow-sm border border-gray-100"
                  >
                    {component}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
