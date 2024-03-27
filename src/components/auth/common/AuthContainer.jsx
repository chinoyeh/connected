import React from 'react';

//component import
import Button from '../../common/Button';
 
//resources import 
import logo from '../../../assets/full_logo.svg'
import back from '../../../assets/back_icon.svg'
//styles import
import styles from "./css/container.module.css"

const AuthContainer = (props) => {
    return (
        <div className={styles.container}>
           <div className={styles.background}/>
           <div className={styles.content}>
            {props.progress &&
            <img className={styles.progress} src={props.progress} alt="progress"/>

            }
       
             <div className={styles.logo}>
                <div>
                {props.back && 
                <img className={styles.back_icon} src={back} alt ="<" onClick={props.goback}/>
                } 
                </div>
                <img className={styles.logo_icon} src={logo} alt="logo"/>
                <div/>
            </div>
            <div className={styles.header}>
                <h1>{props.heading}</h1>
                <p>{props.subtext}</p>
            </div>
           {props.children}
            <Button className={styles.button} loading={props.loading} click={props.click}>{props.button_text}</Button>
            {props.more

            }
             </div>
       
        </div>
    );
};

export default AuthContainer;