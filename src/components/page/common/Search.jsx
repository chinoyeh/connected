import React from 'react'
//style
import style from "./css/search.module.css"

import search from "../../../assets/Search.svg";
const Search = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    props.save();
  };

  return (
    <div className={style.container}>
      <img src={search} alt="icon" />
      <form onSubmit={handleSubmit}>
        <input
          value={props.value}
          type={props.type}
          onChange={props.change}
          placeholder={props.placeholder}
        />
      </form>
    </div>
  );
};

export default Search;