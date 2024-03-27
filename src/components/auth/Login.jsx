import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//component import
import AuthContainer from "./common/AuthContainer";
import { POST } from "../services/backend";
import ErrorNotification from "../common/ErrorNotification";
import SuccessNotification from "../common/SuccessNotification";

//component import 
import Input from "../common/input";

//resource import
import email_icon from "../../assets/email_icon.svg";
import password_icon from "../../assets/password_icon.svg";
//styles import
import styles from "./css/auth.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function preventBack() {
    window.history.forward();
  }

  const login = async () => {
    setLoading(true);
    const body = {
      "emailAddressOrPhoneNumber": email,
      "password": password
  }

  const endpoint ='/users/login'
    try {
      let hasError = false;
      if (email === "") {
        hasError = true;
        setEmailError("Please enter your email address");
      } else {
        setEmailError("");
      }
      if (password === "") {
        hasError = true;
        setPasswordError("Please enter your email address");
      } else {
        setPasswordError("");
      }
      if (!hasError) {
    
      
        const response = await POST(endpoint, body)
      
       
        if (response.status ===200){
          setSuccess(true)
          setSuccessMessage(response.data.message)

          setTimeout(() => {
            setSuccess(false);
            setLoading(false);
            navigate("/home");
          }, 2000);
        
        sessionStorage.setItem('token', response.data.data.jwt)
        sessionStorage.setItem('customerId', response.data.data.customerId)
           
 
          }
          else {
           setError(true)
           setErrorMessage(response.data.message)
          
      setTimeout(() => {
           setError(false)
           setLoading(false);
           setErrorMessage("")
         }, 3000);
     
          }
      
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      return err.response;
    }
  };
  const clearError = () => {
    setEmailError("");
    setPasswordError("");
  };
  useEffect(() => {
    preventBack()
  }, [])
  useEffect(() => {
    window.addEventListener("keydown", clearError);
  }, [emailError, passwordError]);
  return (
    <AuthContainer
      button_text="Log in"
      loading={loading}
      heading="Log in"
      subtext="Welcome back! Enter your details"
      click={login}
      more={
        <p className={styles.signup}>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      }
    >
            <ErrorNotification show={error} content={errorMessage} />
      <SuccessNotification show={success} content={successMessage} />
     
      <div className={styles.form}>
        <Input
          placeholder="Email"
          type="email"
          icon={email_icon}
          value={email}
          error={emailError}
          change={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          icon={password_icon}
          value={password}
          error={passwordError}
          change={(e) => setPassword(e.target.value)}
        />
        <div className={styles.forgot_password}>
          <p onClick={() => navigate("/forgot-password")}>Forgot password</p>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
