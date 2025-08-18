# 🐝 Bee UI - Modern React Component Library

A beautiful, accessible, and customizable React component library built with TypeScript and Tailwind CSS. Inspired by shadcn/ui and built on top of Radix UI primitives for excellent accessibility.

![Bee UI Components](https://img.shields.io/badge/Bee%20UI-Components%20Library-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-blue?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- 🎨 **Modern Design**: Clean, accessible components with Tailwind CSS
- ♿ **Accessible**: Built on Radix UI primitives for excellent accessibility
- 🚀 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🎯 **Customizable**: Easy to customize with CSS variables and Tailwind classes
- 📱 **Responsive**: Mobile-first responsive design
- 🎭 **Animations**: Smooth animations and transitions with Framer Motion
- 🔧 **CLI Tool**: Command-line interface for easy component management
- 📦 **NPM Package**: Install directly from npm registry

## 📦 Installation

### Option 1: NPM Package (Recommended)

Install the component library directly from npm:

```bash
npm install @bee-ui/core
# or
yarn add @bee-ui/core
# or
pnpm add @bee-ui/core
```

### Option 2: CLI Tool (shadcn/ui style)

Install the CLI tool for component management:

```bash
# Install the CLI globally
npm install -g @bee-ui/cli

# Initialize your project
beeui init

# Add specific components
beeui add button
beeui add input textarea
beeui add --all
```

## 🚀 Quick Start

### 1. Install Dependencies

Make sure you have the required peer dependencies:

```bash
npm install react react-dom
npm install -D tailwindcss
```

### 2. Configure Tailwind CSS

Update your `tailwind.config.js` to include the components:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@bee-ui/core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Import CSS

Import the component styles in your main CSS file:

```css
@import '@bee-ui/core/styles.css';
```

### 4. Use Components

```tsx
import { Button, Input, Card } from '@bee-ui/core';

function App() {
  return (
    <div className="p-4">
      <Card className="max-w-md">
        <h2 className="text-xl font-bold mb-4">Welcome</h2>
        <Input placeholder="Enter your name" className="mb-4" />
        <Button>Submit</Button>
      </Card>
    </div>
  );
}
```

## 🎯 Component Examples

### Button Component

The Button component is one of the most versatile components with multiple variants, sizes, and states.

#### Basic Usage

```tsx
import { Button } from '@bee-ui/core';

function ButtonExample() {
  return (
    <div className="space-y-4">
      <Button>Default Button</Button>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

#### Button Variants

```tsx
import { Button } from '@bee-ui/core';

function ButtonVariants() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Primary Button */}
      <Button variant="primary">
        Primary Action
      </Button>
      
      {/* Secondary Button */}
      <Button variant="secondary">
        Secondary Action
      </Button>
      
      {/* Outline Button */}
      <Button variant="outline">
        Outline Style
      </Button>
      
      {/* Ghost Button */}
      <Button variant="ghost">
        Ghost Style
      </Button>
      
      {/* Destructive Button */}
      <Button variant="destructive">
        Delete Item
      </Button>
      
      {/* Link Button */}
      <Button variant="link">
        Link Style
      </Button>
    </div>
  );
}
```

#### Button Sizes

```tsx
import { Button } from '@bee-ui/core';

function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  );
}
```

#### Button with Icons

```tsx
import { Button } from '@bee-ui/core';
import { Plus, Download, Trash2 } from 'lucide-react';

function ButtonWithIcons() {
  return (
    <div className="space-y-4">
      {/* Icon on the left */}
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Add Item
      </Button>
      
      {/* Icon on the right */}
      <Button>
        Download
        <Download className="w-4 h-4 ml-2" />
      </Button>
      
      {/* Icon only */}
      <Button variant="destructive" size="sm">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
```

#### Button States

```tsx
import { Button } from '@bee-ui/core';

function ButtonStates() {
  return (
    <div className="space-y-4">
      {/* Loading state */}
      <Button loading>
        Loading...
      </Button>
      
      {/* Disabled state */}
      <Button disabled>
        Disabled Button
      </Button>
      
      {/* Loading with custom text */}
      <Button loading loadingText="Saving...">
        Save Changes
      </Button>
    </div>
  );
}
```

#### Button with Click Handlers

```tsx
import { Button } from '@bee-ui/core';
import { useState } from 'react';

function ButtonWithHandlers() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  const handleAsyncClick = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Async operation completed!');
  };

  return (
    <div className="space-y-4">
      <div className="text-lg">Count: {count}</div>
      
      <Button onClick={handleClick}>
        Increment Count
      </Button>
      
      <Button 
        onClick={handleAsyncClick}
        loading={isLoading}
        loadingText="Processing..."
      >
        Async Operation
      </Button>
    </div>
  );
}
```

#### Button Groups

```tsx
import { Button } from '@bee-ui/core';

