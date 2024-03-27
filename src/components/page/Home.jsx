import React, { useState, useEffect, useRef } from "react";
import Card from "./common/Card";
import MainContainer from "../common/MainContainer";
import CreatePost from "./CreatePost";
import Aside from "../common/Aside";
import ProfileStory from "./common/ProfileStory";
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, addPosts, setFollowers } from '../redux/slice';
import { GET_SERVICE, POST_SERVICE, PUT_SERVICE, DELETE_SERVICE } from "../services/backend";
import Button from "../common/Button";
import FullLoader from '../common/FullLoader'

// images
import dummy from "../../assets/dummy.svg";

//styles import
import styles from "./css/home.module.css";
import Modal from "./common/Modal";

const Home = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const allFollowers = useSelector((state) => state.followers);
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [morePostLoading, setMorePostLoading ] = useState(false)
  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState(undefined);
  const [page, setPage] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const postContainerRef = useRef(null);
  const isImage = (url) => {
    const extension = url?.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
  };
  
  const isVideo = (url) => {
    const extension = url?.split('.').pop().toLowerCase();
    return ['mp4', 'webm', 'ogg', 'mov'].includes(extension);
  };
  

  const handleModalCancel = () => {
    setModalOpen(false);
    setComment("")

  };

  const handleComment = (post) => {
    setPostId(post);
    setModalOpen(true);
  };
  const handleDropdown = () => {
    setDropdown(!dropdown);
    setModalOpen(!modalOpen);
  };
  const getFollowers = async () => {
    setLoading(true)
    try {
      const response = await GET_SERVICE(`/customers/following?page=0&size=20`);
      if (response.status === 200) {
        dispatch(setFollowers(response.data.data.data));
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false)
    }
  };

 

  const getPosts = async () => {
 

    try {
      const response = await GET_SERVICE(`/posts/customer-feed?page=${page}&size=20`);
  console.log(response, 'test')


      if (response.status === 200) {
   

          const newPosts = response.data.data.data.filter(
            post => !allPosts.some(existingPost => existingPost.postId === post.postId)
          );
         
         if(newPosts.length>0){
          dispatch(setPosts(newPosts));
         }
         
     
 
        setTotalPosts(response.data.data.totalNumberOfElements)
 



      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      window.location.reload();
    }

  };
  const handleScroll = () => {
    const container = postContainerRef.current;
    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 1 && !loading) {
      getMorePosts();
    }
  };

  useEffect(() => {
  

    const container = postContainerRef.current; 
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
   
  }, [loading, allPosts]);
 


  const getMorePosts = async () => {

   
    try {

    
      if (allPosts.length < totalPosts) {
        setMorePostLoading(true)
        const nextPage = page +1


        const response = await GET_SERVICE(`/posts/customer-feed?page=${nextPage}&size=20`);
    
  
        if (response.status === 200) {
      
          const newPosts = response.data.data.data.filter(
            post => !allPosts.some(existingPost => existingPost.postId === post.postId)
          );
  
          if (newPosts.length > 0) {
            dispatch(addPosts(newPosts));
          }
           setPage(nextPage)
        }
      }
      setMorePostLoading(false)
    } catch (error) {
      console.error('Error fetching more posts:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await PUT_SERVICE(`/posts/like-unlike/${postId}`);
      if (response.status === 200) {
        const updatedPosts = allPosts.map(post => {
          if (post.postId === postId) {
            return {
              ...post,
              likesCount: post.likesPost ? post.likesCount-1 : post.likesCount + 1,
              likesPost: !post.likesPost 
            };
          }
          return post; 
        });
        dispatch(setPosts(updatedPosts));
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };
  const sharePost = async (postId) => {
    try {
      const response = await PUT_SERVICE(`/posts/share/${postId}`);

      if (response.status === 200) {
        const updatedPosts = allPosts.map(post => {
          if (post.postId === postId) {
            return {
              ...post,
              sharedCount:  post.sharedCount + 1,
              
            };
          }
          return post; 
        });
        dispatch(setPosts(updatedPosts));
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };
  const handleReply = async () => {
    const endpoint = "/comments";
    const body = {
      "postId": postId,
      "comment": comment,

    };
    try{
      const response = await POST_SERVICE(endpoint, body);
      if (response.status===201){
    
        const updatedPosts = allPosts.map(post => {
          if (post.postId === postId) {
            return {
              ...post,
              commentCount: post.commentCount +1
              
            };
          }
          return post; 
        });
        dispatch(setPosts(updatedPosts));
        handleModalCancel()
      
  };

    }
    catch (err){
      return err.response
    }

  }
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
    setLoadingDelete(true)

    const endpoint = `/posts/${postId}`
    try {

      const response = await DELETE_SERVICE(endpoint)
 
    
      if (response.status===200){
        dispatch(setPosts(allPosts.filter(post => post.postId !== postId)));
      

      }
      setLoadingDelete(false)

    }
    catch (error) {
      console.error("Error updating like status:", error);
    }
  }
  useEffect(() => {
    getFollowers();
    getPosts();


  }, []);
  

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
            <Button click={handleReply}>Reply</Button>
          </div>
        </div>
      </Modal>

      <div className={styles.content}>
        <ProfileStory className={styles.story_container} yourstory />
        <CreatePost  />
        <div className={styles.post_container} ref={postContainerRef}>
        {loadingPost &&
             <div className={styles.loader_container}>
             <span className="loader"></span>
           </div>

        }
          {
            allPosts?.length !== 0 &&
            allPosts?.map((post) => (
 
              <Card
              key={post.postId}
              id={post.postId}
              name={post.name}
              username={post.username}
              caption={post.caption}
              image={isImage(post.pictureOrVideoUrl) ? post.pictureOrVideoUrl : null}
              video={isVideo(post.pictureOrVideoUrl) ? post.pictureOrVideoUrl : null}
              comments={post.commentCount}
              profileImage={post.profilePictureUrl}
              likes={post.likesCount}
              liked={post.likesPost}
              shares={post.sharedCount}
              onShare={() => sharePost(post.postId)}
              onLike={() => handleLike(post.postId)}
              onComment={() => handleComment(post.postId)}
              onDropdown={handleDropdown}
              followers={allFollowers}
              customerId={post.postOwnerCustomerId}
              unfollow={() => unfollow(post.postOwnerCustomerId)}
              follow={() => follow(post.postOwnerCustomerId)}
              delete={() => deletePost(post.postId)}
            />
            









            ))

          }
           {morePostLoading &&
             <div className={styles.loader_container}>
             <span className="loader"></span>
           </div>

        }
        </div>
        {loading &&

          <div className={styles.loader_container}>
            <span className="loader"></span>
          </div>

        }
      </div>
      {loadingDelete &&
      <FullLoader/>

      }
      <Aside mainprofile />
    </MainContainer>
  );
};

export default Home;