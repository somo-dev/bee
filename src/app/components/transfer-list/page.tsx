"use client";

import React, { useState } from "react";
import { TransferList } from "@/lib/components/TransferList";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import {
  Copy,
  Check,
  Settings,
  User,
  Users,
  Star,
  Heart,
  Shield,
  Zap,
  Globe,
  Code,
  Database,
  Palette,
  Camera,
  Music,
  Video,
  FileText,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  GraduationCap,
  Home,
  Car,
  Plane,
  Ship,
  Truck,
} from "lucide-react";

export default function TransferListPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [searchable, setSearchable] = useState(true);
  const [sortable, setSortable] = useState(true);
  const [showCounts, setShowCounts] = useState(true);
  const [showTransferAll, setShowTransferAll] = useState(true);
  const [showGroups, setShowGroups] = useState(true);
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [preserveOrder, setPreserveOrder] = useState(false);

  // Demo state
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([
    "react",
    "typescript",
    "nodejs",
  ]);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  // Size labels for slider
  const sizeLabels = ["xs", "sm", "md", "lg", "xl"];
  const sizeValues = ["sm", "md", "lg", "xl"];

  const copyCode = async (code: string, key: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const generateCode = () => {
    const props = [];
    if (variant !== "default") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (!searchable) props.push("searchable={false}");
    if (!sortable) props.push("sortable={false}");
    if (!showCounts) props.push("showCounts={false}");
    if (!showTransferAll) props.push("showTransferAll={false}");
    if (!showGroups) props.push("showGroups={false}");
    if (!showCheckboxes) props.push("showCheckboxes={false}");
    if (disabled) props.push("disabled");
    if (preserveOrder) props.push("preserveOrder");

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { TransferList } from '@beeui';

const data = [
  {
    id: 'frontend',
    label: 'Frontend Technologies',
    items: [
      { value: 'react', label: 'React', icon: <Code />, description: 'JavaScript library for building user interfaces' },
      { value: 'vue', label: 'Vue.js', icon: <Zap />, description: 'Progressive JavaScript framework' },
      { value: 'angular', label: 'Angular', icon: <Shield />, description: 'Platform for building mobile and desktop web applications' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend Technologies',
    items: [
      { value: 'nodejs', label: 'Node.js', icon: <Database />, description: 'JavaScript runtime built on Chrome V8 engine' },
      { value: 'python', label: 'Python', icon: <Globe />, description: 'High-level programming language' },
      { value: 'java', label: 'Java', icon: <Settings />, description: 'Object-oriented programming language' }
    ]
  }
];

<TransferList
  data={data}
  value={selectedItems}
  onChange={setSelectedItems}
  titles={['Available Technologies', 'Selected Technologies']}
  descriptions={['Choose from available options', 'Your selected technologies']}${propsString}
/>`;
  };

  const CodeSection = ({
    code,
    title,
    sectionKey,
  }: {
    code: string;
    title: string;
    sectionKey: string;
  }) => {
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
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isCopied ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
        <pre className="p-4 text-sm overflow-x-auto bg-gray-50 rounded-b-lg">
          <code className="text-gray-800 leading-relaxed font-mono">
            {code}
          </code>
        </pre>
      </div>
    );
  };

  // Sample data with groups
  const sampleData = [
    {
      id: "frontend",
      label: "Frontend Technologies",
      items: [
        {
          value: "react",
          label: "React",
          icon: <Code />,
          description: "JavaScript library for building user interfaces",
          group: "Frontend Technologies",
        },
        {
          value: "vue",
          label: "Vue.js",
          icon: <Zap />,
          description: "Progressive JavaScript framework",
          group: "Frontend Technologies",
        },
        {
          value: "angular",
          label: "Angular",
          icon: <Shield />,
          description:
            "Platform for building mobile and desktop web applications",
          group: "Frontend Technologies",
        },
        {
          value: "svelte",
          label: "Svelte",
          icon: <Star />,
          description: "Cybernetically enhanced web apps",
          group: "Frontend Technologies",
        },
        {
          value: "nextjs",
          label: "Next.js",
          icon: <Globe />,
          description: "React framework for production",
          group: "Frontend Technologies",
        },
      ],
    },
    {
      id: "backend",
      label: "Backend Technologies",
      items: [
        {
          value: "nodejs",
          label: "Node.js",
          icon: <Database />,
          description: "JavaScript runtime built on Chrome V8 engine",
          group: "Backend Technologies",
        },
        {
          value: "python",
          label: "Python",
          icon: <Globe />,
          description: "High-level programming language",
          group: "Backend Technologies",
        },
        {
          value: "java",
          label: "Java",
          icon: <Settings />,
          description: "Object-oriented programming language",
          group: "Backend Technologies",
        },
        {
          value: "php",
          label: "PHP",
          icon: <Code />,
          description: "Server-side scripting language",
          group: "Backend Technologies",
        },
        {
          value: "ruby",
          label: "Ruby",
          icon: <Heart />,
          description: "Dynamic, open source programming language",
          group: "Backend Technologies",
        },
      ],
    },
    {
      id: "tools",
      label: "Development Tools",
      items: [
        {
          value: "typescript",
          label: "TypeScript",
          icon: <Code />,
          description: "Typed superset of JavaScript",
          group: "Development Tools",
        },
        {
          value: "webpack",
          label: "Webpack",
          icon: <Settings />,
          description: "Module bundler for modern JavaScript applications",
          group: "Development Tools",
        },
        {
          value: "vite",
          label: "Vite",
          icon: <Zap />,
          description: "Next generation frontend tooling",
          group: "Development Tools",
        },
        {
          value: "eslint",
          label: "ESLint",
          icon: <Shield />,
          description: "Pluggable JavaScript linter",
          group: "Development Tools",
        },
      ],
    },
  ];

  // Simple data without groups
  const simpleData = [
    {
      value: "user1",
      label: "John Doe",
      icon: <User />,
      description: "Software Engineer",
    },
    {
      value: "user2",
      label: "Jane Smith",
      icon: <User />,
      description: "Product Manager",
    },
    {
      value: "user3",
      label: "Bob Johnson",
      icon: <User />,
      description: "Designer",
    },
    {
      value: "user4",
      label: "Alice Brown",
      icon: <User />,
      description: "Data Scientist",
    },
    {
      value: "user5",
      label: "Charlie Wilson",
      icon: <User />,
      description: "DevOps Engineer",
    },
    {
      value: "user6",
      label: "Diana Davis",
      icon: <User />,
      description: "QA Engineer",
    },
    {
      value: "user7",
      label: "Eve Miller",
      icon: <User />,
      description: "Technical Writer",
    },
    {
      value: "user8",
      label: "Frank Garcia",
      icon: <User />,
      description: "Security Analyst",
    },
  ];

  // Select data
  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "bordered", label: "Bordered" },
    { value: "elevated", label: "Elevated" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Transfer List
          </h1>
          <p className="text-gray-600">
            Move items between two lists with search, sort, and drag-and-drop
            functionality
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
            {/* Component Preview - Full Width */}
            <div className="mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <TransferList
                  data={sampleData}
                  value={selectedItems}
                  onChange={setSelectedItems}
                  titles={["Available Technologies", "Selected Technologies"]}
                  descriptions={[
                    "Choose from available options",
                    "Your selected technologies",
                  ]}
                  variant={variant as any}
                  size={size as any}
                  searchable={searchable}
                  sortable={sortable}
                  showCounts={showCounts}
                  showTransferAll={showTransferAll}
                  showGroups={showGroups}
                  showCheckboxes={showCheckboxes}
                  disabled={disabled}
                  preserveOrder={preserveOrder}
                  listHeight={400}
                />
              </div>
            </div>

            {/* Controls Section - Separate Row */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Component Controls
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Variant Control */}
                <div>
                  <Select
                    data={variantOptions}
                    value={variant}
                    onChange={(value) => setVariant(value as string)}
                    label="Variant"
                    size="sm"
                  />
                </div>

                {/* Size Control */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Size: {size} ({sizeLabels[sizeValues.indexOf(size)]})
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="3"
                      value={sizeValues.indexOf(size)}
                      onChange={(e) =>
                        setSize(sizeValues[parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {sizeLabels.slice(1).map((label) => (
                        <span key={label} className="text-center">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Feature Toggles - Column 1 */}
                <div className="space-y-3">
                  <Checkbox
                    checked={searchable}
                    onChange={setSearchable}
                    label="Searchable"
                    size="sm"
                  />
                  <Checkbox
                    checked={sortable}
                    onChange={setSortable}
                    label="Sortable"
                    size="sm"
                  />
                  <Checkbox
                    checked={showCounts}
                    onChange={setShowCounts}
                    label="Show counts"
                    size="sm"
                  />
                  <Checkbox
                    checked={showTransferAll}
                    onChange={setShowTransferAll}
                    label="Transfer all"
                    size="sm"
                  />
                </div>

                {/* Feature Toggles - Column 2 */}
                <div className="space-y-3">
                  <Checkbox
                    checked={showGroups}
                    onChange={setShowGroups}
                    label="Show groups"
                    size="sm"
                  />
                  <Checkbox
                    checked={showCheckboxes}
                    onChange={setShowCheckboxes}
                    label="Checkboxes"
                    size="sm"
                  />
                  <Checkbox
                    checked={preserveOrder}
                    onChange={setPreserveOrder}
                    label="Preserve order"
                    size="sm"
                  />
                  <Checkbox
                    checked={disabled}
                    onChange={setDisabled}
                    label="Disabled"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CodeSection
              code={generateCode()}
              title="Demo.tsx"
              sectionKey="interactive-demo"
            />
          </div>
        </section>

        {/* Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Variants
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Default
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TransferList
                  data={simpleData.slice(0, 6)}
                  value={["user1", "user3"]}
                  onChange={() => {}}
                  titles={["Available Users", "Selected Users"]}
                  variant="default"
                  listHeight={200}
                  showGroups={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Bordered
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TransferList
                  data={simpleData.slice(0, 6)}
                  value={["user2", "user4"]}
                  onChange={() => {}}
                  titles={["Available Users", "Selected Users"]}
                  variant="bordered"
                  listHeight={200}
                  showGroups={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Elevated
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TransferList
                  data={simpleData.slice(0, 6)}
                  value={["user1", "user5"]}
                  onChange={() => {}}
                  titles={["Available Users", "Selected Users"]}
                  variant="elevated"
                  listHeight={200}
                  showGroups={false}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<TransferList variant="default" data={data} value={value} onChange={setValue} />
<TransferList variant="bordered" data={data} value={value} onChange={setValue} />
<TransferList variant="elevated" data={data} value={value} onChange={setValue} />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sizes</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Small</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TransferList
                  data={simpleData.slice(0, 4)}
                  value={["user1"]}
                  onChange={() => {}}
                  titles={["Available", "Selected"]}
                  size="sm"
                  listHeight={150}
                  showGroups={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <TransferList
                  data={simpleData.slice(0, 4)}
                  value={["user2"]}
                  onChange={() => {}}
                  titles={["Available", "Selected"]}
                  size="lg"
                  listHeight={200}
                  showGroups={false}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<TransferList size="sm" data={data} value={value} onChange={setValue} />
<TransferList size="md" data={data} value={value} onChange={setValue} />
<TransferList size="lg" data={data} value={value} onChange={setValue} />
<TransferList size="xl" data={data} value={value} onChange={setValue} />`}
              title="Demo.tsx"
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* With Groups Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Groups
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
            <TransferList
              data={sampleData}
              value={["react", "nodejs", "typescript"]}
              onChange={() => {}}
              titles={["Available Technologies", "Selected Technologies"]}
              descriptions={[
                "Choose from available options",
                "Your selected technologies",
              ]}
              showGroups={true}
              listHeight={300}
            />
          </div>

          <CodeSection
            code={`const groupedData = [
  {
    id: 'frontend',
    label: 'Frontend Technologies',
    items: [
      { value: 'react', label: 'React', icon: <Code />, description: 'JavaScript library' },
      { value: 'vue', label: 'Vue.js', icon: <Zap />, description: 'Progressive framework' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend Technologies',
    items: [
      { value: 'nodejs', label: 'Node.js', icon: <Database />, description: 'JavaScript runtime' },
      { value: 'python', label: 'Python', icon: <Globe />, description: 'Programming language' }
    ]
  }
];

<TransferList
  data={groupedData}
  value={selectedItems}
  onChange={setSelectedItems}
  showGroups={true}
/>`}
            title="Demo.tsx"
            sectionKey="groups"
          />
        </section>

        {/* Without Search Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Without Search
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
            <TransferList
              data={simpleData.slice(0, 6)}
              value={["user1", "user3", "user5"]}
              onChange={() => {}}
              titles={["Team Members", "Project Team"]}
              searchable={false}
              showGroups={false}
              listHeight={250}
            />
          </div>

          <CodeSection
            code={`<TransferList
  data={data}
  value={selectedItems}
  onChange={setSelectedItems}
  searchable={false}
  titles={['Team Members', 'Project Team']}
/>`}
            title="Demo.tsx"
            sectionKey="no-search"
          />
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
            <TransferList
              data={simpleData.slice(0, 6)}
              value={["user1", "user3"]}
              onChange={() => {}}
              titles={["Available Users", "Selected Users"]}
              disabled={true}
              showGroups={false}
              listHeight={200}
            />
          </div>

          <CodeSection
            code={`<TransferList
  data={data}
  value={selectedItems}
  onChange={setSelectedItems}
  disabled={true}
/>`}
            title="Demo.tsx"
            sectionKey="disabled"
          />
        </section>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
