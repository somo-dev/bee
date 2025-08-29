# 🐝 @bee-ui/core

> **Modern React components built with TypeScript and Tailwind CSS**  
> Beautiful, accessible, and customizable UI components for your next React project.

[![npm version](https://img.shields.io/npm/v/@bee-ui/core.svg)](https://www.npmjs.com/package/@bee-ui/core)
[![license](https://img.shields.io/npm/l/@bee-ui/core.svg)](https://github.com/your-username/bee-ui/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)

## 🚀 Two Ways to Use the Library

### Method 1: NPM Install (Recommended for Production)

Install the package directly from npm and import components:

```bash
npm install @bee-ui/core
```

```tsx
import '@bee-ui/core/styles.css';
import { Button } from '@bee-ui/core';

function App() {
  return (
    <div className="p-6">
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </div>
  );
}
```

### Method 2: CLI Tool (For Customization)

Use the CLI tool to add components to your project for full customization:

```bash
# Install CLI globally
npm install -g @bee-ui/cli

# Initialize your project
beeui init

# Add Button component to your project
beeui add button
```

## ✨ Features

- 🎨 **Beautiful Components** - Modern, accessible UI components
- 🎯 **TypeScript First** - Full type safety and IntelliSense support
- 🎨 **Tailwind CSS** - Modern, utility-first styling
- ♿ **Accessible** - Built with accessibility in mind
- 📱 **Responsive** - Mobile-first design approach
- 🚀 **Tree Shakeable** - Only import what you need
- 🔧 **Customizable** - Easy to customize and extend
- 📦 **Zero Config** - Works out of the box

## 📚 Installation & Setup

### Step 1: Install the Package

```bash
npm install @bee-ui/core
# or
yarn add @bee-ui/core
# or
pnpm add @bee-ui/core
```

### Step 2: Import CSS

Import the CSS file in your main component or CSS file:

```tsx
// In your main App.tsx or index.tsx
import '@bee-ui/core/styles.css';
```

Or in your CSS file:

```css
@import '@bee-ui/core/styles.css';
```

### Step 3: Import and Use Components

```tsx
import { Button } from '@bee-ui/core';

function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

## 🎨 Button Component

The Button component is a versatile, accessible button with multiple variants, sizes, and states.

### Basic Usage

```tsx
import { Button } from '@bee-ui/core';

function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Basic Button */}
      <Button>Default Button</Button>
      
      {/* Variants */}
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      
      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      
      {/* States */}
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      
      {/* With Icons */}
      <Button leftIcon={<Icon />}>With Icon</Button>
      <Button rightIcon={<Arrow />}>With Icon</Button>
    </div>
  );
}
```

### Button Props

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
```

### Advanced Button Examples

```tsx
import { Button } from '@bee-ui/core';

function AdvancedButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Full Width Button */}
      <Button variant="primary" fullWidth>
        Full Width Button
      </Button>
      
      {/* Loading State */}
      <Button variant="primary" loading>
        Processing...
      </Button>
      
      {/* With Custom Styling */}
      <Button 
        variant="outline" 
        size="lg"
        className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
      >
        Custom Styled Button
      </Button>
      
      {/* Form Submit Button */}
      <Button type="submit" variant="primary" size="lg">
        Submit Form
      </Button>
      
      {/* Disabled State */}
      <Button variant="primary" disabled>
        Cannot Click
      </Button>
    </div>
  );
}
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

This will:
- Create a `components.json` configuration file
- Install necessary dependencies
- Set up Tailwind CSS configuration

### Add Button Component

```bash
# Add Button component
beeui add button

# Overwrite existing component
beeui add button --overwrite
```

### Project Structure After CLI

```
your-project/
├── bee_components/
│   └── button/
│       ├── Button.tsx
│       ├── Button.styles.ts
│       ├── Button.types.ts
│       ├── types.ts
│       └── index.ts
├── components.json
└── package.json
```

### Using CLI Button Component

```tsx
import { Button } from './bee_components/button';

function App() {
  return (
    <div>
      <Button variant="primary">CLI Button</Button>
    </div>
  );
}
```

## 🎨 Customization

### Tailwind CSS Configuration

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@bee-ui/core/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#6366f1',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};
```

### CSS Custom Properties

```css
:root {
  --bee-primary: #6366f1;
  --bee-secondary: #6b7280;
  --bee-success: #10b981;
  --bee-warning: #f59e0b;
  --bee-error: #ef4444;
}
```

### Component Props

```tsx
// Button customization
<Button 
  variant="primary"
  size="lg"
  fullWidth
  loading
  leftIcon={<Icon />}
  rightIcon={<Arrow />}
  className="custom-class"
  style={{ backgroundColor: 'custom-color' }}
>
  Custom Button
</Button>
```

## 🔧 Advanced Usage

### Form Integration

```tsx
import { useForm } from 'react-hook-form';
import { Button } from '@bee-ui/core';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('name', { required: 'Name is required' })}
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      
      <Button type="submit" variant="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
}
```

### State Management

```tsx
import { useState } from 'react';
import { Button } from '@bee-ui/core';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      
      <div className="flex space-x-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          className="flex-1 p-2 border rounded"
        />
        <Button onClick={addTodo} variant="primary">
          Add
        </Button>
      </div>
      
      <div className="space-y-2">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                setTodos(todos.map(t => 
                  t.id === todo.id ? { ...t, completed: !t.completed } : t
                ));
              }}
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 📦 Package Structure

```
@bee-ui/core/
├── dist/
│   ├── index.js          # CommonJS bundle
│   ├── index.mjs         # ES Module bundle
│   ├── index.d.ts        # TypeScript definitions
│   ├── styles.css        # Main CSS file
│   └── index.css         # Alternative CSS file
├── src/
│   ├── components/       # All component source code
│   ├── utils/           # Utility functions
│   ├── types/           # Type definitions
│   ├── styles.css       # Source CSS
│   └── index.ts         # Main entry point
└── package.json
```

## 🚀 Performance

- **Tree Shaking**: Only import the components you use
- **Code Splitting**: Components are bundled separately
- **Bundle Size**: Optimized for minimal bundle impact

```tsx
// Only Button will be included in your bundle
import { Button } from '@bee-ui/core';
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/bee-ui.git
cd bee-ui

# Install dependencies
npm install

# Start development
npm run dev

# Build packages
npm run build:components
npm run build:cli
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](https://github.com/your-username/bee-ui#readme)
- 🐛 [Report Issues](https://github.com/your-username/bee-ui/issues)
- 💬 [Discussions](https://github.com/your-username/bee-ui/discussions)
- 📧 [Email Support](mailto:support@bee-ui.com)

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Lucide](https://lucide.dev/) for beautiful icons
- [shadcn/ui](https://ui.shadcn.com/) for design inspiration

---

<div align="center">
  Made with ❤️ by the Bee UI Team
  
  [![GitHub stars](https://img.shields.io/github/stars/your-username/bee-ui?style=social)](https://github.com/your-username/bee-ui)
  [![GitHub forks](https://img.shields.io/github/forks/your-username/bee-ui?style=social)](https://github.com/your-username/bee-ui)
  [![GitHub issues](https://img.shields.io/github/issues/your-username/bee-ui)](https://github.com/your-username/bee-ui/issues)
</div>
