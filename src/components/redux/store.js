import { configureStore } from '@reduxjs/toolkit';
import  { followersReducer, postDetailsReducer, postsReducer,customerPostsReducer, chatReducer, chatsReducer, exploreReducer, commentReducer, storiesReducer, notificationsReducer } from './slice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    followers: followersReducer,
    postDetails: postDetailsReducer,
    customerPosts: customerPostsReducer,
    chats: chatsReducer,
    chat: chatReducer,
    explore: exploreReducer,
    comments: commentReducer,
    stories: storiesReducer,
    notifications :notificationsReducer
  },
});

export default store;