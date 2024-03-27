import React from "react";
import { NavLink, useNavigate } from "react-router-dom";


import home from "../../../assets/Home_icon.svg";
import notify from "../../../assets/Notification.svg";
import mssg from "../../../assets/Message_Icon.svg";
import explore from "../../../assets/Explore.svg";

//styles
import styles from "./css/siderbarSmall.module.css";

const SidebarSmall = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <ul className={styles.list}>
      <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <li>
            <img src={home} alt="home" />
          </li>
        </NavLink>
        <NavLink
          to="/notification"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <li>
            <img src={notify} alt="logo" />
          </li>
        </NavLink>
        <NavLink
          to="/message"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <li>
            <img src={mssg} alt="message" />
          </li>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <li>
            <img src={explore} alt="explore" />
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default SidebarSmall;
