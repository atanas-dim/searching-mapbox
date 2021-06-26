import React from "react";
import "./SearchMessage.scss";

const SearchMessage = ({ message }) => {
  return (
    <>
      <div className="places-container">
        <div className="places-panel" id="places-panel">
          <div className="loading-message">{message}</div>
        </div>
      </div>
    </>
  );
};

export default SearchMessage;
