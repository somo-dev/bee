# Bee UI

A modern, highly optimized React component library built with TypeScript and Tailwind CSS.

## Installation

### CLI Installation (Recommended - shadcn/ui style)

Install components directly into your project:

```bash
# Install the CLI
npm install -g beeui

# Initialize your project
npx beeui init

# Add components
npx beeui add button
npx beeui add input textarea
npx beeui add --all
```

### Package Installation

```bash
npm install beeui
# or
yarn add beeui
# or
pnpm add beeui
```

## Usage

### CLI Usage (Copy Components)

After running `beeui init`, components will be copied directly to your project:

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function MyComponent() {
  return (
    <div>
      <Input placeholder="Enter text..." />
      <Button>Click me</Button>
    </div>
  )
}
```

### Package Usage

```tsx
import { Button, Input } from 'beeui'

export default function MyComponent() {
  return (
    <div>
      <Input placeholder="Enter text..." />
      <Button>Click me</Button>
    </div>
  )
}
```

## Components

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

## CLI Commands

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

## Configuration

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

## Features

- 🎨 **Beautiful Design** - Modern, clean components
- ⚡ **High Performance** - Optimized for speed and bundle size
- 🔧 **Highly Customizable** - Extensive prop APIs
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessible** - ARIA compliant with keyboard navigation
- 🎭 **Smooth Animations** - Delightful micro-interactions
- 🌙 **Dark Mode** - Built-in dark mode support
- 📦 **Tree Shakeable** - Import only what you need
- 🔒 **Type Safe** - Full TypeScript support

## License

MIT