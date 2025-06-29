'use client';

import React from 'react';
import { Sliders } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

interface ControlPanelProps {
  title?: string;
  children: React.ReactNode;
}

export function ControlPanel({ title = "Interactive Controls", children }: ControlPanelProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface ControlGroupProps {
  label: string;
  children: React.ReactNode;
}

export function ControlGroup({ label, children }: ControlGroupProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {children}
    </div>
  );
}

interface ButtonGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  columns?: number;
}

export function ButtonGroup({ options, value, onChange, columns = 2 }: ButtonGroupProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-2`}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            value === option
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

export function Slider({ label, value, onChange, min, max, step = 1 }: SliderProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}: {value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-3">
        <div 
          className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => {
            // This would open a color picker modal in a real implementation
          }}
        />
        <HexColorPicker color={color} onChange={onChange} />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}