# Multi-Tier AI Action Framework

A Next.js application demonstrating a **context-aware Human-in-the-Loop (HITL) governance system** for AI agents. This framework provides tiered approval mechanisms that categorize AI agent actions by risk level, ensuring appropriate human oversight before execution.

## Overview

Modern AI agents need the ability to take actions autonomously, but not all actions carry equal risk. This framework implements a **progressive governance model** where:

- **Low-risk actions** (external API calls, data retrieval) require minimal oversight
- **Medium-risk actions** (configuration changes, state modifications) require explicit review
- **High-risk actions** (destructive operations, critical updates) require acknowledgment via checkbox

This approach balances automation efficiency with safety, allowing AI agents to operate autonomously while ensuring critical decisions remain under human control.

## Components

### ToolCard Component

The **ToolCard** is the primary approval interface, featuring three risk-based variants:

#### Info Tier - External Interaction

For **low-risk actions** involving external API calls or data retrieval outside the private environment.

**Features:**
- Blue informational theme with language icon
- Status label: "External interaction"
- Built-in disclaimer about reviewing external content
- Expandable details section
- Primary "Continue" button (no additional confirmation required)

**Use Cases:**
- API data fetches
- Documentation lookups
- External service queries
- Read-only operations

**Example:**
```tsx
<ToolCard
  variant="info"
  title="External request"
  labelText="External interaction"
  description="This action will perform a data request outside your cluster."
  expandableContent={<div>API endpoint details...</div>}
  disclaimer="Review subsequent suggestions carefully to ensure security."
  onPrimaryClick={handleContinue}
  onSecondaryClick={handleCancel}
/>
```

#### Warning Tier - State Change

For **medium-risk actions** that modify system state or configuration.

**Features:**
- Yellow warning theme with warning icon
- Status label: "State change"
- Requires user review before approval
- Optional checkbox for additional acknowledgment
- Primary "Apply" button

**Use Cases:**
- Configuration updates
- Environment variable changes
- Service restarts
- Non-destructive state modifications

**Example:**
```tsx
<ToolCard
  variant="warning"
  title="Review required"
  labelText="State change"
  description="This action will perform a configuration update to your cluster."
  expandableContent={<div>Configuration diff...</div>}
  checkboxLabel="I understand the changes"
  onPrimaryClick={handleApply}
  onSecondaryClick={handleCancel}
/>
```

#### Danger Tier - Critical Approval Required

For **high-risk actions** with potentially destructive or irreversible consequences.

**Features:**
- Red danger theme with error icon
- Status label: "High risk"
- **Mandatory checkbox** - primary button is disabled until user acknowledges
- Explicit acknowledgment: "I understand this action is destructive"
- Primary "Approve" button

**Use Cases:**
- Database deletions
- Cluster teardowns
- Data purges
- Irreversible operations
- Production deployments with breaking changes

**Example:**
```tsx
<ToolCard
  variant="danger"
  title="Critical approval required"
  labelText="High risk"
  description="This action will perform a critical update to your cluster."
  expandableContent={<div>Impact analysis...</div>}
  checkboxLabel="I understand this action is destructive"
  onPrimaryClick={handleApprove}
  onSecondaryClick={handleCancel}
/>
```

#### ToolCard Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `'info' \| 'warning' \| 'danger'` | Yes | Risk tier for the action |
| `title` | `string` | No | Card title (defaults per variant) |
| `labelText` | `string` | No | Status label text (defaults per variant) |
| `description` | `string` | No | Action description (defaults per variant) |
| `expandableContent` | `React.ReactNode` | Yes | Content shown when expanded |
| `expandableToggleText` | `string` | No | Toggle text (default: "View action details") |
| `disclaimer` | `string` | No | Disclaimer text (info variant only) |
| `checkboxLabel` | `string` | No | Checkbox label (danger variant, default provided) |
| `primaryButtonText` | `string` | No | Primary button text (defaults per variant) |
| `secondaryButtonText` | `string` | No | Secondary button text (default: "Cancel") |
| `onPrimaryClick` | `() => void` | No | Primary button click handler |
| `onSecondaryClick` | `() => void` | No | Secondary button click handler |

