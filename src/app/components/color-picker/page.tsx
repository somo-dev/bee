'use client';

import React, { useState } from 'react';
import { ColorPicker } from '@/lib/components/ColorPicker';
import { Select } from '@/lib/components/Select';
import { Checkbox } from '@/lib/components/Checkbox';
import { 
  Copy, 
  Check, 
  Settings,
  Palette,
  Paintbrush,
  Droplets,
  Eye,
  Zap,
  Star,
  Heart,
  Shield
} from 'lucide-react';

export default function ColorPickerPage() {
  // Interactive controls state
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);
  const [showCustomPicker, setShowCustomPicker] = useState(true);
  const [showPredefinedColors, setShowPredefinedColors] = useState(true);
  const [colorGridColumns, setColorGridColumns] = useState(6);

  // Demo state
  const [selectedColor, setSelectedColor] = useState('#6366F1');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  // Size labels for slider
  const sizeLabels = ['xs', 'sm', 'md', 'lg', 'xl'];
  const sizeValues = ['sm', 'md', 'lg', 'xl'];

  const copyCode = async (code: string, key: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const generateCode = () => {
    const props = [];
    if (size !== 'md') props.push(`size="${size}"`);
    if (disabled) props.push('disabled');
    if (!showCustomPicker) props.push('showCustomPicker={false}');
    if (!showPredefinedColors) props.push('showPredefinedColors={false}');
    if (colorGridColumns !== 6) props.push(`colorGridColumns={${colorGridColumns}}`);

    const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') : '';
    return `import { ColorPicker } from '@beeui';

<ColorPicker
  label="Choose Color"
  value={color}
  onChange={setColor}${propsString}
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
              {isCopied ? 'Copied!' : 'Copy'}
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

  // Predefined color sets
  const brandColors = [
    '#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F97316', '#F59E0B',
    '#84CC16', '#22C55E', '#10B981', '#06B6D4', '#0EA5E9', '#3B82F6'
  ];

  const materialColors = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E'
  ];

  const pastelColors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D4BAFF',
    '#FFB3E6', '#C9BAFF', '#BAFFFF', '#FFBABA', '#FFCABA', '#FFEBBA'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Color Picker</h1>
          <p className="text-gray-600">Advanced color picker with predefined colors, custom picker, and flexible configuration</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6">
                    <ColorPicker
                      label="Choose Color"
                      value={selectedColor}
                      onChange={setSelectedColor}
                      size={size as any}
                      disabled={disabled}
                      showCustomPicker={showCustomPicker}
                      showPredefinedColors={showPredefinedColors}
                      colorGridColumns={colorGridColumns}
                    />
                    
                    {/* Color Preview */}
                    <div className="text-center">
                      <div 
                        className="w-24 h-24 rounded-lg border-2 border-gray-200 shadow-sm mx-auto mb-3"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <p className="text-sm font-mono text-gray-600">{selectedColor}</p>
                      <p className="text-xs text-gray-500 mt-1">Selected Color</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Interactive Controls</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Row 1: Size */}
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

                    {/* Row 2: Grid Columns */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Grid Columns: {colorGridColumns}
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="12"
                        value={colorGridColumns}
                        onChange={(e) => setColorGridColumns(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>3</span>
                        <span>12</span>
                      </div>
                    </div>

                    {/* Row 3: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={disabled}
                        onChange={setDisabled}
                        label="Disabled"
                        size="sm"
                      />
                      <Checkbox
                        checked={showCustomPicker}
                        onChange={setShowCustomPicker}
                        label="Show custom picker"
                        size="sm"
                      />
                      <Checkbox
                        checked={showPredefinedColors}
                        onChange={setShowPredefinedColors}
                        label="Show predefined colors"
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

        {/* Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sizes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Small</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Small Color Picker"
                  value="#EF4444"
                  onChange={() => {}}
                  size="sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Medium Color Picker"
                  value="#10B981"
                  onChange={() => {}}
                  size="md"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Large Color Picker"
                  value="#8B5CF6"
                  onChange={() => {}}
                  size="lg"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Extra Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Extra Large Color Picker"
                  value="#F59E0B"
                  onChange={() => {}}
                  size="xl"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`<ColorPicker size="sm" label="Small" value={color} onChange={setColor} />
<ColorPicker size="md" label="Medium" value={color} onChange={setColor} />
<ColorPicker size="lg" label="Large" value={color} onChange={setColor} />
<ColorPicker size="xl" label="Extra Large" value={color} onChange={setColor} />`}
              title="Demo.tsx" 
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* Custom Color Sets Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Custom Color Sets</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Colors</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Brand Color Palette"
                  value="#6366F1"
                  onChange={() => {}}
                  predefinedColors={brandColors}
                  colorGridColumns={6}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Material Design Colors</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Material Design Palette"
                  value="#2196F3"
                  onChange={() => {}}
                  predefinedColors={materialColors}
                  colorGridColumns={9}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pastel Colors</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Pastel Color Palette"
                  value="#FFB3BA"
                  onChange={() => {}}
                  predefinedColors={pastelColors}
                  colorGridColumns={4}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`const brandColors = [
  '#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F97316', '#F59E0B',
  '#84CC16', '#22C55E', '#10B981', '#06B6D4', '#0EA5E9', '#3B82F6'
];

<ColorPicker
  label="Brand Color Palette"
  value={color}
  onChange={setColor}
  predefinedColors={brandColors}
  colorGridColumns={6}
/>`}
              title="Demo.tsx" 
              sectionKey="custom-colors"
            />
          </div>
        </section>

        {/* Configuration Options Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Configuration Options</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Only Predefined Colors</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Predefined Colors Only"
                  value="#EC4899"
                  onChange={() => {}}
                  showCustomPicker={false}
                  showPredefinedColors={true}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Only Custom Picker</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Custom Picker Only"
                  value="#22C55E"
                  onChange={() => {}}
                  showCustomPicker={true}
                  showPredefinedColors={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Grid Layout</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="3-Column Grid"
                  value="#8B5CF6"
                  onChange={() => {}}
                  colorGridColumns={3}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`<ColorPicker showCustomPicker={false} showPredefinedColors={true} />
<ColorPicker showCustomPicker={true} showPredefinedColors={false} />
<ColorPicker colorGridColumns={3} />`}
              title="Demo.tsx" 
              sectionKey="configuration"
            />
          </div>
        </section>

        {/* Custom Trigger Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Custom Trigger</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Icon Trigger</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Icon Trigger"
                  value="#F97316"
                  onChange={() => {}}
                  trigger={
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
                      <Paintbrush className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Choose Color</span>
                      <div 
                        className="w-4 h-4 rounded border border-gray-300 ml-2"
                        style={{ backgroundColor: '#F97316' }}
                      />
                    </div>
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Button Trigger</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Button Trigger"
                  value="#06B6D4"
                  onChange={() => {}}
                  trigger={
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Palette className="w-4 h-4" />
                      <span className="text-sm font-medium">Pick Color</span>
                    </button>
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Card Trigger</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ColorPicker
                  label="Card Trigger"
                  value="#84CC16"
                  onChange={() => {}}
                  trigger={
                    <div className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg border-2 border-gray-200"
                          style={{ backgroundColor: '#84CC16' }}
                        />
                        <div>
                          <p className="font-medium text-gray-900">Theme Color</p>
                          <p className="text-sm text-gray-500">#84CC16</p>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`<ColorPicker
  trigger={
    <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg cursor-pointer">
      <Paintbrush className="w-4 h-4" />
      <span>Choose Color</span>
      <div className="w-4 h-4 rounded border" style={{ backgroundColor: color }} />
    </div>
  }
  value={color}
  onChange={setColor}
/>`}
              title="Demo.tsx" 
              sectionKey="custom-trigger"
            />
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Customization</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="space-y-4">
                  <ColorPicker
                    label="Primary Color"
                    value="#6366F1"
                    onChange={() => {}}
                    size="sm"
                  />
                  <ColorPicker
                    label="Secondary Color"
                    value="#8B5CF6"
                    onChange={() => {}}
                    size="sm"
                  />
                  <ColorPicker
                    label="Accent Color"
                    value="#EC4899"
                    onChange={() => {}}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Design Tools</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="space-y-4">
                  <ColorPicker
                    label="Background Color"
                    value="#F3F4F6"
                    onChange={() => {}}
                    size="sm"
                    showCustomPicker={false}
                    predefinedColors={['#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF']}
                  />
                  <ColorPicker
                    label="Text Color"
                    value="#1F2937"
                    onChange={() => {}}
                    size="sm"
                    showCustomPicker={false}
                    predefinedColors={['#000000', '#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF']}
                  />
                  <ColorPicker
                    label="Border Color"
                    value="#D1D5DB"
                    onChange={() => {}}
                    size="sm"
                    showCustomPicker={false}
                    predefinedColors={['#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151']}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`// Theme Customization
<ColorPicker label="Primary Color" value={primaryColor} onChange={setPrimaryColor} />
<ColorPicker label="Secondary Color" value={secondaryColor} onChange={setSecondaryColor} />
<ColorPicker label="Accent Color" value={accentColor} onChange={setAccentColor} />

// Design Tools
<ColorPicker 
  label="Background Color" 
  value={bgColor} 
  onChange={setBgColor}
  showCustomPicker={false}
  predefinedColors={grayScale}
/>`}
              title="Demo.tsx" 
              sectionKey="use-cases"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Rich Color Picker</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Full-featured color picker with hue, saturation, and lightness controls for precise color selection.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Predefined Colors</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Customizable grid of predefined colors with flexible column layouts and color sets.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Visual Feedback</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Real-time color preview with hex input field and visual color representation.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Flexible Triggers</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Custom trigger elements or default color swatch trigger with hover effects.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Multiple Sizes</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Four different sizes (sm, md, lg, xl) to fit various design contexts and layouts.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Full keyboard navigation, ARIA labels, and screen reader support for inclusive design.
              </p>
            </div>
          </div>
        </section>

        {/* Disabled State Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Disabled State</h2>
          
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-6">
            <div className="space-y-4">
              <ColorPicker
                label="Disabled Color Picker"
                value="#6B7280"
                onChange={() => {}}
                disabled
              />
              <ColorPicker
                label="Disabled with Custom Trigger"
                value="#9CA3AF"
                onChange={() => {}}
                disabled
                trigger={
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed opacity-50">
                    <Palette className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Disabled</span>
                  </div>
                }
              />
            </div>
          </div>

          <CodeSection 
            code={`<ColorPicker
  label="Disabled Color Picker"
  value={color}
  onChange={setColor}
  disabled
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