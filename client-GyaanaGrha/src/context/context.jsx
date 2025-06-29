import { createContext, useContext, useState, useEffect } from "react";
// import generateAIContent from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {    
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  //   useEffect(() => {
  //     onSent("What is React JS?");
  //   }, []);
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
