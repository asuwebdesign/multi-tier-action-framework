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
  - Blue theme with language icon
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

- **Expandable Details Section**: Collapsible content area for action specifics
- **Configurable Text**: All labels, titles, descriptions can be customized
- **Responsive Actions**: Primary/secondary buttons with variant-specific styling
- **Dark Mode Support**: Full PatternFly theme integration
- **Truncation Handling**: Long titles truncate gracefully

#### Props Interface

```typescript
interface ToolCardProps {
  variant: 'info' | 'warning' | 'danger';
  title?: string;
  labelText?: string;
  description?: string;
  expandableContent: React.ReactNode;
  expandableToggleText?: string;
  disclaimer?: string;
  checkboxLabel?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
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
  variant: 'loading' | 'success' | 'error';
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
├── .screenshots/            # Design mockups (light/dark themes)
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Development Guidelines

### Code Style

- **Component Organization**: One component per directory with dedicated CSS
- **Exports**: Use barrel exports (index.ts) for clean imports
- **TypeScript**: Strict typing, explicit interfaces for all props
- **CSS Modules**: Scoped styles with BEM-like naming (e.g., `tool-card__header`)

### PatternFly Integration

- Import components from `@patternfly/react-core`
- Import icons from `@patternfly/react-icons`
- Use PatternFly's Flex/FlexItem for layouts
- Leverage PatternFly's theme system for dark mode

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
