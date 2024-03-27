import { createSlice } from '@reduxjs/toolkit';


const handleArrayUpdate = (state, action) => {
  return action.payload;
};

const handleArrayAdd = (state, action) => {
  state.push(...action.payload);
};


const handleArrayAddPost = (state, action)=>{
  const newPosts = action.payload.filter(post => !state.some(existingPost => existingPost.postId === post.postId));
  
  return state.concat(newPosts);
}
const handleArrayAddExplore = (state, action)=>{
  const newExplore = action.payload.filter(explore => !state.some(existingExplore => existingExplore.postId === explore.postId));
  
  return state.concat(newExplore);
}
const handleArrayAddCustomerPost = (state, action)=>{
  const newPosts = action.payload.filter(post => !state.some(existingPost => existingPost.postId === post.postId));
  
  return state.concat(newPosts);
}

const handleArrayAddMessages = (state, action) => {
  const newMessages = action.payload.filter(message => !state.some(existingMessage => existingMessage.id === message.id));
  return [ ...newMessages, ...state];
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    setPosts: handleArrayUpdate,
    addPosts: handleArrayAddPost,
  },
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers:{
    setComments: handleArrayUpdate,
    addComments: handleArrayAdd
  }

})

const customerPostsSlice = createSlice({
  name: 'customerPosts',
  initialState: [],
  reducers: {
    setCustomerPosts: handleArrayUpdate,
    addCustomerPosts: handleArrayAddCustomerPost,
  },
});

const followersSlice = createSlice({
  name: 'followers',
  initialState: [],
  reducers: {
    setFollowers: handleArrayUpdate,
    addFollowers: handleArrayAdd,
  },
});

const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState: {},
  reducers: {
    setPostDetails: (state, action) => action.payload,
  },
});

const chatsSlice = createSlice({
  name: 'chats',
  initialState: [],
  reducers: {
    setChats: handleArrayUpdate,
    addChats: handleArrayAdd,
  },
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: [],
  reducers: {
    setChat: handleArrayUpdate,
    addChat: handleArrayAddMessages,
  },
});

const exploreSlice = createSlice({
  name: 'explore',
  initialState: [],
  reducers: {
    setExplore: handleArrayUpdate,
    addExplore: handleArrayAddExplore,
  },
});
const storiesSlice = createSlice({
  name: 'story',
  initialState: [],
  reducers: {
    setStory: handleArrayUpdate,
    addStory: handleArrayAdd,
  },
});

const notificationsSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setNotification: handleArrayUpdate,
    addNotification: handleArrayAdd,
  },
});
 
export const {
  setCustomerPosts,
  addCustomerPosts,
} = customerPostsSlice.actions;
export const customerPostsReducer = customerPostsSlice.reducer;

export const { setPosts, addPosts } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

export const { setFollowers, addFollowers } = followersSlice.actions;
export const followersReducer = followersSlice.reducer;

export const { setPostDetails } = postDetailsSlice.actions;
export const postDetailsReducer = postDetailsSlice.reducer;

export const { setChats, addChats } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;

export const { setChat, addChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;

export const { setExplore, addExplore } = exploreSlice.actions;
export const exploreReducer = exploreSlice.reducer;

export const { setComments, addComments } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;

export const { setStory, addStory } = storiesSlice.actions;
export const storiesReducer = storiesSlice.reducer;

export const { setNotification, addNotification } = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;