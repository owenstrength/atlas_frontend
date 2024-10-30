# Atlas Document Management System

A Next.js application for document management, search, and AI-powered chat interactions.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Theme**: Dark/Light mode with next-themes
- **Icons**: Lucide React

## Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   └── common/      # Shared components (ThemeToggle, etc.)
│   └── layout.tsx       # Root layout with ThemeProvider
├── components/
│   └── home/           # Homepage components (Header, HeroSection)
└── styles/
    └── globals.css     # Global styles and CSS variables
```

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd atlas
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
pnpm dev
```

## Color Theme Configuration

Colors are defined in `globals.css` using CSS variables:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

## Component Guidelines

### Layout Components

- Header components should use `fixed` positioning with appropriate z-index
- Main content should include `pt-16` to account for fixed header
- Use `container` class for consistent max-width and padding

### Theme Toggle

The theme toggle uses `next-themes` and directly switches between light/dark modes. System theme preference is handled automatically.

### Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

### Typography

Heading sizes:
- Mobile: text-4xl
- Tablet: text-5xl
- Desktop: text-6xl

For gradient text, ensure proper padding for descenders:
```tsx
<h1 className="pb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
```

## Development Workflow

1. Create new components in appropriate directories:
   - Page components: `app/`
   - Reusable UI components: `app/components/ui/`
   - Page-specific components: `components/[page-name]/`

2. Follow naming conventions:
   - Components: PascalCase (e.g., `HeroSection.tsx`)
   - Utilities: camelCase
   - CSS classes: kebab-case

3. Import order:
   ```tsx
   // React imports
   import { useState } from 'react'
   
   // Next.js imports
   import Link from 'next/link'
   
   // Third-party libraries
   import { ArrowRight } from 'lucide-react'
   
   // Local components
   import { Button } from '@/app/components/ui/button'
   ```

## Styling Guidelines

1. Use Tailwind classes whenever possible
2. Maintain dark mode support with `dark:` variants
3. Use CSS variables for theme colors:
   - `bg-background`
   - `text-foreground`
4. Use opacity modifiers for variations:
   - `text-foreground/60` for muted text

## Performance Considerations

1. Use Next.js Image component for images
2. Implement proper code splitting
3. Keep client-side JavaScript minimal
4. Use `"use client"` directive only when necessary

## Common Issues

1. Text gradient clipping: Add `pb-1` to gradient text elements
2. Theme toggle not working: Ensure ThemeProvider is properly configured in root layout
3. Mobile menu issues: Check z-index ordering


## Contributing

1. Create a new branch for your feature
2. Follow the existing code style and conventions
3. Test your changes thoroughly
4. Submit a PR with a clear description of changes

## License

[Your License Here]