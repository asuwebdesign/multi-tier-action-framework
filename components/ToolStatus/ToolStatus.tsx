import React from "react";
import { Flex, FlexItem, Spinner } from "@patternfly/react-core";
import { RhUiCheckIcon, RhUiCloseCircleIcon } from "@patternfly/react-icons";
import "./ToolStatus.css";

export type ToolStatusVariant = "loading" | "success" | "error";

interface ToolStatusProps {
  variant: ToolStatusVariant;
  label: string;
}

export const ToolStatus: React.FC<ToolStatusProps> = ({ variant, label }) => {
  const renderIcon = () => {
    switch (variant) {
      case "loading":
        return <Spinner className="tool-status__spinner" />;
      case "success":
        return (
          <RhUiCheckIcon className="tool-status__icon tool-status__icon--success" />
        );
      case "error":
        return (
          <RhUiCloseCircleIcon className="tool-status__icon tool-status__icon--error" />
        );
    }
  };

  return (
    <Flex
      alignItems={{ default: "alignItemsCenter" }}
      gap={{ default: "gapSm" }}
      className="tool-status"
    >
      <FlexItem alignSelf={{ default: "alignSelfCenter" }}>
        {renderIcon()}
      </FlexItem>
      <FlexItem alignSelf={{ default: "alignSelfCenter" }}>
        <span className="tool-status__text">
          {label}
          {variant === "loading" && "..."}
        </span>
      </FlexItem>
    </Flex>
  );
};
