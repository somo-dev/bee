# 🐝 @bee-ui/core

> **Modern React components built with TypeScript and Tailwind CSS**  
> Beautiful, accessible, and customizable UI components for your next React project.

[![npm version](https://img.shields.io/npm/v/@bee-ui/core.svg)](https://www.npmjs.com/package/@bee-ui/core)
[![license](https://img.shields.io/npm/l/@bee-ui/core.svg)](https://github.com/your-username/bee-ui/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)

> 💡 **Pro Tip**: All code snippets in this README have copy buttons! Hover over any code block to see the copy button in the top-right corner.

## ✨ Features

- 🎨 **30+ Beautiful Components** - Button, Input, Card, Table, and more
- 🎯 **TypeScript First** - Full type safety and IntelliSense support
- 🎨 **Tailwind CSS** - Modern, utility-first styling
- ♿ **Accessible** - Built with accessibility in mind
- 📱 **Responsive** - Mobile-first design approach
- 🚀 **Tree Shakeable** - Only import what you need
- 🔧 **Customizable** - Easy to customize and extend
- 📦 **Zero Config** - Works out of the box

## 🚀 Quick Start

### Method 1: NPM Install (Recommended for Production)

```bash
npm install @bee-ui/core
```

```tsx
import '@bee-ui/core/styles.css';
import { Button, Input, Card } from '@bee-ui/core';

function App() {
  return (
    <div className="p-6 space-y-4">
      <Button variant="primary" size="lg">
        Get Started
      </Button>
      
      <Input 
        placeholder="Enter your name" 
        size="md"
        variant="outline"
      />
      
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
        <p className="text-gray-600">
          This is imported directly from @bee-ui/core
        </p>
      </Card>
    </div>
  );
}
```

### Method 2: CLI Tool (For Customization)

```bash
# Install CLI globally
npm install -g @bee-ui/cli

# Initialize your project
beeui init

# Add components to your project
beeui add button input card
```

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
import { Button, Input, Card } from '@bee-ui/core';

function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
      <Input placeholder="Type here..." />
      <Card>Content</Card>
    </div>
  );
}
```

## 🎨 Component Examples

### Button Component

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

### Input Component

```tsx
import { Input } from '@bee-ui/core';

function InputExamples() {
  return (
    <div className="space-y-4">
      {/* Basic Input */}
      <Input placeholder="Enter text..." />
      
      {/* Variants */}
      <Input variant="default" placeholder="Default" />
      <Input variant="filled" placeholder="Filled" />
      <Input variant="outline" placeholder="Outline" />
      <Input variant="unstyled" placeholder="Unstyled" />
      
      {/* Sizes */}
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra Large" />
      
      {/* With Labels */}
      <Input 
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        required
      />
      
      {/* With Validation */}
      <Input 
        label="Password"
        type="password"
        error="Password is required"
        showValidationIcon
      />
      
      {/* With Icons */}
      <Input 
        placeholder="Search..."
        leftSection={<SearchIcon />}
        rightSection={<FilterIcon />}
      />
    </div>
  );
}
```

### Card Component

```tsx
import { Card } from '@bee-ui/core';

function CardExamples() {
  return (
    <div className="space-y-4">
      {/* Basic Card */}
      <Card>
        <p>Simple card content</p>
      </Card>
      
      {/* Card with Header */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Card Title</h3>
          <p className="text-gray-600">
            This is a card with a header and content.
          </p>
        </div>
      </Card>
      
      {/* Card with Actions */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Card with Actions</h3>
          <p className="text-gray-600 mb-4">
            This card has action buttons at the bottom.
          </p>
          <div className="flex space-x-2">
            <Button size="sm">Cancel</Button>
            <Button size="sm" variant="primary">Save</Button>
          </div>
        </div>
      </Card>
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

### Add Components

```bash
# Add single component
beeui add button

# Add multiple components
beeui add button input card

# Add all components
beeui add --all

# Overwrite existing components
beeui add button --overwrite
```

### Project Structure After CLI

```
your-project/
├── bee_components/
│   ├── button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts
│   │   ├── Button.types.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── input/
│   │   ├── Input.tsx
│   │   ├── Input.styles.ts
│   │   ├── Input.types.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── ...
├── components.json
└── package.json
```

### Using CLI Components

```tsx
import { Button } from './bee_components/button';
import { Input } from './bee_components/input';

function App() {
  return (
    <div>
      <Button variant="primary">CLI Button</Button>
      <Input placeholder="CLI Input" />
    </div>
  );
}
```

## 🎯 Available Components

| Component | Description | Status |
|-----------|-------------|---------|
| **Button** | Versatile button with multiple variants | ✅ Ready |
| **Input** | Form input with validation | ✅ Ready |
| **Card** | Content container component | ✅ Ready |
| **Table** | Data table with sorting | ✅ Ready |
| **Select** | Dropdown selection | ✅ Ready |
| **Checkbox** | Checkbox input | ✅ Ready |
| **Radio** | Radio button group | ✅ Ready |
| **Switch** | Toggle switch | ✅ Ready |
| **Slider** | Range slider | ✅ Ready |
| **ProgressBar** | Progress indicator | ✅ Ready |
| **Accordion** | Collapsible content | ✅ Ready |
| **Drawer** | Slide-out panel | ✅ Ready |
| **Modal** | Overlay dialog | ✅ Ready |
| **Toast** | Notification system | ✅ Ready |
| **Pagination** | Page navigation | ✅ Ready |
| **Breadcrumbs** | Navigation breadcrumbs | ✅ Ready |
| **Skeleton** | Loading placeholders | ✅ Ready |
| **Timeline** | Event timeline | ✅ Ready |
| **Image** | Image component | ✅ Ready |
| **FileInput** | File upload | ✅ Ready |
| **ColorPicker** | Color selection | ✅ Ready |
| **Textarea** | Multi-line input | ✅ Ready |
| **JSONInput** | JSON editor | ✅ Ready |
| **PasswordInput** | Password field | ✅ Ready |
| **TransferList** | List transfer | ✅ Ready |
| **SegmentedControl** | Tab-like control | ✅ Ready |
| **TableOfContents** | Content navigation | ✅ Ready |

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
  color="#ff6b6b"
  fullWidth
  loading
  loadingText="Processing..."
  leftIcon={<Icon />}
  rightIcon={<Arrow />}
  className="custom-class"
  style={{ backgroundColor: 'custom-color' }}
>
  Custom Button
</Button>

// Input customization
<Input 
  variant="outline"
  size="lg"
  label="Custom Label"
  description="Help text"
  error="Error message"
  showValidationIcon
  showCharacterCount
  maxLength={100}
  leftSection={<Icon />}
  rightSection={<Button>Action</Button>}
/>
```

## 🔧 Advanced Usage

### Form Integration

```tsx
import { useForm } from 'react-hook-form';
import { Button, Input, Card } from '@bee-ui/core';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
          showValidationIcon
        />
        
        <Input
          label="Email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email?.message}
          showValidationIcon
        />
        
        <Button type="submit" variant="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Card>
  );
}
```

### State Management

```tsx
import { useState } from 'react';
import { Button, Input, Card, ToastProvider, useToast } from '@bee-ui/core';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const { showToast } = useToast();

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
      showToast('Todo added successfully!', 'success');
    }
  };

  return (
    <ToastProvider>
      <div className="max-w-md mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Todo List</h2>
          
          <div className="flex space-x-2 mb-4">
            <Input
              value={input}
              onChange={setInput}
              placeholder="Add a todo..."
              onEnterPress={addTodo}
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
        </Card>
      </div>
    </ToastProvider>
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
- **Lazy Loading**: Support for dynamic imports
- **Bundle Size**: Optimized for minimal bundle impact

```tsx
// Only Button will be included in your bundle
import { Button } from '@bee-ui/core';

// Lazy load components when needed
const LazyModal = lazy(() => import('@bee-ui/core').then(m => ({ default: m.Modal })));
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](https://github.com/your-username/bee-ui#readme)
- 🐛 [Report Issues](https://github.com/your-username/bee-ui/issues)
- 💬 [Discussions](https://github.com/your-username/bee-ui/discussions)
- 📧 [Email Support](mailto:support@bee-ui.com)

## 📋 Copy Buttons for Code Snippets

Want to add copy buttons to your own documentation? Include this JavaScript file in your HTML:

```html
<script src="copy-buttons.js"></script>
```

Or copy the code from [`copy-buttons.js`](./copy-buttons.js) and integrate it into your project.

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
