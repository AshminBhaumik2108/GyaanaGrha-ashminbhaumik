import React from "react";
import Button from "@mui/material/Button";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

export default function dashboard() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f4f9",
      }}
    >
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
              padding: "12px 32px",
              backgroundColor: "#848cfe",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => {
              navigate("/neighborhood-fit-engine");
            }}
          >
            Click to Get Started
          </button>
        </div>
      </div>
      <div className="footer">Developed by : ashmin-bhaumik</div> 
    </div>
  );
}
