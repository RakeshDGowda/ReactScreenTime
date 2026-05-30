import React, { useEffect, useState } from "react";
import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import lock from "../../assets/locked.png";
import LinkOrButton from "./LinkOrButton";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import type { JwtDEtails } from "../../types/types";

const Navbar = () => {
  const [loggedDetails, setIsLoggedIn] = useState<JwtDEtails | null>(null);
  // const [role, setRole] = useState<string | null>("");
  const navigate = useNavigate();

  useEffect(() => {
    let isLoged = authService.getJwt();
    setIsLoggedIn(isLoged);

    console.log("logged", isLoged);
  }, []);

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">ScreenTimeApp</h1>
      </div>
      <div className="align_center navbar_links">
        {!loggedDetails && (
          <>
            <LinkOrButton title="LogIn" link="/login" emoji={idButton} />
            <LinkOrButton title="SignUp" link="/signup" emoji={memo} />
          </>
        )}

        {loggedDetails && loggedDetails.role == "Child" && (
          <LinkOrButton title="Home" link="/" emoji={rocket} />
        )}

        {loggedDetails && loggedDetails.role == "Parent" && (
          <>
            <LinkOrButton title="dashboard" link="/dashboard" emoji={rocket} />
          </>
        )}

        {loggedDetails && (
          <>
            <LinkOrButton
              title="Logout"
              emoji={lock}
              onClick={() => {
                authService.logOut(navigate);
              }}
            />
          </>
        )}

        {/* <LinkWithIcon title="Logout" link="/logout" emoji={lock} /> */}
      </div>
    </nav>
  );
};

export default Navbar;
