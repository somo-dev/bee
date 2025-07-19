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
import { cn } from "@/lib/utils/cn";

const navigationSections = [
  {
    title: "Inputs",
    icon: Type,
    items: [
      "Autocomplete",
      "Checkbox",
      "Chip",
      "ColorInput",
      "ColorPicker",
      "FileInput",
      "Input",
      "JsonInput",
      "MultiSelect",
      "NativeSelect",
      "NumberInput",
      "PasswordInput",
      "PinInput",
      "Radio",
      "Rating",
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
      "ActionIcon",
      "Button",
      "CloseButton",
      "CopyButton",
      "FileButton",
      "UnstyledButton",
    ],
  },
  {
    title: "Navigation",
    icon: Navigation,
    items: [
      "Anchor",
      "Breadcrumbs",
      "Burger",
      "NavLink",
      "Pagination",
      "Stepper",
      "Tabs",
      "TableOfContents"
    ],
  },
  {
    title: "Data display",
    icon: Grid3X3,
    items: [
      "Accordion",
      "Avatar",
      "Badge",
      "Card",
      "ColorSwatch",
      "Image",
      "Indicator",
      "Kbd",
      "List",
      "Table",
      "Timeline",
    ],
  },
  {
    title: "Feedback",
    icon: Grid3X3,
    items: [
      "Alert",
      "Loader",
      "Notification",
      "Progress",
      "RingProgress",
      "Skeleton",
    ],
  },
  {
    title: "Overlay",
    icon: Bell,
    items: [
      "Affix",
      "Dialog",
      "Drawer",
      "HoverCard",
      "LoadingOverlay",
      "Menu",
      "Modal",
      "Overlay",
      "Popover",
      "Tooltip",
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
