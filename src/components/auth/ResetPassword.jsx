import React, { useState } from "react";

//component import
import ResetContainer from "./common/ResetContainer";
import Input from "../common/input";

//styles import
import styles from '../common/css/input.module.css'

const ResetPassword = () => {
  const [email, setEmail] = useState("")

  return <ResetContainer
  back={true}
  heading="Reset Password"
  subtext="Enter email address"
  subtextMore="Don’t worry it happens to the best of us."
  button_text="Continue"
  >
  <div className={styles.reset_input}> 
    <Input name="Email" type="email" value={email} change={(e)=>setEmail(e.target.value)}/>
  </div>
  </ResetContainer>
};

export default ResetPassword;
