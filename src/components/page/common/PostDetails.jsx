import React, { useEffect, useState, useRef } from "react";

//component imports
import { useLocation, useNavigate } from "react-router-dom";
import MainContainer from "../../common/MainContainer";
import {
  GET_SERVICE,
  PUT_SERVICE,
  DELETE_SERVICE,
  POST_SERVICE,
} from "../../services/backend";
import { useSelector, useDispatch } from "react-redux";
import {
  setPostDetails,
  setFollowers,
  setComments,
  addComments,
  selectPostDetails,
} from "../../redux/slice";
import Card from "./Card";
import Modal from "./Modal";
import DateTimeHours from '../../utils/DateTimeHours'
import Button from "../../common/Button";
import ProfileImage from "./ProfileImage";
import FullLoader from '../../common/FullLoader'

//resource import
import back from "../../../assets/back_icon.svg";
import dummy from "../../../assets/dummy.svg";
import deleteIcon from "../../../assets/delete.svg"
//styles import
import styles from "./css/post.module.css";

const PostDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { postDetails, followers } = useSelector((state) => state);
  const customerId = sessionStorage.getItem("customerId");
  const [loadingDelete, setLoadingDelete] = useState(false)
  const allComments = useSelector((state) => state.comments)
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [comment, setComment] = useState("");
  const [postLoading, setPostLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [totalComments, setTotalComments] = useState(0)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false)
  const [commentEdit, setCommentEdit] = useState("")
  const commentContainerRef = useRef(null);
  const handleDropdown = () => {
    setDropdown(!dropdown);
    setModalOpen(!modalOpen);
  };

  const edit = (id)=>{
    setShowEdit(true)
    editComment (id)
  }

  const fetchData = async () => {
    try {
      setPostLoading(true);

      const [postResponse, commentsResponse, followersResponse] = await Promise.all([
        GET_SERVICE(`/posts/${location.state.id}`),
        GET_SERVICE(`/comments?page=0&size=10&postId=${location.state.id}`),
        GET_SERVICE(`/customers/following?page=0&size=10`),
      ]);
      console.log(commentsResponse)
      if (postResponse.status === 200) {
        dispatch(setPostDetails(postResponse.data.data));
      }

      if (commentsResponse.status === 200) {
        console.log(commentsResponse)
        const newComments = commentsResponse.data.data.data.filter(
          comments => !allComments.some(existingComments => existingComments.commentsId === comments.CommentsId)
        );

        if (newComments.length > 0) {
          dispatch(setComments(newComments));
        }

        setTotalComments(commentsResponse.data.data.totalNumberOfElements)
      }

      if (followersResponse.status === 200) {
        dispatch(setFollowers(followersResponse.data.data.data));
      }

      setPostLoading(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getMoreComments = async () => {
    setLoading(true)
    try {
      if (allComments.length < totalComments) {
        setPage(prevPage => prevPage + 1);
        const response = await GET_SERVICE(`/comments?page=${page}&size=6&postId=${location.state.id}`);
        setLoading(false)

        if (response.status === 200) {
          // Filter out duplicate posts
          const newComments = response.data.data.data.filter(
            comments => !allComments.some(existingComments => existingComments.commentsId === comments.CommentsId)
          );

          if (newComments.length > 0) {
            dispatch(addComments(newComments));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching more posts:', error);
    }
  };
const editComment = async (e,id)=>{
  e.preventDefault()
  setLoadingDelete(true)
  const body ={
    "comment": commentEdit
  }
  try{

    const response = await PUT_SERVICE(`/comments/${id}`, body)
    console.log(response)
    if (response.status===200){
      setShowEdit(false)
      fetchData()
      setCommentEdit("")
    }

setLoadingDelete(false)
  }
  catch(err){
    return err.response
  }
}
  const handleReply = async () => {
    const endpoint = "/comments";
    const body = {
      postId: location.state.id,
      comment: comment,
    };

    try {
      const response = await POST_SERVICE(endpoint, body);

      if (response.status === 201) {
        setComment("");
        fetchData();
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };
  
  const deleteComment = async (id) =>{
    const endpoint = `/comments/${id}`;
    setLoadingDelete(true)
   

    try {
      const response = await DELETE_SERVICE(endpoint);
       if (response.status===200){
        dispatch(setComments(allComments.filter(comment => comment.commentId !== id)));
       }
       setLoadingDelete(false)
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  }

  const handleLike = async (postId) => {
    try {
      const response = await PUT_SERVICE(`/posts/like-unlike/${postId}`, {});

      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const unfollow = async (id) => {
    const endpoint = `/friends/un-follow/${id}`;
    try {
      const response = await PUT_SERVICE(endpoint);
      console.log(response);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const follow = async (id) => {
    const endpoint = `/friends/follow/${id}`;
    try {
      const response = await PUT_SERVICE(endpoint);
      console.log(response);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const deletePost = async () => {
  
    const endpoint = `/posts/${customerId}`;
    try {
      const response = await DELETE_SERVICE(endpoint);
      if (response.status===200){
        navigate("/home")

      }

    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };
  const handleScroll = () => {
    const container = commentContainerRef.current;
    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      getMoreComments();
    }
  };

  useEffect(() => {
    const container = commentContainerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loading, allComments]);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainContainer navbar>
      <div className={styles.content}>
        <div className={styles.header} onClick={() => navigate(-1)}>
          <img src={back} alt="icon" />
          <h2>Posts</h2>
        </div>

        {!postLoading ? (
          <>
            <Card
              key={postDetails.postId}
              name={postDetails.name}
              username={postDetails.username}
              caption={postDetails.caption}
              image={postDetails.pictureOrVideoUrl}
              comments={postDetails.commentCount}
              likes={postDetails.likesCount}
              profileImage={postDetails.profilePictureUrl}
              liked={postDetails.likesPost}
              shares={postDetails.sharedCount}
              onLike={() => handleLike(postDetails.postId)}
              onComment={() => setModalOpen(true)}
              onDropdown={handleDropdown}
              followers={followers}
              customerId={postDetails.postOwnerCustomerId}
              unfollow={() => unfollow(postDetails.postOwnerCustomerId)}
              follow={() => follow(postDetails.postOwnerCustomerId)}
              delete={deletePost}
            />
            <div className={styles.comment_header}>
              <div className={styles.profile}>
                <ProfileImage image={null} />
                <input
                  type="text"
                  placeholder="Post your reply"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <Button
                click={handleReply}
                disabled={comment === ""}
                className={styles.button}
              >
                Reply
              </Button>
            </div>
            <div className={styles.comment_container} ref={commentContainerRef}>

              {loading && (
                <div className={styles.loader_content}>
                  <span className="loader"></span>
                </div>
              )}
              {allComments?.map((comment) => (
                <div className={styles.new_comment} key={comment.commentId}>
                  <div className={styles.comment_content}>
                    <ProfileImage image={null} />

                    <div style={{width:"100%"}}>
                      <span>@{comment.commenterUsername}</span>
                       <form className={styles.edit_comment} onSubmit={(e)=> editComment(e, comment.commentId)}>
                                                       
                      <input type="text" placeholder={comment?.comment} value={commentEdit} onChange={(e)=>setCommentEdit(e.target.value)} disable={showEdit}/>
                        </form>

                    </div>
                  </div>
                  <div className={styles.date}>
                    <p>{DateTimeHours(comment.dateCreated)}</p>
                    { comment.commenterCustomerId === customerId &&
                    <div className={styles.imageContainer}>
                 
                       <img src={deleteIcon} alt="delete" onClick={()=>deleteComment(comment.commentId)} />
                        <div onClick={()=> setShowEdit(true)} style={{cursor:"pointer"}}>
                          <i className="fa fa-edit"></i>
                        </div> 

                    </div>
}

                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.loader_container}>
            <span className="loader"></span>
          </div>
        )}

        <Modal
          className={styles.modalContainer}
          contentClassName={styles.modalMain}
          open={modalOpen}
          onSubmit={() => handleReply(comment)}
          cancel={() => setModalOpen(false)}
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
        {loadingDelete &&
      <FullLoader/>

      }
      </div>
    </MainContainer>
  );
};

export default PostDetails;