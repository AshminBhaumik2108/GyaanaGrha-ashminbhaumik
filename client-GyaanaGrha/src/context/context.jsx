import { createContext, useContext, useState, useEffect } from "react";
import generateAIContent from "../components/mgptAI/mgptConfig"
// import generateAIContent from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [latitude, setLatitude] = useState(28.6139);
  const [longitude, setLongitude] = useState(77.2090);
  const [stateName, setStatename] = useState("");

  // for the newChat function :
  const newChat = () => {
    setInput("");
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    // Display the Data in the Data Set...
    setResultData(""); // Refresh the resultData state to clear previous results...
    setLoading(true); // Change the loading state to true. So that the animation works...
    setShowResult(true); // Show the result section....
    if (prompt !== undefined) {
      setRecentPrompt(prompt);
    } else {
      setRecentPrompt(input); // Set the recent prompt to the input value....
    }
    // Storing the previous prompts in the prevPrompts state...
    // This will keep the previous prompts in the array by also appending
    // the new input to the array...
    // setPrevPrompts((prev) => [...prev, input]); // Doesn't work for same data...
    setPrevPrompts((prev) => [...prev, input]);

    console.log("Wait for the response ashminbhaumik...");
    setInput(""); // Clear the input field after sending the prompt

    // ACTUAL API CALL :

    let response = "";

      response = await generateAIContent(input);
      //   setRecentPrompt(input); // Set the recent prompt to the input value....

  //   response = `Ashmin Bhaumik is a passionate full-stack developer actively building a 
  //  Gemini AI-powered clone app. He works with React, Tailwind CSS, MongoDB, and Express, 
  //  and has a strong understanding of the MERN stack. He is a quick learner and is hands-on with handling prompts, 
  //  fetching data from APIs, and user interaction logic in real time. He is also a team player, 
  //  and is always eager to learn and grow in the field. He is excited to continue his journey as a 
  //  full-stack developer and contribute to the Gemini AI community.`; // EXAMPLE VALUE FOR THE RESPONSE...

    // TEST SIMULATION :
    // const response = async () => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(
    //         "This is a simulated response from Gemini AI for the prompt: " +
    //           input
    //       );
    //     }, 3000); // This will keep the response in 3 seconds of Delay...
    //   });
    // };

    console.log("Gemini AI Response:", response);
    // console.log("Gemini AI Response:", response);
    console.log("response from gemini ashminbhaumik...."); // Check the response from the Gemini AI... (EXAMPLE)..

    // setInput(""); // Clear the input field after sending the prompt
    function formatResponseWithBoldCaps(text) {
      return text
        .split("\n")
        .map((line) => line.replace(/\b([A-Z]{2,})\b/g, "<strong>$1</strong>"))
        .join("<br />");
    }
    const formattedResponse = formatResponseWithBoldCaps(response);
    setResultData(formattedResponse); // Set the response data to the resultData state
    setLoading(false); // Change the loading state to false

    // console.log("Gemini AI Response");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    stateName,
    setStatename,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
