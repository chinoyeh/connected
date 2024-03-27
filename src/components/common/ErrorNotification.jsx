import React from 'react';

//styles import
import styles from './css/notification.module.css'


//resource import
import danger from '../../assets/danger.svg'

const ErrorNotification = (props) => {
    return (
        <div className={props.show?styles.error: styles.hide}>
      
     
            <div className={styles.error_header}>

            <img src={danger} alt={danger}/>
            <h3>Error message.</h3>

            </div>
            <p>{props.content}</p>
        </div>
    );
};

export default ErrorNotification;