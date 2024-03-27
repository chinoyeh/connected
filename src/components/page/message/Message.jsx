import React, { useState, useEffect, useRef } from "react";
import MainContainer from "../../common/MainContainer";
import { GET_SERVICE } from "../../services/backend";
import Search from "../common/Search";
import UserCard from "./UserCard";
import Bubble from "./Bubble";
import { useSelector, useDispatch } from 'react-redux';
import { setChats, setChat, addChat } from '../../redux/slice';
import dummy from '../../../assets/dummy.svg';
import attach from '../../../assets/attach.svg';
import styles from "./css/message.module.css";
import ProfileStory from "../common/ProfileStory";
import FullLoader from '../../common/FullLoader'
import { connect, sendMessage, showMessage } from "../../services/websocket";

const Message = () => {
  const dispatch = useDispatch();
  const allMessages = useSelector((state) => state.chats);
  const allChats = useSelector((state) => state.chat);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatImage, setChatImage] = useState(null);
  const [chatDetails, setChatDetails] = useState({});
  const [totalChats, setTotalChats] = useState(0)
  const chatContainerRef = useRef(null);
  const [page, setPage] = useState(0);
  const [closeChat, setCloseChat] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [chatMs, setChatMs] = useState([])
  const id = sessionStorage.getItem("customerId")


  const getMessages = async () => {
    setLoading(true)
    setCloseChat(false)
    try {
      const response = await GET_SERVICE(`/chat-room?page=0&size=20`);
      if (response.status === 200 && allMessages.length <= 0) {
        dispatch(setChats(response.data.data.data));
      }
      setLoading(false)

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const searchUser = async () => {
    setSearchResults([]);
    const endpoint = `/customers/search?page=0&size=10&searchBy=${search}`;
    try {
      const response = await GET_SERVICE(endpoint);
      if (response.status === 200) {
        setSearchResults(response.data.data.customer);
      }
    } catch (err) {
      console.error('Error searching user:', err);
    }
  };

  const chooseMessage = (messages) => {
    setChatDetails(messages);
    getChats(messages);
    setShowInput(true);
  };

  const getChats = async (messages) => {
    try {
        const response = await GET_SERVICE(`/chat-room/${messages.chatRoomId}/messages?page=0&size=20`);

        if(response.status===200){
          sessionStorage.setItem('totalChats',response.data.data.totalNumberOfElements )
          sessionStorage.setItem('chatPage', 0 )
          setTotalChats(response.data.data.totalNumberOfElements);
          let chats = response.data.data.data;
          console.log(chats)
  
     
          const rearrangedChats = [...chats].reverse();
          const newChats = rearrangedChats.filter(
            chat => !allChats.some(existingChat => existingChat.id === chat.id)
          );
        
         if(newChats.length>0){
          dispatch(setChat(newChats));
          setChatMs(newChats)
         }
       setCloseChat(true)
    
    
        }

    
    } catch (error) {
        console.error('Error fetching chats:', error);
    }
};

  const getMoreChats = async () => {
    setLoadingMore(true)

    try {
      const total = sessionStorage.getItem('totalChats')
      const page = parseInt(sessionStorage.getItem("chatPage"));
      if (allChats.length < total) {
      
        const nextPage = page + 1
        console.log(nextPage)
      
        const response = await GET_SERVICE(`/chat-room/${chatDetails.chatRoomId}/messages?page=${nextPage}&size=20`);
        if (response.status === 200) {
       
          let chats = response.data.data.data;
          const newChats = chats.filter(
            chat => !allChats.some(existingChat => existingChat.id === chat.id)
          );
    
         if(newChats.length>0){
          dispatch(addChat(newChats.reverse()));
         }
         sessionStorage.setItem('chatPage', nextPage)
        }
      }
      setLoadingMore(false)

    } catch (error) {
      console.error('Error fetching more Chats:', error);
    }
  };
  const handleScroll = () => {
    const container = chatContainerRef?.current;
    const { scrollTop, clientHeight } = container;
  
    if (scrollTop <= 1 && !loading) {
      getMoreChats();
    }
  };

  useEffect(() => {
    const container = chatContainerRef?.current;

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };

  }, [allChats]); 

  const updateChat = async (messages)=> {
   
      try {
        const response = await GET_SERVICE(`/chat-room/${messages.chatRoomId}/messages?page=0&size=1`);
    
        if (response.status === 200) {
          const newChats = response.data.data.data.filter(
            chat => !allChats.some(existingChat => existingChat.id === chat.id)
          );
        
          
          dispatch(setChat([ ...allChats ,  ...newChats])); // Add new posts to the top
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
  
  }
  const sendMessageFunction = (e) => {
    e.preventDefault()
    try{
      sendMessage(id, chatDetails.senderCustomerId
        , chatDetails.chatRoomId, chatMessage)
        
         setTimeout(() => {
      setChatMessage("")
      updateChat(chatDetails)

    }, [2000])

        
    }
    catch (err){
      setChatMessage("")
    }

 
 
   


  }
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(()=>{
 
      scrollToBottom()
 
  }, [chatMs])
  useEffect(() => {
    connect(id)
    getMessages()
  

  }, [id]);

  return (
    <MainContainer>
      <div className={styles.container}>
        <div className={styles.users}>
          <div className={styles.header}>
            <h1>Messaging</h1>
            <Search
              value={search}
              change={(e) => setSearch(e.target.value)}
              placeholder="search"
              save={searchUser}
            />
          </div>
          <div className={styles.user_content}>
            {searchResults.map((content) =>
              <UserCard name={content.username} image={content.profilePicture} click={() => chooseMessage(content)} />
            )}
          </div>
          <div className={styles.user_header}>
            <h3>ONLINE USERS</h3>
            <ProfileStory className={styles.story_container} />
          </div>
          <div className={styles.user_content}>
            {allMessages.map((messages) =>
              <UserCard name={messages.fullName} message={messages.lastChatMessage} image={messages.profilePicture} click={() => chooseMessage(messages)} />
            )}
          </div>
        </div>

        <div className={styles.main_container}>
          { !showInput?
            <div className={styles.no_content}>
              No Messages
            </div>
            :
            <div className={styles.message_content}>
              <div className={styles.content_header}>
                <div className={styles.content_header} style={{padding: 0}}>
                  {chatDetails.profilePicture !== null ?
                    <img src={chatDetails?.profilePicture} alt="profile_image" />
                    :
                    <img src={dummy} alt="profile_image" />
                  }
                  <h3>{chatDetails?.fullName}</h3>
                </div>
                <div />
              </div>
             
              <div className={styles.messages}>
            
                <div>
                
                {loadingMore &&
                    <div className={styles.loader_container}>
                      <span className="loader_small"></span>
                    </div>

                  }
                  <div ref={chatContainerRef} className={styles.chat_container}>
                    {allChats.map((chat) =>
                      chat.senderCustomerId === id ?
                        <div className={styles.sentContainer}>
                             <Bubble key={chat.chatRoomId
                        } sent={true}>
                          {chat.message}
                        </Bubble>
                          </div>

                        :
                        <div className={styles.receiveContainer}>
                        <Bubble key={chat.chatRoomId}>
                          {chat.message}
                        </Bubble>
                        </div>
                    )}
                  </div>
               
                </div>
              </div>
            </div>
          }

          {showInput &&
            <div className={styles.input_container} >
              <label htmlFor="file">
                <img src={attach} alt="icon" />
                <input type="file" name="file" accept="image/*" value={chatImage} onChange={(e) => setChat(e.target.files[0])} />
              </label>
              <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
              <div onClick={(e) => sendMessageFunction(e)}>
                <i className="fa fa-send" ></i>
              </div>
            </div>
          }
        </div>
      </div>
      {loading &&
      <FullLoader/>

      }
    </MainContainer>
  );
};

export default Message;
