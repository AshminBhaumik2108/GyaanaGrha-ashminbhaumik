import { useState , useContext} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Sidebar from "./components/sidebar/sidebar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Neighourhoodengine from "./components/neighourhoodengine/neighourhoodengine.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import Myarea from "./components/myarea/myarea.jsx";
import Myfavourites from "./components/favourites/favourites.jsx";
import MGPT from "./components/mgptAI/mgptAI.jsx";
import GoogleMapComponent from "./components/googlemaps/googlemaps.jsx";
import WSM from "./components/wsm/wsm.jsx";
import { Context } from "./context/context.jsx";

function App() {
  const [count, setCount] = useState(0);

  const { extended } = useContext(Context);

  // I have use sidebar again and again for padding purpose...
  // Else : It can be used only once at the top...
  // flexShrink : Show much a flex item should shrink relative to the rest of the flex items in the flex container... 

  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/neighborhood-fit-engine"
            element={
              <div style={{ display: "flex", height: "100vh" }}>
                <div style={{ width: "auto", flexShrink: 0 }}> {/* here is the use of it... '0' -> So this it will not shrink.....*/}
                  <Sidebar />
                </div>
                <div style={{ flex: 1, overflowY: "auto"}}> {/* If it Overflows, it will scroll */}
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
                <div style={{ flex: 1, overflowY: "auto"}}>
                  <MGPT />
                </div>
              </div>
            }
          />

          <Route
            path="/maps-ashminbhaumik"
            element={
              <div style={{ display: "flex", height: "100vh" }}>
                <div style={{flexShrink: 0, width: "auto" }}>
                  <Sidebar />
                </div>
                <div style={{ flex: 1, overflowY: "auto"}}>
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
      </div>
    </Router>
  );
}

export default App;
