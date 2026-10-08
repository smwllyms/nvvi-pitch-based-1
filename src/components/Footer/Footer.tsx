import * as React from "react";
import { FooterStyles } from "./Footer.css";

interface FooterProps {
  children: Array<React.JSX.Element>;
  style?: React.CSSProperties;
}
export const Footer = ({
  children,
  style
}): React.JSX.Element => {
  return (
    <div style={{ ...style, ...FooterStyles }}>{children}</div>
  )
}