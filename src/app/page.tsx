import React from "react";
import Link from "next/link";
import {
  Zap,
  Palette,
  Moon,
  Shield,
  Code,
  Smartphone,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
} from "lucide-react";
import { Button } from "@/lib/components/Button";

const features = [
  {
    icon: Zap,
    title: "Performance Optimized",
    description:
      "Our components are built with performance in mind, ensuring your application stays fast and responsive.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Palette,
    title: "AI-Powered Customization",
    description:
      "Let our AI suggest the best component variations based on your specific needs and use cases.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Moon,
    title: "Dark Mode Support",
    description:
      "All components come with built-in dark mode support, making theme switching seamless.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Shield,
    title: "Accessibility First",
    description:
      "Our components follow WCAG guidelines, ensuring your applications are accessible to everyone.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Code,
    title: "Framework Agnostic",
    description:
      "Use our components with React, Vue, Angular, or any other framework of your choice.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: Smartphone,
    title: "Responsive by Default",
    description:
      "All components are designed to work flawlessly across all device sizes and orientations.",
    color: "bg-orange-100 text-orange-600",
  },
];

const componentCategories = [
  {
    title: "Buttons",
    description: "View Documentation →",
    components: [
      { name: "Primary", variant: "primary" },
      { name: "Secondary", variant: "secondary" },
      { name: "Accent", variant: "outline" },
      { name: "Default", variant: "ghost" },
      { name: "Danger", variant: "danger" },
    ],
  },
  {
    title: "Cards",
    description: "View Documentation →",
    content: (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Basic Card</h4>
          <p className="text-sm text-gray-600">
            A simple card with title and content.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-1">Card with Image</h4>
            <p className="text-sm text-gray-600">
              Card with image and content.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Form Elements",
    description: "View Documentation →",
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Input
          </label>
          <input
            type="text"
            placeholder="Enter text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>
      </div>
    ),
  },
  {
    title: "Alerts",
    description: "View Documentation →",
    content: (
      <div className="space-y-3">
        <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
          <span className="text-sm text-green-800">Success alert message</span>
        </div>
        <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-sm text-blue-800">Info alert message</span>
        </div>
        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
          <XCircle className="w-4 h-4 text-red-600 mr-2" />
          <span className="text-sm text-red-800">Error alert message</span>
        </div>
      </div>
    ),
  },
  {
    title: "Navigation",
    description: "View Documentation →",
    content: (
      <div className="space-y-4">
        <div className="flex border-b border-gray-200">
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
            Tab 1
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Tab 2
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Tab 3
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
            <span className="text-sm font-medium text-indigo-900">
              Segment 1
            </span>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <span className="text-sm text-gray-700">Segment 2</span>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <span className="text-sm text-gray-700">Segment 3</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Data Display",
    description: "View Documentation →",
    content: (
      <div className="space-y-4">
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-3 py-2 text-sm text-gray-900">John Doe</td>
                <td className="px-3 py-2 text-sm text-gray-600">
                  john@example.com
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-sm text-gray-900">Jane Smith</td>
                <td className="px-3 py-2 text-sm text-gray-600">
                  jane@example.com
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section - Exact height for 15" laptop screen */}
      <div className="relative isolate px-6 lg:px-8 h-screen flex items-center">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Build beautiful UIs faster with our AI-powered library
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Streamline your development workflow with our optimized UI
                components. Install, copy, deploy — it's that simple.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button
                  size="lg"
                  className="bg-[#6366F1] hover:bg-[#5855EB] border-[#6366F1] hover:border-[#5855EB] focus:ring-[#6366F1]"
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white focus:ring-[#6366F1]"
                >
                  View Documentation
                </Button>
              </div>
            </div>

            {/* Code Example */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#6366F1] to-purple-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-gray-900 rounded-lg p-6 text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-xs">
                    Example Component
                  </span>
                </div>
                <div className="font-mono text-gray-300">
                  <div className="text-blue-400">import</div>
                  <div className="ml-2 text-gray-300">{"{ Button, Card }"}</div>
                  <div className="ml-2 text-blue-400">from</div>
                  <div className="ml-2 text-green-400">'@flow/ui';</div>
                  <br />
                  <div className="text-purple-400">function</div>
                  <div className="ml-2 text-yellow-400">MyComponent</div>
                  <div className="text-gray-300">
                    () {"{"}
                    <div className="ml-4 text-blue-400">return</div>
                    <div className="ml-4 text-gray-300">{"("}</div>
                    <div className="ml-6 text-red-400">{"<Card>"}</div>
                    <div className="ml-8 text-red-400">{"<Button"}</div>
                    <div className="ml-10 text-green-400">variant=</div>
                    <div className="text-yellow-400">"primary"</div>
                    <div className="ml-8 text-red-400">{">"}</div>
                    <div className="ml-10 text-gray-300">Click me</div>
                    <div className="ml-8 text-red-400">{"</Button>"}</div>
                    <div className="ml-6 text-red-400">{"</Card>"}</div>
                    <div className="ml-4 text-gray-300">{")"}</div>
                    <div className="text-gray-300">{"}"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Supercharge Your UI Development
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our library offers a comprehensive set of tools to make your UI
              development journey smooth and efficient.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <div className={`feature-icon ${feature.color}`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>

      {/* Components Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Our Component Library
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Browse through our extensive collection of UI components designed
              to make your development process faster and more efficient.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {componentCategories.map((category, index) => (
              <div key={category.title} className="component-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.title}
                  </h3>
                  <Link
                    href="/components"
                    className="text-sm text-[#6366F1] hover:text-[#5855EB] font-medium"
                  >
                    Docs
                  </Link>
                </div>

                <div className="min-h-[200px] flex items-center justify-center">
                  {category.components ? (
                    <div className="w-full space-y-2">
                      {category.components.map((comp) => (
                        <Button
                          key={comp.name}
                          variant={comp.variant as any}
                          size="sm"
                          fullWidth
                          className={
                            comp.variant === "primary"
                              ? "bg-[#6366F1] hover:bg-[#5855EB] border-[#6366F1] hover:border-[#5855EB] focus:ring-[#6366F1]"
                              : ""
                          }
                        >
                          {comp.name}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    category.content
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href="/components"
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
                  >
                    {category.description}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/components">
              <Button
                size="lg"
                rightIcon={<ArrowRight />}
                className="bg-[#6366F1] hover:bg-[#5855EB] border-[#6366F1] hover:border-[#5855EB] focus:ring-[#6366F1]"
              >
                View All Components
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-bg">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your UI development?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of developers who are building beautiful interfaces
              with our library.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="secondary" size="lg">
                Get Started Free
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-[#6366F1]"
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
