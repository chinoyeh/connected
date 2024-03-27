import React, { useState, useEffect, useRef } from "react";
// componenet
import { useLocation } from "react-router-dom";
import MainContainer from "../common/MainContainer";
import Aside from "../common/Aside";
import Card from "./common/Card";
import Tab from "./common/Tab";
import Button from "../common/Button";
import Modal from "./common/Modal";
import ProfileCard from "./common/ProfileCard";
import { useSelector, useDispatch } from 'react-redux';
import { setCustomerPosts, addCustomerPosts, setFollowers } from '../redux/slice';
import { GET_SERVICE, PUT_SERVICE, DELETE_SERVICE, POST_SERVICE } from "../services/backend";
import FullLoader from '../common/FullLoader'

//styless
import styles from "./css/profile.module.css";

//resources import
import dummy from "../../assets/dummy.svg";


const Profile = (props) => {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState(undefined);
  const [page, setPage] = useState(0);
  const [comment, setComment] = useState("")
  const [dropdown, setDropdown] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalFollowers, setTotalFollowers] = useState(0)
  const [totalFollowing, setTotalFollowing] = useState(0)
  const [profileDetails, setProfileDetails] = useState({})
  const [share , setShare]=useState('share')
  const [morePostLoading, setMorePostLoading ] = useState(false)
  const postContainerRef = useRef(null);
  const [allFollowers, setAllFollowers] = useState([])
  const isImage = (url) => {
    const extension = url?.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
  };
  
  const isVideo = (url) => {
    const extension = url?.split('.').pop().toLowerCase();
    return ['mp4', 'webm', 'ogg', 'mov'].includes(extension);
  };
  

  const dispatch = useDispatch();


  const posts = useSelector((state) => state.customerPosts);
  const handleModalCancel = () => {
    setModalOpen(false);
  };
 

  const handleComment = (post) => {
    setPostId(post);
    setModalOpen(true);
    console.log(postId);
  };
  const handleDropdown = () => {
    setDropdown(!dropdown);
    setModalOpen(!modalOpen);
  };
  const getFollowers = async () => {
    try {
      const response = await GET_SERVICE(`/customers/following?page=0&size=20`);
      console.log(response)
      if (response.status === 200) {
       setAllFollowers(response.data.data.customer);
       setTotalFollowers(response.data.data.totalSize)
      }

    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

const getProfileDetails =async ()=>{
  const customerId = sessionStorage.getItem('customerId')
  const user = location.state?.user?.customerId
  setLoading(true)

  try {
    if (user!==undefined){
      const response = await GET_SERVICE(`/customers/${user}`);
    
    if (response.status === 200) {
      
      setProfileDetails(response.data.data);
    }
    }
    else{
      const response = await GET_SERVICE(`/customers/${customerId}`);
      
    if (response.status === 200) {
      
      setProfileDetails(response.data.data);
    }
    }
    setLoading(false)
    
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}
const handleReply = async () => {
  const endpoint = "/comments";
  const body = {
    "postId": postId,
    "comment": comment,

  };
  try{
    const response = await POST_SERVICE(endpoint, body);
    if (response.status===201){
  
      const updatedPosts = posts.map(post => {
        if (post.postId === postId) {
          return {
            ...post,
            commentCount: post.commentCount +1
            
          };
        }
        return post; 
      });
      dispatch(setCustomerPosts(updatedPosts));
      handleModalCancel()
    
};

  }
  catch (err){
    return err.response
  }

}
const sharePost = async (postId) => {
  try {
    const response = await PUT_SERVICE(`/posts/share/${postId}`);

    if (response.status === 200) {
      const updatedPosts = posts.map(post => {
        if (post.postId === postId) {
          return {
            ...post,
            sharedCount:  post.sharedCount + 1,
            
          };
        }
        return post; 
      });
      dispatch(setCustomerPosts(updatedPosts));
    }
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};

  const getPosts = async () => {
    setLoading(true)
    const id = sessionStorage.getItem("customerId")
    const user = location.state?.user?.customerId

   
    
    try {
      if (user!==undefined){
      const response = await GET_SERVICE(`/posts/customer/${user}?page=0&size=10&type=ALL`);

     
   
      if (response.status === 200) {
   

        const newPosts = response.data.data.data.filter(
          post => !posts.some(existingPost => existingPost.postId === post.postId)
        );
       
       if(newPosts.length>0){
        dispatch(setCustomerPosts(newPosts));
       }
       
   

      setTotalPosts(response.data.data.totalNumberOfElements)




    }
    }
    else{
      const response = await GET_SERVICE(`/posts/customer/${id}?page=0&size=3&type=ALL`);
      console.log(response)
      if (response.status === 200) {
    
   

        const newPosts = response.data.data.data.filter(
          post => !posts.some(existingPost => existingPost.postId === post.postId)
        );
       
       if(newPosts.length>0){
        dispatch(setCustomerPosts(newPosts));
       }
       
   

      setTotalPosts(response.data.data.totalNumberOfElements)




    }
   
    }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const getMorePosts = async () => {
    setMorePostLoading(true)
    try {
      const id = sessionStorage.getItem("customerId")
      const user = location.state?.user?.customerId

      if (user!==undefined){
      if (posts.length < totalPosts) {

        const nextPage = page + 1;

        const response = await GET_SERVICE(`/posts/customer/${user}?page=${nextPage}&size=10&type=ALL`);


        if (response.status === 200) {
      
          const newPosts = response.data.data.data.filter(
            post => !posts.some(existingPost => existingPost.postId === post.postId)
          );
  
          if (newPosts.length > 0) {
            dispatch(addCustomerPosts(newPosts));
          }
           setPage(nextPage)
        }
      }
    }
    else {
      console.log(totalPosts , 'total')
      console.log(posts.length, 'length')
      if (posts.length < totalPosts) {
     
        console.log(totalPosts , 'total')
        const nextPage = page + 1;
       
        const response = await GET_SERVICE(`/posts/customer/${id}?page=${nextPage}&size=3&type=ALL`);


        if (response.status === 200) {
      
          const newPosts = response.data.data.data.filter(
            post => !posts.some(existingPost => existingPost.postId === post.postId)
          );
           
          if (newPosts.length > 0) {
            dispatch(addCustomerPosts(newPosts));
          }
           setPage(nextPage)
        }
      }
    }
    setMorePostLoading(false)
  } 
    catch (error) {
      console.error('Error fetching more posts:', error);
    }
  };
   const handleLike = async (postId) => {
    try {
      const response = await PUT_SERVICE(`/posts/like-unlike/${postId}`);
      if (response.status === 200) {
        const updatedPosts = posts.map(post => {
          if (post.postId === postId) {
            return {
              ...post,
              likesCount: post.likesPost ? post.likesCount-1 : post.likesCount + 1,
              likesPost: !post.likesPost 
            };
          }
          return post; 
        });
        dispatch(setCustomerPosts(updatedPosts));
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };
  const unfollow = async (id) => {
    const endpoint = `/friends/un-follow/${id}`
    try {
      const response = await PUT_SERVICE(endpoint)
      console.log(response)

    }
    catch (error) {
      console.error("Error updating like status:", error);
    }
  }
  const follow = async (id) => {
    const endpoint = `/friends/follow/${id}`
    try {
      const response = await PUT_SERVICE(endpoint)
      console.log(response)

    }
    catch (error) {
      console.error("Error updating like status:", error);
    }
  }
  const deletePost = async (postId) => {
    setLoading(true)

    const endpoint = `/posts/${postId}`
    try {

      const response = await DELETE_SERVICE(endpoint)
 
    
      if (response.status===200){
        dispatch(setCustomerPosts(posts.filter(post => post.postId !== postId)));
      

      }
      setLoading(false)

    }
    catch (error) {
      console.error("Error updating like status:", error);
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      const container = postContainerRef.current;
      if (container) {
        const { scrollTop, clientHeight, scrollHeight } = container;
  
        if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
          getMorePosts();
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, posts]);

  useEffect(() => {
    getPosts()
    getFollowers()
    getProfileDetails()



  }, [])

  return (
    <MainContainer navbar>
         
     

      <Modal
        className={styles.modalContainer}
        contentClassName={styles.modalMain}
        open={modalOpen}
        onSubmit={() => handleReply(comment)}
        cancel={handleModalCancel}
        header="Comment"

      >
        <div>
          <div className={styles.modalContent}>
            <img src={dummy} alt="profilepic" />
            <input
              type="text"
              placeholder="Post your reply"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            <Button>Reply</Button>
          </div>
        </div>
      </Modal>

      <div className={styles.content} ref={postContainerRef}>
        <ProfileCard
          containerClass={styles.container} 
          share
          edit
          profileDetails ={profileDetails}
          profilePicture={null}
          user={location?.state?.user?.customerId}
        />
        <Tab
          tabLabels={["ALL", "MEDIA", "COMMUNITY", "CHANNELS"]}
          tabContents={[
            loading === false ?(
              posts?.length !== 0 ?
                 <>
                 {
                  posts?.map((post) =>
                  <>
                    <Card
                      key={post.postId}
                      id={post.postId}
                      name={post.name}
                      username={post.username}
                      caption={post.caption}
                      image={isImage(post.pictureOrVideoUrl) ? post.pictureOrVideoUrl : null}
                      video={isVideo(post.pictureOrVideoUrl) ? post.pictureOrVideoUrl : null}
                      comments={post.commentCount}
                      likes={post.likesCount}
                      liked={post.likesPost}
                      shares={post.sharedCount}
                     
                      onShare={()=>sharePost(post.postId)}
                      onLike={() => handleLike(post.postId)}
                      onComment={() => handleComment(post.postId)}
                      onDropdown={handleDropdown}
                      followers={allFollowers}
                      customerId={post.postOwnerCustomerId}
                      unfollow={() => unfollow(post.postOwnerCustomerId)}
                      follow={() => follow(post.postOwnerCustomerId)}
                      delete={deletePost}
                      profileImage={post.profilePictureUrl}
                    />

                  </>


                )
                 }
                      {morePostLoading &&
             <div className={styles.loader_container}>
             <span className="loader"></span>
           </div>

        }
                 </>
                :
                <div className={styles.no_content}>
                  No Posts

                </div>
            )
              :

              <FullLoader/>
            ,
            loading === false ? (
              posts?.length !== 0 ? (
                <>
                {
                     posts?.map((post) =>
                     post.pictureOrVideoUrl !== null ? (
                       <Card
                         key={post.postId}
                         id={post.postId}
                         name={post.name}
                         username={post.username}
                         caption={post.caption}
                         image={post.pictureOrVideoUrl}
                         comments={post.commentCount}
                         likes={post.likesCount}
                         liked={post.likesPost}
                         shares={post.sharedCount}
                         onLike={() => handleLike(post.postId)}
                         onComment={() => handleComment(post.postId)}
                         onDropdown={handleDropdown}
                         followers={allFollowers}
                         customerId={post.postOwnerCustomerId}
                         unfollow={() => unfollow(post.postOwnerCustomerId)}
                         follow={() => follow(post.postOwnerCustomerId)}
                         delete={deletePost}
                         profileImage={post.profilePictureUrl}
                       />
                       
                     ) : null
                   )
                }
                           {morePostLoading &&
             <div className={styles.loader_container}>
             <span className="loader"></span>
           </div>

        }
                </>
              ) : (
                <div className={styles.no_content}>
                  No Posts
                </div>
              )
            ) : (
              <FullLoader/>
            ),
            <div className={styles.no_content}>
              No Posts
            </div>,
            ,
            <div className={styles.no_content}>
              No Posts
            </div>,
            ,

          ]}
        />
      </div>
      <Aside profile stories />
    </MainContainer>
  );
};

export default Profile;
