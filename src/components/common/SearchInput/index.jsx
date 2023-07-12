import { AiFillCloseCircle } from "react-icons/ai";

import "./index.scss";

export default function SearchInput({ setIsSearching, setSearchedText }) {
  return (
    <div className="search-input-container">
      <input
        className="search-input"
        placeholder="Search User"
        onChange={(event) => setSearchedText(event.target.value)}
      />
      <AiFillCloseCircle
        className="search-input-icon"
        onClick={() => {
          setIsSearching(false);
          setSearchedText("");
        }}
      />
    </div>
  );
}
