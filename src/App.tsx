import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import "react-toastify/dist/ReactToastify.css";
import type { JwtDEtails } from "./types/types";
import LoggedContext from "./contexts/LoggedContext";
import UserContext from "./contexts/UserContext";

function App() {
  const [loggedDetails, setLoggedDetails] = useState<JwtDEtails | null>(null);
  const [reload, setReload] = useState(5);
  return (
    <div className="app">
      <LoggedContext.Provider value={{ loggedDetails, setLoggedDetails }}>
        <UserContext.Provider value={{ reload, setReload }}>
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </UserContext.Provider>
      </LoggedContext.Provider>
    </div>
  );
}

export default App;
