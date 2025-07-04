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
      <div
        className="main"
        style={{
          padding: "0px 0px",
          padding: "relative",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "89vw",
          padding: "0px",
          boxSizing: "border-box",
        }}
      >
        <div className="nav">
          <h3
            className="nav-titles"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "black",
            }}
          >
            MGPT AI{" "}
          </h3>
          <img style={{ width: "5vw" }} src={assets.gyaanagrha} alt="" />
        </div>
        <div className="main-container">
          {/* If showResult = true, show the result else show the cards */}
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span className="greet-text">Hi, Ashmin!</span>
                </p>
                <p className="greet-subtext" style={{ color: "black" }}>
                  How are you today? How can I assist you with my Gyaana-grha?
                </p>
              </div>
              <div className="cards">
                {/* We have to make at max 4 cards */}
                {/* 1: */}
                <div className="card">
                  <p className="card-title">
                    Welcome to GyaanaGrha — where every location unlocks a new
                    chapter of your learning journey
                    <img
                      src={
                        "https://cdn-icons-png.freepik.com/512/13078/13078445.png"
                      }
                      alt=""
                    />
                  </p>
                </div>
                {/* 2: */}
                <div className="card">
                  <p className="card-title">
                    Education meets environment — find where your knowledge
                    grows best
                    <img
                      src={
                        "https://cdn-icons-png.freepik.com/512/18577/18577280.png"
                      }
                      alt=""
                    />
                  </p>
                </div>
                {/* 3: */}
                <div className="card">
                  <p className="card-title">
                    Discover places that don't just fit your needs, but fuel
                    your dreams
                    <img
                      src={
                        "https://cdn-icons-png.freepik.com/512/11782/11782442.png"
                      }
                      alt=""
                    />
                  </p>
                </div>
                {/* 4: */}
                <div className="card">
                  <p className="card-title">
                    Smart moves start here — GyaanaGrha helps you live where you
                    learn
                    <img
                      src={
                        "https://cdn-icons-png.freepik.com/512/7831/7831132.png"
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
                <img
                  src={
                    "https://png.pngtree.com/png-clipart/20240318/original/pngtree-gemini-horoscope-symbol-png-illustration-png-image_14613043.png"
                  }
                  alt=""
                />
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
                placeholder="Ask Anything related to NFP, Educational Zones..."
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
    </>
  );
}
