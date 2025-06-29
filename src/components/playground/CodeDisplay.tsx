'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeDisplayProps {
  code: string;
  language?: string;
}

export function CodeDisplay({ code, language = 'jsx' }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-sm font-medium text-gray-300">React {language.toUpperCase()}</span>
        <button
          onClick={copyCode}
          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}