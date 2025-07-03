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

  return (
    <>
      <div className="main" style={{ padding: "0px 0px" , padding: "relative", justifyContent: "center", alignItems: "center", height: "100vh", width: "80vh", padding: "0px", boxSizing: "border-box"}}>
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
                  How are you today? How can I assist you with my GyaanaGrha?
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
              MGPT is the whisper of two minds dancing in one soul — curious,
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
          paddingTop: "25vh",
          paddingLeft: "180px",
          paddingRight: "30px",
        }}
      >
        <img src={"https://assets.lummi.ai/assets/QmPxwxkKX4ZtVTzoAXxNokAn6kdhHfvH3Z1SooFeGm1hXc?auto=format&w=640"} alt="" style={{width:"100%"}}/>
      </div>
    </>
  );
}
