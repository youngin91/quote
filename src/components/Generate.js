import React from "react";
import { FaQuoteLeft, FaTwitter } from "react-icons/fa";
import { localQuotes } from "../data/localQuotes";
import "./generate.css";
const cors =require("cors");


function Generate({ state }) {
  const [localState, setLocalState] = React.useState({
    data: [],
    islongQuote: true,
    longQuote: "long_quote",
    small: "small",
    clicked: false
  });

  async function geet() {
    cors({
      origin: "*"
    })
    const apiURL = "/.netlify/functions/api";
    const win = window.innerWidth;
    try {
      const res = await fetch(apiURL,{mode:`cors`});
      await res.json().then((data) => (localState.data = data));
      localState.clicked = true;
      if (localState.data[0].q.length > 50 && win > 900) {
        setLocalState({
          ...localState,
          islongQuote: true,
          longQuote: "long_quote",
          small: "small"
        });
      } else {
        setLocalState({
          ...localState,
          islongQuote: false,
          longQuote: "",
          small: ""
        });
      }
    } catch (err) {
      localState.data[0].q = `there was an error!!! ${err}`;
    }
  }
  function getLocalQuote() {
    const chosenQuote = Math.floor(Math.random(0) * localQuotes.length);
    localQuotes[chosenQuote].q.length > 50
      ? (state = {
          ...state,
          islongQuote: true,
          longQuote: "long_quote",
          small: "small",
          err: ""
        })
      : (state = { ...state, islongQuote: false, longQuote: "", small: "" });
    state = {
      ...state,
      quote: localQuotes[chosenQuote].q,
      author: localQuotes[chosenQuote].a
    };
    return state;
  }
  let localStore = React.useRef(getLocalQuote());
  if (localStore.current.longQuote === "long_quote" && state.clicked) {
    localStore.current = { ...localState };
  }

  function tweet() {
    let quote;
    let author;
    if (localState.clicked) {
      quote = localState.data[0].q;
      author = localState.data[0].a;
    } else {
      quote = localStore.current.quote;
      author = localStore.current.author;
    }
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetURL, `_blank`);
  }

  return (
    <div className="text">
      <div className="text__text">
        <h1 className={`${localStore.current.longQuote}`}>
          <FaQuoteLeft
            className={`text__icon-quote ${localStore.current.small}`}
          />
          {!localState.clicked && localStore.current.quote}
          {localState.clicked && localState.data[0].q}
        </h1>
      </div>
      <div className={`text__author ${localStore.current.longQuote}`}>
        <em>
          {!localState.clicked && localStore.current.author}
          {localState.clicked && localState.data[0].a}
        </em>
      </div>
      <div className="text__social">
        <button className="text__btn-icon text__btn" onClick={tweet}>
          <FaTwitter className="text__icon-twitter" />
        </button>
        <button className="text__btn btn__new" onClick={() => geet()}>
          new quote
        </button>
      </div>
      <div className="link">
        <a
          href="https://zenquotes.io/"
          rel="noopener noreferrer"
          target="_blank"
        >
          ZenQuotes API
        </a>
      </div>
    </div>
  );
}

export default Generate;
