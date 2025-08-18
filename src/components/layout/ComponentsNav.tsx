"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MousePointer,
  Navigation,
  ChevronRight,
  ChevronDown,
  Type,
  Square,
  ToggleLeft,
  Calendar,
  List,
  Grid3X3,
  FileText,
  Image,
  BarChart3,
  Bell,
  MessageSquare,
  User,
  Settings,
  Shield,
  Zap,
  Layers,
  Package,
  CheckSquare,
} from "lucide-react";
import { cn } from "@bee-ui/core";

const navigationSections = [
  {
    title: "Inputs",
    icon: Type,
    items: [
      "Checkbox",
      "ColorPicker",
      "FileInput",
      "Input",
      "JsonInput",
      "PasswordInput",
      "Radio",
      "SegmentedControl",
      "Select",
      "Slider",
      "Switch",
      "Textarea",
      "TransferList",
    ],
  },
  {
    title: "Buttons",
    icon: MousePointer,
    items: [
      "Button",
    ],
  },
  {
    title: "Navigation",
    icon: Navigation,
    items: [
      "Breadcrumbs",
      "Pagination",
      "TableOfContents"
    ],
  },
  {
    title: "Data display",
    icon: Grid3X3,
    items: [
      "Accordion",
      "Card",
      "Image",
      "Table",
      "Timeline",
    ],
  },
  {
    title: "Feedback",
    icon: Grid3X3,
    items: [
      "Progress",
      "Skeleton",
      "Toaster",
    ],
  },
  {
    title: "Overlay",
    icon: Bell,
    items: [
      "Drawer",
      "Toaster",
    ],
  },
];

export function ComponentsNav() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Inputs",
    "Navigation",
  ]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const getItemHref = (item: string) => {
    // Handle special cases for existing pages
    if (item === "Button") return "/components/button";
    if (item === "Breadcrumbs") return "/components/breadcrumbs";
    if (item === "Pagination") return "/components/pagination";
    if (item === "Select") return "/components/select";
    if (item === "Checkbox") return "/components/checkbox";
    if (item === "Timeline") return "/components/timeline";
    if (item === "JsonInput") return "/components/json-input";
    if (item === "ColorPicker") return "/components/color-picker";
    if (item === "TableOfContents") return "/components/table-of-contents";
    if (item === "TransferList") return "/components/transfer-list";
    if (item === "Toaster") return "/components/toaster";
    if (item === "Skeleton") return "/components/skeleton";
    if (item === "Progress") return "/components/progress-bar";
    if (item === "FileInput") return "/components/file-input";
    if (item === "SegmentedControl") return "/components/segmented-control";
    if (item === "Radio") return "/components/radio";
    if (item === "Switch") return "/components/switch";
    if (item === "Slider") return "/components/slider";
    if (item === "Textarea") return "/components/textarea";
    if (item === "Input") return "/components/input";
    if (item === "PasswordInput") return "/components/password-input";
    if (item === "Image") return "/components/image";
    if (item === "Card") return "/components/card";
    if (item === "Accordion") return "/components/accordion";
    if (item === "Drawer") return "/components/drawer";
    if (item === "Table") return "/components/table";

    // Default conversion for other items
    return `/components/${item
      .toLowerCase()
      .replace(/([A-Z])/g, "-$1")
      .replace(/^-/, "")}`;
  };

  return (
    <nav className="w-72 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-hidden">
      <div className="px-6 py-6 h-full overflow-y-auto scrollbar-hide">
        <div className="space-y-2">
          {navigationSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(section.title);

            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-base">
                      {section.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="ml-8 mt-2 space-y-1">
                    {section.items.map((item) => {
                      const href = getItemHref(item);
                      const isActive = pathname === href;

                      return (
                        <Link
                          key={item}
                          href={href}
                          className={cn(
                            "block px-4 py-2.5 text-sm rounded-lg transition-colors relative",
                            isActive
                              ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500 ml-2 pl-3"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          )}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}
