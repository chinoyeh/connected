import React from "react";

// styles 
import style from "./css/aside.module.css";
import search from "../../assets/Search.svg";
import setting from "../../assets/Settings.svg";
import M from "../../assets/M.svg";
import edit from '../../assets/edit.svg'


//import Componets
import Search from "../page/common/Search";
import ProfileCard from "../page/common/ProfileCard";
import ProfileStory from "../page/common/ProfileStory";

const aside = (props) => {
  return (
    <div className={style.aside_container}>
     <Search
       
        placeholder="search"
     />
     {
      props.mainprofile 
      && 
      <ProfileCard
      />
     }
     {
      props.stories
      && 
      <div className={style.story}>
        <span>Your stories</span>
        <ProfileStory
        playStory
        className={style.story_container}
        profileStory={style.story}
        />
      </div>
     }
     
      <div className={style.aside_settingDetails}>
        
        <div className={style.aside_trend}>
          <h3>Trends for you</h3>
          <img src={setting} alt="" />
        </div>
        <div className={style.aside_trend_list}>
          <div>
          <span>Trending in Turkey</span>
          <p>#SQUID</p> <span>2,066 Tweets</span>
          </div>
          <img src={M} alt="" />
        </div>
        <div className={style.aside_trend_list}>
          <div>
          <span>Trending in Turkey</span>
          <p>#SQUID</p> <span>2,066 Tweets</span>
          </div>
          <img src={M} alt="" />
        </div>
        <div className={style.aside_trend_list}>
          <div>
          <span>Trending in Turkey</span>
          <p>#SQUID</p> <span>2,066 Tweets</span>
          </div>
          <img src={M} alt="" />
        </div>
        <div className={style.aside_trend_list}>
          <div>
          <span>Trending in Turkey</span>
          <p>#SQUID</p> <span>2,066 Tweets</span>
          </div>
          <img src={M} alt="" />
        </div>
          <p>Show more</p>
        </div>
        <div className={style.aside_trend_vidContainer}>
          <div className={style.aside_trend_vid_list}>
            <p>All</p>
            <span>From Marcus Levin </span>
          </div>
            <div className={style.aside_trend_vid}>
              <img src={edit} alt="" />
              <div>
              <h4>Ep 6: Living to Serve | SEARCH ON</h4>
              <p>James Gouse</p>
              <p>1M views . 3 years ago</p>
              </div>
            </div>
            <div className={style.aside_trend_vid}>
              <img src={edit} alt="" />
              <div>
              <h4>Ep 6: Living to Serve | SEARCH ON</h4>
              <p>James Gouse</p>
              <p>1M views . 3 years ago</p>
              </div>
            </div>
          </div>
        </div>
  );
};

export default aside;
