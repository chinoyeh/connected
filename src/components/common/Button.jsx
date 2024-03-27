import React from 'react';

//styles import 
import styles from "./css/button.module.css"

const Button = (props) => {
    const containerClasses = [styles.button, props.className].join(' ');
    return (
        <button className={containerClasses} onClick={props.click} disabled={props.disabled}>
      
            {props.loading?
              <div className={styles.loader}/>
            :
            props.children}
        </button>
    );
};
export default Button;