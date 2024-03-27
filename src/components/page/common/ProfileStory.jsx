import React, { useEffect, useState, useRef } from "react";
import Modal from "./Modal";
import { useSelector, useDispatch } from 'react-redux';
import { setStory, addStory } from '../../redux/slice';
import ProfileImage from "./ProfileImage";
import { GET_SERVICE } from "../../services/backend";
import play from "../../../assets/PlusButton.svg";
import style from "./css/profilestory.module.css";

const ProfileStory = (props) => {
  const dispatch = useDispatch();
  const myStories = useSelector((state) => state.stories);
  const [stories, setStories] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [users, setUsers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const id = sessionStorage.getItem("customerId");
  const fileInputRef = useRef(null);

  const getStory = async (id) => {
    try {
      const response = await GET_SERVICE(`/story/${id}?page=0&size=10&type=ALL`);
      if (response.status === 201) {
        setStories(response.data.data.data);
        setShowStory(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getUsers = async () => {
    try {
      const response = await GET_SERVICE(`/customers/friends-with-story?page=0&size=10 `);
     
      if (response.status === 200) {
        setUsers(response.data.data.data);
    ;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getMyStories = async () => {
    try {
      const response = await GET_SERVICE(`/story/${id}?page=0&size=10&type=ALL`);
      if (response.status === 201) {
        dispatch(setStory(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    getMyStories();
    getUsers()
  }, []);

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  let timer;

  const goToPreviousStory = () => {
    setCurrentStoryIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 0);
    clearTimeout(timer); // Clear timer when manually navigating to previous story
  };

  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prevIndex => prevIndex + 1);
      clearTimeout(timer); // Clear timer when manually navigating to next story
    } else {
      setShowStory(false); // Close the modal if next story doesn't exist
    }

  };

  const startTimer = () => {
    timer = setTimeout(() => {
      goToNextStory();
    }, 15000); // 15 seconds timer
  };

  useEffect(() => {
    startTimer(); // Start the timer when the component mounts
    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [currentStoryIndex]);
  return (
    <div>
      <div className={[style.story_container, props.className].join(" ")}>
        {props.yourstory && (
          <div className={style.createStory}>
            <div className={myStories === [] ? "" : style.image_container_active}>
              <ProfileImage image={null} click={() => getStory(id)} />
            </div>
            <p>Your Story</p>
          </div>
        )}
        {props.playStory && (
          <div className={style.play_content}>
            <div className={style.play}>
              <img src={play} alt="" />
            </div>
            <p>working</p>
          </div>
        )}
             {users.length !== 0 ?
             users.map((user)=>
             
             <div>
             <ProfileImage image={user?.customer?.profilePicture} click={() => getStory(user?.customer?.customerId)} />
             <p>{user?.customer?.fullName}</p>
           </div>
             ): (
          <></>
        )}

      </div>
      <Modal open={showStory} cancel={() => setShowStory(false)} className={style.modal} contentClassName={style.modal_content}>
        <div className={style.image_slider}>
          <div className={style.progress_bar}>
            {stories.map((story, index) => (
              <span
                key={index}
                className={index === currentStoryIndex ? style.dot_active : style.dot}
                onClick={() => setCurrentStoryIndex(index)}
              />
            ))}
          </div>
           <div className={style.story_content}>


           <div onClick={goToPreviousStory} className={style.buttonNext}><i className="fa fa-arrow-circle-left"></i></div>
          <div className={style.story_image_container}>
            <img src={stories[currentStoryIndex]?.postUrl} alt={`Image ${currentStoryIndex}`} />
            <p className={style.caption}>{stories[currentStoryIndex]?.caption}</p>
          </div>
          <div onClick={goToNextStory} className={style.buttonNext}><i className="fa fa-arrow-circle-right"></i></div>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileStory;
