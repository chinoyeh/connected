import React, { useEffect, useState } from "react";
import ResetContainer from "./common/ResetContainer";
import Input from "../common/input";
import PasswordCheck from "./PasswordCheck";
import inputStyles from "../common/css/input.module.css";
import resetContainerStyles from "./common/css/ResetContainer.module.css";
import eyeIcon from "../../assets/eye_icon.svg";

const ResetPasswordTwo = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const clearError = () => {
    setPasswordError("");
  };

  const checkPassword = async () => {
    setLoading(true);
    try {
      let hasError = false;

      if (password !== confirmPassword) {
        hasError = true;
        setPasswordError("Please enter correct password");
      } else if (password.length < 8 || password.length > 64) {
        hasError = true;
        setPasswordError("Password must be between 8 and 64 characters");
      } else if (!/[0-9!@#$%^&*]/.test(password)) {
        hasError = true;
        setPasswordError("Password must contain at least one number or symbol");
      } else if (password.search(/[a-z]/) === -1) {
        hasError = true;
        setPasswordError("Password must contain at least one lowercase letter");
      } else if (password.search(/[A-Z]/) === -1) {
        hasError = true;
        setPasswordError("Password must contain at least one uppercase letter");
      }

      if (!hasError) {
        setPasswordError("");
      }
    } catch (err) {
      setLoading(false);
      return err.response;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", clearError);
    return () => {
      window.removeEventListener("keydown", clearError);
    };
  }, []);

  return (
    <ResetContainer
      loading={loading}
      back={true}
      heading="Reset Password"
      subtext="Enter Password"
      subtextMore="Input new password to get back in your account."
      button_text="Continue"
      click={checkPassword}
      more={
        <ul className={resetContainerStyles.restList}>
          <li>Between 8 and 64 characters</li>
          <li>Contain number or symbol</li>
          <li>Uppercase and lowercase letter</li>
        </ul>
      }
    >
      <div className={inputStyles.reset_input}>
        <Input
          name="Enter New Password"
          type={showPassword ? "text" : "password"}
          iconTwo={eyeIcon}
          value={password}
          error={passwordError}
          click={() => setShowPassword(!showPassword)}
          change={(e) => setPassword(e.target.value)}
        />

        <Input
          name="Re-enter New Password"
          type={showPassword ? "text" : "password"}
          iconTwo={eyeIcon}
          value={confirmPassword}
          error={passwordError}
          click={() => setShowPassword(!showPassword)}
          change={(e) => setConfirmPassword(e.target.value)}
        />
        <PasswordCheck
          password={password}
          actions={(strength) => console.log(`Password strength: ${strength}`)}
        />
      </div>
    </ResetContainer>
  );
};

export default ResetPasswordTwo;
