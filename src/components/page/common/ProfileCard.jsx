import React, {useState} from "react";
import Button from "../../common/Button";
import ProfileImage from "./ProfileImage";
import search from "../../../assets/profileshare.svg";
import { GET_SERVICE, PUT_SERVICE, DELETE_SERVICE, POST_SERVICE } from "../../services/backend";
import FollowCard from "./FollowCard";
// style
import styles from "./css/profilecard.module.css";

const ProfileCard = (props) => {
  const [allFollowers, setAllFollowers] = useState([])
  const [allFollowing, setAllFollowing] = useState([])
  const [totalFollowers, setTotalFollowers] = useState(0)
  const [totalFollowing, setTotalFollowing] = useState(0)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [ followerPage, setFollowerPage] = useState(0)
  const asideList = [styles.aside_list, props?.className].join(" ");
  const getFollowers = async () => {
    try {
      const response = await GET_SERVICE(`/customers/following?page=0&size=20`);
      console.log(response)
      if (response.status === 200) {
       setAllFollowers(response.data.data.customer);
       setShowFollowers(true)
       setTotalFollowers(response.data.data.totalSize)
      }

    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const getMoreFollowers = async () => {

    try {



      if (allFollowers.length < totalFollowers) {

        const nextPage = followerPage + 1;

        const response = await GET_SERVICE(`/customers/following?page=${followerPage}&size=20`);


        if (response.status === 200) {
      
          const newFollowers = response.data.data.customer.filter(
            follower => !allFollowers.some(existingFollower => existingFollower.customerId === follower.customerId)
          );
  
          if (newFollowers.length > 0) {
            setAllFollowers((prevFollowers)=> [...newFollowers, ...prevFollowers]);
          }
           setFollowerPage(nextPage)
        }
      }
    }
 
  
    catch (error) {
      console.error('Error fetching more posts:', error);
    }
  };
  const getFollowing = async ()=>{
    try {
      const response = await GET_SERVICE(`/customers/following?page=0&size=20`);
      if (response.status === 200) {
        setAllFollowing(response.data.data.customer);
        setShowFollowing(true)
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

const followersCancel =  ()=>{
  setAllFollowers([])
  setShowFollowers(false)

}
  return  (
    
    <div className={[styles.container, props.containerClass].join(" ")}>
        {showFollowers &&
        <div className={styles.modalContainer}>
             <div className={styles.modalcontent}>
              <div className={styles.header}>
                <h3>Followers</h3>
               <div onClick={()=>setShowFollowers(false)}>
               <i className="fa fa-close"></i>
               </div>
                </div>
                {allFollowers.map((follower)=>
     
             <FollowCard name={follower.fullName } image={follower.profilePicture} />
                )

                }

              </div>
          </div>


        }
          {showFollowing &&
        <div className={styles.modalContainer}>
             <div className={styles.modalcontent}>
              <div className={styles.header}>
                <h3>Following</h3>
               <div onClick={()=>setShowFollowing(false)}>
               <i className="fa fa-close"></i>
               </div>
                </div>
                {allFollowing.map((following)=>
     
             <FollowCard name={following.fullName } image={following.profilePicture} />
                )

                }

              </div>
          </div>


        }
        
      <div className={styles.header}>
        <div className={[styles.header_image, props.imgClass].join(" ")}>
          <ProfileImage image={null}/>
    
        </div>
        <h3>{props?.profileDetails?.fullName || ""}</h3>
        <p>@{props?.profileDetails?.username || ""}</p>
    
          {props.user === undefined &&
               <div className={styles.share}>
               <Button
                 className={styles.button}
                 loading={props?.loading}
                 click={props?.click}
               >
                 Edit
               </Button>
               <img src={search} alt="" />
             </div>

          }
      </div>

      <ul className={asideList}>
        <li>
          {props?.profileDetails?.numberOfPosts || 0}
          <p>Posts</p>
        </li>
        <span>.</span>
        <li onClick={()=>getFollowers()}>
          {props?.profileDetails?.followers || 0}
          <p>Followers</p>
        </li>
        <span>.</span>
        <li onClick={()=>getFollowing()}>
          {props?.profileDetails?.following || 0}
          <p>Followings</p>
        </li>
      </ul>
    </div>
  
  );
};

export default ProfileCard;
