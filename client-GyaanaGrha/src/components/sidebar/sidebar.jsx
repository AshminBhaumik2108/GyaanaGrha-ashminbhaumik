import React, { useState, useContext, useEffect } from "react";
// Importing the CSS file of the Sidebar Component...
import "./sidebar.css";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllPrompts } from "../../api/prompt/prompt.js";
import { Context } from "../../context/context.jsx";
import { fetchPrompts, deleteData } from "../../api/prompt/fetchPrompt.js";
import NeighourhoodEngine from "../neighourhoodengine/neighourhoodengine.jsx";

const sidebar = ({ data }) => {
  // Context :
  // Context API : to access the functions and variables from the context...
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    setPrevPrompts,
    extended,
    setExtended,
  } = useContext(Context);
  // Fo the Navigation of the application we re using it....
  const navigate = useNavigate();
  // State variable for the sidebar component...
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
        <div style={{ display: "flex", alignItems: "center", gap: "40px"}}>
          <img
            onClick={() => setExtended(!extended)}
            src={"https://www.svgrepo.com/show/94793/menu-button-of-three-horizontal-lines.svg"}
            alt = "imgtest"
            className="menu"
          />
          {extended ? (
            <img
              onClick={() => navigate("/")} // dashboard Page...
              src={assets.gyaanagrha}
              alt = "imgtest"
              className="logo"
              style={{ width: "11vh", cursor: "pointer" }}
            />
          ) : null}
        </div>
        {/* For the New Chat function : onClick() */}

        <div
          className="new-chat"
          onClick={() => navigate("/mgpt-ashminbhaumik")}
        >
          <img src={assets.plus} alt = "imgtest" className="plus" />
          {/* If the sidebar is extended, show the text or return null */}
          {/* It will keep only the PNG and the text will be Omited... */}
          {extended ? <span>Chat with MGPT AI</span> : null}
        </div>

        {/* for the Recent Entry : If extended = false, return null else show the whole div... */}
        {extended ? (
          <div
            className="recent"
            style={{ display: "flex", flexDirection: "column", width: "10vw" }}
          >
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
                alt = "imgtest"
              />
              <p>Neighborhood Fit Area</p>
            </div>
            <div className="recent-entry" onClick={() => navigate("/my-area")}>
              <img
                src={"https://cdn-icons-png.freepik.com/512/7835/7835563.png"}
                alt = "imgtest"
              />
              <p>My Areas</p>
            </div>
            <div
              className="recent-entry"
              onClick={() => navigate("/my-favourites")}
            >
              <img
                src={
                  "https://similarpng.com/_next/image?url=https%3A%2F%2Fimage.similarpng.com%2Ffile%2Fsimilarpng%2Fvery-thumbnail%2F2020%2F08%2FEmoji-social-media-Reaction-heart-icon-vector-PNG.png&w=3840&q=75"
                }
                alt = "imgtest"
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
                alt = "imgtest"
              />
              <p>Interactive Map Layer</p>
            </div>
            <div
              className="recent-entry"
              onClick={() => navigate("/wsm-ashminbhaumik")}
            >
              <img
                src={"https://cdn-icons-png.flaticon.com/512/8618/8618881.png"}
                alt = "imgtest"
              />
              <p>Weight Score Model</p>
            </div>
            <div
              className="recent-entry"
              // onClick={() => window.open("https://docs.google.com/document/d/1Z7lHovSDx-CUgLqO6Uvv_5NLutn8gDzedkjWCStKYUM/edit?usp=sharing")}
              onClick={() => {
                window.open(
                  "https://drive.google.com/drive/folders/1h1N1mR8DmhoHu53wR5e3UVAJWBlGpDik?usp=sharing", '_blank'
                  // "_blank" : helps me not to navigate the Current Page...
                )
              }}
            >
              <img
                src={"https://cdn-icons-png.freepik.com/512/7519/7519062.png"}
                alt = "imgtest"
              />
              <p>Docs. of Gyaanagrha</p>
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
              {prevPrompts?.slice(0, 10).map((prompt, index) => (
                <div key={index} className="recent-entry">
                  {prompt.input ? (
                    <>
                      <div className="entry-content">
                        <img
                          src={
                            "https://cdn-icons-png.freepik.com/512/8395/8395475.png"
                          }
                          alt = "imgtest"
                        />
                        <p>{prompt.input.slice(0, 18)}</p>
                      </div>
                      <img
                        src={
                          "https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                        }
                        alt = "imgtest"
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
        <div
          className="bottom-item recent-entry-bottom"
          onClick={() => {
            toast.error(
              "✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅\n\nWhatsapp No : +91 9612063328\nLinkedIn : ashmin-bhaumik\nEmail : ashmin.bhaumik03@gmail.com"
            );
          }}
        >
          <img
            src={
              "https://st.depositphotos.com/1432405/51923/v/450/depositphotos_519232122-stock-illustration-help-service-center-icon-color.jpg"
            }
            alt = "imgtest"
          />
          {/* for bottom: Chat */}
          {extended ? <p>Help</p> : null}
        </div>
        <div
          className="bottom-item recent-entry-bottom"
          onClick={() => {
            toast.error(
              "👍 👍 👍 👍 👍 👍 👍 \nJust View Details : Rest Everything Works Normally like an Website"
            );
          }}
        >
          <img
            src={
              "https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png"
            }
            alt = "imgtest"
          />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default sidebar;