function ButtonGroups() {
  return (
    <div className="space-y-4">
      {/* Horizontal button group */}
      <div className="flex">
        <Button variant="outline" className="rounded-r-none">
          Previous
        </Button>
        <Button variant="outline" className="rounded-none border-l-0 border-r-0">
          Current
        </Button>
        <Button variant="outline" className="rounded-l-none">
          Next
        </Button>
      </div>
      
      {/* Vertical button group */}
      <div className="flex flex-col space-y-2">
        <Button variant="outline" className="rounded-b-none">
          Top
        </Button>
        <Button variant="outline" className="rounded-none border-t-0 border-b-0">
          Middle
        </Button>
        <Button variant="outline" className="rounded-t-none">
          Bottom
        </Button>
      </div>
    </div>
  );
}
```

#### Custom Styling

```tsx
import { Button } from '@bee-ui/core';

function CustomStyledButtons() {
  return (
    <div className="space-y-4">
      {/* Custom colors */}
      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
        Gradient Button
      </Button>
      
      {/* Custom shadows */}
      <Button className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
        Hover Effect
      </Button>
      
      {/* Custom borders */}
      <Button variant="outline" className="border-2 border-dashed border-blue-500 text-blue-600 hover:bg-blue-50">
        Dashed Border
      </Button>
      
      {/* Custom sizes */}
      <Button className="w-32 h-16 text-lg font-bold">
        Custom Size
      </Button>
    </div>
  );
}
```

## 🎨 Available Components

### Form Components
- **Button** - Versatile button with multiple variants and sizes
- **Input** - Text input with validation states
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Checkbox with custom styling
- **Radio** - Radio button group
- **Switch** - Toggle switch
- **Slider** - Range slider
- **FileInput** - File upload input
- **PasswordInput** - Password input with visibility toggle
- **JSONInput** - JSON editor
- **ColorPicker** - Color selection

### Layout Components
- **Card** - Content container
- **Accordion** - Collapsible content sections
- **Drawer** - Slide-out panel
- **Table** - Data table
- **TableOfContents** - Navigation for long content

### Feedback Components
- **ProgressBar** - Progress indicator
- **Skeleton** - Loading placeholders
- **Toaster** - Toast notifications

### Navigation Components
- **Breadcrumbs** - Navigation breadcrumbs
- **Pagination** - Page navigation
- **SegmentedControl** - Tab-like selection

### Data Display
- **Image** - Optimized image component
- **Timeline** - Chronological data display
- **TransferList** - Dual list selection

## 🎭 Component Variants

Most components support multiple variants and sizes:

```tsx
// Button variants
<Button variant="primary" size="lg">Large Primary</Button>
<Button variant="outline" size="sm">Small Outline</Button>

// Input variants
<Input variant="outline" size="sm" placeholder="Small input" />
<Input variant="filled" size="lg" placeholder="Large filled input" />
```

## 🎨 Customization

### CSS Variables

Components use CSS variables for easy theming:

```css
:root {
  --bee-primary: #6366f1;
  --bee-primary-foreground: #ffffff;
  --bee-secondary: #f3f4f6;
  --bee-secondary-foreground: #374151;
  --bee-accent: #f9fafb;
  --bee-accent-foreground: #111827;
  --bee-destructive: #ef4444;
  --bee-destructive-foreground: #ffffff;
  --bee-muted: #f3f4f6;
  --bee-muted-foreground: #6b7280;
  --bee-border: #e5e7eb;
  --bee-input: #ffffff;
  --bee-ring: #6366f1;
  --bee-background: #ffffff;
  --bee-foreground: #111827;
  --bee-card: #ffffff;
  --bee-card-foreground: #111827;
  --bee-popover: #ffffff;
  --bee-popover-foreground: #111827;
  --bee-tooltip: #1f2937;
  --bee-tooltip-foreground: #ffffff;
  
  /* Spacing */
  --bee-radius: 0.5rem;
  --bee-radius-sm: 0.25rem;
  --bee-radius-lg: 0.75rem;
  --bee-radius-xl: 1rem;
  
  /* Shadows */
  --bee-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --bee-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --bee-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --bee-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --bee-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --bee-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --bee-transition-fast: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  --bee-transition-slow: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Dark Mode Support

Components automatically support dark mode:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bee-background: #0f172a;
    --bee-foreground: #f8fafc;
    --bee-card: #1e293b;
    --bee-card-foreground: #f8fafc;
    --bee-popover: #1e293b;
    --bee-popover-foreground: #f8fafc;
    --bee-primary: #3b82f6;
    --bee-primary-foreground: #ffffff;
    --bee-secondary: #334155;
    --bee-secondary-foreground: #f1f5f9;
    --bee-muted: #334155;
    --bee-muted-foreground: #94a3b8;
    --bee-accent: #334155;
    --bee-accent-foreground: #f1f5f9;
    --bee-destructive: #dc2626;
    --bee-destructive-foreground: #ffffff;
    --bee-border: #334155;
    --bee-input: #1e293b;
    --bee-ring: #3b82f6;
    --bee-tooltip: #f1f5f9;
    --bee-tooltip-foreground: #0f172a;
  }
}
```

### Tailwind Classes

All components accept standard Tailwind classes:

```tsx
<Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3">
  Custom Styled Button
