import React, { useState } from "react";
import { POST_SERVICE, GET_SERVICE } from '../services/backend';
import styles from "./css/createPost.module.css";
import gallery from "../../assets/gallery.svg";

import dummy from "../../assets/dummy.svg";
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../redux/slice';

//components
import Button from "../common/Button";
import MainContainer from "../common/MainContainer";

const CreatePost = (props) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const [post, setPost] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  const getPosts = async () => {
    try {
      const response = await GET_SERVICE(`/posts/customer-feed?page=0&size=10`);

      if (response.status === 200) {
        const newPosts = response.data.data.data.filter(
          post => !allPosts.some(existingPost => existingPost.postId === post.postId)
        );

        dispatch(setPosts([...newPosts.reverse(), ...allPosts])); // Add new posts to the top
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const uploadMedia = async () => {
    if (media !== null) {
      const data = new FormData();
      data.append("file", media);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "doyfcutvb");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/doyfcutvb/${media.type.startsWith('image/') ? 'image' : 'video'}/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        return res.secure_url;
      } catch (error) {
        console.error(`Error uploading ${media.type.startsWith('image/') ? 'image' : 'video'}:`, error);
        throw error;
      }
    }
    return null;
  };

  const addPost = async () => {
    try {
      const mediaUrl = await uploadMedia();

      const endpoint = '/posts';
      const body = {
        "imageOrVideoUrl": mediaUrl,
        "caption": post,
        "postType": media.type.startsWith('image/') ? "Image" : "Video"
      }

      const response = await POST_SERVICE(endpoint, body);
      if (response.status === 200) {
        setMedia(null);
        setPost("");
        getPosts();
        setPreview(null);
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    setMedia(file);
    if (file) {
      const mediaUrl = URL.createObjectURL(file);
      setPreview(mediaUrl);
      setPreviewType(file.type); 
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.dropdown_container}>
          <img src={dummy} alt="" />
          <select name="list" id="cars">
            <option value="Everyone">Everyone</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <Button
          className={styles.button}
          loading={props.loading}
          click={addPost}
        >
          Post
        </Button>
      </div>

      <div className={styles.text_container}>
        <input
          placeholder="Say something..."
          name="say"
          id=""
          cols="50"
          rows="20"
          className={preview ? styles.input_preview : styles.input}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        {preview && (
          <>
            {media.type.startsWith('image/') ? (
              <img src={preview} alt="preview" className={styles.preview_image} />
            ) : media.type.startsWith('video/') ? (
              <video controls className={styles.preview_video}>
                <source src={preview} type={previewType} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Unsupported media type</p>
            )}
          </>
        )}
        <div className={styles.postfolder}>
          <label htmlFor="file">
            <img src={gallery} alt="" />
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
