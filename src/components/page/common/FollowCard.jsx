import React from "react";

//styles
import styles from "./css/followcard.module.css";
import ProfileImage from "./ProfileImage";
import Button from "../../common/Button";
 
const FollowCard = (props) => {
  return (
    <div className={styles.content} onClick={props.click}>
      <div className={styles.header_content}>
       <ProfileImage image={props.image}/>
        <div className={styles.header}>
          <h2>{props.name}</h2>
          <p>
            {props.message}<span>{props.time}</span>
          </p>
        </div>
      </div>
      <div className={styles.button_container}>
      {props.showMessage &&
       <Button 
       className={styles.button_message} click={props.message}>Message</Button>

      }
      {props.showFollow &&
            <Button 
            className={styles.button_follow} click={props.follow}>Follow</Button>

      }
      {props.showUnfollow &&
    <Button 
    className={styles.button_follow} click={props.unfollow}>Unfollow</Button>
      }
      </div>
    </div>
  ); 
};

export default FollowCard;
