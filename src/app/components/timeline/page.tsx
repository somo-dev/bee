"use client";

import React, { useState } from "react";
import { Timeline } from "@bee-ui/core";
import { Select } from "@bee-ui/core";
import { Checkbox } from "@bee-ui/core";
import { ColorPicker } from "@bee-ui/core";
import {
  Copy,
  Check,
  Settings,
  GitBranch,
  GitCommit,
  GitPullRequest,
  MessageSquare,
  User,
  Calendar,
  Activity,
  CheckCircle,
  Clock,
  Code,
  Package,
  Star,
  Heart,
  Zap,
} from "lucide-react";

export default function TimelinePage() {
  // Interactive controls state
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("md");
  const [align, setAlign] = useState("left");
  const [showLine, setShowLine] = useState(true);
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [showNumbers, setShowNumbers] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [animateOnScroll, setAnimateOnScroll] = useState(false);
  const [bulletColor, setBulletColor] = useState("#6366F1");
  const [lineColor, setLineColor] = useState("#e5e7eb");
  const [bulletSize, setBulletSize] = useState(12);
  const [lineWidth, setLineWidth] = useState(2);
  const [itemSpacing, setItemSpacing] = useState(24);
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
    if (align !== "left") props.push(`align="${align}"`);
    if (!showLine) props.push("showLine={false}");
    if (!showTimestamp) props.push("showTimestamp={false}");
    if (showNumbers) props.push("showNumbers");
    if (interactive) props.push("interactive");
    if (reverse) props.push("reverse");
    if (animateOnScroll) props.push("animateOnScroll");
    if (bulletColor !== "#6366F1") props.push(`bulletColor="${bulletColor}"`);
    if (lineColor !== "#e5e7eb") props.push(`lineColor="${lineColor}"`);
    if (bulletSize !== 12) props.push(`bulletSize={${bulletSize}}`);
    if (lineWidth !== 2) props.push(`lineWidth={${lineWidth}}`);
    if (itemSpacing !== 24) props.push(`itemSpacing={${itemSpacing}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { Timeline } from '@beeui';

const items = [
  {
    id: 'new-branch',
    title: 'New branch',
    description: 'You\\'ve created new branch fix-notifications from master',
    timestamp: '2 hours ago',
    icon: <GitBranch />,
    active: true
  },
  {
    id: 'commits',
    title: 'Commits',
    description: 'You\\'ve pushed 23 commits to fix-notifications branch',
    timestamp: '52 minutes ago',
    icon: <GitCommit />
  },
  {
    id: 'pull-request',
    title: 'Pull request',
    description: 'You\\'ve submitted a pull request Fix incorrect notification message (#187)',
    timestamp: '34 minutes ago',
    icon: <GitPullRequest />
  },
  {
    id: 'code-review',
    title: 'Code review',
    description: 'Robert Gluesticker left a code review on your pull request',
    timestamp: '12 minutes ago',
    icon: <MessageSquare />
  }
];

<Timeline
  items={items}${propsString}
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

  // Sample data matching the images
  const gitTimelineItems = [
    {
      id: "new-branch",
      title: "New branch",
      description: "You've created new branch fix-notifications from master",
      timestamp: "2 hours ago",
      icon: <GitBranch />,
      color: "#3b82f6",
    },
    {
      id: "commits",
      title: "Commits",
      description: "You've pushed 23 commits to fix-notifications branch",
      timestamp: "52 minutes ago",
      icon: <GitCommit />,
      color: "#6366f1",
    },
    {
      id: "pull-request",
      title: "Pull request",
      description:
        "You've submitted a pull request Fix incorrect notification message (#187)",
      timestamp: "34 minutes ago",
      icon: <GitPullRequest />,
      color: "#d1d5db",
    },
    {
      id: "code-review",
      title: "Code review",
      description: "Robert Gluesticker left a code review on your pull request",
      timestamp: "12 minutes ago",
      icon: <MessageSquare />,
      color: "#d1d5db",
    },
  ];

  const projectTimelineItems = [
    {
      id: "project-start",
      title: "Project Kickoff",
      description: "Initial project setup and team onboarding completed",
      timestamp: "3 weeks ago",
      icon: <Star />,
      completed: true,
      color: "#10b981",
    },
    {
      id: "design-phase",
      title: "Design Phase",
      description: "UI/UX designs approved and development ready",
      timestamp: "2 weeks ago",
      icon: <Zap />,
      completed: true,
      color: "#f59e0b",
    },
    {
      id: "development",
      title: "Development",
      description: "Core features implementation in progress",
      timestamp: "1 week ago",
      icon: <Code />,
      active: true,
      color: "#3b82f6",
    },
    {
      id: "testing",
      title: "Testing Phase",
      description: "Quality assurance and bug fixes",
      timestamp: "Upcoming",
      icon: <CheckCircle />,
      color: "#6b7280",
    },
    {
      id: "deployment",
      title: "Deployment",
      description: "Production release and monitoring",
      timestamp: "Upcoming",
      icon: <Package />,
      color: "#6b7280",
    },
  ];

  const personalTimelineItems = [
    {
      id: "morning",
      title: "Morning Standup",
      description: "Daily team sync and task planning",
      timestamp: "9:00 AM",
      icon: <User />,
      completed: true,
      color: "#10b981",
    },
    {
      id: "development-work",
      title: "Development Work",
      description: "Working on new feature implementation",
      timestamp: "10:00 AM - 12:00 PM",
      icon: <Code />,
      active: true,
      color: "#3b82f6",
    },
    {
      id: "lunch-break",
      title: "Lunch Break",
      description: "Team lunch and informal discussions",
      timestamp: "12:00 PM - 1:00 PM",
      icon: <Heart />,
      color: "#ec4899",
    },
    {
      id: "code-review",
      title: "Code Review",
      description: "Review pull requests from team members",
      timestamp: "2:00 PM - 3:00 PM",
      icon: <MessageSquare />,
      color: "#8b5cf6",
    },
    {
      id: "client-meeting",
      title: "Client Meeting",
      description: "Project progress update and feedback session",
      timestamp: "4:00 PM",
      icon: <Calendar />,
      color: "#f59e0b",
    },
  ];

  // Select data
  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "filled", label: "Filled" },
    { value: "outline", label: "Outline" },
    { value: "minimal", label: "Minimal" },
  ];

  const alignOptions = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "center", label: "Center" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Timeline</h1>
          <p className="text-gray-600">
            Display a sequence of events in chronological order
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Preview Section */}
              <div className="xl:col-span-3 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <Timeline
                    items={gitTimelineItems}
                    variant={variant as any}
                    size={size as any}
                    align={align as any}
                    showLine={showLine}
                    showTimestamp={showTimestamp}
                    showNumbers={showNumbers}
                    interactive={interactive}
                    reverse={reverse}
                    animateOnScroll={animateOnScroll}
                    bulletColor={bulletColor}
                    lineColor={lineColor}
                    bulletSize={bulletSize}
                    lineWidth={lineWidth}
                    itemSpacing={itemSpacing}
                    onItemClick={(item, index) => {
                      console.log("Timeline item clicked:", item, index);
                    }}
                  />
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 xl:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-blue-600" />
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

                    {/* Row 3: Alignment */}
                    <div>
                      <Select
                        data={alignOptions}
                        value={align}
                        onChange={(value) => setAlign(value as string)}
                        label="Alignment"
                        size="sm"
                      />
                    </div>

                    {/* Row 4: Colors */}
                    <div className="grid grid-cols-1 gap-4">
                      <ColorPicker
                        value={bulletColor}
                        onChange={setBulletColor}
                        label="Bullet Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                      <ColorPicker
                        value={lineColor}
                        onChange={setLineColor}
                        label="Line Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                    </div>

                    {/* Row 5: Sizes */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Bullet: {bulletSize}px
                        </label>
                        <input
                          type="range"
                          min="8"
                          max="24"
                          value={bulletSize}
                          onChange={(e) =>
                            setBulletSize(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Line: {lineWidth}px
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="6"
                          value={lineWidth}
                          onChange={(e) =>
                            setLineWidth(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>

                    {/* Row 6: Spacing */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Spacing: {itemSpacing}px
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="48"
                        value={itemSpacing}
                        onChange={(e) =>
                          setItemSpacing(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Row 7: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={showLine}
                        onChange={setShowLine}
                        label="Show line"
                        size="sm"
                      />
                      <Checkbox
                        checked={showTimestamp}
                        onChange={setShowTimestamp}
                        label="Show timestamp"
                        size="sm"
                      />
                      <Checkbox
                        checked={showNumbers}
                        onChange={setShowNumbers}
                        label="Show numbers"
                        size="sm"
                      />
                      <Checkbox
                        checked={interactive}
                        onChange={setInteractive}
                        label="Interactive"
                        size="sm"
                      />
                      <Checkbox
                        checked={reverse}
                        onChange={setReverse}
                        label="Reverse order"
                        size="sm"
                      />
                      <Checkbox
                        checked={animateOnScroll}
                        onChange={setAnimateOnScroll}
                        label="Animate on scroll"
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
                <Timeline
                  items={gitTimelineItems.slice(0, 3)}
                  variant="default"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filled</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Timeline
                  items={gitTimelineItems.slice(0, 3)}
                  variant="filled"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Outline
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Timeline
                  items={gitTimelineItems.slice(0, 3)}
                  variant="outline"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Minimal
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Timeline
                  items={gitTimelineItems.slice(0, 3)}
                  variant="minimal"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Timeline variant="default" items={items} />
<Timeline variant="filled" items={items} />
<Timeline variant="outline" items={items} />
<Timeline variant="minimal" items={items} />`}
              title="Demo.tsx"
              sectionKey="variants"
            />
          </div>
        </section>

        {/* Git Timeline Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Git Timeline
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Timeline
              items={gitTimelineItems}
              variant="filled"
              bulletColor="#d1d5db"
              lineColor="#3b82f6"
              interactive
              onItemClick={(item) => console.log("Clicked:", item.title)}
            />
          </div>

          <CodeSection
            code={`const gitItems = [
  {
    id: 'new-branch',
    title: 'New branch',
    description: 'You\\'ve created new branch fix-notifications from master',
    timestamp: '2 hours ago',
    icon: <GitBranch />,
    active: true,
    color: '#3b82f6'
  },
  {
    id: 'commits',
    title: 'Commits',
    description: 'You\\'ve pushed 23 commits to fix-notifications branch',
    timestamp: '52 minutes ago',
    icon: <GitCommit />,
    color: '#6366f1'
  }
];

<Timeline
  items={gitItems}
  variant="filled"
  bulletColor="#d1d5db"
  lineColor="#3b82f6"
  interactive
  onItemClick={(item) => console.log('Clicked:', item.title)}
/>`}
            title="Demo.tsx"
            sectionKey="git-timeline"
          />
        </section>

        {/* Project Timeline Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Project Timeline
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Timeline
              items={projectTimelineItems}
              variant="filled"
              showNumbers
              bulletSize={16}
            />
          </div>

          <CodeSection
            code={`<Timeline
  items={projectItems}
  variant="filled"
  showNumbers
  bulletSize={16}
/>`}
            title="Demo.tsx"
            sectionKey="project-timeline"
          />
        </section>

        {/* Daily Schedule Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Daily Schedule
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Timeline
              items={personalTimelineItems}
              variant="outline"
              align="left"
              lineColor="#e5e7eb"
              itemSpacing={32}
            />
          </div>

          <CodeSection
            code={`<Timeline
  items={scheduleItems}
  variant="outline"
  align="left"
  lineColor="#e5e7eb"
  itemSpacing={32}
/>`}
            title="Demo.tsx"
            sectionKey="schedule-timeline"
          />
        </section>

        {/* Right Aligned Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Right Aligned
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <Timeline
              items={gitTimelineItems.slice(0, 3)}
              variant="default"
              align="right"
            />
          </div>

          <CodeSection
            code={`<Timeline
  items={items}
  variant="default"
  align="right"
/>`}
            title="Demo.tsx"
            sectionKey="right-aligned"
          />
        </section>

        {/* With Animation Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            With Scroll Animation
          </h2>

          <div
            className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6"
            style={{ height: "400px", overflowY: "auto" }}
          >
            <Timeline
              items={[...gitTimelineItems, ...projectTimelineItems]}
              variant="default"
              animateOnScroll
              itemSpacing={40}
            />
          </div>

          <CodeSection
            code={`<Timeline
  items={items}
  variant="default"
  animateOnScroll
  itemSpacing={40}
/>`}
            title="Demo.tsx"
            sectionKey="animated-timeline"
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
