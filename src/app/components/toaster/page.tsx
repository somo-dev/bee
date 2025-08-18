"use client";

import React, { useState } from "react";
import { Toaster, useToast, useToastHelpers } from "@bee-ui/core";
import { Select } from "@bee-ui/core";
import { Checkbox } from "@bee-ui/core";
import { Button } from "@bee-ui/core";
import {
  Copy,
  Check,
  Settings,
  Bell,
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  Loader2,
  Zap,
  Heart,
  Star,
  Download,
  Upload,
  Mail,
  Phone,
  Calendar,
  Clock,
  User,
  Shield,
  AlertTriangle,
} from "lucide-react";

export default function ToasterPage() {
  // Interactive controls state
  const [position, setPosition] = useState("top-right");
  const [size, setSize] = useState("md");
  const [maxToasts, setMaxToasts] = useState(5);
  const [gap, setGap] = useState(8);
  const [reverseOrder, setReverseOrder] = useState(false);
  const [expandOnHover, setExpandOnHover] = useState(true);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [pauseOnFocusLoss, setPauseOnFocusLoss] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(300);

  // Demo state
  const [toasts, setToasts] = useState<any[]>([]);
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
    if (position !== "top-right") props.push(`position="${position}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (maxToasts !== 5) props.push(`maxToasts={${maxToasts}}`);
    if (gap !== 8) props.push(`gap={${gap}}`);
    if (reverseOrder) props.push("reverseOrder");
    if (!expandOnHover) props.push("expandOnHover={false}");
    if (!pauseOnHover) props.push("pauseOnHover={false}");
    if (!pauseOnFocusLoss) props.push("pauseOnFocusLoss={false}");
    if (animationDuration !== 300)
      props.push(`animationDuration={${animationDuration}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `import { useToastHelpers } from '@beeui';

function Demo() {
  const { info, success, warning, error, loading } = useToastHelpers();

  const showToast = () => {
    success('Operation completed successfully!', {
      title: 'Success',
      duration: 4000,
      showProgress: true
    });
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
      <Toaster${propsString} />
    </div>
  );
}`;
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

  // Demo toast functions
  const addToast = (type: string, options: any = {}) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast = {
      id,
      type,
      duration: 4000,
      dismissible: true,
      showProgress,
      ...options,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Select data
  const positionOptions = [
    { value: "top-left", label: "Top Left" },
    { value: "top-center", label: "Top Center" },
    { value: "top-right", label: "Top Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "bottom-center", label: "Bottom Center" },
    { value: "bottom-right", label: "Bottom Right" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Toaster</h1>
          <p className="text-gray-600">
            Beautiful toast notifications with stacking, positioning, and
            advanced UX features
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Preview Section */}
              <div className="xl:col-span-3 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-4">
                    <div className="text-center mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Toast Notifications Demo
                      </h3>
                      <p className="text-gray-600">
                        Click the buttons below to see different toast types
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        leftIcon={<Info />}
                        onClick={() =>
                          addToast("info", {
                            title: "Info",
                            message: "User pending action required",
                          })
                        }
                      >
                        Info
                      </Button>

                      <Button
                        variant="outline"
                        leftIcon={<CheckCircle />}
                        onClick={() =>
                          addToast("success", {
                            title: "Success",
                            message: "Updated members status successfully",
                          })
                        }
                      >
                        Success
                      </Button>

                      <Button
                        variant="outline"
                        leftIcon={<AlertTriangle />}
                        onClick={() =>
                          addToast("warning", {
                            title: "Warning",
                            message:
                              "User has to be admin to perform this action",
                          })
                        }
                      >
                        Warning
                      </Button>

                      <Button
                        variant="outline"
                        leftIcon={<XCircle />}
                        onClick={() =>
                          addToast("error", {
                            title: "Error",
                            message: "Internal Server Error occurred",
                          })
                        }
                      >
                        Error
                      </Button>

                      <Button
                        variant="outline"
                        leftIcon={<Loader2 />}
                        onClick={() =>
                          addToast("loading", {
                            title: "Loading",
                            message: "Processing your request...",
                            duration: 0,
                          })
                        }
                      >
                        Loading
                      </Button>

                      <Button
                        variant="outline"
                        leftIcon={<Heart />}
                        onClick={() =>
                          addToast("success", {
                            title: "With Action",
                            message: "File uploaded successfully",
                            action: {
                              label: "View",
                              onClick: () => alert("Action clicked!"),
                            },
                          })
                        }
                      >
                        With Action
                      </Button>
                    </div>

                    <div className="mt-8">
                      <Button
                        variant="danger"
                        onClick={() => setToasts([])}
                        disabled={toasts.length === 0}
                      >
                        Clear All Toasts
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 xl:order-2">
                <div className="bg-white rounded-xl border border-gray-200 pl-4 pt-6 pb-4 pr-2 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Controls
                    </h3>
                  </div>

                  <div className="space-y-6 max-h-[600px] overflow-y-auto p-2">
                    {/* Row 1: Position */}
                    <div>
                      <Select
                        data={positionOptions}
                        value={position}
                        onChange={(value) => setPosition(value as string)}
                        label="Position"
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

                    {/* Row 3: Max Toasts */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Max Toasts: {maxToasts}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={maxToasts}
                        onChange={(e) => setMaxToasts(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>10</span>
                      </div>
                    </div>

                    {/* Row 4: Gap */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Gap: {gap}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={gap}
                        onChange={(e) => setGap(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0px</span>
                        <span>24px</span>
                      </div>
                    </div>

                    {/* Row 5: Animation Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Animation: {animationDuration}ms
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="800"
                        step="50"
                        value={animationDuration}
                        onChange={(e) =>
                          setAnimationDuration(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>100ms</span>
                        <span>800ms</span>
                      </div>
                    </div>

                    {/* Row 6: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={reverseOrder}
                        onChange={setReverseOrder}
                        label="Reverse order"
                        size="sm"
                      />
                      <Checkbox
                        checked={expandOnHover}
                        onChange={setExpandOnHover}
                        label="Expand on hover"
                        size="sm"
                      />
                      <Checkbox
                        checked={pauseOnHover}
                        onChange={setPauseOnHover}
                        label="Pause on hover"
                        size="sm"
                      />
                      <Checkbox
                        checked={pauseOnFocusLoss}
                        onChange={setPauseOnFocusLoss}
                        label="Pause on focus loss"
                        size="sm"
                      />
                      <Checkbox
                        checked={showProgress}
                        onChange={setShowProgress}
                        label="Show progress bar"
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

        {/* Toast Types Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Toast Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Info</h3>
              </div>
              <p className="text-blue-800 text-sm mb-4">
                General information or status updates that don't require
                immediate action.
              </p>
              <div className="bg-blue-100 border border-blue-200 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Info</p>
                    <p className="text-xs text-blue-800">User pending action</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-900">
                  Success
                </h3>
              </div>
              <p className="text-green-800 text-sm mb-4">
                Positive feedback when operations complete successfully.
              </p>
              <div className="bg-green-100 border border-green-200 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Success
                    </p>
                    <p className="text-xs text-green-800">
                      Updated members status
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-yellow-900">
                  Warning
                </h3>
              </div>
              <p className="text-yellow-800 text-sm mb-4">
                Important information that requires user attention or caution.
              </p>
              <div className="bg-yellow-100 border border-yellow-200 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">
                      Warning
                    </p>
                    <p className="text-xs text-yellow-800">
                      User has to be admin
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-900">Error</h3>
              </div>
              <p className="text-red-800 text-sm mb-4">
                Critical errors that need immediate user attention or action.
              </p>
              <div className="bg-red-100 border border-red-200 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Error</p>
                    <p className="text-xs text-red-800">
                      Internal Server Error
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Loading</h3>
              </div>
              <p className="text-gray-800 text-sm mb-4">
                Ongoing operations that require user to wait for completion.
              </p>
              <div className="bg-gray-100 border border-gray-200 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <Loader2 className="w-4 h-4 text-gray-600 animate-spin mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Loading</p>
                    <p className="text-xs text-gray-800">
                      Processing request...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`import { useToastHelpers } from '@beeui';

function Demo() {
  const { info, success, warning, error, loading } = useToastHelpers();

  return (
    <div className="space-x-4">
      <button onClick={() => info('Info message')}>Info</button>
      <button onClick={() => success('Success message')}>Success</button>
      <button onClick={() => warning('Warning message')}>Warning</button>
      <button onClick={() => error('Error message')}>Error</button>
      <button onClick={() => loading('Loading...')}>Loading</button>
    </div>
  );
}`}
              title="Demo.tsx"
              sectionKey="toast-types"
            />
          </div>
        </section>

        {/* Positions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Positions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positionOptions.map((pos) => (
              <div
                key={pos.value}
                className="bg-gray-50 rounded-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {pos.label}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setPosition(pos.value);
                    addToast("info", {
                      title: pos.label,
                      message: `Toast positioned at ${pos.label.toLowerCase()}`,
                    });
                  }}
                >
                  Show Toast Here
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <CodeSection
              code={`<Toaster position="top-right" />
<Toaster position="top-center" />
<Toaster position="bottom-left" />
<Toaster position="bottom-center" />`}
              title="Demo.tsx"
              sectionKey="positions"
            />
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Advanced Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                With Progress Bar
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() =>
                    addToast("success", {
                      title: "File Upload",
                      message: "Your file is being processed...",
                      showProgress: true,
                      duration: 6000,
                    })
                  }
                >
                  Show Progress Toast
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                With Action Button
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() =>
                    addToast("info", {
                      title: "New Update Available",
                      message: "Version 2.0 is ready to install",
                      action: {
                        label: "Update Now",
                        onClick: () => alert("Updating..."),
                      },
                      duration: 0,
                    })
                  }
                >
                  Show Action Toast
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Custom Icon
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() =>
                    addToast("success", {
                      title: "Custom Icon",
                      message: "Toast with custom heart icon",
                      icon: <Heart className="w-5 h-5" />,
                    })
                  }
                >
                  Show Custom Icon
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Persistent Toast
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() =>
                    addToast("warning", {
                      title: "Important Notice",
                      message: "This toast will not auto-dismiss",
                      duration: 0,
                    })
                  }
                >
                  Show Persistent Toast
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection
              code={`// Progress bar toast
success('File uploaded!', {
  showProgress: true,
  duration: 5000
});

// Action button toast
info('Update available', {
  action: {
    label: 'Update',
    onClick: () => updateApp()
  }
});

// Custom icon toast
success('Liked!', {
  icon: <Heart className="w-5 h-5" />
});

// Persistent toast
warning('Important notice', {
  duration: 0 // Never auto-dismiss
});`}
              title="Demo.tsx"
              sectionKey="advanced-features"
            />
          </div>
        </section>

        {/* Provider Setup Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Provider Setup
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <p className="text-gray-600 mb-4">
              Wrap your app with the ToastProvider to enable toast notifications
              throughout your application.
            </p>
          </div>

          <CodeSection
            code={`import { ToastProvider } from '@beeui';

function App() {
  return (
    <ToastProvider
      defaultPosition="top-right"
      maxToasts={5}
      gap={8}
      size="md"
    >
      <YourAppContent />
    </ToastProvider>
  );
}

// Use in any component
import { useToastHelpers } from '@beeui';

function MyComponent() {
  const { success, error, info, warning, loading } = useToastHelpers();
  
  const handleSave = async () => {
    try {
      loading('Saving...');
      await saveData();
      success('Data saved successfully!');
    } catch (err) {
      error('Failed to save data');
    }
  };
  
  return <button onClick={handleSave}>Save</button>;
}`}
            title="App.tsx"
            sectionKey="provider-setup"
          />
        </section>

        {/* Promise Helper Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Promise Helper
          </h2>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <p className="text-gray-600 mb-4">
              The promise helper automatically manages loading, success, and
              error states for async operations.
            </p>
            <Button
              variant="primary"
              onClick={async () => {
                // Simulate promise helper (would normally use useToastHelpers)
                const loadingId = `loading-${Date.now()}`;
                addToast("loading", {
                  id: loadingId,
                  title: "Processing",
                  message: "Uploading file...",
                  duration: 0,
                  dismissible: false,
                });

                setTimeout(() => {
                  removeToast(loadingId);
                  addToast("success", {
                    title: "Success",
                    message: "File uploaded successfully!",
                  });
                }, 2000);
              }}
            >
              Demo Promise Helper
            </Button>
          </div>

          <CodeSection
            code={`import { useToastHelpers } from '@beeui';

function FileUpload() {
  const { promise } = useToastHelpers();
  
  const handleUpload = async (file: File) => {
    await promise(uploadFile(file), {
      loading: 'Uploading file...',
      success: (result) => \`File \${result.name} uploaded!\`,
      error: (error) => \`Upload failed: \${error.message}\`
    });
  };
  
  return <input type="file" onChange={handleUpload} />;
}`}
            title="Demo.tsx"
            sectionKey="promise-helper"
          />
        </section>
      </div>

      {/* Live Toaster */}
      <Toaster
        toasts={toasts}
        position={position as any}
        maxToasts={maxToasts}
        gap={gap}
        size={size as any}
        reverseOrder={reverseOrder}
        expandOnHover={expandOnHover}
        pauseOnHover={pauseOnHover}
        pauseOnFocusLoss={pauseOnFocusLoss}
        animationDuration={animationDuration}
        onDismiss={removeToast}
      />

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
