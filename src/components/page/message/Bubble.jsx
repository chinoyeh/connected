import React from 'react';
 
//styles import
import styles from './css/bubble.module.css'

const Bubble = (props) => {
    return (
        <div className={props.sent? styles.sentContainer:styles.container}>
            {props.children}
            
        </div>
    );
};

export default Bubble;