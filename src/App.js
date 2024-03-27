//component imports
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './components/redux/store'
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import SignupOne from "./components/auth/SignupOne";

import SignupTwo from "./components/auth/SignupTwo";

import SignupThree from "./components/auth/SignupThree";
import ResetPassword from "./components/auth/ResetPassword";
import ResetPasswordTwo from "./components/auth/ResetPasswordTwo";
import ResetPasswordThree from "./components/auth/ResetPasswordThree";
import ResetPasswordFour from "./components/auth/ResetPasswordFour";
import { connect } from "./components/services/websocket";

//styles import
import "./App.css";
import Home from "./components/page/Home";
import Explore from "./components/page/Explore";
import Notification from "./components/page/Notification";
import Message from "./components/page/message/Message";
import Profile from "./components/page/Profile";
import Comment from "./components/page/Comment";
import PostDetails from "./components/page/common/PostDetails";
import EditProfile from "./components/page/EditProfile";

function App() {

  return (
    <Provider store={store}>

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignupOne />} />
        <Route path="/signup/basic-information" element={<SignupTwo />} />
        <Route path="/signup/choose-username" element={<SignupThree />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resetpasswordTwo" element={<ResetPasswordTwo />} />
        <Route path="/resetpasswordThree" element={<ResetPasswordThree />} />
        <Route path="/resetpasswordFour" element={<ResetPasswordFour />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/message" element={<Message />} />
        <Route path="/profile" element={<Profile />} />
        <Route path= "/postdetails" element={<PostDetails/>}/>
        <Route path="post/:id" element={< Comment/>} />
        <Route path="edit" element={< EditProfile/>} />
      </Routes>
    </Router>

    </Provider>
  );
}

export default App;
