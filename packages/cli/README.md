# 🐝 @bee-ui/cli

> **CLI tool for adding Bee UI components to your project**  
> Generate and customize React components with TypeScript and Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/@bee-ui/cli.svg)](https://www.npmjs.com/package/@bee-ui/cli)
[![license](https://img.shields.io/npm/l/@bee-ui/cli.svg)](https://github.com/your-username/bee-ui/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)

## 🚀 Quick Start

### Installation

```bash
npm install -g @bee-ui/cli
# or
yarn global add @bee-ui/cli
# or
pnpm add -g @bee-ui/cli
```

### Usage

```bash
# Initialize your project
beeui init

# Add components to your project
beeui add button
beeui add input card
beeui add --all
```

## ✨ Features

- 🚀 **Zero Config** - Works out of the box
- 🎯 **TypeScript First** - Full type safety support
- 🎨 **Tailwind CSS** - Modern utility-first styling
- ♿ **Accessible** - Built with accessibility in mind
- 🔧 **Customizable** - Easy to customize and extend
- 📦 **Tree Shakeable** - Only include what you need

## 📚 Commands

### `beeui init`

Initialize your project with Bee UI configuration:

```bash
beeui init
```

This will:
- Create a `components.json` configuration file
- Install necessary dependencies
- Set up Tailwind CSS configuration
- Configure component paths and aliases

### `beeui add`

Add components to your project:

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

### `beeui diff`

View differences between your local components and the latest versions:

```bash
beeui diff button
```

## 🛠️ Configuration

The CLI creates a `components.json` file in your project root:

```json
{
  "$schema": "https://bee-ui.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "typescript": true,
  "tailwind": {
    "config": "./tailwind.config.js",
    "css": "./src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## 📁 Project Structure

After running the CLI, your project will have this structure:

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
├── tailwind.config.js
└── package.json
```

## 🎨 Using Generated Components

Import and use components directly from your project:

```tsx
import { Button } from './bee_components/button';
import { Input } from './bee_components/input';

function App() {
  return (
    <div className="p-6 space-y-4">
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

## 🔧 Customization

### Tailwind CSS Configuration

The CLI automatically configures Tailwind CSS:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './bee_components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more colors
      },
    },
  },
  plugins: [],
}
```

### CSS Variables

The CLI adds CSS variables for theming:

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* ... more variables */
  }
}
```

## 📦 Dependencies

The CLI automatically installs these dependencies:

- `tailwindcss` - Utility-first CSS framework
- `tailwindcss-animate` - Animation utilities
- `class-variance-authority` - Component variant management
- `clsx` - Conditional className utility
- `tailwind-merge` - Tailwind class merging utility

## 🚀 Advanced Usage

### Custom Component Templates

You can customize component generation by modifying the templates in your project.

### Integration with Existing Projects

The CLI works seamlessly with:
- Next.js
- Create React App
- Vite
- Any React project with Tailwind CSS

### TypeScript Support

Full TypeScript support with:
- Type definitions for all components
- IntelliSense and autocomplete
- Type checking for props and variants

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

# Build CLI
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
- [shadcn/ui](https://ui.shadcn.com/) for design inspiration

---

<div align="center">
  Made with ❤️ by the Bee UI Team
  
  [![GitHub stars](https://img.shields.io/github/stars/your-username/bee-ui?style=social)](https://github.com/your-username/bee-ui)
  [![GitHub forks](https://img.shields.io/github/forks/your-username/bee-ui?style=social)](https://github.com/your-username/bee-ui)
  [![GitHub issues](https://img.shields.io/github/issues/your-username/bee-ui)](https://github.com/your-username/bee-ui/issues)
</div>
