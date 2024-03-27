import { useEffect } from "react";
import { React, useState } from "react";
import { useParams } from "react-router-dom";
import MainContainer from "../common/MainContainer";
import { GET_SERVICE } from "../services/backend";
//styles import
import style from "./css/comments.module.css";
//component import
import Button from "../common/Button";
import ProfileImage from "./common/ProfileImage";



const Comment = (props) => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await GET_SERVICE(`/posts/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        setPost(response.data.data);
      } else {
        setLoading(false);
        setPost();
      }
    } catch (error) {
      return error.response;
    }
  };
  useEffect(() => {
    getPosts();
  }, [id]);

  return (
    <MainContainer>
      <div className={style.content}>
        <h1>Post</h1>
        <div className={style.header}>
          <ProfileImage image={null}/>
          <div>
            <h3>{post.username}</h3>
            <p>{post.caption}</p>
          </div>
          <div>
          </div>
        </div>
        <div className={style.postContent}>
          <div className={style.postHeader}>
            <ProfileImage image={null}/>
            <input type="text" placeholder="Post your reply" />
          </div>
          <Button onClick className={style.button}>
            Post
          </Button>
        </div>
      </div>
    </MainContainer>
  );
};

export default Comment;
