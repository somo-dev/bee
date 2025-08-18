"use client";

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
  Star,
  Users,
  Clock,
  CheckCircle,
  Sparkles,
  Globe,
  Heart,
  Settings,
  Database,
  FileText,
  Grid,
  BarChart3,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  FileInput,
  Lock,
  Sliders,
  ToggleLeft,
  CreditCard,
  AlertCircle,
  Info,
  HelpCircle,
  Download,
  Play,
  BookOpen,
  GitBranch,
  Package,
  Wrench,
  Zap as Lightning,
  Circle,
  Sidebar,
} from "lucide-react";
import { Button } from "@bee-ui/core";
import { Select } from "@bee-ui/core";
import { SegmentedControl } from "@bee-ui/core";
import { Image } from "@bee-ui/core";
import { JSONInput } from "@bee-ui/core";

const components = [
  {
    name: "Button",
    description:
      "Versatile button component with 5 variants, loading states, icons, and full customization options.",
    icon: MousePointer,
    href: "/components/button",
    color: "from-blue-500 to-blue-600",
    features: ["5 Variants", "Loading States", "Icon Support", "Custom Colors"],
    status: "Stable",
    examples: [
      { name: "Primary", variant: "primary" },
      { name: "Secondary", variant: "secondary" },
      { name: "Outline", variant: "outline" },
    ],
  },
  {
    name: "Input",
    description:
      "Flexible input component with validation, icons, and multiple variants for forms and data entry.",
    icon: Type,
    href: "/components/input",
    color: "from-green-500 to-green-600",
    features: ["Validation", "Icons", "Multiple Variants", "Auto-resize"],
    status: "Stable",
  },
  {
    name: "Select",
    description:
      "Advanced dropdown select with search, multiple selection, grouping, and customizable options.",
    icon: Navigation,
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
    name: "Textarea",
    description:
      "Enhanced textarea with auto-resize, character count, validation, and customizable styling.",
    icon: FileText,
    href: "/components/textarea",
    color: "from-indigo-500 to-indigo-600",
    features: ["Auto-resize", "Character Count", "Validation", "Custom Styling"],
    status: "Stable",
  },
  {
    name: "Checkbox",
    description:
      "Accessible checkbox component with custom styling, groups, and card variants.",
    icon: CheckSquare,
    href: "/components/checkbox",
    color: "from-emerald-500 to-emerald-600",
    features: ["Groups", "Card Variants", "Custom Styling", "Accessible"],
    status: "Stable",
  },
  {
    name: "Radio",
    description:
      "Radio button component with groups, custom styling, and accessibility features.",
    icon: Circle,
    href: "/components/radio",
    color: "from-teal-500 to-teal-600",
    features: ["Groups", "Custom Styling", "Accessible", "Multiple Variants"],
    status: "Stable",
  },
  {
    name: "Switch",
    description:
      "Toggle switch component with smooth animations, custom colors, and accessibility support.",
    icon: ToggleLeft,
    href: "/components/switch",
    color: "from-pink-500 to-pink-600",
    features: ["Smooth Animations", "Custom Colors", "Accessible", "Multiple Sizes"],
    status: "Stable",
  },
  {
    name: "Slider",
    description:
      "Interactive slider component with range support, tooltips, and custom styling.",
    icon: Sliders,
    href: "/components/slider",
    color: "from-orange-500 to-orange-600",
    features: ["Range Support", "Tooltips", "Custom Styling", "Smooth Animations"],
    status: "Stable",
  },
  {
    name: "SegmentedControl",
    description:
      "Linear set of segments with smooth animations, icons, and multiple variants.",
    icon: Grid,
    href: "/components/segmented-control",
    color: "from-cyan-500 to-cyan-600",
    features: ["4 Variants", "Icon Support", "Vertical Layout", "Custom Colors"],
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
    name: "Table",
    description:
      "Feature-rich table component with sorting, pagination, selection, and search capabilities.",
    icon: BarChart3,
    href: "/components/table",
    color: "from-violet-500 to-violet-600",
    features: ["Sorting", "Pagination", "Selection", "Search"],
    status: "Stable",
  },
  {
    name: "Card",
    description:
      "Versatile card component with multiple variants, shadows, and customizable content areas.",
    icon: CreditCard,
    href: "/components/card",
    color: "from-amber-500 to-amber-600",
    features: ["Multiple Variants", "Shadows", "Customizable", "Responsive"],
    status: "Stable",
  },
  {
    name: "Accordion",
    description:
      "Collapsible accordion component with smooth animations and customizable styling.",
    icon: ChevronRight,
    href: "/components/accordion",
    color: "from-lime-500 to-lime-600",
    features: ["Smooth Animations", "Customizable", "Accessible", "Multiple Variants"],
    status: "Stable",
  },
  {
    name: "Breadcrumb",
    description:
      "Navigation breadcrumb component with customizable separators and responsive design.",
    icon: Navigation,
    href: "/components/breadcrumb",
    color: "from-gray-500 to-gray-600",
    features: ["Custom Separators", "Responsive", "Accessible", "Multiple Variants"],
    status: "Stable",
  },
  {
    name: "Image",
    description:
      "Advanced image component with lazy loading, fallbacks, overlays, and optimization features.",
    icon: ImageIcon,
    href: "/components/image",
    color: "from-rose-500 to-rose-600",
    features: ["Lazy Loading", "Fallbacks", "Overlays", "Optimization"],
    status: "Stable",
  },
  {
    name: "FileInput",
    description:
      "File upload component with drag-and-drop, multiple files, validation, and progress tracking.",
    icon: FileInput,
    href: "/components/file-input",
    color: "from-sky-500 to-sky-600",
    features: ["Drag & Drop", "Multiple Files", "Validation", "Progress"],
    status: "Stable",
  },
  {
    name: "ColorPicker",
    description:
      "Color picker component with hex, RGB, and HSL support, presets, and custom themes.",
    icon: Palette,
    href: "/components/color-picker",
    color: "from-fuchsia-500 to-fuchsia-600",
    features: ["Hex/RGB/HSL", "Presets", "Custom Themes", "Accessible"],
    status: "Stable",
  },
  {
    name: "Drawer",
    description:
      "Slide-out drawer component with multiple positions, overlays, and smooth animations.",
    icon: Sidebar,
    href: "/components/drawer",
    color: "from-stone-500 to-stone-600",
    features: ["Multiple Positions", "Overlays", "Smooth Animations", "Responsive"],
    status: "Stable",
  },
  {
    name: "PasswordInput",
    description:
      "Secure password input with visibility toggle, strength indicator, and OTP support.",
    icon: Lock,
    href: "/components/password-input",
    color: "from-red-500 to-red-600",
    features: ["Visibility Toggle", "Strength Indicator", "OTP Support", "Secure"],
    status: "Stable",
  },
  {
    name: "JSONInput",
    description:
      "JSON editor with syntax highlighting, validation, formatting, and error handling.",
    icon: Code,
    href: "/components/json-input",
    color: "from-yellow-500 to-yellow-600",
    features: ["Syntax Highlighting", "Validation", "Formatting", "Error Handling"],
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
    features: ["Jump to Page", "Page Info", "Responsive", "Multiple Variants"],
    status: "Stable",
  },
  {
    name: "ProgressBar",
    description:
      "Progress bar component with multiple variants, animations, and customizable styling.",
    icon: BarChart3,
    href: "/components/progress-bar",
    color: "from-green-500 to-green-600",
    features: ["Multiple Variants", "Animations", "Customizable", "Accessible"],
    status: "Stable",
  },
  {
    name: "Skeleton",
    description:
      "Loading skeleton component with customizable shapes, animations, and responsive design.",
    icon: Eye,
    href: "/components/skeleton",
    color: "from-gray-500 to-gray-600",
    features: ["Customizable Shapes", "Animations", "Responsive", "Multiple Variants"],
    status: "Stable",
  },
  {
    name: "Timeline",
    description:
      "Timeline component with multiple variants, icons, and customizable styling.",
    icon: Clock,
    href: "/components/timeline",
    color: "from-blue-500 to-blue-600",
    features: ["Multiple Variants", "Icons", "Customizable", "Responsive"],
    status: "Stable",
  },
  {
    name: "Toaster",
    description:
      "Toast notification system with multiple positions, types, and customizable styling.",
    icon: MessageSquare,
    href: "/components/toaster",
    color: "from-yellow-500 to-yellow-600",
    features: ["Multiple Positions", "Types", "Customizable", "Auto-dismiss"],
    status: "Stable",
  },
  {
    name: "TransferList",
    description:
      "Transfer list component for moving items between two lists with drag-and-drop support.",
    icon: ArrowRight,
    href: "/components/transfer-list",
    color: "from-purple-500 to-purple-600",
    features: ["Drag & Drop", "Search", "Multiple Selection", "Customizable"],
    status: "Stable",
  },
  {
    name: "TableOfContents",
    description:
      "Table of contents component with smooth scrolling, active highlighting, and nested items.",
    icon: List,
    href: "/components/table-of-contents",
    color: "from-indigo-500 to-indigo-600",
    features: ["Smooth Scrolling", "Active Highlighting", "Nested Items", "Responsive"],
    status: "Stable",
  },
  {
    name: "SegmentedControl",
    description:
      "Linear set of segments, each functioning as a mutually exclusive button with smooth animations.",
    icon: Grid,
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
];

const stats = [
  { label: "Total Components", value: "25+", icon: Code },
  { label: "Variants Available", value: "150+", icon: Zap },
  { label: "Accessibility Score", value: "100%", icon: Shield },
  { label: "Active Downloads", value: "10K+", icon: Download },
  { label: "GitHub Stars", value: "2.5K+", icon: Star },
  { label: "Contributors", value: "50+", icon: Users },
];

const upcomingComponents = [
  "Modal",
  "Tooltip",
  "Popover",
  "Dropdown",
  "Avatar",
  "Badge",
  "Alert",
  "Notification",
  "Calendar",
  "DatePicker",
  "TimePicker",
  "Rating",
  "Carousel",
  "Tabs",
  "Stepper",
  "Wizard",
  "Form",
  "MultiSelect",
  "Autocomplete",
  "Chip",
  "Tag",
  "Divider",
  "Spinner",
  "Loading",
  "Empty",
  "Error",
  "Result",
  "Statistic",
  "Countdown",
  "Progress",
  "Steps",
  "Tree",
  "Cascader",
  "Transfer",
  "Upload",
  "Editor",
  "Markdown",
  "Code",
  "Terminal",
  "Console",
];

const features = [
  {
    icon: Sparkles,
    title: "Modern Design",
    description: "Built with modern design principles and beautiful aesthetics"
  },
  {
    icon: Shield,
    title: "Accessible",
    description: "WCAG 2.1 compliant components with full keyboard navigation"
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Optimized for speed with minimal bundle size and efficient rendering"
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Highly customizable with theming support and CSS variables"
  },
  {
    icon: Code,
    title: "TypeScript",
    description: "Full TypeScript support with comprehensive type definitions"
  },
  {
    icon: GitBranch,
    title: "Open Source",
    description: "MIT licensed and open source with active community support"
  }
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Image
                  src="/images/bee.png"
                  alt="BUI Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl mb-8">
              Build Beautiful UIs
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Faster
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              BUI is a modern, accessible, and customizable React component library. 
              Build production-ready applications with our comprehensive collection of 
              beautifully designed components.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
              <Button size="md" className="px-6 py-2">
                <Play className="w-4 h-4 mr-2" />
                Get Started
              </Button>
              <Button variant="outline" size="md" className="px-6 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                View Documentation
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose BUI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern web standards and designed for developer experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Component Library
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our collection of accessible, customizable, and production-ready React components. 
              Each component comes with extensive documentation and interactive playground.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {components.map((component) => {
              const Icon = component.icon;

              return (
                <div
                  key={component.name}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
                >
                  {/* Component Header */}
                  <div
                    className={`h-32 lg:h-40 bg-gradient-to-br ${component.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <Icon className="w-12 h-12 lg:w-16 lg:h-16 text-white relative z-10" />
                    <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
                      <span className="px-2 lg:px-3 py-1 bg-white bg-opacity-25 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white border-opacity-30">
                        {component.status}
                      </span>
                    </div>
                  </div>

                  {/* Component Content */}
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                        {component.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4 lg:mb-6 text-sm leading-relaxed">
                      {component.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4 lg:mb-6">
                      <div className="flex flex-wrap gap-1.5 lg:gap-2">
                        {component.features.slice(0, 2).map((feature) => (
                          <span
                            key={feature}
                            className="px-2.5 lg:px-3 py-1 lg:py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100"
                          >
                            {feature}
                          </span>
                        ))}
                        {component.features.length > 2 && (
                          <span className="px-2.5 lg:px-3 py-1 lg:py-1.5 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100">
                            +{component.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Examples */}
                    {component.examples && (
                      <div className="mb-4 lg:mb-6 space-y-2 lg:space-y-3">
                        {component.examples.slice(0, 1).map((example) => (
                          <Button
                            key={example.name}
                            variant={example.variant as any}
                            size="sm"
                            fullWidth
                            className="text-sm font-medium"
                          >
                            {example.name}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Custom Content */}
                    {component.content && (
                      <div className="mb-4 lg:mb-6 bg-gray-50 rounded-lg p-3 lg:p-4">
                        {component.content}
                      </div>
                    )}

                    {/* Action Button */}
                    <Link href={component.href}>
                      <Button
                        variant="outline"
                        size="sm"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        fullWidth
                        className="group-hover:border-blue-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-200 font-medium"
                      >
                        Explore Component
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
              <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                {upcomingComponents.map((component) => (
                  <span
                    key={component}
                    className="px-3 py-2 bg-white text-gray-600 font-medium rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
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
