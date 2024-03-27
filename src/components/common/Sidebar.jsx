import React , {useEffect}from "react";
import { NavLink  , useNavigate} from "react-router-dom";

import logo from "../../assets/small_logo.svg";
import bookmark from "../../assets/Bookmarks.svg";
import home from "../../assets/Home_icon.svg";
import explore from "../../assets/Explore.svg";
import notify from "../../assets/Notification.svg";
import mssg from "../../assets/Message_Icon.svg";
import profileIcon from "../../assets/Profile.svg";
import moreIcon from "../../assets/More.svg";
import profileImage from "../../assets/Profile-Photo.svg";
import detail from "../../assets/details.svg";

//import Componets
import Button from "./Button";
import { connect, showNotification } from "../services/websocket";


//styles import
import styles from "./css/sidebar.module.css";


const Sidebar = (props) => {
 

  const navigate = useNavigate()
  const id = sessionStorage.getItem("customerId")
  
  useEffect(()=>{
    connect (id)
    showNotification()

  }, [id])

  
  return (
    <div className = {styles.sidebarMain}>
    <div className={styles.sidebar}>
      <img className={styles.logo} src={logo} alt="logo" />
      <ul>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <li>
            <img src={home} alt="home" />
            <span>Home</span>
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
            <span>Explore</span>
          </li>
        </NavLink>
        <NavLink
          to="/notification"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <li>
            <div className={styles.image_container}>
            <img src={notify} alt="logo" />
         {showNotification()!==null &&
            <span className={styles.dot}></span>

         }
            </div>
            <span>Notification</span>
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
            <span>Message</span>
          </li>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <li>
            <img src={profileIcon} alt="logo" />
            <span>Profile</span>
          </li>
        </NavLink>
      </ul>
    
      {/* <div className={styles.sidebar_profile}>
        <img src={profileImage} alt="" />
        <div>
          <p>Bradley Ortiz</p>
          <span>@bradley_</span>
        </div>
        <img className={styles.detail} src={detail} alt="" onClick={logoutAction} />
      </div> */}
    </div>
    </div>
  );
};

export default Sidebar;
