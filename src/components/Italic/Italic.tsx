import * as React from "react";

interface ItalicProps {
  children: string;
}
export const Italic = ({ children }: ItalicProps): React.JSX.Element =>
  <span style={{ fontStyle: "italic" }}>{children}</span>;