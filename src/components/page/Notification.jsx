import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../common/MainContainer";
import Aside from "../common/Aside";
import { useNavigate } from "react-router-dom";
import { GET_SERVICE, PUT_SERVICE } from "../services/backend";
import { useSelector, useDispatch } from 'react-redux';
import { setNotification, addNotification } from '../redux/slice';

//style
import styles from "./css/notification.module.css";
import FollowCard from "./common/FollowCard";

//component import
import FullLoader from '../common/FullLoader'



const Notification = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalNotification, setTotalNotification] = useState(0)
  const [page, setPage] = useState(1);
  const navigate = useNavigate()
  const allNotification = useSelector((state) => state.notifications);
  const id = sessionStorage.getItem("customerId")
  const notificationContainerRef = useRef(null);

  const getNotifications = async () => {

    setLoading(true)

    try {
      const response = await GET_SERVICE(`/notifications?page=0&size=20`);
      

  


      if (response.status === 200) {
   

        if (allNotification.length <= 0) {
          const newNotification = response.data.data.data.filter(
            notification => !allNotification.some(existingNotification => existingNotification.notificationId === notification.notificationId)
          );

          dispatch(setNotification(newNotification));
         
        }

     
        setTotalNotification(response.data.data.totalNumberOfElements)



      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching Notification:', error);
    }

  };
  const getMoreNotifications = async () => {
    
    try {
      if (allNotification.length < totalNotification) {
        setPage(prevPage => prevPage + 1);
        const response = await GET_SERVICE(`/notifications?page=${page}&size=20`);
  
  
        if (response.status === 200) {
          // Filter out duplicate Notification
          const newNotification = response.data.data.data.filter(
            post => !allNotification.some(existingPost => existingPost.postId === post.postId)
          );
  
          if (newNotification.length > 0) {
            dispatch(addNotification(newNotification));
          }
        }
      }
     
    } catch (error) {
      console.error('Error fetching more Notification:', error);
    }
  };
  const handleScroll = () => {
    const container = notificationContainerRef.current;
    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 1 && !loading) {
      getMoreNotifications();
    }
  };

  const redirect = async(id, postId)=>{

    try {
    
        const response = await PUT_SERVICE(`/notifications/${id}`);
  
  
        if (response.status === 200) {
          navigate('/postdetails', {
            state: {
              id: postId
            }
          })
        }
  
     
    } catch (error) {
      console.error('Error fetching more Notification:', error);
    }

  }

  useEffect(() => {
  

    const container = notificationContainerRef.current; 
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
   
  }, [ allNotification]);
  useEffect(()=>{
      getNotifications()
  }, [])
  return (
    <MainContainer>
      <div className={styles.content}>
        <h1>Notification</h1>
        <div className={styles.header}>
          <h3>Priority</h3>
        </div>
         <div ref={notificationContainerRef}>
         {allNotification?.length !== 0 ? (
          <div>
            {allNotification.map((notification) => (
              notification.notificationType === 'POST_COMMENT'?
              <FollowCard
              key={notification.notificationId}
              id={notification.notificationId}
              name={notification.commentNotificationDao.commenterUsername
                }
              message={`${notification.commentNotificationDao.commenterUsername} commented on your post`}
              image={notification.commentNotificationDao.commenterProfilePicture}
              click={()=>redirect(notification.notificationId, notification.commentNotificationDao.postId)}
              />
              :
              <FollowCard
              key={notification.notificationId}
              id={notification.notificationId}
              name={notification.commentNotificationDao.commenterUsername
                }
              message={`${notification.commentNotificationDao.commenterUsername} commented on your post`}
              image={notification.commentNotificationDao.commenterProfilePicture}
              showFollow={true}
              />
            ))}
          </div>
        ) : (
          <div className={styles.no_content}>
            <h4>No Notification</h4>
          </div>
        )}
         </div>
      </div>
      <Aside mainprofile />
       {loading && 
         <FullLoader/>

       }
    </MainContainer>
  );
};

export default Notification;
