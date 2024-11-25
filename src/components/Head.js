import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/contant";
import { cacheResult } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    //API call
    // console.log("searchQuery", searchQuery);

    // make an api call after every key press
    // but if there difference between 2 api calls is <200ms
    // decline the api call

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /* 
    key - i
    -render the components
    -useEffect()
    -start timer => make api call after 200ms

    key - ip
    -destroy the components(usEffect return method)
    -re-render the components
    -useEffect()
    -start timer => make api call after 200ms 
  */

  const getSearchSuggestions = async () => {
    // console.log("API", searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log("json", json);
    setSuggestions(json[1]);

    //update cache
    dispatch(cacheResult({
      [searchQuery]: json[1]
    }));
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          src="https://cdn0.iconfinder.com/data/icons/rounded-basics/24/rounded__menu-512.png"
          alt="menu"
        />
        <a href="">
          <img
            className="h-8 mx-2"
            // src="https://t3.ftcdn.net/jpg/05/07/46/84/360_F_507468479_HfrpT7CIoYTBZSGRQi7RcWgo98wo3vb7.jpg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/768px-YouTube_Logo_2017.svg.png?20230929095411"
            alt="youtube-logo"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="absolute bg-white py-2 px-2 w-[28rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions?.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user"
        />
      </div>
    </div>
  );
};

export default Head;
