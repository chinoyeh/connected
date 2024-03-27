import React, { useEffect, useState } from "react";
import "./css/PasswordCheck.css";

const StrengthMeter = (props) => {
  const { password, actions } = props;

  const [progressBars, setProgressBars] = useState([0, 0, 0]); // Initial progress bars values

  useEffect(() => {
    const calculateStrength = () => {
      let lengthStrength = password.length >= 8 && password.length <= 64 ? 1 : 0;
      let symbolStrength = /[0-9!@#$%^&*]/.test(password) ? 1 : 0;
      let caseStrength = /[a-z]/.test(password) && /[A-Z]/.test(password) ? 1 : 0;

      const strength = lengthStrength + symbolStrength + caseStrength;
      return { lengthStrength, symbolStrength, caseStrength, strength };
    };

    const { lengthStrength, symbolStrength, caseStrength, strength } = calculateStrength();

    // Update progress bars based on the number of conditions met
    const updatedProgressBars = [];
    for (let i = 0; i < 3; i++) {
      if (strength > i) {
        updatedProgressBars.push(1); // Condition met, increment the progress bar
      } else {
        updatedProgressBars.push(0); // Condition not met, progress bar remains the same
      }
    }

    setProgressBars(updatedProgressBars);

    // Call the action with the strength value
    const val =
      strength === 0
        ? ""
        : strength === 1
        ? "weak"
        : strength === 2
        ? "fair"
        : strength === 3
        ? "good"
        : "strong";
    actions(val);
  }, [password, actions]);

  return (
    <div className="wrapper">
      <div className="progress-bar">
        <progress value={progressBars[0]} max="1" />
      </div>
      <div className="progress-bar">
        <progress value={progressBars[1]} max="1" />
      </div>
      <div className="progress-bar">
        <progress value={progressBars[2]} max="1" />
      </div>
    </div>
  );
};

export default StrengthMeter;
