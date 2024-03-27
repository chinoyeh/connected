import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//component import
import AuthContainer from './common/AuthContainer';
import { POST } from "../services/backend";
import ErrorNotification from "../common/ErrorNotification";
import SuccessNotification from "../common/SuccessNotification";

//component import
import Input from '../common/input'
import DateFormat from '../utils/DateFormat';

//resource import
import username_icon from "../../assets/username_icon.svg"
import progress_image from "../../assets/progress_three.svg"

//styles import
import styles from './css/auth.module.css'


const SignupThree = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const location = useLocation()
    const submit =async ()=>{
        setLoading(true)
        let hasError = false; 
        if (username===""){
            hasError= true;
            setUsernameError("Please enter your email address")
        }
        else{
           setUsernameError("")
        }

    const body ={
        "dateOfBirth":location.state.date,
        "gender": location.state.gender,
        "username": username,
        "fullName": location.state.name,
        "interests":[
            
        ],
        "createUserDTO":{
            "emailAddressOrPhoneNumber":location.state.email,
            "password": location.state.password
        }
    }
  
    
  
    const endpoint = `/customers`
  
        try{
                console.log(body)
                const response = await POST(endpoint, body)
                console.log(response)
       
        if (response.status ===201){
          setSuccess(true)
          setSuccessMessage(response.data.message)

          setTimeout(() => {
            setSuccess(false);
            setLoading(false);
            navigate("/");
          }, 2000);

        
           
 
          }
          else {
           setError(true)
           setErrorMessage(response.data.message)
          
      setTimeout(() => {
           setError(false)
           setErrorMessage("")
           setLoading(false);
         }, 3000);
     
          }

        }
        catch (err){
            setLoading(false)
            return err.response
        }
    }
    const clearError = ()=>{
        setUsernameError("")
       
    }
    useEffect(()=>{
        window.addEventListener('keydown', clearError);
      }, [usernameError])

    return (
        <AuthContainer button_text="Submit" back={true} loading={loading} heading="Enter your username" subtext={<>
        Your username is used to uniquely identify you in the <br/> community. You can change your username later.
        
        </>}  progress={progress_image}  goback={()=>navigate("/signup/basic-information")} click={submit}>
        <ErrorNotification show={error} content={errorMessage} />
      <SuccessNotification show={success} content={successMessage} />
             <div className={styles.form}>
             <Input placeholder="Username" type="text" icon={username_icon} value={username} error={usernameError} change={(e)=>setUsername(e.target.value)}/>
           
           
             </div>
    
           </AuthContainer>
    );
};

export default SignupThree;