"use client";

import { useState, useEffect } from "react";
import { ToolStatus } from "@/components/ToolStatus";
import { ToolCard } from "@/components/ToolCard";
import { Switch, ExpandableSection } from "@patternfly/react-core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import "./page.css";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedCode, setExpandedCode] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("pf-v6-theme-dark");
    } else {
      document.documentElement.classList.remove("pf-v6-theme-dark");
    }
  }, [isDarkMode]);

  const toggleCode = (key: string) => {
    setExpandedCode((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <div className="dark-mode-switch-container">
        <Switch
          id="dark-mode-switch"
          label="Dark mode"
          isChecked={isDarkMode}
          onChange={(_event, checked) => setIsDarkMode(checked)}
        />
      </div>
      <main className="page-main">
        <div className="page-header">
          <h1>Multi-Tier AI Action Framework</h1>
          <p className="page-header__subtitle">
            Context-Aware Human-in-the-Loop Governance for AI Agents
          </p>
        </div>

        <section className="page-section">
          <h2>Status Labels</h2>
          <p className="page-section-intro">
            Real-time status indicators for AI agent operations, providing
            immediate visual feedback on action states.
          </p>
          <div className="page-content-container">
            <div>
              <div className="variant-description">
                <strong>Loading State</strong>
                <p>
                  Indicates an ongoing operation where the AI agent is actively
                  processing a request or waiting for a response.
                </p>
              </div>
              <div className="status-frame">
                <ToolStatus variant="loading" label="Analyzing data" />
              </div>
              <ExpandableSection
                toggleText={
                  expandedCode["status-loading"] ? "Hide code" : "Show code"
                }
                onToggle={() => toggleCode("status-loading")}
                isExpanded={expandedCode["status-loading"]}
                className="code-expandable"
              >
                <SyntaxHighlighter
                  language="tsx"
                  style={isDarkMode ? oneDark : oneLight}
                  customStyle={{ borderRadius: "4px" }}
                >
                  {`<ToolStatus variant="loading" label="Analyzing data" />`}
                </SyntaxHighlighter>
              </ExpandableSection>
            </div>

            <div>
              <div className="variant-description">
                <strong>Success State</strong>
                <p>
                  Confirms successful completion of an AI agent action,
                  signaling that the operation finished without errors.
                </p>
              </div>
              <div className="status-frame">
                <ToolStatus variant="success" label="Analysis complete" />
              </div>
              <ExpandableSection
                toggleText={
                  expandedCode["status-success"] ? "Hide code" : "Show code"
                }
                onToggle={() => toggleCode("status-success")}
                isExpanded={expandedCode["status-success"]}
                className="code-expandable"
              >
                <SyntaxHighlighter
                  language="tsx"
                  style={isDarkMode ? oneDark : oneLight}
                  customStyle={{ borderRadius: "4px" }}
                >
                  {`<ToolStatus variant="success" label="Analysis complete" />`}
                </SyntaxHighlighter>
              </ExpandableSection>
            </div>

            <div>
              <div className="variant-description">
                <strong>Error State</strong>
                <p>
                  Alerts when an AI agent action has failed or been rejected,
                  requiring user attention or intervention.
                </p>
              </div>
              <div className="status-frame">
                <ToolStatus variant="error" label="Action denied" />
              </div>
              <ExpandableSection
                toggleText={
                  expandedCode["status-error"] ? "Hide code" : "Show code"
                }
                onToggle={() => toggleCode("status-error")}
                isExpanded={expandedCode["status-error"]}
                className="code-expandable"
              >
                <SyntaxHighlighter
                  language="tsx"
                  style={isDarkMode ? oneDark : oneLight}
                  customStyle={{ borderRadius: "4px" }}
                >
                  {`<ToolStatus variant="error" label="Action denied" />`}
                </SyntaxHighlighter>
              </ExpandableSection>
            </div>
          </div>
        </section>

        <section className="page-section">
          <h2>Tool Cards</h2>
          <p className="page-section-intro">
            Tiered approval interface for AI agent actions, with progressive
            governance based on risk level and impact scope.
          </p>
          <div className="page-variant-container">
            <div>
              <div className="tier-description">
                <strong>Info Tier - External Interaction</strong>
                <p>
                  Low-risk actions involving external API calls or data
                  retrieval. Requires user awareness but minimal oversight,
                  typically for read-only operations outside the private
                  environment.
                </p>
              </div>
              <div className="card-frame">
                <ToolCard
                  variant="info"
                  expandableContent="This action will perform a data request outside your cluster. Review subsequent suggestions carefully to ensure cluster security."
                  onPrimaryClick={() => console.log("Info: Continue clicked")}
                  onSecondaryClick={() => console.log("Info: Cancel clicked")}
                />
              </div>
              <ExpandableSection
                toggleText={
                  expandedCode["tool-info"] ? "Hide code" : "Show code"
                }
                onToggle={() => toggleCode("tool-info")}
                isExpanded={expandedCode["tool-info"]}
                className="code-expandable-large"
              >
                <SyntaxHighlighter
                  language="tsx"
                  style={isDarkMode ? oneDark : oneLight}
                  customStyle={{ borderRadius: "4px" }}
                >
                  {`<ToolCard
  variant="info"
  expandableContent="..."
  onPrimaryClick={() => console.log('Info: Continue clicked')}
  onSecondaryClick={() => console.log('Info: Cancel clicked')}
/>`}
                </SyntaxHighlighter>
              </ExpandableSection>
            </div>

            <div>
              <div className="tier-description">
                <strong>Warning Tier - State Change</strong>
                <p>
                  Medium-risk actions that modify system state or configuration.
                  Requires user review and explicit approval before the AI agent
                  can proceed with changes that affect the environment.
                </p>
              </div>
              <div className="card-frame">
                <ToolCard
                  variant="warning"
                  expandableContent="This action will perform a configuration update to your cluster. Please review the changes carefully before applying."
                  checkboxLabel="I understand the changes"
                  onPrimaryClick={() => console.log("Warning: Apply clicked")}
                  onSecondaryClick={() =>
                    console.log("Warning: Cancel clicked")
                  }
                />
              </div>
              <ExpandableSection
                toggleText={
                  expandedCode["tool-warning"] ? "Hide code" : "Show code"
                }
                onToggle={() => toggleCode("tool-warning")}
                isExpanded={expandedCode["tool-warning"]}
                className="code-expandable-large"
              >
                <SyntaxHighlighter
                  language="tsx"
                  style={isDarkMode ? oneDark : oneLight}
                  customStyle={{ borderRadius: "4px" }}
                >
                  {`<ToolCard
  variant="warning"
  expandableContent="..."
  checkboxLabel="I understand the changes"
  onPrimaryClick={() => console.log('Warning: Apply clicked')}
  onSecondaryClick={() => console.log('Warning: Cancel clicked')}
/>`}
                </SyntaxHighlighter>
              </ExpandableSection>
            </div>

            <div>
              <div className="tier-description">
                <strong>Danger Tier - Critical Approval Required</strong>
                <p>
                  High-risk actions with potentially destructive or irreversible
                  consequences. Requires explicit acknowledgment via checkbox
                  confirmation, ensuring users understand the gravity before the
                  AI agent executes critical operations.
                </p>
              </div>
              <div className="card-frame">
                <ToolCard
                  variant="danger"
                  expandableContent="This action will perform a critical update to your cluster. This operation cannot be undone and may result in data loss."
                  onPrimaryClick={() => console.log("Danger: Approve clicked")}
                  onSecondaryClick={() => console.log("Danger: Cancel clicked")}
                />
              </div>
              <ExpandableSection
                toggleText={
                  expandedCode["tool-danger"] ? "Hide code" : "Show code"
                }
                onToggle={() => toggleCode("tool-danger")}
                isExpanded={expandedCode["tool-danger"]}
                className="code-expandable-large"
              >
                <SyntaxHighlighter
                  language="tsx"
                  style={isDarkMode ? oneDark : oneLight}
                  customStyle={{ borderRadius: "4px" }}
                >
                  {`<ToolCard
  variant="danger"
  expandableContent="..."
  onPrimaryClick={() => console.log('Danger: Approve clicked')}
  onSecondaryClick={() => console.log('Danger: Cancel clicked')}
/>`}
                </SyntaxHighlighter>
              </ExpandableSection>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
