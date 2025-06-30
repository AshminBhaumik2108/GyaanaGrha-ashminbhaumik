import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Sidebar from "./components/sidebar/sidebar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Neighourhoodengine from "./components/neighourhoodengine/neighourhoodengine.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import Myarea from "./components/myarea/myarea.jsx";

function App() {
  const [count, setCount] = useState(0);

  // I have use sidebar again and again for padding purpose... 
  // Else : It can be used only once at the top...

  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/neighborhood-fit-engine"
            element={
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Neighourhoodengine />
              </div>
            }
          />
          <Route
            path="/my-area"
            element={
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Myarea />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
