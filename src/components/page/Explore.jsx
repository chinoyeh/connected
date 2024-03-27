import React, { useState, useEffect, useRef } from "react";
// components
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MainContainer from "../common/MainContainer";
import Search from "./common/Search";
import search from "../../assets/Search.svg";
import { GET_SERVICE } from '../services/backend'
import { setExplore, addExplore } from '../redux/slice';

// styles
import styles from "./css/explore.module.css";
import UserCard from "./message/UserCard";
import ExploreUserCard from "./common/ExploreUserCard";



const Explore = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const posts = useSelector((state) => state.explore)
  const [totalPosts, setTotalPosts] = useState(0)
  const [loading, setLoading] = useState(false)

  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  const postContainerRef = useRef(null);

  const getAllUsers = async () => {
    setUsers([]);
    const endpoint = `/customers/search?page=0&size=10&searchBy=${searchValue.toLowerCase()}`;
    try {
      const response = await GET_SERVICE(endpoint);
      console.log(response)

      if (response.status === 200) {
        setUsers(response.data.data.customer)
 
      }
    }
    catch (err) {
      return err.response
    }
  }
  
  const getAllPosts = async () => {
    setLoading(true)

    try {
      const response = await GET_SERVICE("/posts/customer-explore?size=20")
      console.log(response)


      if (response.status === 200) {
        dispatch(setExplore(response.data.data))

      }
      setLoading(false)

    }
    catch (err) {
      return err.response
    }
  }
  const handleScroll = () => {
    const container = postContainerRef.current;
    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 1 && !loading) {
      getMoreExplore();
    }
  };

  useEffect(() => {
  

    const container = postContainerRef.current; 
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
   
  }, [loading, posts]);
 


  const getMoreExplore = async () =>{
    try {
    
  
        const response = await GET_SERVICE(`/posts/customer-explore?size=20`);
  
        if (response.status === 200) {
          // Filter out duplicate posts
          const newPosts = response.data.data.data.filter(
            post => !posts.some(existingPost => existingPost.postId === post.postId)
          );
  
          console.log(newPosts)
          if (newPosts.length > 0) {
            dispatch(addExplore(newPosts));
          }
        }

    } catch (error) {
      console.error('Error fetching more posts:', error);
    }

  }
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getAllUsers();
  };

  useEffect(() => {
    getAllPosts();

  }, [])
  return (
    <MainContainer>
      <div className={styles.explore}>
        <h3>Explore</h3>
        <Search
          className={styles.searchBar}
          icon={search}
          placeholder="search"
          save={getAllUsers}
          value={searchValue}
          type="text"
          change={(e) => setSearchValue(e.target.value)}

        />

         <div className={styles.contentContainer}>

        {users.length < 1 && (
          <>
           

            {/* <div className={styles.list}>
              <span>Car</span>
              <span>Benz</span>
            </div> */}
            <div className={styles.imageList}  ref={postContainerRef}>
              {
                posts?.length !== 0 &&
                posts.map((post) =>
                  post.pictureOrVideoUrl !== null && (
                    <div className={styles.image_container} key={post.id} onClick={() => navigate('/postdetails', {
                      state: {
                        id: post.postId
                      }
                    })}>
                      <img src={post.pictureOrVideoUrl} alt="images" />
                    </div>
                  )
                )}

            </div>
            {loading &&

              <div className={styles.loader_container}>
                <span className="loader"></span>
              </div>

            }
          </>)}
         </div>
        <div>
          {users.map((user) => (
            <div>
              <ExploreUserCard name={user.username} image={user.profilePicture} click={() => navigate("/profile", { state: { user } })} />
            </div>
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default Explore;
