# Multi-Tier AI Action Framework

## Project Overview

This is a **Next.js 15** application showcasing a context-aware Human-in-the-Loop (HITL) governance system for AI agents. The framework provides a tiered approval mechanism that categorizes AI agent actions by risk level, ensuring appropriate human oversight before execution.

## Architecture

### Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: PatternFly 6 (React components)
- **Language**: TypeScript
- **Styling**: CSS Modules + PatternFly theming
- **Syntax Highlighting**: react-syntax-highlighter with Prism

### Design Philosophy

The framework implements a **progressive governance model** where:

- **Low-risk actions** (external API calls) require minimal oversight
- **Medium-risk actions** (state changes) require explicit review
- **High-risk actions** (destructive operations) require acknowledgment via checkbox

This tiered approach balances automation efficiency with safety, allowing AI agents to operate autonomously while ensuring critical decisions remain under human control.

## Core Components

### 1. ToolCard Component

**Location**: [components/ToolCard/ToolCard.tsx](components/ToolCard/ToolCard.tsx)

A comprehensive approval card component with three risk-based variants:

#### Variants

- **Info Tier**: External interactions (API calls, data retrieval)
  - Purple theme with language icon
  - Informational disclaimer
  - No additional confirmation required

- **Warning Tier**: State changes (configuration updates)
  - Yellow theme with warning icon
  - Review required before approval
  - Optional checkbox for acknowledgment

- **Danger Tier**: Critical operations (destructive actions)
  - Red theme with error icon
  - **Mandatory checkbox** - primary button disabled until checked
  - Explicit acknowledgment of consequences

#### Key Features

- **Smooth Expandable Animations**: CSS Grid-based height transitions with fade-in and slide-up effects
- **Expandable Details Section**: Collapsible content area for action specifics with smooth animations
- **PatternFly Design Tokens**: Uses PF6 design tokens for spacing, sizing, and colors (no hardcoded values)
- **Configurable Text**: All labels, titles, descriptions can be customized
- **Responsive Actions**: Primary/secondary buttons with variant-specific styling
- **Dark Mode Support**: Full PatternFly theme integration with automatic adaptation
- **Truncation Handling**: Long titles truncate gracefully
- **Local CSS Custom Properties**: Component-specific tokens for easy customization

#### Props Interface

```typescript
interface ToolCardProps {
  variant: "info" | "warning" | "danger";
  title?: string;
  labelText?: string;
  description?: string;
  expandableContent?: React.ReactNode; // Optional - won't render if not provided
  expandableToggleText?: string; // Default: "View details"
  disclaimer?: string;
  checkboxLabel?: string; // Default: "I understand this action is destructive"
  primaryButtonText?: string; // Defaults per variant
  secondaryButtonText?: string; // Default: "Cancel"
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}
```

### 2. ToolStatus Component

**Location**: [components/ToolStatus/ToolStatus.tsx](components/ToolStatus/ToolStatus.tsx)

A simple status indicator for real-time feedback on AI agent operations.

#### Variants

- **Loading**: Animated spinner + "..." suffix
- **Success**: Green checkmark icon
- **Error**: Red error icon

#### Features

- Minimal, unobtrusive design
- Automatic ellipsis for loading states
- Uses PatternFly icons for consistency

#### Props Interface

```typescript
interface ToolStatusProps {
  variant: "loading" | "success" | "error";
  label: string;
}
```

## Project Structure

