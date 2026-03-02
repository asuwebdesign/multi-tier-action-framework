import React from "react";
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
    <div className={`custom-checkbox ${className}`}>
      <input
        type="checkbox"
        id={id}
        className="custom-checkbox__input"
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={id} className="custom-checkbox__label">
        <span
          className={`custom-checkbox__box ${
            isChecked ? "custom-checkbox__box--checked" : ""
          }`}
          aria-hidden="true"
        >
          {isChecked && (
            <RhUiCheckIcon
              className="custom-checkbox__icon"
              aria-hidden="true"
            />
          )}
        </span>
        <span className="custom-checkbox__text">{label}</span>
      </label>
    </div>
  );
};
