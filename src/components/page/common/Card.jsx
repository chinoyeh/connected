import{ React , useState, useEffect}  from "react";

import { useNavigate } from "react-router-dom";



//component import
import ProfileImage from "../common/ProfileImage"
import option from "../../../assets/option.svg";



import likes from "../../../assets/like.svg";
import unlike from "../../../assets/unlike.svg";
import comment from "../../../assets/comment.svg";
import share from "../../../assets/share.svg";


//styles import
import styles from "./css/card.module.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";



const Card = (props) => {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)


  const customerId =  sessionStorage.getItem('customerId')

  const handleDropdownClick = () => {
    setModalOpen(true);

  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container} key={props.key}>
      {/* <Link to={`/post/${props.working}`} key={props.working}> */}
        <div className={styles.profile}>
          <div className={styles.profile_picture}>
             <ProfileImage image ={props.profileImage}/>
              
            <div>
              <h4>{props.name}</h4>
              <span>@{props.username}</span>
            </div>
          </div>
          <div style={{cursor: "pointer", width:"100px", display:"flex", justifyContent:"flex-end"}}  onClick={handleDropdownClick} >
          <img src={option}style={{cursor:'pointer', width:"4px"}} alt="" />
          </div>
        </div>
         <div onClick={()=>navigate('/postdetails', {
        state: {
          id: props.id
        }
      })} style={{cursor:'pointer'}} >
         <p>{props.caption}</p>
        {props.image !== null && (
          <div className={styles.post}>
            <img src={props.image} alt="" />
            
          </div>
        )}
        {props.video !== null && (
          <div className={styles.post}>
         <video controls >
                <source src={props.video} />
                Your browser does not support the video tag.
              </video>
            
          </div>
        )}

         </div>
      {/* </Link> */}
      <ul className={styles.list}>
        <li>
          {props.liked ? (
            <img src={likes} onClick={props.onLike} />
          ) : (
            <img src={unlike} onClick={props.onLike} />
          )}
          {props.likes}
        </li>
        <li>
          <img src={comment} alt="" onClick={props.onComment} />
          <span>{props.comments}</span>
        </li>
        <li>
          <img src={share} alt="" onClick={props.onShare}/>
          <span>{props.shares}</span>
        </li>
      </ul>
      <Modal
        open={modalOpen}
        cancel={handleModalCancel}
        className={styles.modalContainer}
        contentClassName={styles.modalmain}
        showClose={true}
        children={
            <ul className={styles.modalList}>
              {customerId === props.customerId ?
                 <li onClick={props.delete}>Delete</li>
                 :
                 <>
              {props?.followers?.includes(props.customerId) ?
              <li onClick={props.follow}>Follow</li>
              :
              <li onClick={props.unfollow}>Unfollow</li>

              }
           
                 </>
              }
          
            </ul>
        }
      />
    </div>
  );
};

export default Card;