</Button>

<Input className="border-2 border-red-300 focus:border-red-500 bg-red-50" />
```

## 🛠️ CLI Tool Usage

### Installation

```bash
npm install -g @bee-ui/cli
```

### Initialize Project

```bash
beeui init
```

This creates a `bee-ui.config.js` file in your project root:

```js
module.exports = {
  components: 'src/components/ui',
  utils: 'src/lib/utils',
  tailwind: 'tailwind.config.js',
  css: 'src/app/globals.css',
}
```

### Add Components

```bash
# Add single component
beeui add button

# Add multiple components
beeui add input textarea select

# Add all components
beeui add --all

# Overwrite existing components
beeui add button --overwrite
```

### Available Components

```bash
beeui add
```

Shows all available components:
- button, input, card, checkbox, radio, select
- textarea, switch, slider, progress-bar, accordion
- drawer, table, pagination, breadcrumbs, skeleton
- toaster, timeline, image, file-input, color-picker

## 📚 Advanced Usage

### Form Integration

```tsx
import { Button, Input, Select } from '@bee-ui/core';
import { useForm } from 'react-hook-form';

function AdvancedForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('name', { required: 'Name is required' })}
          placeholder="Enter your name"
          error={errors.name?.message}
        />
      </div>
      
      <div>
        <Select
          {...register('country', { required: 'Country is required' })}
          placeholder="Select country"
          error={errors.country?.message}
        >
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </Select>
      </div>
      
      <Button type="submit" variant="primary">
        Submit Form
      </Button>
    </form>
  );
}
```

### State Management

```tsx
import { Button, Input, Card } from '@bee-ui/core';
import { useState } from 'react';

function StateManagementExample() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Item Manager</h3>
      
      <div className="flex gap-2 mb-4">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter item name"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <Button onClick={addItem}>Add</Button>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span>{item}</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

### Responsive Design

```tsx
import { Button, Card } from '@bee-ui/core';

function ResponsiveExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Card 1</h3>
        <p className="text-gray-600 mb-4">This card adapts to different screen sizes.</p>
        <Button className="w-full md:w-auto">Action</Button>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Card 2</h3>
        <p className="text-gray-600 mb-4">Responsive design with Tailwind CSS.</p>
        <Button className="w-full md:w-auto">Action</Button>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Card 3</h3>
        <p className="text-gray-600 mb-4">Mobile-first approach.</p>
        <Button className="w-full md:w-auto">Action</Button>
      </Card>
    </div>
  );
}
```

## 🚀 Publishing to NPM

### 1. Create npm Organization

- Go to [npmjs.com](https://npmjs.com)
- Log in to your account
- Click profile → **Organizations**
- **Create Organization** named `bee-ui`
- Make it **Public**
- Add yourself as member with publish permissions

### 2. Login to npm

```bash
npm login
```

### 3. Publish Package

```bash
npm run publish:components
```

### 4. Automated Publishing

Push a tag to trigger automatic publishing:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 🤝 Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/bee-ui.git
cd bee-ui

# Install dependencies
npm install

# Build components
npm run build:components

# Start development server
npm run dev
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- 📖 [Documentation](https://github.com/your-username/bee-ui)
- 🐛 [Issues](https://github.com/your-username/bee-ui/issues)
- 💬 [Discussions](https://github.com/your-username/bee-ui/discussions)
- 📧 [Email Support](mailto:support@bee-ui.com)

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for inspiration
- [Framer Motion](https://www.framer.com/motion/) for animations

---

Made with ❤️ by the Bee UI Team