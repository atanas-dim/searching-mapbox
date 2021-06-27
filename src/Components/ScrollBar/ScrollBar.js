import React, { useState, useEffect } from "react";
import "./ScrollBar.scss";

const ScrollBar = ({ children, isOpen }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  let scrollableElem;
  let scrollTop = 0;
  let scrollHeight = 0;
  let offsetHeight = 0;

  // Check if the panel is scrollable to show toggle button at the bottom
  const checkIsScrollable = () => {
    scrollHeight > offsetHeight
      ? setIsScrollable(true)
      : setIsScrollable(false);
  };

  const updateScrollValues = () => {
    scrollTop = scrollableElem.scrollTop;
    scrollHeight = scrollableElem.scrollHeight;
    offsetHeight = scrollableElem.offsetHeight;
    setScrollPercentage((scrollTop / (scrollHeight - offsetHeight)) * 50);
  };

  // This has to use children is the dependency array in order to update the scroll values with the rendered DOM element
  useEffect(() => {
    // Selecting the first child, which is the target element to have the scrollbar attached
    scrollableElem = document.getElementById("scroll-wrapper").children[0];
    updateScrollValues();
    scrollableElem.onscroll = updateScrollValues;
    checkIsScrollable();
  }, [children]);

  return (
    <div className="scroll-wrapper" id="scroll-wrapper">
      {/* Children always have to be the first element here above the scrollbar */}
      {children}
      {isScrollable && (
        <div
          className="scroll-track"
          style={{ height: `${isOpen ? "100%" : 0}` }}
        >
          <div
            className="scroll-thumb"
            style={{ top: scrollPercentage + "%" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ScrollBar;
