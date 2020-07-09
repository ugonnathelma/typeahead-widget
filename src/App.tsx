import React from "react";
import { ThemeProvider } from "styled-components";

import Search from "./components/organisms/Search";
import { Body } from "./styles";
import theme from "theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Body>
        <Search />
      </Body>
    </ThemeProvider>
  );
};

export default App;
