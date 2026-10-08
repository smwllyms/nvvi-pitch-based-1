import { backgroundLinear } from "../../constants/styles"

const bgColor = "white"

export const HeaderStyles: React.CSSProperties = {
  width: "100%",
  backgroundColor: bgColor,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 15px",
  boxSizing: "border-box",
  boxShadow: "2px 0px 4px black",
  background: backgroundLinear
}

export const HeaderNavigationMenuStyles: React.CSSProperties = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

export const HeaderNavigationItemBaseStyles: React.CSSProperties = {
  height: "100%",
  padding: "0 16px",
  backgroundColor: bgColor,
  background: backgroundLinear,
  boxSizing: "border-box",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

export const HeaderNavigationItemFocusedStyles: React.CSSProperties = {
  filter: "brightness(0.8)"
}