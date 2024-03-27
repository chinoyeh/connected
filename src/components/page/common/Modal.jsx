import React from "react";
import styles from "./css/modal.module.css";

const Modal = (props) => {
  const modalClasses = `${styles.modal} ${props.className} ${props.open ? "" : styles.hideModal}`;
  const contentClasses = `${styles.modalContent} ${props.contentClassName}`;
  return (
    <div className={modalClasses}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
      >
        <div className={contentClasses} onMouseLeave={()=>props.cancel()}>
          <div className={styles.modal_header}>
           
            <span>{props.header}</span>
             {!props.showClose &&
                <div className={styles.close}>
              <p onClick={props.cancel}>x</p>
            </div>
              
             }
          </div>
          <div></div>
          {props.children}
        </div>
      </form>
    </div>
  );
};

export default Modal;
