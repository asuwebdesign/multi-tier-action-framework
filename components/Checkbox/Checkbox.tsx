import React from "react";
import { Flex, FlexItem } from "@patternfly/react-core";
import { RhUiCheckIcon } from "@patternfly/react-icons";
import "./Checkbox.css";

export interface CheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  isChecked,
  onChange,
  className = "",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event, event.target.checked);
  };

  return (
    <div className={`pf-v6-c-check ${className}`}>
      <input
        type="checkbox"
        id={id}
        className="pf-v6-c-check__input"
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={id} className="pf-v6-c-check__label">
        <Flex
          alignItems={{ default: "alignItemsCenter" }}
          gap={{ default: "gapSm" }}
        >
          <FlexItem className="pf-v6-c-check__box-wrapper">
            <span
              className={`pf-v6-c-check__box ${
                isChecked ? "pf-m-checked" : ""
              }`}
              aria-hidden="true"
            >
              {isChecked && (
                <RhUiCheckIcon
                  className="pf-v6-c-check__icon"
                  aria-hidden="true"
                />
              )}
            </span>
          </FlexItem>
          <FlexItem className="pf-v6-c-check__description">{label}</FlexItem>
        </Flex>
      </label>
    </div>
  );
};
