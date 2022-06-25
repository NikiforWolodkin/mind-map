import React, { useState, useRef, useEffect } from "react";
import { animated } from "react-spring";
import { useDrag } from "@use-gesture/react";

const styleBlack = { background: "black" };
const styleGreen = { background: "#3EC70B" };
const styleOrange = { background: "#FF9F29" };
const stylePurple = { background: "#541690" };
const styleGradBlue = { background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)" };
const styleGradRed = { background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)" };

const Tab = React.memo(function Tab(props) {
    let style = {};
    switch (props.theme) {
        case "black":
            style = styleBlack;
            break;
        case "green":
            style = styleGreen;
            break;
        case "orange":
            style = styleOrange;
            break;
        case "purple":
            style = stylePurple;
            break;
        case "gradBlue":
            style = styleGradBlue;
            break;
        case "gradRed":
            style = styleGradRed;
            break;
        default:
            style = styleBlack;
            break;
    }
    if (props.tabFocus === props.id) {
        style = { background: "lightblue" };
    }

    const inputRef = useRef(null);
    const [hover, setHover] = useState({ display: "none" });
    const initialPosition = { x: props.x, y: props.y };
    const [position, setPosition] = useState({
      x: initialPosition.x,
      y: initialPosition.y,
    });
    const bindPosition = useDrag((params) => {
      props.updateLines(props.id, initialPosition.x + params.offset[0], initialPosition.y + params.offset[1]);
      setPosition({
        x: initialPosition.x + params.offset[0],
        y: initialPosition.y + params.offset[1],
      });
      if (props.tabFocus !== props.id) {
        props.setTabFocus(props.id);
      }
    });
    useEffect(() => {
      if (props.focus === true) {
        inputRef.current.focus();
        props.removeFocus();
      }
    });
  
    return (
      <animated.div
        {...bindPosition()}
        style={{
          x: position.x,
          y: position.y,
          position: "absolute"
        }}
        onMouseEnter={() => setHover({ display: "block" })}
        onMouseLeave={() => setHover({ display: "none" })}
      >
        <div className="tabContainer">
          <div className="longRow">
            <button
              style={hover}
              onClick={() => props.addTab("", position.x, position.y, position.x, position.y - 100, props.id)}
            >
              +
            </button>
          </div>
          <button
            style={hover}
            onClick={() => props.addTab("", position.x, position.y, position.x - 300, position.y, props.id)}
          >
            +
          </button>
          <div className="tab" style={style}>
            <input
              type="text"
              value={props.text}
              ref={inputRef}
              onChange={(e) => props.handleTextChange(e.target.value, props.id)}
              onClick={() => props.setTabFocus(props.id)}
            />
          </div>
          <button
            style={hover}
            onClick={() => props.addTab("", position.x, position.y, position.x + 300, position.y, props.id)}
          >
            +
          </button>
          <div className="longRow">
            <button
              style={hover}
              onClick={() => props.addTab("", position.x, position.y, position.x, position.y + 100, props.id)}
            >
              +
            </button>
          </div>
        </div>
      </animated.div>
    );
});

export default Tab;