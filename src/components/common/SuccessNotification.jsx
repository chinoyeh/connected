import React from 'react';

//styles import
import styles from './css/notification.module.css'


//resource import
import success from '../../assets/success.svg'

const SuccessNotification = (props) => {
    return (
        <div className={props.show?styles.success: styles.hide}>
         
            <div className={styles.success_content}>
            <img src={success} alt={success}/>


             
                <p>{props.content}</p>


            </div>
        </div>
    );
};

export default SuccessNotification;