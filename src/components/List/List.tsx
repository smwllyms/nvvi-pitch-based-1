import * as React from "react";
import { ListElementStyles, ListStyles } from "./List.css";

interface ListProps {
  style?: React.CSSProperties;
  listElementStyle?: React.CSSProperties;
  children: Array<React.JSX.Element>;
}
export const List = ({
  style,
  listElementStyle,
  children
}: ListProps): React.JSX.Element => {
  return (
    <ul style={{ ...style, ...ListStyles }}>
      {children.map((elem, key) =>
        <li key={key} style={{ ...listElementStyle, ...ListElementStyles }}>{elem}</li>)}
    </ul>
  )
}