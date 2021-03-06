import React, { useState, useEffect } from "react";
import "./ScrollBar.scss";

const ScrollBar = ({ children, isOpen }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollableElem, setScrollableElem] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);

  // Check if the panel is scrollable to show toggle button at the bottom
  const checkIsScrollable = () => {
    scrollHeight > offsetHeight
      ? setIsScrollable(true)
      : setIsScrollable(false);
  };

  const updateScrollValues = () => {
    setScrollTop(scrollableElem.scrollTop);
    setScrollHeight(scrollableElem.scrollHeight);
    setOffsetHeight(scrollableElem.offsetHeight);
  };

  // This has to use children is the dependency array in order to update the scroll values with the rendered DOM element
  useEffect(() => {
    // Selecting the first child, which is the target element to have the scrollbar attached
    setScrollableElem(document.getElementById("scroll-wrapper").children[0]);
  }, [children]);

  useEffect(() => {
    if (scrollableElem) {
      updateScrollValues();
      scrollableElem.addEventListener("scroll", updateScrollValues, {
        passive: true,
      });
      checkIsScrollable();
    }
  }, [children, isOpen]);

  useEffect(() => {
    setScrollPercentage((scrollTop / (scrollHeight - offsetHeight)) * 50);
  }, [scrollTop, scrollHeight, offsetHeight]);

  return (
    <div className="scroll-wrapper" id="scroll-wrapper">
      {/* Children always have to be the first element here above the scrollbar */}
      {children}
      {isScrollable && (
        <div
          className="scroll-track"
          style={{ display: `${isOpen ? "block" : "none"}` }}
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
