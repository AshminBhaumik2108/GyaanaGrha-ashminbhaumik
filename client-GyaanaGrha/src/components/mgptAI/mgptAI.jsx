import React, { useContext, useEffect, useState } from "react";
import "./mgptAI.css";
import { Context } from "../../context/context.jsx";
import { assets } from "../../assets/assets.js";
import "./mgptAI.css";

export default function mgptAI() {
  // Importing from the Context provider...
  const {
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
  } = useContext(Context);
  // State variable for the Modal to show...
  const [showModal, setShowModal] = useState(false);
  const message = `No animals were harmed in the creation, development, testing, 
                and deployment of this website. We are committed to ethical digital 
                practices and sustainability in our work.`;

  return (
    <>
      <div className="main" style={{ paddingRight: "0px" }}>
        <div className="nav">
          <p className="nav-titles">MGPT - ashminbhaumik</p>
          <img
            src={
              "https://png.pngtree.com/png-clipart/20240318/original/pngtree-gemini-horoscope-symbol-png-illustration-png-image_14613043.png"
            }
            alt=""
          />
        </div>
        <div className="main-container">
          {/* If showResult = true, show the result else show the cards */}
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span className="greet-text">Hi, Ashmin!</span>
                </p>
                <p className="greet-subtext">
                  How are you today? How can I assist you with MK?
                </p>
              </div>
              <div className="cards">
                {/* We have to make at max 4 cards */}
                {/* 1: */}
                <div className="card">
                  <p className="card-title">
                    Suggest some ways how to make a website for myself
                    <img
                      src={
                        "https://png.pngtree.com/png-clipart/20240318/original/pngtree-gemini-horoscope-symbol-png-illustration-png-image_14613043.png"
                      }
                      alt=""
                    />
                  </p>
                </div>
                {/* 2: */}
                <div className="card">
                  <p className="card-title">
                    Make the best website for my beautiful flowers
                    <img
                      src={
                        "https://png.pngtree.com/png-clipart/20240318/original/pngtree-gemini-horoscope-symbol-png-illustration-png-image_14613043.png"
                      }
                      alt=""
                    />
                  </p>
                </div>
                {/* 3: */}
                <div className="card">
                  <p className="card-title">
                    How to make AI more Attractive
                    <img
                      src={
                        "https://png.pngtree.com/png-clipart/20240318/original/pngtree-gemini-horoscope-symbol-png-illustration-png-image_14613043.png"
                      }
                      alt=""
                    />
                  </p>
                </div>
                {/* 4: */}
                <div className="card">
                  <p className="card-title">
                    Ways for poking my AI
                    <img
                      src={
                        "https://png.pngtree.com/png-clipart/20240318/original/pngtree-gemini-horoscope-symbol-png-illustration-png-image_14613043.png"
                      }
                      alt=""
                    />
                  </p>
                </div>
              </div>
            </>
          ) : (
            // If showResult = true, show the result section for the user Mahak Khandelwal....
            <div className="result">
              <div className="result-title">
                <img src={"https://png.pngtree.com/png-clipart/20240318/original/pngtree-gemini-horoscope-symbol-png-illustration-png-image_14613043.png"} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini} alt="" />
                {/* Till the Data is not loaded, show the loading animation */}
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  // <p dangerouslySetInnerHTML={{ __html:resultData }}>{resultData}</p>
                  // <p>{resultData} </p>
                  // <pre className="response-box">{resultData}</pre>
                  <div
                    className="response-box"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  ></div>
                )}
              </div>
            </div>
          )}

          <div className="main-bottom">
            <div className="search-box">
              {/* onChange : Changes the Value the User typed.. 
            Then Value = {input} -> Shows the Value in input */}
              <input
                onChange={(event) => setInput(event.target.value)}
                value={input}
                type="text"
                placeholder="Ask Anything"
                onKeyDown={(event) => {
                  // Chack for the Value type and how the object is Returned..
                  // console.log(event);
                  // onKeyUp : Fires when a key is released after being pressed (
                  //         -> CTRL(KeyUp) + Enter(KeyDown) = WorkConditions)
                  // onKeyDown : Fires when a key is first pressed down.
                  if (event.key === "Enter") {
                    if (input === "") {
                      alert("Please Enter Something...");
                    } else {
                      onSent();
                      setInput("");
                    }
                  }
                }}
              />
              <div>
                <img src={assets.gallery} alt="" />
                <img src={assets.mic} alt="" />
                {/* Correct usage: calling the function for the Status of the Code... */}
                <img
                  onClick={() => {
                    if (input === "") {
                      alert("Please Enter Something...");
                    } else {
                      onSent();
                      setInput("");
                    }
                  }}
                  src={assets.send}
                  alt=""
                />
              </div>
            </div>
            <p className="bottom-info">
              M-GPT is the whisper of two minds dancing in one soul — curious,
              clever, and forever chasing the wind of possibility
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          paddingLeft: "0px",
          paddingRight: "30px",
        }}
      >
        <h2
          style={{
            fontSize: "1.7rem",
            background: "linear-gradient(16deg, #4b90ff, #ff5546)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            paddingLeft: "200px",
            fontFamily: "revert",
            // paddingRight: "10px",
          }}
        >
          MGPT: Your AI-Powered Relocation Guide
          <br />
          <br />
          Using advanced RAG models and LangChain, <br />
          MGPT understands your academic goals and <br />
          analyzes your current location.
          <br />
          Whether you're preparing for NEET, JEE, or UPSC, <br />
          it recommends ideal study-friendly neighborhoods <br />
          with nearby coaching centers, estimated rental prices <br />
          and learning ecosystems—so you can focus on <br />
          success while we optimize your surroundings.
        </h2>
      </div>
    </>
  );
}
