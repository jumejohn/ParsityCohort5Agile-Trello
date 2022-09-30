import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const useClickDetect = (ref, callback) => {
  useEffect(() => {
    const handleClickOutsideElement = () => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutsideElement);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideElement);
    };
  }, []);
}

const ClickDetectWrapper = (props) => {
  const wrapperRef = useRef(null);
  useClickDetect(wrapperRef, props.callback);

  return <div ref={wrapperRef}>{props.children}</div>;
};

export default ClickDetectWrapper;

ClickDetectWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  callback: PropTypes.func.isRequired,
}
