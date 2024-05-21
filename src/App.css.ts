import { createGlobalTheme, style } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    main: "#ffa726",
    mainDarker: "#f57c00",
    mainFaded: "#ffb74d",
    mainFadedBright: "#ffb74da6",
    list: "#35f5f5",
    task: "#f545f5",
    taskhover: "#f5f5a5",
    brightText: "#fdf",
    darkText: "#333",
    secondaryDarkText: "#555",
    secondaryDartTextHover: `#777`,
    selectedTab: "#f5f5",
    updateButton: "#f53f",
    deleteButton: "#f55f",
  },
  fontSizing: {
    T1: "32px",
    T2: "24px",
    T3: "18px",
    T4: "14px",
    P1: "12px",
  },
  spacing: {
    small: "5px",
    medium: "10px",
    big1: "20px",
    big2: "15px",
    listspacing: "30px",
  },
  font: {
    body: "arial",
  },
  shadow: {
    basic: "4px 4px 8px 0px rgba(34, 60, 80, 64)",
  },
  minwidth: {
    list: "250px",
  },
});

export const appContainer = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  height: "max-content",
  width: "100vw",
});

export const board = style({
  display: "flex",
  flexDirection: "row",
  height: "100%",
});

export const buttons = style({
  marginTop: "auto",
  paddingLeft: vars.spacing.big2,
});

export const deleteBoardButton = style({
  border: "none",
  borderRadius: 5,
  width: "auto",
  marginTop: "auto",
  marginLeft: "auto",
  borderBottom: 30,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  backgroundColor: vars.color.mainFaded,
  cursor: "pointer",
  opacity: 0.6,
  minWidth: 150,
  ":hover": {
    opacity: 0.8,
  },
});
export const loggerButton = style({
  border: "none",
  borderRadius: 5,
  width: "max-content",
  marginTop: "auto",
  marginLeft: "15px",
  marginRight: "30px",
  marginBottom: "30px",
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  backgroundColor: vars.color.mainFaded,
  cursor: "pointer",
  opacity: 0.6,
  minWidth: 150,
  ":hover": {
    opacity: 0.8,
  },
});
