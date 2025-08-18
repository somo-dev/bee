"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { Button } from "@/lib/components/Button";

interface InstallationSectionProps {
  componentName: string;
  className?: string;
}

const packageManagers = [
  { name: "pnpm", command: "pnpm dlx" },
  { name: "npm", command: "npx" },
  { name: "yarn", command: "yarn dlx" },
];

// Component name mapping for CLI commands
const componentNameMap: Record<string, string> = {
  Button: "button",
  Input: "input",
  Card: "card",
  Select: "select",
  Checkbox: "checkbox",
  Radio: "radio",
  Switch: "switch",
  Slider: "slider",
  Textarea: "textarea",
  Image: "image",
  Table: "table",
  Pagination: "pagination",
  Breadcrumbs: "breadcrumbs",
  Accordion: "accordion",
  Timeline: "timeline",
  Drawer: "drawer",
  Toaster: "toaster",
  TransferList: "transferlist",
  TableOfContents: "tableofcontents",
  SegmentedControl: "segmentedcontrol",
  ColorPicker: "colorpicker",
  FileInput: "fileinput",
  JSONInput: "jsoninput",
  PasswordInput: "passwordinput",
  ProgressBar: "progressbar",
  Skeleton: "skeleton",
};

export const InstallationSection: React.FC<InstallationSectionProps> = ({
  componentName,
  className = "",
}) => {
  const [selectedPackageManager, setSelectedPackageManager] = useState("pnpm");
  const [copied, setCopied] = useState(false);

  const getInstallCommand = () => {
    const pm = packageManagers.find((pm) => pm.name === selectedPackageManager);
    const cliComponentName =
      componentNameMap[componentName] || componentName.toLowerCase();
    return `${pm?.command} beeui@latest add ${cliComponentName}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getInstallCommand());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy command:", err);
    }
  };

  return (
    <div className={`mt-12 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Installation
        </h3>
        <p className="text-sm text-gray-600">
          Install the {componentName} component using your preferred package
          manager.
        </p>
      </div>

      {/* Code Block */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        {/* Package Manager Selector */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Terminal className="w-4 h-4 text-gray-500" />
            <div className="flex space-x-1">
              {packageManagers.map((pm) => (
                <button
                  key={pm.name}
                  onClick={() => setSelectedPackageManager(pm.name)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedPackageManager === pm.name
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {pm.name}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2 text-gray-500 hover:text-gray-700"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Command */}
        <div className="px-4 py-3 bg-white">
          <code className="text-sm font-mono text-gray-900 select-all">
            {getInstallCommand()}
          </code>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Terminal className="w-3 h-3 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">
              First time using Bee UI?
            </p>
            <p className="text-sm text-blue-700">
              Run{" "}
              <code className="px-1.5 py-0.5 bg-blue-100 rounded text-xs font-mono">
                beeui init
              </code>{" "}
              first to set up your project configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
