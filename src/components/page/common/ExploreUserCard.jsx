import React from 'react'
//resources import
import dummy from "../../../assets/dummy.svg";

// styles import
import styles from './css/exploreusercard.module.css'

const ExploreUserCard = (props) => {
    return (
        <div className={styles.user} onClick={props.click}>
            {props.image!==null?
               <img src={props.image} alt="profile_image"/>
               :
               <img src={dummy} alt="profile_image"/>

            }
         
            <div className={styles.content}>
                <h1>{props.name}</h1>
                    {props.message &&
                    <p>{props?.message?.slice(0, 15)}...</p>

                    }
                </div> 
            
        </div>
    );
};

export default ExploreUserCard
 