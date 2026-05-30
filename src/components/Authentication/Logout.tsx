import React, { useEffect } from "react";
import { logout } from "../../services/userServices";

const Logout = () => {
  useEffect(() => {
    logout();
    //window.location.href = "/";
    window.location.assign("/");
  }, []);

  return null;
};

export default Logout;
