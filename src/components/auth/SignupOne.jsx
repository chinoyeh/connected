import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//component import
import AuthContainer from './common/AuthContainer';

//component import
import Input from '../common/input'


//resource import
import email_icon from "../../assets/email_icon.svg"
import password_icon from "../../assets/password_icon.svg"
import progress_image from "../../assets/progress_one.svg"
//styles import
import styles from './css/auth.module.css'

const SignupOne = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const login =async ()=>{
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
            if (password===""){
                hasError= true;
                setPasswordError("Please enter your email address")
            }
            else{
               setPasswordError("")
            }
            if (!hasError) {
                setLoading(false)
                navigate("/signup/basic-information",{
                    state: {
                        email: email,
                        password: password
                      },
                });
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
        setPasswordError("")
    }
    useEffect(()=>{
        window.addEventListener('keydown', clearError);
      }, [emailError, passwordError])

    return (
       <AuthContainer back={true} progress={progress_image} button_text="Continue" loading={loading} heading="Sign Up" subtext="Connect with people from all over the world " click={login} 
       goback={()=>navigate("/")}
       >
         <div className={styles.form}>
         <Input placeholder="Email" type="email" icon={email_icon} value={email} error={emailError} change={(e)=>setEmail(e.target.value)}/>
         <Input placeholder="Password" type="password" icon={password_icon} value={password} error={passwordError} change={(e)=> setPassword(e.target.value)} />
    
       
         </div>

       </AuthContainer>
    );
};

export default SignupOne;