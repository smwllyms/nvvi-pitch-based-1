import * as React from "react";
import { Styled } from "../Styled/Styled";
import { ButtonBaseStyles, ButtonDisabledStyles, ButtonHoverStyles } from "./Button.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}
export const Button = ({
  label,
  onClick,
  style,
  disabled
}: ButtonProps): React.JSX.Element => {

  const computedBaseStyles: React.CSSProperties = {
    ...style,
    ...ButtonBaseStyles,
    ...disabled ? ButtonDisabledStyles : {}
  }

  return (
    <Styled
      elemType={"button"}
      style={computedBaseStyles}
      hoverStyle={!disabled ? ButtonHoverStyles : undefined}
      onClick={!disabled ? onClick : undefined}
    >
      {label}
    </Styled>
  );
}