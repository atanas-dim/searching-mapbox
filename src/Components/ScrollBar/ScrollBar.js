import React, { useState, useEffect } from "react";
import "./ScrollBar.scss";

const ScrollBar = ({ scrollPercentage, isOpen }) => {
  return (
    <div className="scroll-track" style={{ height: `${isOpen ? "100%" : 0}` }}>
      <div
        className="scroll-thumb"
        style={{ top: scrollPercentage + "%" }}
      ></div>
    </div>
  );
};

export default ScrollBar;