```
multi-tier-action-framework/
├── app/
│   ├── globals.css          # Global styles, PatternFly imports
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main demo page
│   └── page.css             # Page-specific styles
├── components/
│   ├── ToolCard/
│   │   ├── ToolCard.tsx     # Main component
│   │   ├── ToolCard.css     # Component styles
│   │   └── index.ts         # Barrel export
│   └── ToolStatus/
│       ├── ToolStatus.tsx   # Main component
│       ├── ToolStatus.css   # Component styles
│       └── index.ts         # Barrel export
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Development Guidelines

### Code Style

- **Component Organization**: One component per directory with dedicated CSS
- **Exports**: Use barrel exports (index.ts) for clean imports
- **TypeScript**: Strict typing, explicit interfaces for all props, use `as const` for literal types
- **CSS Modules**: Scoped styles with BEM-like naming (e.g., `tool-card__header`)
- **Type Safety**: Define union types for magic strings (e.g., `type CodeSection = "status-loading" | ...`)

### PatternFly Integration

- Import components from `@patternfly/react-core`
- Import icons from `@patternfly/react-icons`
- Use PatternFly's Flex/FlexItem for layouts
- Leverage PatternFly's theme system for dark mode
- **Design Tokens**: All components use PatternFly 6 design tokens for consistency
  - Spacing: `--pf-t--global--spacer--sm`, `--pf-t--global--spacer--md`
  - Typography: `--pf-t--global--font--size--*`, `--pf-t--global--font--family--*`
  - Colors: `--pf-t--global--color--status--*`, `--pf-t--global--icon--color--*`
  - No hardcoded pixel values or colors in component styles

### CSS Architecture

Components use a **local token pattern** combined with **variant-specific custom properties** for optimal maintainability:

```css
.tool-card {
  /* Local tokens - component-specific customization */
  --tool-card--MaxWidth: 400px;
  --tool-card--BorderWidth: var(--pf-t--global--border--width--strong);
  --tool-card--Padding: var(--pf-t--global--spacer--md);
  --tool-card--Gap: var(--pf-t--global--spacer--md);
  --tool-card--icon--Size: var(--pf-t--global--icon--size--lg);
  --tool-card--animation--Duration: 0.25s;

  /* Usage */
  max-width: var(--tool-card--MaxWidth);
  padding: var(--tool-card--Padding);
  gap: var(--tool-card--Gap);
}

/* Variant-specific color variables */
.tool-card--info {
  --tool-card--variant--color: var(
    --pf-t--global--color--status--info--default
  );
  --tool-card--variant--icon-color: var(
    --pf-t--global--icon--color--status--info--default
  );
}

/* Apply variant colors using custom properties */
.tool-card--info,
.tool-card--warning,
.tool-card--danger {
  border-color: var(--tool-card--variant--color);
  background: color-mix(
    in srgb,
    var(--tool-card--variant--color) 5%,
    transparent
  );
}
```

**Benefits:**

- Single source of truth for component values
- Easy theme customization via CSS custom properties
- Consistent spacing/sizing across all variants
- PatternFly token integration for theme compatibility
- **DRY principle**: Variant styles consolidated using custom properties
- **Scalable**: Adding new variants requires only defining color variables

### Animation System

The expandable sections use a **CSS Grid animation technique** for smooth, jitter-free transitions:

**Collapsed State:**

```css
.pf-v6-c-expandable-section__content {
  display: grid;
  grid-template-rows: 0fr; /* Height: 0 */
  overflow: hidden;
}
```

**Expanded State:**

```css
.pf-m-expanded .pf-v6-c-expandable-section__content {
  grid-template-rows: 1fr; /* Height: auto-fit content */
  margin-top: var(--tool-card--Gap);
}
```

**Staggered Content Animation:**

- Container expands first (0.25s)
- Content fades in and slides up after 0.1s delay
- Smooth cubic-bezier easing throughout

This approach eliminates the jitter caused by animating `max-height` with arbitrary large values.

### Code Optimizations

The codebase follows modern React and CSS best practices:

**TypeScript Type Safety:**

- Union types for string literals prevent typos (e.g., `CodeSection` type for expandable code keys)
- `as const` assertions for configuration objects ensure literal type inference
- No `as any` type assertions - full type safety throughout

**CSS Optimization:**

- Attribute selectors (`[class*="tool-card--"]`) reduce duplication across variants
- Custom properties eliminate repetitive color-mix patterns
- 257 lines (25% reduction from original implementation)
- Single set of rules works for all current and future variants

**Component API Design:**

- Optional props with conditional rendering (e.g., `expandableContent?`)
- Configuration-based approach over runtime functions
- Variants managed through `variantConfig` object with typed properties

### Dark Mode

The application uses PatternFly's built-in theming:

- Add/remove `pf-v6-theme-dark` class on `<html>` element
- All PatternFly components automatically adapt
- Custom CSS uses PatternFly CSS variables for consistency

## Use Cases

This framework is designed for:

1. **AI Agent Governance**: Controlling AI actions in production environments
2. **MCP (Model Context Protocol) Implementations**: Tiered approval for tool calls
3. **Cluster Management UIs**: Kubernetes/OpenShift operations requiring approval
4. **DevOps Automation**: CI/CD actions with risk-based human gates
5. **Data Operations**: Database migrations, ETL jobs, data deletion workflows

## Future Enhancements

Potential extensions to the framework:

- **Audit Logging**: Track all approval decisions with timestamps
- **Multi-Step Workflows**: Chain multiple approval tiers
- **Role-Based Access**: Different approval requirements by user role
- **API Integration**: Backend service for persisting approval history
- **Real-Time Updates**: WebSocket integration for live status changes
