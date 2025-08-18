# @bee-ui/core

A modern, accessible React component library built with TypeScript and Tailwind CSS. Inspired by shadcn/ui and built on top of Radix UI primitives.

## Features

- 🎨 **Modern Design**: Clean, accessible components with Tailwind CSS
- ♿ **Accessible**: Built on Radix UI primitives for excellent accessibility
- 🚀 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🎯 **Customizable**: Easy to customize with CSS variables and Tailwind classes
- 📱 **Responsive**: Mobile-first responsive design
- 🎭 **Animations**: Smooth animations and transitions with Framer Motion

## Installation

```bash
npm install @bee-ui/core
# or
yarn add @bee-ui/core
# or
pnpm add @bee-ui/core
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom
npm install -D tailwindcss
```

## Setup

### 1. Add Tailwind CSS

Make sure your `tailwind.config.js` includes the components:

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

### 2. Import CSS

Import the component styles in your main CSS file:

```css
@import '@bee-ui/core/styles.css';
```

## Usage

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

## Available Components

### Form Components
- `Button` - Versatile button with multiple variants
- `Input` - Text input with validation states
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Checkbox with custom styling
- `Radio` - Radio button group
- `Switch` - Toggle switch
- `Slider` - Range slider
- `FileInput` - File upload input
- `PasswordInput` - Password input with visibility toggle
- `JSONInput` - JSON editor
- `ColorPicker` - Color selection

### Layout Components
- `Card` - Content container
- `Accordion` - Collapsible content sections
- `Drawer` - Slide-out panel
- `Table` - Data table
- `TableOfContents` - Navigation for long content

### Feedback Components
- `ProgressBar` - Progress indicator
- `Skeleton` - Loading placeholders
- `Toaster` - Toast notifications

### Navigation Components
- `Breadcrumbs` - Navigation breadcrumbs
- `Pagination` - Page navigation
- `SegmentedControl` - Tab-like selection

### Data Display
- `Image` - Optimized image component
- `Timeline` - Chronological data display
- `TransferList` - Dual list selection

## Component Variants

Most components support multiple variants and sizes:

```tsx
<Button variant="primary" size="lg">
  Large Primary Button
</Button>

<Input variant="outline" size="sm" />
```

## Customization

### CSS Variables

Components use CSS variables for easy theming:

```css
:root {
  --bee-primary: #6366f1;
  --bee-primary-foreground: #ffffff;
  --bee-border: #e5e7eb;
  --bee-background: #ffffff;
}
```

### Tailwind Classes

All components accept standard Tailwind classes:

```tsx
<Button className="bg-blue-500 hover:bg-blue-600 text-white">
  Custom Button
</Button>
```

## Contributing

We welcome contributions! Please see our [contributing guide](../../CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../../LICENSE) for details.

## Support

- 📖 [Documentation](https://github.com/your-username/bee-ui)
- 🐛 [Issues](https://github.com/your-username/bee-ui/issues)
- 💬 [Discussions](https://github.com/your-username/bee-ui/discussions)
