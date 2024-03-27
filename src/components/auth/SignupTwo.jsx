import React, {useState, useEffect} from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';

//component import
import AuthContainer from './common/AuthContainer';

//component import
import Input from '../common/input'
import DateFormat from '../utils/DateFormat';



//resource import
import name_icon from "../../assets/email_icon.svg"
import date_icon from "../../assets/date_icon.svg"
import gender_icon from "../../assets/gender_icon.svg"
import progress_image from "../../assets/progress_two.svg"
//styles import
import styles from './css/auth.module.css'

const SignupTwo = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [date, setDate] = useState("")
    const [dateError, setDateError] = useState("")
    const [gender, setGender] = useState("")
    const [genderError, setGenderError] = useState("")
    const location = useLocation()

    const submit =async ()=>{
        setLoading(true)
        try{
            let hasError = false; 
            if (username===""){
                hasError= true;
                setUsernameError("Please enter your name")
            }
            else{
               setUsernameError("")
            }
            
            // if (date===""){
            //     hasError= true;
            //     setDateError("Please enter your date of birth")
            // }
            // else{
            //    setDateError("")
            // }
            let formattedDate = DateFormat(date)
            console.log(formattedDate)
            if (gender===""){
                hasError= true;
                setGenderError("Please enter your gender")
            }
            else{
               setGenderError("")
            }
            if (!hasError) {
                setLoading(false)
                navigate("/signup/choose-username",{
                    state: {
                        email: location.state.email,
                        password: location.state.password,
                        name: username,
                        date: formattedDate,
                        gender: gender
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
        setUsernameError("")
        setDateError("")
        setGenderError("")
    }
    useEffect(()=>{
        window.addEventListener('keydown', clearError);
      }, [])
    return (
       <AuthContainer back={true} progress={progress_image} button_text="Continue" loading={loading} heading="Basic Information" subtext="You will be able to change this later." click={submit} 
       goback={()=>navigate("/signup")}
       >
         <div className={styles.form}>
         <Input placeholder="Name" type="text" icon={name_icon} value={username} error={usernameError} change={(e)=>setUsername(e.target.value)}/>
         <Input type="date" icon={date_icon} value={date} error={dateError} change={(e)=> setDate(e.target.value)} />
    
         <Input placeholder="Gender" type="gender" icon={gender_icon} value={gender} error={genderError} change={(e)=> setGender(e.target.value)} />
       
         </div>

       </AuthContainer>
    );
};

export default SignupTwo;