import React from "react";
import { Check, Copy } from "lucide-react";

const SyntaxHighlighter = ({ code }: { code: string }) => (
  <pre className="p-4 text-sm overflow-x-auto bg-gray-50 rounded-b-lg">
    <code className="text-gray-800 leading-relaxed">{code}</code>
  </pre>
);

interface CodeSectionProps {
  code: string;
  title: string;
  sectionKey: string;
  copiedStates: Record<string, boolean>;
  copyCode: (code: string, key: string) => void;
}

const CodeSection: React.FC<CodeSectionProps> = ({ code, title, sectionKey, copiedStates, copyCode }) => {
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
          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{isCopied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <SyntaxHighlighter code={code} />
    </div>
  );
};

export default CodeSection; 
