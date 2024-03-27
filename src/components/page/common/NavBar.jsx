import React, {useEffect} from "react";
import timeline from "../../../assets/Timeline.svg";
import notify from "../../../assets/Notification.svg";
import { NavLink  , useNavigate} from "react-router-dom";
import { connect, showNotification } from "../../services/websocket";

//style
import styles from "./css/navbar.module.css";

const NavBar = () => {
  const id = sessionStorage.getItem("customerId")
  const navigate = useNavigate()
  const HandleLogout = () => {
    sessionStorage.clear();
    navigate("/")
  };
  
  useEffect(()=>{
    connect (id)
    showNotification()

  }, [id])
  return (
    <div>
      <div className={styles.container}>
        <h1>Connected</h1>
        <div className={styles.image}>
          <button onClick={HandleLogout}>Logout</button>
          <img src={timeline} alt="" />
          <div className={styles.image_container}>
            <img src={notify} alt="logo" />
         {showNotification()!==null &&
            <span className={styles.dot}></span>

         }
            </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
