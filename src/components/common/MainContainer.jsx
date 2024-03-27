import {React , useState} from "react";
import Modal from "../page/common/Modal";
import NavBar from "../page/common/NavBar";
import SidebarSmall from "../page/common/SidebarSmall";
import Sidebar from "./Sidebar";



const MainContainer = (props) => {

  
  return (
    <div className="MainContainer">
      {/* <Modal
       open={modalOpen} cancel={handleModalCancel} 
      back/> */}
      <Sidebar createPost click={'/'} />
      {props.navbar && <NavBar />}
    
   
      <SidebarSmall />
      <div className="MainContent">
      {props.children}
      </div>
    </div>
  );
};

export default MainContainer;
