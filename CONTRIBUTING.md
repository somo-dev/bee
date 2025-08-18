# Contributing to Bee UI

Thank you for your interest in contributing to Bee UI! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

- Use the [GitHub issue tracker](https://github.com/your-username/bee-ui/issues)
- Include a clear description of the problem
- Provide steps to reproduce the issue
- Include browser/device information if relevant

### Suggesting Features

- Use the [GitHub issue tracker](https://github.com/your-username/bee-ui/issues)
- Describe the feature and its use case
- Explain why this feature would be useful

### Submitting Code

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🏗️ Development Setup

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Git

### Local Development

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

### Project Structure

```
bee-ui/
├── packages/
│   ├── components/          # React components package
│   └── cli/                # CLI tool package
├── registry/               # Component registry
├── src/                    # Demo app
└── scripts/                # Build scripts
```

## 📝 Code Style

### TypeScript

- Use TypeScript for all new code
- Follow the existing type patterns
- Export types for public APIs
- Use strict TypeScript settings

### React Components

- Use functional components with hooks
- Follow the existing component patterns
- Include proper TypeScript interfaces
- Use the `cn` utility for className merging

### Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Use CSS variables for theming
- Ensure responsive design

### Accessibility

- Follow WCAG 2.1 guidelines
- Include proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers

## 🧪 Testing

### Component Testing

- Write tests for new components
- Test accessibility features
- Test responsive behavior
- Test different variants and states

### CLI Testing

- Test CLI commands locally
- Test with different package managers
- Test error handling
- Test configuration options

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Include usage examples
- Document component props
- Document CLI options

### User Documentation

- Update README.md if needed
- Add component examples
- Document configuration options
- Include troubleshooting guides

## 🚀 Release Process

### Versioning

- Follow [Semantic Versioning](https://semver.org/)
- Update package.json versions
- Update CHANGELOG.md
- Tag releases in Git

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

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the bug
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable

## 💡 Feature Requests

When suggesting features, please include:

- **Description**: Clear description of the feature
- **Use case**: Why this feature would be useful
- **Examples**: How you would use this feature
- **Alternatives**: Any existing workarounds

## 📞 Getting Help

- Check the [documentation](https://docs.bee-ui.com)
- Search existing [issues](https://github.com/your-username/bee-ui/issues)
- Ask questions in [discussions](https://github.com/your-username/bee-ui/discussions)

## 📄 License

By contributing to Bee UI, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Thank you for contributing to Bee UI! Your contributions help make this project better for everyone.
