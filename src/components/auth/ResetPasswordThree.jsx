import React, { useState } from "react";

import RestContainer from "./common/ResetContainer";
import OTPInput from "./OTPInput";

const ResetPasswordThree = () => {
  const [otp, setOTP] = useState("");

  const handleOTPComplete = (value) => {
    setOTP(value);
  };
  return (
    <RestContainer
      back={true}
      heading="Create an account"
      subtext="OTP Verification"
      subtextMore="We have sent a verification code to."
      button_text="Verify"
      more={<p>Didn’t receive a code? Request in {}</p>}
    >
      <OTPInput length={4} onComplete={handleOTPComplete} />
    </RestContainer>
  );
};

export default ResetPasswordThree;
