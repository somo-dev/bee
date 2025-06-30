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
} from "lucide-react";
import { Button } from "@/lib/components/Button";
import Image from "next/image";

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
    name: "Pagination",
    description:
      "Advanced pagination component with jump-to-page functionality and responsive design.",
    icon: ChevronRight,
    href: "/components/pagination",
    color: "from-purple-500 to-purple-600",
    features: ["4 Variants", "Jump to Page", "Page Info", "Responsive"],
    status: "Stable",
  },
];

const stats = [
  { label: "Total Components", value: "3", icon: Code },
  { label: "Variants Available", value: "13", icon: Zap },
  { label: "Accessibility Score", value: "100%", icon: Shield },
];

const upcomingComponents = [
  "Input",
  "Select",
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