### ToolStatus Component

The **ToolStatus** component provides real-time visual feedback on AI agent operation states.

#### Variants

**Loading State**
- Animated PatternFly spinner
- Automatic "..." ellipsis suffix
- Use for: Ongoing operations, waiting for responses, processing

**Success State**
- Green checkmark icon
- Use for: Completed operations, successful approvals, confirmed actions

**Error State**
- Red error icon
- Use for: Failed operations, rejected actions, errors

#### ToolStatus Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `'loading' \| 'success' \| 'error'` | Yes | Status state |
| `label` | `string` | Yes | Status message text |

**Examples:**
```tsx
{/* During operation */}
<ToolStatus variant="loading" label="Analyzing data" />

{/* On success */}
<ToolStatus variant="success" label="Analysis complete" />

{/* On error */}
<ToolStatus variant="error" label="Action denied" />
```

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **PatternFly 6** - Enterprise UI component library
- **React Syntax Highlighter** - Code examples with Prism themes
- **CSS Modules** - Scoped component styling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the interactive demo.

### Build

```bash
npm run build
npm start
```

## Features

- **Dark Mode Support**: Full theming support via PatternFly's built-in dark theme
- **Responsive Design**: Components adapt to different screen sizes
- **Accessibility**: PatternFly components follow WCAG guidelines
- **Interactive Demo**: Live component showcase with code examples
- **Theme Toggle**: Switch between light and dark modes

## Use Cases

This framework is ideal for:

1. **AI Agent Platforms**: Govern autonomous AI actions with human oversight
2. **MCP Implementations**: Model Context Protocol tool approval workflows
3. **Kubernetes/OpenShift UIs**: Cluster operations requiring tiered approval
4. **DevOps Automation**: CI/CD pipelines with risk-based human gates
5. **Data Operations**: Database migrations, ETL jobs, sensitive data operations
6. **Enterprise Chatbots**: LLM-powered assistants that need action approval

## Project Structure

```
multi-tier-action-framework/
├── app/
│   ├── globals.css          # Global styles, PatternFly imports
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Interactive demo page
│   └── page.css             # Page-specific styles
├── components/
│   ├── ToolCard/
│   │   ├── ToolCard.tsx     # Main approval card component
│   │   ├── ToolCard.css     # Component-scoped styles
│   │   └── index.ts         # Barrel export
│   └── ToolStatus/
│       ├── ToolStatus.tsx   # Status indicator component
│       ├── ToolStatus.css   # Component-scoped styles
│       └── index.ts         # Barrel export
├── .screenshots/            # Design mockups (light/dark themes)
├── package.json
├── tsconfig.json
├── next.config.ts
└── CLAUDE.md                # AI agent context documentation
```

## Design Philosophy

### Progressive Governance

The framework implements **progressive governance** - the principle that oversight intensity should match risk level:

- **Info actions** assume AI competence for low-risk operations
- **Warning actions** require human review of medium-risk changes
- **Danger actions** demand explicit acknowledgment of high-risk consequences

This creates an efficient approval workflow that doesn't bottleneck on low-risk decisions while ensuring safety for critical operations.

### Context-Aware Design

Each tier provides appropriate context:
- **Expandable sections** show detailed action information
- **Status labels** communicate risk at a glance
- **Visual hierarchy** (color, icons) conveys urgency
- **Disclaimers** remind users of security considerations

### Enterprise UI Standards

Built on PatternFly 6, the framework inherits:
- Accessibility best practices (ARIA labels, keyboard navigation)
- Consistent design language
- Professional appearance suitable for enterprise applications
- Battle-tested interaction patterns

## Screenshots

The `.screenshots/` directory contains design mockups in both light and dark themes showing the UI architecture and tier patterns.

## Contributing

This is a demonstration project. Feel free to adapt the components for your own use cases.

## License

MIT

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [PatternFly Documentation](https://www.patternfly.org/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
