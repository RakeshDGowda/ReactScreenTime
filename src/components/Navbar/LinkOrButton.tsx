import React from "react";
import "./LinkOrButton.css";
import { Link, NavLink } from "react-router-dom";

const LinkOrButton = ({ title, link, emoji, onClick, sidebar }: any) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={
          sidebar
            ? "align_center nav_like_button sidebar_link"
            : "align_center nav_like_button"
        }
      >
        {title} <img src={emoji} alt="" className="link_emoji" />
      </button>
    );
  }

  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title} <img src={emoji} alt="" className="link_emoji" />
    </NavLink>
  );
};

export default LinkOrButton;
