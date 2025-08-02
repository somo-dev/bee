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
  { name: "bun", command: "bunx" },
];

export const InstallationSection: React.FC<InstallationSectionProps> = ({
  componentName,
  className = "",
}) => {
  const [selectedPackageManager, setSelectedPackageManager] = useState("pnpm");
  const [copied, setCopied] = useState(false);

  const getInstallCommand = () => {
    const pm = packageManagers.find(pm => pm.name === selectedPackageManager);
    return `${pm?.command} shadcn@latest add ${componentName.toLowerCase()}`;
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
          Install this component using your preferred package manager.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4">
        <div className="text-sm font-medium text-gray-500">CLI</div>
        <div className="text-sm font-medium text-gray-400">Manual</div>
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
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
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
        <div className="px-4 py-3">
          <code className="text-sm font-mono text-gray-900">
            {getInstallCommand()}
          </code>
        </div>
      </div>
    </div>
  );
}; 