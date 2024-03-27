import React from 'react';

import dummy from "../../../assets/dummy.svg";

const ProfileImage = ({image, click}) => {
    return (
        <div onClick={click}>
          {image=== null &&
  <img src={dummy} alt="profile image"  />

          }
        {
          image!==null &&
          <img src={image} alt="profile image" />
        }
        </div>
    );
};

export default ProfileImage;