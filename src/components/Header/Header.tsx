import * as React from "react";
import {
  HeaderNavigationItemBaseStyles,
  HeaderNavigationItemFocusedStyles,
  HeaderNavigationMenuStyles,
  HeaderStyles
} from "./Header.css";
import { Styled } from "../Styled/Styled";

interface HeaderNavigationItem {
  label: string;
  onClick?: () => void;
}
interface HeaderProps {
  logoElement?: React.JSX.Element;
  navigationItems?: Array<HeaderNavigationItem>;
  style?: React.CSSProperties;
}
export const Header = ({
  logoElement,
  navigationItems,
  style
}: HeaderProps): React.JSX.Element => {
  return (
    <div style={{ ...style, ...HeaderStyles }}>
      <div>{logoElement}</div>
      <div style={HeaderNavigationMenuStyles}>{navigationItems?.map((item, key) => (
        <Styled
          key={key}
          style={HeaderNavigationItemBaseStyles}
          hoverStyle={HeaderNavigationItemFocusedStyles}
          onClick={item.onClick}
        >
          {item.label}
        </Styled>
      ))}</div>
    </div>
  )
}