import { createContext, useContext } from "react";

const darkModeContext = createContext();

const {} = useContext(darkModeContext);

function themeProvider() {
  return <div></div>;
}

export default themeProvider;
