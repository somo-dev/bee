"use client";

import React, { useState } from "react";
import { Accordion } from "@/lib/components/Accordion";
import { Select } from "@/lib/components/Select";
import { Checkbox } from "@/lib/components/Checkbox";
import { ColorPicker } from "@/lib/components/ColorPicker";
import {
  Copy,
  Check,
  Settings,
  FileText,
  Users,
  Shield,
  Zap,
  Globe,
  Code,
  Database,
  Palette,
  Camera,
  Music,
  Video,
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
  Star,
  Heart,
  Award,
  Target,
  Lightbulb,
  Bookmark,
} from "lucide-react";

export default function AccordionPage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [multiple, setMultiple] = useState(false);
  const [collapsible, setCollapsible] = useState(true);
  const [showChevron, setShowChevron] = useState(true);
  const [chevronPosition, setChevronPosition] = useState("right");
  const [disabled, setDisabled] = useState(false);
  const [searchable, setSearchable] = useState(false);
  const [showExpandAll, setShowExpandAll] = useState(false);
  const [showItemNumbers, setShowItemNumbers] = useState(false);
  const [allowReorder, setAllowReorder] = useState(false);
  const [radius, setRadius] = useState(8);
  const [transitionDuration, setTransitionDuration] = useState(200);

  // Demo state
  const [accordionValue, setAccordionValue] = useState<
    string | string[] | null
  >(null);
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
    if (multiple) props.push("multiple");
    if (!collapsible) props.push("collapsible={false}");
    if (!showChevron) props.push("showChevron={false}");
    if (chevronPosition !== "right")
      props.push(`chevronPosition="${chevronPosition}"`);
    if (disabled) props.push("disabled");
    if (searchable) props.push("searchable");
    if (showExpandAll) props.push("showExpandAll");
    if (showItemNumbers) props.push("showItemNumbers");
    if (allowReorder) props.push("allowReorder");
    if (radius !== 8) props.push(`radius={${radius}}`);
    if (transitionDuration !== 200)
      props.push(`transitionDuration={${transitionDuration}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Accordion } from '@beeui';

const items = [
  {
    value: 'getting-started',
    label: 'Getting Started',
    icon: <Zap />,
    content: 'Learn the basics of our platform...'
  },
  {
    value: 'advanced-features',
    label: 'Advanced Features',
    icon: <Settings />,
    content: 'Explore powerful advanced capabilities...'
  }
];

<Accordion
  items={items}
  value={value}
  onChange={setValue}${propsString}
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

  // Sample data
  const basicItems = [
    {
      value: "bender",
      label: "Bender Bending Rodriguez",
      description: "Fascinated with cooking, though has no sense of taste",
      content: (
        <div className="space-y-3">
          <p>
            Bender Bending Rodríguez is a main character in the animated
            television series Futurama. He was conceived by the series' creators
            Matt Groening and David X. Cohen, and is voiced by John DiMaggio.
          </p>
          <p>
            Bender was originally built in 2996 to bend girders for suicide
            booths, and has an obsession with cooking, though he has no sense of
            taste.
          </p>
        </div>
      ),
    },
    {
      value: "carol",
      label: "Carol Miller",
      description: "One of the richest people on Earth",
      content: (
        <div className="space-y-3">
          <p>
            Carol Miller is the mother of Philip J. Fry and Yancy Fry Jr. She is
            one of the richest people on Earth in the 31st century.
          </p>
          <p>
            She owns Mom's Old-Fashioned Robot Oil and is known for her ruthless
            business practices and her complicated relationship with Professor
            Farnsworth.
          </p>
        </div>
      ),
    },
    {
      value: "homer",
      label: "Homer Simpson",
      description: "Overweight, lazy, and often ignorant",
      content: (
        <div className="space-y-3">
          <p>
            Homer Jay Simpson is the main protagonist of the American animated
            sitcom The Simpsons. He is the patriarch of the Simpson family.
          </p>
          <p>
            Homer is overweight, lazy, and often ignorant. He works as a safety
            inspector at the Springfield Nuclear Power Plant.
          </p>
        </div>
      ),
    },
  ];

  const faqItems = [
    {
      value: "pricing",
      label: "What are your pricing plans?",
      icon: <Briefcase />,
      content:
        "We offer flexible pricing plans to suit businesses of all sizes. Our basic plan starts at $9/month, with professional and enterprise options available. All plans include core features with varying limits on usage and advanced capabilities.",
    },
    {
      value: "security",
      label: "How secure is my data?",
      icon: <Shield />,
      content:
        "Security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with industry standards including SOC 2 Type II and GDPR. Your data is stored in secure, geographically distributed data centers.",
    },
    {
      value: "support",
      label: "What support options are available?",
      icon: <Users />,
      rightSection: (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          24/7
        </span>
      ),
      content:
        "We provide comprehensive support including documentation, community forums, email support, and live chat. Premium customers also get priority support and dedicated account management.",
    },
    {
      value: "integrations",
      label: "Which integrations do you support?",
      icon: <Globe />,
      content:
        "We integrate with over 100+ popular tools including Slack, Salesforce, HubSpot, Zapier, and many more. Our REST API also allows for custom integrations with any system.",
    },
  ];

  const featureItems = [
    {
      value: "dashboard",
      label: "Interactive Dashboard",
      icon: <Palette />,
      content:
        "A beautiful, customizable dashboard that gives you real-time insights into your business metrics. Drag and drop widgets, create custom views, and share reports with your team.",
      rightSection: <Star className="w-4 h-4 text-yellow-500" />,
    },
    {
      value: "automation",
      label: "Workflow Automation",
      icon: <Zap />,
      content:
        "Automate repetitive tasks and create sophisticated workflows with our visual builder. Set up triggers, conditions, and actions to streamline your processes.",
      rightSection: (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          New
        </span>
      ),
    },
    {
      value: "collaboration",
      label: "Team Collaboration",
      icon: <Users />,
      content:
        "Work together seamlessly with real-time collaboration features. Share projects, leave comments, assign tasks, and track progress all in one place.",
    },
    {
      value: "analytics",
      label: "Advanced Analytics",
      icon: <Database />,
      content:
        "Powerful analytics engine that processes your data and provides actionable insights. Create custom reports, set up alerts, and track KPIs that matter to your business.",
    },
  ];

  // Select data
  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "filled", label: "Filled" },
    { value: "separated", label: "Separated" },
    { value: "contained", label: "Contained" },
    { value: "minimal", label: "Minimal" },
  ];

  const chevronPositionOptions = [
    { value: "right", label: "Right" },
    { value: "left", label: "Left" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Accordion</h1>
          <p className="text-gray-600">
            Vertically stacked set of interactive headings that each reveal a
            section of content
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Preview Section */}
              <div className="xl:col-span-3 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <Accordion
                    items={basicItems}
                    value={accordionValue}
                    onChange={setAccordionValue}
                    variant={variant as any}
                    size={size as any}
                    multiple={multiple}
                    collapsible={collapsible}
                    showChevron={showChevron}
                    chevronPosition={chevronPosition as any}
                    disabled={disabled}
                    searchable={searchable}
                    showExpandAll={showExpandAll}
                    showItemNumbers={showItemNumbers}
                    allowReorder={allowReorder}
                    radius={radius}
                    transitionDuration={transitionDuration}
                  />
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 xl:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Controls
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Row 1: Variant */}
                    <div>
                      <Select
                        data={variantOptions}
                        value={variant}
                        onChange={(value) => setVariant(value as string)}
                        label="Variant"
                        size="sm"
                      />
                    </div>

                    {/* Row 2: Size */}
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

                    {/* Row 3: Chevron Position */}
                    <div>
                      <Select
                        data={chevronPositionOptions}
                        value={chevronPosition}
                        onChange={(value) =>
                          setChevronPosition(value as string)
                        }
                        label="Chevron Position"
                        size="sm"
                      />
                    </div>

                    {/* Row 4: Radius */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Radius: {radius}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={radius}
                        onChange={(e) => setRadius(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0px</span>
                        <span>20px</span>
                      </div>
                    </div>

                    {/* Row 5: Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Animation: {transitionDuration}ms
                      </label>
                      <input
                        type="range"
                        min="200"
                        max="800"
                        step="100"
                        value={transitionDuration}
                        onChange={(e) =>
                          setTransitionDuration(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>200ms</span>
                        <span>800ms</span>
                      </div>
                    </div>

                    {/* Row 6: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={multiple}
                        onChange={setMultiple}
                        label="Multiple"
                        size="sm"
                      />
                      <Checkbox
                        checked={collapsible}
                        onChange={setCollapsible}
                        label="Collapsible"
                        size="sm"
                      />
                      <Checkbox
                        checked={showChevron}
                        onChange={setShowChevron}
                        label="Show chevron"
                        size="sm"
                      />
                      <Checkbox
                        checked={searchable}
                        onChange={setSearchable}
                        label="Searchable"
                        size="sm"
                      />
                      <Checkbox
                        checked={showExpandAll}
                        onChange={setShowExpandAll}
                        label="Expand all"
                        size="sm"
                      />
                      <Checkbox
                        checked={showItemNumbers}
                        onChange={setShowItemNumbers}
                        label="Item numbers"
                        size="sm"
                      />
                      <Checkbox
                        checked={allowReorder}
                        onChange={setAllowReorder}
                        label="Allow reorder"
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
                <Accordion items={basicItems} variant="default" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Accordion items={basicItems} variant="filled" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Separated
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Accordion items={basicItems} variant="separated" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Contained
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Accordion items={basicItems} variant="contained" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Minimal
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Accordion items={basicItems} variant="minimal" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Accordion variant="default" items={items} />
<Accordion variant="filled" items={items} />
<Accordion variant="separated" items={items} />
<Accordion variant="contained" items={items} />
<Accordion variant="minimal" items={items} />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Multiple Selection Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Multiple Selection
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Accordion
              items={featureItems}
              multiple
              variant="separated"
              showExpandAll
            />
          </div>

          <CodeSection
            code={`<Accordion
  items={items}
  multiple
  variant="separated"
  showExpandAll
/>`}
            title="Demo.tsx"
            sectionKey="multiple"
          />
        </section>

        {/* With Search Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Search
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Accordion
              items={[...basicItems, ...faqItems]}
              searchable
              multiple
              variant="default"
              highlightMatches
            />
          </div>

          <CodeSection
            code={`<Accordion
  items={items}
  searchable
  multiple
  variant="default"
  highlightMatches
/>`}
            title="Demo.tsx"
            sectionKey="search"
          />
        </section>

        {/* Advanced Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Advanced Features
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Accordion
              items={basicItems}
              variant="separated"
              showItemNumbers
              allowReorder
              chevronPosition="left"
              radius={12}
              transitionDuration={300}
            />
          </div>

          <CodeSection
            code={`<Accordion
  items={items}
  variant="separated"
  showItemNumbers
  allowReorder
  chevronPosition="left"
  radius={12}
  transitionDuration={300}
/>`}
            title="Demo.tsx"
            sectionKey="advanced"
          />
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Disabled State
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Accordion
              items={faqItems.slice(0, 3)}
              disabled
              variant="default"
            />
          </div>

          <CodeSection
            code={`<Accordion
  items={items}
  disabled
  variant="default"
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
