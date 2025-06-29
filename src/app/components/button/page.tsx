'use client';

import React, { useState } from 'react';
import { Button } from '@/lib/components/Button';
import { 
  Download, 
  Settings, 
  Plus, 
  Trash2, 
  Heart, 
  Send,
  Save,
  Edit,
  ArrowRight,
  ChevronDown,
  Palette
} from 'lucide-react';
import { ControlPanel, ControlGroup, ButtonGroup, Checkbox, ColorPicker } from '@/components/playground/ControlPanel';
import { CodeDisplay } from '@/components/playground/CodeDisplay';

export default function ButtonPage() {
  // Interactive controls state
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [showLeftIcon, setShowLeftIcon] = useState(false);
  const [showRightIcon, setShowRightIcon] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');

  // Loading states for examples
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const toggleLoading = (key: string) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

    setTimeout(() => {
      setLoadingStates(prev => ({
        ...prev,
        [key]: false
      }));
    }, 2000);
  };

  const generateCode = () => {
    const props = [];
    if (variant !== 'primary') props.push(`variant="${variant}"`);
    if (size !== 'md') props.push(`size="${size}"`);
    if (loading) props.push('loading');
    if (disabled) props.push('disabled');
    if (fullWidth) props.push('fullWidth');
    if (showLeftIcon) props.push('leftIcon={<Download />}');
    if (showRightIcon) props.push('rightIcon={<ArrowRight />}');

    const propsString = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Button${propsString}>
  Click me
</Button>`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Button Component</h1>
              <p className="text-gray-600">Interactive button component with multiple variants and states</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Interactive Playground */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Interactive Playground</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="lg:col-span-1">
              <ControlPanel>
                <ControlGroup label="Variant">
                  <ButtonGroup
                    options={['primary', 'secondary', 'outline', 'ghost', 'danger']}
                    value={variant}
                    onChange={setVariant}
                    columns={2}
                  />
                </ControlGroup>

                <ControlGroup label="Size">
                  <ButtonGroup
                    options={['sm', 'md', 'lg', 'xl']}
                    value={size}
                    onChange={setSize}
                    columns={2}
                  />
                </ControlGroup>

                <div className="space-y-3">
                  <Checkbox label="Loading State" checked={loading} onChange={setLoading} />
                  <Checkbox label="Disabled" checked={disabled} onChange={setDisabled} />
                  <Checkbox label="Full Width" checked={fullWidth} onChange={setFullWidth} />
                  <Checkbox label="Left Icon" checked={showLeftIcon} onChange={setShowLeftIcon} />
                  <Checkbox label="Right Icon" checked={showRightIcon} onChange={setShowRightIcon} />
                </div>

                <ColorPicker
                  label="Primary Color"
                  color={primaryColor}
                  onChange={setPrimaryColor}
                />
              </ControlPanel>
            </div>

            {/* Preview & Code */}
            <div className="lg:col-span-2 space-y-6">
              {/* Preview */}
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="flex items-center justify-center min-h-[120px] bg-gray-50 rounded-lg">
                  <div style={{ '--primary-color': primaryColor } as React.CSSProperties}>
                    <Button
                      variant={variant as any}
                      size={size as any}
                      loading={loading}
                      disabled={disabled}
                      fullWidth={fullWidth}
                      leftIcon={showLeftIcon ? <Download /> : undefined}
                      rightIcon={showRightIcon ? <ArrowRight /> : undefined}
                    >
                      Click me
                    </Button>
                  </div>
                </div>
              </div>

              {/* Code */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Code</h3>
                <CodeDisplay code={generateCode()} />
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-12">
          {/* Variants */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Variants</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sizes</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex flex-wrap items-end gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>
          </section>

          {/* With Icons */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">With Icons</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button leftIcon={<Download />}>Download</Button>
                <Button rightIcon={<ArrowRight />}>Continue</Button>
                <Button leftIcon={<Plus />} variant="secondary">Add Item</Button>
                <Button rightIcon={<Settings />} variant="outline">Settings</Button>
                <Button leftIcon={<Heart />} variant="ghost">Like</Button>
                <Button leftIcon={<Trash2 />} variant="danger">Delete</Button>
              </div>
            </div>
          </section>

          {/* Loading States */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Loading States</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  loading={loadingStates.primary}
                  onClick={() => toggleLoading('primary')}
                  loadingText="Saving..."
                >
                  Save Changes
                </Button>
                <Button 
                  variant="secondary"
                  loading={loadingStates.secondary}
                  onClick={() => toggleLoading('secondary')}
                >
                  Processing
                </Button>
                <Button 
                  variant="outline"
                  loading={loadingStates.outline}
                  onClick={() => toggleLoading('outline')}
                  leftIcon={<Send />}
                >
                  Send Message
                </Button>
                <Button 
                  variant="danger"
                  loading={loadingStates.danger}
                  onClick={() => toggleLoading('danger')}
                  loadingText="Deleting..."
                >
                  Delete All
                </Button>
              </div>
            </div>
          </section>

          {/* States */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">States</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </div>
          </section>

          {/* Full Width */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Full Width</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
              <Button fullWidth leftIcon={<Save />}>Save and Continue</Button>
              <Button fullWidth variant="outline" rightIcon={<ChevronDown />}>
                Show More Options
              </Button>
            </div>
          </section>
        </div>

        {/* Accessibility */}
        <section className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">♿ Accessibility Features</h3>
          <ul className="text-green-800 space-y-1 text-sm">
            <li>• Full keyboard navigation support</li>
            <li>• ARIA attributes for screen readers</li>
            <li>• Focus management with visible focus rings</li>
            <li>• Proper color contrast ratios (WCAG AA compliant)</li>
            <li>• Loading states communicated to assistive technology</li>
            <li>• Semantic HTML structure</li>
          </ul>
        </section>
      </div>
    </div>
  );
}