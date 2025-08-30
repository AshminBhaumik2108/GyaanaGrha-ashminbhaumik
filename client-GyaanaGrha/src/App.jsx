import { useState, useContext, lazy, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/context.jsx";
import { ToastContainer, toast } from "react-toastify";

// Lazy-loaded components. For the files Components to work properly in the Large Datasets...
const Sidebar = lazy(() => import("./components/sidebar/sidebar.jsx"));
const Neighourhoodengine = lazy(() =>
  import("./components/neighourhoodengine/neighourhoodengine.jsx")
);
const Dashboard = lazy(() => import("./components/dashboard/dashboard.jsx"));
const Myarea = lazy(() => import("./components/myarea/myarea.jsx"));
const Myfavourites = lazy(() =>
  import("./components/favourites/favourites.jsx")
);
const MGPT = lazy(() => import("./components/mgptAI/mgptAI.jsx"));
const GoogleMapComponent = lazy(() =>
  import("./components/googlemaps/googlemaps.jsx")
);
const WSM = lazy(() => import("./components/wsm/wsm.jsx"));

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/neighborhood-fit-engine"
              element={
                <div style={{ display: "flex", height: "100vh" }}>
                  <div style={{ width: "auto", flexShrink: 0 }}>
                    <Sidebar />
                  </div>
                  <div style={{ flex: 1, overflowY: "auto" }}>
                    <Neighourhoodengine />
                  </div>
                </div>
              }
            />
            <Route
              path="/my-area"
              element={
                <div style={{ display: "flex", height: "100vh" }}>
                  <div style={{ width: "auto", flexShrink: 0 }}>
                    <Sidebar />
                  </div>
                  <div style={{ flex: 1, overflowY: "auto" }}>
                    <Myarea />
                  </div>
                </div>
              }
            />
            <Route
              path="/my-favourites"
              element={
                <div style={{ display: "flex", height: "100vh" }}>
                  <div style={{ width: "auto", flexShrink: 0 }}>
                    <Sidebar />
                  </div>
                  <div style={{ flex: 1, overflowY: "auto" }}>
                    <Myfavourites />
                  </div>
                </div>
              }
            />
            <Route
              path="/mgpt-ashminbhaumik"
              element={
                <div style={{ display: "flex", height: "100vh" }}>
                  <div style={{ width: "auto", flexShrink: 0 }}>
                    <Sidebar />
                  </div>
                  <div style={{ flex: 1, overflowY: "auto" }}>
                    <MGPT />
                  </div>
                </div>
              }
            />
            <Route
              path="/maps-ashminbhaumik"
              element={
                <div style={{ display: "flex", height: "100vh" }}>
                  <div style={{ flexShrink: 0, width: "auto" }}>
                    <Sidebar />
                  </div>
                  <div style={{ flex: 1, overflowY: "auto" }}>
                    <GoogleMapComponent />
                  </div>
                </div>
              }
            />
            <Route
              path="/wsm-ashminbhaumik"
              element={
                <div style={{ display: "flex", height: "100vh" }}>
                  <div style={{ width: "auto", flexShrink: 0 }}>
                    <Sidebar />
                  </div>
                  <div style={{ flex: 1, overflowY: "auto" }}>
                    <WSM />
                  </div>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
