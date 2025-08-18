'use client';

import React, { useState } from 'react';
import { ProgressBar } from '@bee-ui/core';
import { Select } from '@bee-ui/core';
import { Checkbox } from '@bee-ui/core';
import { ColorPicker } from '@bee-ui/core';
import { Button } from '@bee-ui/core';
import { 
  Copy, 
  Check, 
  Settings,
  Play,
  Pause,
  RotateCcw,
  Zap,
  TrendingUp,
  Activity,
  BarChart3,
  Target,
  Award
} from 'lucide-react';

export default function ProgressBarPage() {
  // Interactive controls state
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('md');
  const [value, setValue] = useState(65);
  const [max, setMax] = useState(100);
  const [min, setMin] = useState(0);
  const [color, setColor] = useState('#3B82F6');
  const [trackColor, setTrackColor] = useState('#E5E7EB');
  const [striped, setStriped] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [radius, setRadius] = useState(4);
  const [thickness, setThickness] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [labelPosition, setLabelPosition] = useState('inside');
  const [glow, setGlow] = useState(false);
  const [pulseOnComplete, setPulseOnComplete] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(300);

  // Demo state
  const [isAnimating, setIsAnimating] = useState(false);
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
    props.push(`value={${value}}`);
    if (max !== 100) props.push(`max={${max}}`);
    if (min !== 0) props.push(`min={${min}}`);
    if (variant !== 'default') props.push(`variant="${variant}"`);
    if (size !== 'md') props.push(`size="${size}"`);
    if (color !== '#3B82F6') props.push(`color="${color}"`);
    if (trackColor !== '#E5E7EB') props.push(`trackColor="${trackColor}"`);
    if (striped) props.push('striped');
    if (animated) props.push('animated');
    if (radius !== 4) props.push(`radius={${radius}}`);
    if (thickness > 0) props.push(`thickness={${thickness}}`);
    if (disabled) props.push('disabled');
    if (showPercentage) props.push('showPercentage');
    if (showValue) props.push('showValue');
    if (labelPosition !== 'inside') props.push(`labelPosition="${labelPosition}"`);
    if (glow) props.push('glow');
    if (pulseOnComplete) props.push('pulseOnComplete');
    if (indeterminate) props.push('indeterminate');
    if (loading) props.push('loading');
    if (transitionDuration !== 300) props.push(`transitionDuration={${transitionDuration}}`);

    const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') : '';
    return `import { ProgressBar } from '@beeui';

<ProgressBar${propsString}
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

  // Animate progress
  const animateProgress = () => {
    setIsAnimating(true);
    setValue(0);
    
    const duration = 3000; // 3 seconds
    const steps = 60;
    const increment = max / steps;
    const interval = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setValue(Math.min(currentStep * increment, max));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setIsAnimating(false);
      }
    }, interval);
  };

  // Select data
  const variantOptions = [
    { value: 'default', label: 'Default' },
    { value: 'striped', label: 'Striped' },
    { value: 'gradient', label: 'Gradient' },
    { value: 'rounded', label: 'Rounded' }
  ];

  const labelPositionOptions = [
    { value: 'inside', label: 'Inside' },
    { value: 'outside', label: 'Outside' },
    { value: 'none', label: 'None' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Progress Bar</h1>
          <p className="text-gray-600">Display progress with customizable animations, colors, and striped effects</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Usage</h2>

          {/* Enhanced Playground Layout */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Preview Section */}
              <div className="xl:col-span-2 order-2 xl:order-1">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full">
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-8">
                    <div className="w-full max-w-md">
                      <ProgressBar
                        value={value}
                        max={max}
                        min={min}
                        variant={variant as any}
                        size={size as any}
                        color={color}
                        trackColor={trackColor}
                        striped={striped}
                        animated={animated}
                        radius={radius}
                        thickness={thickness > 0 ? thickness : undefined}
                        disabled={disabled}
                        showPercentage={showPercentage}
                        showValue={showValue}
                        labelPosition={labelPosition as any}
                        glow={glow}
                        pulseOnComplete={pulseOnComplete}
                        indeterminate={indeterminate}
                        loading={loading}
                        transitionDuration={transitionDuration}
                        onComplete={() => console.log('Progress completed!')}
                        onValueChange={(val, pct) => console.log(`Value: ${val}, Percentage: ${pct}%`)}
                        ariaLabel="Demo progress bar"
                      />
                    </div>
                    
                    {/* Demo Controls */}
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        leftIcon={isAnimating ? <Pause /> : <Play />}
                        onClick={animateProgress}
                        disabled={isAnimating}
                      >
                        {isAnimating ? 'Animating...' : 'Animate Progress'}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        leftIcon={<RotateCcw />}
                        onClick={() => setValue(0)}
                        disabled={isAnimating}
                      >
                        Reset
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
                    <h3 className="text-lg font-semibold text-gray-900">Controls</h3>
                  </div>
                  
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
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
                      <div className="pr-2">
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

                    {/* Row 3: Value Controls */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Value: {value}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min={min}
                            max={max}
                            value={value}
                            onChange={(e) => setValue(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            disabled={isAnimating}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Max: {max}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="50"
                            max="200"
                            value={max}
                            onChange={(e) => setMax(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Styling */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Radius: {radius}px
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={radius}
                            onChange={(e) => setRadius(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Thickness: {thickness || 'Auto'}
                        </label>
                        <div className="pr-2">
                          <input
                            type="range"
                            min="0"
                            max="40"
                            value={thickness}
                            onChange={(e) => setThickness(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Colors */}
                    <div className="grid grid-cols-1 gap-4">
                      <ColorPicker
                        value={color}
                        onChange={setColor}
                        label="Progress Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                      <ColorPicker
                        value={trackColor}
                        onChange={setTrackColor}
                        label="Track Color"
                        size="sm"
                        colorGridColumns={4}
                      />
                    </div>

                    {/* Row 6: Label Position */}
                    <div>
                      <Select
                        data={labelPositionOptions}
                        value={labelPosition}
                        onChange={(value) => setLabelPosition(value as string)}
                        label="Label Position"
                        size="sm"
                      />
                    </div>

                    {/* Row 7: Animation Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Animation: {transitionDuration}ms
                      </label>
                      <div className="pr-2">
                        <input
                          type="range"
                          min="100"
                          max="1000"
                          step="50"
                          value={transitionDuration}
                          onChange={(e) => setTransitionDuration(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>

                    {/* Row 8: Feature Toggles */}
                    <div className="space-y-3">
                      <Checkbox
                        checked={striped}
                        onChange={setStriped}
                        label="Striped pattern"
                        size="sm"
                      />
                      <Checkbox
                        checked={animated}
                        onChange={setAnimated}
                        label="Animate stripes"
                        size="sm"
                        disabled={!striped && variant !== 'striped'}
                      />
                      <Checkbox
                        checked={showPercentage}
                        onChange={setShowPercentage}
                        label="Show percentage"
                        size="sm"
                      />
                      <Checkbox
                        checked={showValue}
                        onChange={setShowValue}
                        label="Show value"
                        size="sm"
                      />
                      <Checkbox
                        checked={glow}
                        onChange={setGlow}
                        label="Glow effect"
                        size="sm"
                      />
                      <Checkbox
                        checked={pulseOnComplete}
                        onChange={setPulseOnComplete}
                        label="Pulse when complete"
                        size="sm"
                      />
                      <Checkbox
                        checked={indeterminate}
                        onChange={setIndeterminate}
                        label="Indeterminate"
                        size="sm"
                      />
                      <Checkbox
                        checked={loading}
                        onChange={setLoading}
                        label="Loading state"
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Variants</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Default</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={75} variant="default" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Striped</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={60} variant="striped" animated />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Gradient</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={85} variant="gradient" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Rounded</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={45} variant="rounded" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`<ProgressBar value={75} variant="default" />
<ProgressBar value={60} variant="striped" animated />
<ProgressBar value={85} variant="gradient" />
<ProgressBar value={45} variant="rounded" />`}
              title="Demo.tsx" 
              sectionKey="variants"
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
                <ProgressBar value={70} size="sm" showPercentage />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Medium</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={70} size="md" showPercentage />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={70} size="lg" showPercentage />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Extra Large</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={70} size="xl" showPercentage />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`<ProgressBar value={70} size="sm" showPercentage />
<ProgressBar value={70} size="md" showPercentage />
<ProgressBar value={70} size="lg" showPercentage />
<ProgressBar value={70} size="xl" showPercentage />`}
              title="Demo.tsx" 
              sectionKey="sizes"
            />
          </div>
        </section>

        {/* Striped & Animated Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Striped & Animated</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Static Stripes</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={65} striped color="#10B981" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Animated Stripes</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={80} striped animated color="#F59E0B" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Gradient with Stripes</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar 
                  value={55} 
                  variant="gradient" 
                  striped 
                  animated 
                  gradientColors={['#EC4899', '#8B5CF6']}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`<ProgressBar value={65} striped color="#10B981" />
<ProgressBar value={80} striped animated color="#F59E0B" />
<ProgressBar 
  value={55} 
  variant="gradient" 
  striped 
  animated 
  gradientColors={['#EC4899', '#8B5CF6']}
/>`}
              title="Demo.tsx" 
              sectionKey="striped"
            />
          </div>
        </section>

        {/* Custom Colors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Custom Colors</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <ProgressBar value={90} color="#EF4444" trackColor="#FEE2E2" showPercentage />
                <ProgressBar value={75} color="#10B981" trackColor="#D1FAE5" showPercentage />
                <ProgressBar value={60} color="#F59E0B" trackColor="#FEF3C7" showPercentage />
                <ProgressBar value={45} color="#8B5CF6" trackColor="#EDE9FE" showPercentage />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`<ProgressBar value={90} color="#EF4444" trackColor="#FEE2E2" showPercentage />
<ProgressBar value={75} color="#10B981" trackColor="#D1FAE5" showPercentage />
<ProgressBar value={60} color="#F59E0B" trackColor="#FEF3C7" showPercentage />
<ProgressBar value={45} color="#8B5CF6" trackColor="#EDE9FE" showPercentage />`}
              title="Demo.tsx" 
              sectionKey="colors"
            />
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Advanced Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">With Glow Effect</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={85} glow color="#3B82F6" showPercentage />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pulse on Complete</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={100} pulseOnComplete color="#10B981" showPercentage />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Indeterminate</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar indeterminate color="#F59E0B" value={0} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Thickness</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ProgressBar value={70} thickness={20} radius={10} showPercentage />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`<ProgressBar value={85} glow color="#3B82F6" showPercentage />
<ProgressBar value={100} pulseOnComplete color="#10B981" showPercentage />
<ProgressBar indeterminate color="#F59E0B" />
<ProgressBar value={70} thickness={20} radius={10} showPercentage />`}
              title="Demo.tsx" 
              sectionKey="advanced"
            />
          </div>
        </section>

        {/* Real-World Examples Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Real-World Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">File Upload</h3>
                  <p className="text-sm text-gray-600">Uploading document.pdf</p>
                </div>
              </div>
              <ProgressBar 
                value={73} 
                striped 
                animated 
                showPercentage 
                color="#3B82F6"
                onComplete={() => console.log('Upload complete!')}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
                  <p className="text-sm text-gray-600">CPU Usage</p>
                </div>
              </div>
              <ProgressBar 
                value={45} 
                variant="gradient" 
                gradientColors={['#10B981', '#059669']}
                showValue
                formatValue={(val, max) => `${val}% of ${max}%`}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Goal Progress</h3>
                  <p className="text-sm text-gray-600">Monthly target</p>
                </div>
              </div>
              <ProgressBar 
                value={87} 
                variant="rounded" 
                color="#8B5CF6"
                glow
                pulseOnComplete
                showPercentage
                labelPosition="outside"
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Skill Level</h3>
                  <p className="text-sm text-gray-600">React proficiency</p>
                </div>
              </div>
              <ProgressBar 
                value={92} 
                thickness={12}
                radius={6}
                color="#F59E0B"
                trackColor="#FEF3C7"
                showPercentage
              />
            </div>
          </div>

          <div className="mt-6">
            <CodeSection 
              code={`// File Upload Progress
<ProgressBar 
  value={73} 
  striped 
  animated 
  showPercentage 
  color="#3B82F6"
  onComplete={() => console.log('Upload complete!')}
/>

// System Health Monitor
<ProgressBar 
  value={45} 
  variant="gradient" 
  gradientColors={['#10B981', '#059669']}
  showValue
  formatValue={(val, max) => \`\${val}% of \${max}%\`}
/>

// Goal Progress with Glow
<ProgressBar 
  value={87} 
  variant="rounded" 
  color="#8B5CF6"
  glow
  pulseOnComplete
  showPercentage
  labelPosition="outside"
/>`}
              title="Demo.tsx" 
              sectionKey="examples"
            />
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Striped Animation</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Beautiful animated stripes that move smoothly across the progress bar for engaging visual feedback.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Smooth Transitions</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Hardware-accelerated animations with customizable duration and easing for professional UX.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Multiple Variants</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Default, striped, gradient, and rounded variants with full customization options.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Performance Optimized</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Minimal re-renders, memoized calculations, and efficient DOM updates for smooth performance.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Full ARIA support with proper roles, labels, and screen reader compatibility.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Advanced Effects</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Glow effects, pulse animations, indeterminate states, and completion callbacks.
              </p>
            </div>
          </div>
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
