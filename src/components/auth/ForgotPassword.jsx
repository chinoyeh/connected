import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//component import
import AuthContainer from './common/AuthContainer';

//component import
import Input from '../common/input'


//resource import
import email_icon from "../../assets/email_icon.svg"
import password_icon from "../../assets/password_icon.svg"
//styles import
import styles from './css/auth.module.css'


const ForgotPassword = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const submit =async ()=>{
        setLoading(true)
        try{
            let hasError = false; 
            if (email===""){
                hasError= true;
                setEmailError("Please enter your email address")
            }
            else{
               setEmailError("")
            }
          
            if (!hasError) {
                setLoading(false)
                navigate("/home");
              }
              else{
                setLoading(false)
              }

        }
        catch (err){
            setLoading(false)
            return err.response
        }
    }
    const clearError = ()=>{
        setEmailError("")
       
    }
    useEffect(()=>{
        window.addEventListener('keydown', clearError);
      }, [emailError])

    return (
        <AuthContainer button_text="Reset Password" back={true} loading={loading} heading="Reset Password" subtext="Enter email address" goback={()=>navigate("/")} click={submit}>
             <div className={styles.form}>
             <Input placeholder="Email" type="email" icon={email_icon} value={email} error={emailError} change={(e)=>setEmail(e.target.value)}/>
           
           
             </div>
    
           </AuthContainer>
    );
};

export default ForgotPassword;