"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Label,
  Button,
  Checkbox,
  ExpandableSection,
  Flex,
  FlexItem,
  Truncate,
} from "@patternfly/react-core";
import {
  RhUiLanguageFillIcon,
  RhUiWarningFillIcon,
  RhUiErrorFillIcon,
} from "@patternfly/react-icons";
import "./ToolCard.css";

export type ToolCardVariant = "info" | "warning" | "danger";

interface ToolCardProps {
  variant: ToolCardVariant;
  title?: string;
  labelText?: string;
  description?: string;
  expandableContent?: React.ReactNode;
  expandableToggleText?: string;
  disclaimer?: string;
  checkboxLabel?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const variantConfig = {
  info: {
    icon: RhUiLanguageFillIcon,
    iconLabel: "External interaction tier",
    labelStatus: "info" as const,
    buttonVariant: "primary" as const,
    defaultLabelText: "External interaction",
    defaultTitle: "External request",
    defaultDescription:
      "This action will perform a data request outside your cluster.",
    defaultPrimaryButtonText: "Continue",
    defaultCheckboxLabel: undefined,
    defaultDisclaimer:
      "Disclaimer: This tool accesses external content. Review subsequent suggestions carefully to ensure cluster security.",
    headerClass: "tool-card--info",
  },
  warning: {
    icon: RhUiWarningFillIcon,
    iconLabel: "State change tier",
    labelStatus: "warning" as const,
    buttonVariant: "warning" as const,
    defaultLabelText: "State change",
    defaultTitle: "Review required",
    defaultDescription:
      "This action will perform a configuration update to your cluster.",
    defaultPrimaryButtonText: "Apply",
    defaultCheckboxLabel: undefined,
    defaultDisclaimer: undefined,
    headerClass: "tool-card--warning",
  },
  danger: {
    icon: RhUiErrorFillIcon,
    iconLabel: "High risk tier",
    labelStatus: "danger" as const,
    buttonVariant: "danger" as const,
    defaultLabelText: "High risk",
    defaultTitle: "Critical approval required",
    defaultDescription:
      "This action will perform a critical update to your cluster.",
    defaultPrimaryButtonText: "Approve",
    defaultCheckboxLabel: "I understand this action is destructive",
    defaultDisclaimer: undefined,
    headerClass: "tool-card--danger",
  },
} as const;

export const ToolCard: React.FC<ToolCardProps> = ({
  variant,
  title,
  labelText,
  description,
  expandableContent,
  expandableToggleText = "View details",
  disclaimer,
  checkboxLabel = "I understand this action is destructive",
  primaryButtonText,
  secondaryButtonText = "Cancel",
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <Card className={`tool-card ${config.headerClass}`}>
      <CardHeader>
        <CardTitle>
          <Flex
            alignItems={{ default: "alignItemsCenter" }}
            justifyContent={{ default: "justifyContentSpaceBetween" }}
            gap={{ default: "gapMd" }}
            className="tool-card__header-flex"
          >
            <FlexItem className="tool-card__header-left">
              <Flex
                alignItems={{ default: "alignItemsCenter" }}
                gap={{ default: "gapSm" }}
              >
                <FlexItem>
                  <Icon
                    className={`tool-card__icon tool-card__icon--${variant}`}
                    aria-label={config.iconLabel}
                    role="img"
                  />
                </FlexItem>
                <FlexItem className="tool-card__title-container">
                  <Truncate
                    content={title || config.defaultTitle || ""}
                    className="tool-card__title"
                  />
                </FlexItem>
              </Flex>
            </FlexItem>
            <FlexItem>
              <Label status={config.labelStatus} icon={null}>
                {labelText || config.defaultLabelText}
              </Label>
            </FlexItem>
          </Flex>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <p className="tool-card__description">
          {description || config.defaultDescription}
        </p>

        {expandableContent && (
          <ExpandableSection
            toggleText={isExpanded ? "Hide details" : expandableToggleText}
            onToggle={(_event, expanded) => setIsExpanded(expanded)}
            isExpanded={isExpanded}
            className="tool-card__expandable"
          >
            {expandableContent}
          </ExpandableSection>
        )}

        {variant === "info" && (
          <p className="tool-card__disclaimer">
            {disclaimer || config.defaultDisclaimer}
          </p>
        )}

        {variant === "danger" && (
          <Checkbox
            id={`${variant}-checkbox`}
            label={checkboxLabel || config.defaultCheckboxLabel}
            isChecked={isChecked}
            onChange={(_event, checked) => setIsChecked(checked)}
            className="tool-card__checkbox"
          />
        )}
      </CardBody>
      <CardFooter>
        <Flex className="tool-card__actions">
          <FlexItem flex={{ default: "flex_1" }}>
            <Button
              variant="tertiary"
              onClick={onSecondaryClick}
              className="tool-card__button"
            >
              {secondaryButtonText}
            </Button>
          </FlexItem>
          <FlexItem flex={{ default: "flex_1" }}>
            <Button
              variant={config.buttonVariant}
              onClick={onPrimaryClick}
              isDisabled={variant === "danger" && !isChecked}
              className={`tool-card__button tool-card__primary-button tool-card__primary-button--${variant}`}
            >
              {primaryButtonText || config.defaultPrimaryButtonText}
            </Button>
          </FlexItem>
        </Flex>
      </CardFooter>
    </Card>
  );
};
