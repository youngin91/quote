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
    clicked: false,
  });
  let show = "hide";
  const os = ["Win", "Mac", "X11", "Linux"];
  for (let i in os) {
    if (navigator.userAgent.includes(os[i]) ) {
      show = "show"
      break
    }else{
      show = "hide"
    }
  }

  return (
    <div className="App">
      <div className={`app__cp  ${show}`}>
        You can copy and paste quotes by pressing <br/> Left-Ctrl + c (to copy) and
        Left-Ctrl + v (to paste)
      </div>
      {<Generate state={state} />}
    </div>
  );
}

export default App;
