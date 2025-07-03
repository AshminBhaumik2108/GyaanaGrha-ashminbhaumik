import React, { useState, useContext, useEffect } from "react";
// Importing the CSS file of the Sidebar Component...
import "./sidebar.css";
import { assets } from "../../assets/assets.js";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllPrompts } from "../../api/prompt/prompt.js";
import { Context } from "../../context/context.jsx";
import { fetchPrompts, deleteData } from "../../api/prompt/fetchPrompt.js";

const sidebar = ({ data }) => {
  // Context :
  const { onSent, prevPrompts, setRecentPrompt, newChat, setPrevPrompts } =
    useContext(Context);
  // Fo the Navigation of the application we re using it....
  const navigate = useNavigate();
  // State variable for the sidebar component...
  // expand and collapse the sidebar...
  const [extended, setExtended] = useState(true);
  // Context API : to access the functions and variables from the context...
  const queryClient = useQueryClient();

  // Fetch prompts on component mount : i.e. when the component mounts it gets updated by the Changed data...
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPrompts();
      //   console.log(data);
      setPrevPrompts(data?.data);
    };

    fetchData();
  }, [prevPrompts]);

  return (
    <div className="sidebar">
      <div className="top">
        {/* setExtend() function: for the Value to change */}
        {/* onClick = {() => setExtend(!extend)} : for the Value to change */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <img
            onClick={() => setExtended(!extended)}
            src={assets.menu}
            alt=""
            className="menu"
          />
          {extended ? (
            <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              <span>GyaanaGrha</span> {/* Appplication Name */}
            </h2>
          ) : null}
        </div>
        {/* For the New Chat function : onClick() */}

        <div className="new-chat" onClick={() => navigate("/mgpt-ashminbhaumik")}>
          <img src={assets.plus} alt="" className="plus" />
          {/* If the sidebar is extended, show the text or return null */}
          {/* It will keep only the PNG and the text will be Omited... */}
          {extended ? <span>Chat with MGPT AI</span> : null}
        </div>

        {/* for the Recent Entry : If extended = false, return null else show the whole div... */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Components</p>
            {/* Static Recent Entries : */}
            {/* These are the static entries for the recent prompts... */}
            <div
              className="recent-entry"
              onClick={() => navigate("/neighborhood-fit-engine")}
            >
              <img
                src={
                  "https://media.istockphoto.com/id/1432954505/vector/vector-doodle-line-drawing-of-a-house-roof-with-a-heart-and-the-lettering-home-the-concept.jpg?s=612x612&w=0&k=20&c=PbEqCetrX26uHNbYksFHiYeFelWN1QxdAkpxvs5dZ-g="
                }
                alt=""
              />
              <p>Neighborhood Fit Area</p>
            </div>
            <div
              className="recent-entry"
              onClick={() => navigate("/my-favourites")}
            >
              <img
                src={
                  "https://similarpng.com/_next/image?url=https%3A%2F%2Fimage.similarpng.com%2Ffile%2Fsimilarpng%2Fvery-thumbnail%2F2020%2F08%2FEmoji-social-media-Reaction-heart-icon-vector-PNG.png&w=3840&q=75"
                }
                alt=""
              />
              <p>My Favourites</p>
            </div>
            <div
              className="recent-entry"
              onClick={() => navigate("/maps-ashminbhaumik")}
            >
              <img
                src={
                  "https://img.favpng.com/3/23/13/map-icon-png-vector-format-png-favpng-SwT3fkihcFphPUsrfz8zy4RnC.jpg"
                }
                alt=""
              />
              <p>Interactive Map Layer</p>
            </div>
            <div className="recent-entry">
              <img
                src={
                  "https://ngreifer.github.io/WeightIt/logo.png"
                }
                alt=""
              />
              <p>Weight Score Model</p>
            </div>
            <div className="recent-entry">
              <img
                src={
                  "https://www.clipartmax.com/png/middle/239-2399554_community-community-centre-clip-art.png"
                }
                alt=""
              />
              <p>Community Hub</p>
            </div>
          </div>
        ) : null}
        {/* Top Div : Ended */}

        {/* Recent Entries */}
        {/* Where we will see the Data (Statename) for tge values... */}
        {extended ? (
          <>
            <div style={{ paddingTop: "40px", paddingBottom: "10px" }}>
              Recent States search
            </div>
            <div className="recent-state">
              {/* Dynamic Entries fetched by the API from MongoDB : */}
              {prevPrompts?.map((prompt, index) => (
                <div key={index} className="recent-entry">
                  {prompt.input ? (
                    <>
                      <div className="entry-content">
                        <img
                          src={
                            "https://cdn-icons-png.freepik.com/512/8395/8395475.png"
                          }
                          alt=""
                        />
                        <p>{prompt.input.slice(0, 18)}</p>
                      </div>
                      <img
                        src={
                          "https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                        }
                        alt=""
                        className="delete-icon"
                        onClick={async (event) => {
                          // Important Chack: For those Cliks that have a Parrent onClick...
                          event.stopPropagation();
                          //   console.log("Button Clicked...");
                          try {
                            await deleteData(prompt._id); // Delet the prompt..
                            // window.location.reload();
                            // console.log(prompt._id + " has been Deleted");
                          } catch (err) {
                            console.error("Failed to delete prompt:", err);
                          }
                        }}
                      />
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
      {/* Bottom Static Entries :  */}
      <div className="bottom">
        {/* functions : to check for the Value to chenge according to the functions */}
        <div className="bottom-item recent-entry-bottom">
          <img
            src={
              "https://st.depositphotos.com/1432405/51923/v/450/depositphotos_519232122-stock-illustration-help-service-center-icon-color.jpg"
            }
            alt=""
          />
          {/* for bottom: Chat */}
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry-bottom">
          <img
            src={
              "https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png"
            }
            alt=""
          />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default sidebar;
