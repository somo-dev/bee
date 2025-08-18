# Bee UI

A modern, highly optimized React component library built with TypeScript and Tailwind CSS, following the shadcn/ui pattern.

## 🚀 Features

- **Modern Design**: Built with modern design principles and beautiful aesthetics
- **Accessible**: WCAG 2.1 compliant components with full keyboard navigation
- **Fast Performance**: Optimized for speed with minimal bundle size
- **Customizable**: Highly customizable with theming support and CSS variables
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Open Source**: MIT licensed and open source

## Installation

```bash
npm install @bee-ui/core
# or
yarn add @bee-ui/core
# or
pnpm add @bee-ui/core
```

## Usage

```tsx
import { Button, Input } from '@bee-ui/core'

function App() {
  return (
    <div>
      <Input placeholder="Enter your name" />
      <Button>Submit</Button>
    </div>
  )
}
```

## 🧩 Available Components

### Form Components
- **Button** - Interactive button with variants and loading states
- **Input** - Text input with validation and icons
- **Textarea** - Multi-line text input with auto-resize
- **Select** - Dropdown select with search and multi-select
- **Checkbox** - Checkbox with indeterminate state
- **Radio** - Radio buttons with groups
- **Slider** - Range slider with marks and tooltips
- **Switch** - Toggle switch with inner labels
- **FileInput** - File upload with drag & drop
- **ColorPicker** - Advanced color picker

### Data Display
- **Card** - Flexible card component with sections
- **Table** - Advanced data table with sorting, filtering, pagination
- **Timeline** - Event timeline component
- **Accordion** - Collapsible content sections
- **Image** - Optimized image component with effects

### Feedback
- **ProgressBar** - Progress indicator with animations
- **Skeleton** - Loading placeholder components
- **Toaster** - Toast notification system

### Navigation
- **Breadcrumbs** - Navigation breadcrumb trail
- **Pagination** - Page navigation component
- **TableOfContents** - Auto-generated table of contents
- **SegmentedControl** - Segmented control picker

### Overlay
- **Drawer** - Slide-out panel component

### Utilities
- **TransferList** - Move items between lists
- **JSONInput** - JSON editor with syntax highlighting

## 🛠️ CLI Commands

```bash
# Initialize project
beeui init

# Add specific components
beeui add button input

# Add all components
beeui add --all

# Check for updates
beeui diff

# Help
beeui --help
```

## ⚙️ Configuration

The CLI creates a `components.json` file in your project root:

```json
{
  "style": "default",
  "rsc": true,
  "typescript": true,
  "tailwind": {
    "config": "./tailwind.config.js",
    "css": "./src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## 🏗️ Project Structure

```
bee-ui/
├── packages/
│   ├── components/          # React components package
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── cli/                # CLI tool package
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── registry/               # Component registry
│   ├── index.json
│   └── styles/
│       └── default/
├── src/                    # Demo app
├── scripts/                # Build scripts
└── package.json
```

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/bee-ui.git
cd bee-ui

# Install dependencies
npm install

# Build all packages
npm run build:all

# Start development server
npm run dev
```

### Build Commands

```bash
# Build registry
npm run build:registry

# Build CLI
npm run build:cli

# Build components
npm run build:components

# Build all
npm run build:all
```

### Publishing

```bash
# Build all packages
npm run build:all

# Publish components package
cd packages/components
npm publish

# Publish CLI package
cd ../cli
npm publish
```

## 📚 Documentation

Visit [docs.bee-ui.com](https://docs.bee-ui.com) for comprehensive documentation.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com)
- Built with [Radix UI](https://www.radix-ui.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)