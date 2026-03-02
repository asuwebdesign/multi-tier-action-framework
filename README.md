# Multi-Tier AI Action Framework

> **⚠️ AI-Assisted Development Notice**
>
> This repository was developed with assistance from generative AI tools. While the codebase has been tested and reviewed, we recommend thorough evaluation and testing before deploying to production environments. Users should conduct their own security audits, performance testing, and code reviews to ensure the implementation meets their specific requirements and standards.

A Next.js application demonstrating a **context-aware Human-in-the-Loop (HITL) governance system** for AI agents. This framework provides tiered approval mechanisms that categorize AI agent actions by risk level, ensuring appropriate human oversight before execution.

**Built specifically for Red Hat's PatternFly 6 design system**, this framework leverages PatternFly components and design tokens throughout to ensure consistency with enterprise applications using PatternFly. These components are **designed and optimized for use with the PatternFly Chatbot extension** (`@patternfly/chatbot`), providing generative AI chat components that integrate seamlessly into PatternFly-based conversational interfaces.

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

- Purple informational theme with language icon
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

| Prop                   | Type                              | Required | Description                                       |
| ---------------------- | --------------------------------- | -------- | ------------------------------------------------- |
| `variant`              | `'info' \| 'warning' \| 'danger'` | Yes      | Risk tier for the action                          |
| `title`                | `string`                          | No       | Card title (defaults per variant)                 |
| `labelText`            | `string`                          | No       | Status label text (defaults per variant)          |
| `description`          | `string`                          | No       | Action description (defaults per variant)         |
| `expandableContent`    | `React.ReactNode`                 | Yes      | Content shown when expanded                       |
| `expandableToggleText` | `string`                          | No       | Toggle text (default: "View details")             |
| `disclaimer`           | `string`                          | No       | Disclaimer text (info variant only)               |
| `checkboxLabel`        | `string`                          | No       | Checkbox label (danger variant, default provided) |
| `primaryButtonText`    | `string`                          | No       | Primary button text (defaults per variant)        |
| `secondaryButtonText`  | `string`                          | No       | Secondary button text (default: "Cancel")         |
| `onPrimaryClick`       | `() => void`                      | No       | Primary button click handler                      |
| `onSecondaryClick`     | `() => void`                      | No       | Secondary button click handler                    |

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

| Prop      | Type                                | Required | Description         |
| --------- | ----------------------------------- | -------- | ------------------- |
| `variant` | `'loading' \| 'success' \| 'error'` | Yes      | Status state        |
| `label`   | `string`                            | Yes      | Status message text |

**Examples:**

```tsx
{
  /* During operation */
}
<ToolStatus variant="loading" label="Analyzing data" />;

{
  /* On success */
}
<ToolStatus variant="success" label="Analysis complete" />;

{
  /* On error */
}
<ToolStatus variant="error" label="Action denied" />;
```

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **PatternFly 6** - Red Hat's enterprise UI component library and design system
  - Uses PatternFly React components (`@patternfly/react-core`, `@patternfly/react-icons`)
  - Implements PatternFly design tokens for spacing, typography, colors, and sizing
  - Ensures visual consistency with other PatternFly-based applications
  - **Optimized for `@patternfly/chatbot`** - Components designed as generative AI chat extensions
- **React Syntax Highlighter** - Code examples with Prism themes
- **CSS Modules** - Scoped component styling with PatternFly design token integration

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

- **PatternFly Chatbot Optimization**: Components designed specifically for `@patternfly/chatbot` integration
- **PatternFly Integration**: Built entirely with PatternFly 6 components and design tokens
- **Generative AI Chat Components**: Purpose-built for AI conversational interfaces requiring human approvals
- **Dark Mode Support**: Full theming support via PatternFly's built-in dark theme (`pf-v6-theme-dark`)
- **Responsive Design**: Components adapt to different screen sizes using PatternFly's responsive utilities
- **Accessibility**: PatternFly components follow WCAG guidelines out of the box
- **Interactive Demo**: Live component showcase with code examples
- **Theme Toggle**: Switch between light and dark modes using PatternFly theming

## Use Cases

This framework is ideal for **PatternFly-based applications** that need human-in-the-loop approval workflows, particularly those using **`@patternfly/chatbot`**:

1. **PatternFly Chatbot Extensions**: Generative AI chat interfaces requiring action approvals
2. **AI Agent Platforms**: Govern autonomous AI actions with human oversight
3. **MCP Implementations**: Model Context Protocol tool approval workflows
4. **Red Hat OpenShift/Kubernetes UIs**: Cluster operations requiring tiered approval
5. **DevOps Automation**: CI/CD pipelines with risk-based human gates
6. **Data Operations**: Database migrations, ETL jobs, sensitive data operations
7. **Enterprise Chatbots**: LLM-powered assistants that need action approval
8. **Red Hat Product Integrations**: Any Red Hat or PatternFly application requiring AI governance

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

Built specifically on **Red Hat's PatternFly 6 design system**, the framework inherits:

- Accessibility best practices (ARIA labels, keyboard navigation)
- Consistent design language aligned with Red Hat's enterprise standards
- Professional appearance that integrates seamlessly with other PatternFly applications
- Battle-tested interaction patterns from Red Hat's design team
- Design token architecture (`--pf-t--global--*`) for themeable, maintainable styling

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
