import { useState } from "react";
import "./App.css";
import Generate from "./components/Generate";

function App() {
  const [state, setState] = useState({
    isLongQuote: false,
    longQuote: "",
    quote: "",
    author: "",
    isSmall: false,
    small: "",
    state: false,
    output: "",
    clicked: false
  });

  return <div className="App">{<Generate state={state} />}</div>;
}

export default App;
