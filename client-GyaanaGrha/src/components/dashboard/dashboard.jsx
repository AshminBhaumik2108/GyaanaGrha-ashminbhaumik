import React from "react";
import Button from "@mui/material/Button";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

export default function dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="dashboard"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <img
          src={assets.gyaanagrha}
          alt=""
          style={{ width: "10vw", padding: "20px 10px" }}
        ></img>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            width: "100vw",
            flexDirection: "column",
          }}
        >
          <div
            className="greet"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
              width: "100vw",
              flexDirection: "column",
            }}
          >
            <span className="greet-text">Welcome to GyaanaGrha!</span>
            <span className="greet-text">
              Ready to discover the perfect place that fuels your goals and
              supports your journey?
            </span>
            <span className="greet-text">
              Hi, Ashmin! Let’s build your future neighborhood together.
            </span>
            <span className="greet-text"></span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "0vh",
              width: "100vw",
              flexDirection: "column",
              paddingTop: "20px",
            }}
          >
            <button
              style={{
                padding: "20px 30px",
                backgroundColor: "#848cfe",
                color: "#fff",
                border: "none",
                borderRadius: "50px",
                fontFamily: "Poppins",
                fontSize: "1.4rem",
                // fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0.2, 0.4)",
              }}
              onClick={() => {
                navigate("/neighborhood-fit-engine");
              }}
            >
              Click to Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
