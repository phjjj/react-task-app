import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const wrapper = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 10000,
});
export const modalWindow = style({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  width: "800px",
  height: "max-content",
  maxHeight: "500px",
  overflowY: "auto",
  backgroundColor: vars.color.mainDarker,
  opacity: 0.95,
  borderRadius: 14,
  padding: 20,
  boxShadow: vars.shadow.basic,
  color: vars.color.brightText,
});
export const header = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "40px",
});
export const closeButton = style({
  fontSize: vars.fontSizing.T2,
  cursor: "pointer",
  marginTop: "-20px",
  ":hover": {
    opacity: 0.8,
  },
});
export const title = style({
  fontSize: vars.fontSizing.T2,
  color: vars.color.brightText,
  marginRight: "auto",
  marginBottom: vars.spacing.medium,
});
export const buttons = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 50,
});
export const updateButton = style({
  border: "none",
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.updateButton,
  cursor: "pointer",
  ":hover": {
    opacity: 0.8,
  },
});
export const deleteButton = style({
  border: "none",
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big1,
  backgroundColor: vars.color.deleteButton,
  cursor: "pointer",
  ":hover": {
    opacity: 0.8,
  },
});
export const input = style({
  width: "100%",
  padding: vars.spacing.medium,
  marginBottom: vars.spacing.medium,
  borderRadius: 5,
  border: `1px solid ${vars.color.brightText}`,
  backgroundColor: vars.color.mainDarker,
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T2,
  "::placeholder": {
    color: vars.color.brightText,
  },
  ":focus": {
    outline: "none",
    border: `1px solid ${vars.color.main}`,
  },
});
