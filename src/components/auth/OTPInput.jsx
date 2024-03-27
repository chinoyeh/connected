import React, { useState, useRef } from 'react';
import './css/OTPInput.css'; 


const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOTP] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Allow only numeric input

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto focus to the previous input field if input is deleted
    if (value === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (index < length - 1 && value !== '') {
      inputRefs.current[index + 1].focus();
    }

    // Check if all OTP fields are filled
    if (!newOTP.includes('')) {
      onComplete(newOTP.join(''));
    }
  };

  const handleInputPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, length);

    const newOTP = pasteData.split('').map((char) => {
      if (!isNaN(char)) {
        return char;
      }
      return '';
    });

    setOTP(newOTP);

    for (let i = 0; i < length; i++) {
      if (newOTP[i] !== '') {
        inputRefs.current[i].focus();
      }
    }
  };

  return (
    <div className="otp-input">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={value}
          maxLength={1}
          onChange={(e) => handleInputChange(e, index)}
          onPaste={handleInputPaste}
        />
      ))}
    </div>
  );
};

export default OTPInput;
