import React, { useState } from "react";
//component import
import Button from '../../common/Button';

//resources import 
import back from '../../../assets/back-arrow.svg'

//styles import
import styles from "./css/ResetContainer.module.css"

const RestContainer = (props) => {
  return (
    <div className={styles.container}>
        <div className={styles.background}/>
        <div className={styles.content}>
        {props.back && 
                <img className={styles.back_icon} src={back} alt ="<" onClick={props.goback}/>
                }
                <div className={styles.header}>
                <h1>{props.heading}</h1>
                <h2>{props.subtext}</h2>
                <p>{props.subtextMore}</p>
            </div>
            
            {props.children}
            {props.more 
}
<Button className={styles.button} loading={props.loading} click={props.click}>{props.button_text}</Button>
        </div>
    </div>
  )
}

export default RestContainer