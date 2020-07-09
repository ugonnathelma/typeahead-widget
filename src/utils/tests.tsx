import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "theme";

export const withThemeProvider = (component: JSX.Element) => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);
