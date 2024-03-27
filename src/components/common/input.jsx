import React from 'react';

//styles import
import styles from './css/input.module.css'

const Input = (props) => {
    return (
        <div className={styles.form_input}>
            <p>{props.name}</p>
            <div className={props.error? styles.error_input:styles.input_container}>
                {props.icon &&
                <img src={props.icon} alt="icon"/>
                }
                <input value={props.value} type={props.type} onChange={props.change} placeholder={props.placeholder}/>
                {props.iconTwo &&
                <img className={styles.icontwo}  src={props.iconTwo} alt="icon" onClick={props.click}/>
                }
            </div>
            {props.error &&
            <p className={styles.error}>{props.error}</p>

            }
            
        </div>
    );
};

export default Input;