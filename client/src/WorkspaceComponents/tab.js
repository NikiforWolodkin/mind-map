import React, { useState, useRef, useEffect } from "react";
import { animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { VscCircleFilled } from 'react-icons/vsc';
import styles from '../styles'

const Tab = React.memo(function Tab(props) {
    const style = {
        background: styles.find(element =>
            element.name === props.theme
        ).background,
        color: styles.find(element =>
            element.name === props.theme
        ).color
    };
    const tabStyle = {
        fontFamily: props.style.fontFamily,
        fontWeight: props.style.fontWeight,
        fontStyle: props.style.fontStyle,
        background: props.style.background === "theme" ? style.background : props.style.background,
        outline: props.tabFocus === props.id ? "lightblue solid 4px" : "none",
        height: props.type === "textarea" ? "200px" : "38px",
    };
    const inputStyle = {
        background: props.style.fill === "fill" ? "none" : "white",
        color: (
            props.style.fill === "fill" && tabStyle.background !== "white" ?
            "white" : "black"
        ),
    };

    const inputRef = useRef(null);
    const initialPosition = { x: props.x, y: props.y };
    const [hover, setHover] = useState({ display: "none" });
    const [position, setPosition] = useState({
        x: initialPosition.x,
        y: initialPosition.y,
    });
    const bindPosition = useDrag((params) => {
        setPosition({
          x: params.offset[0],
          y: params.offset[1],
        });
        props.updateLines(props.id, params.offset[0], params.offset[1]);
        props.updateTabPosition(props.id, params.offset[0], params.offset[1]);
        if (props.tabFocus !== props.id) {
            props.setTabFocus(props.id);
        }
    }, {
        bounds: {
            top: 0,
            left: 0,
            bottom: window.innerHeight - (props.type === "textarea" ? 240 : 78),
            right: window.innerWidth - 262,
        },
        from: [position.x, position.y],
    });

    useEffect(() => {
        if (props.focus === true) {
            inputRef.current.focus();
            props.removeFocus();
        }
    }, [props.focus]);
  
    return (
        <animated.div
            {...bindPosition()}
            style={{
              x: position.x,
              y: position.y,
              position: "absolute",
            }}
            onMouseEnter={() => setHover({ display: "block" })}
            onMouseLeave={() => setHover({ display: "none" })}
        >
            <div className="tabContainer"
                style={props.type === "textarea" ? {
                height: "240px",
                } : null}
            >
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
                {props.type === "connector" &&
                    <div className="connector"
                        style={{
                            color: props.tabFocus === props.id ? "lightblue" : style.color
                        }}
                    >
                        <VscCircleFilled />
                    </div>
                }
                {props.type !== "connector" &&
                    <div className="tab" style={tabStyle}>
                        {props.type === "input" &&
                            <input
                                type="text"
                                value={props.text}
                                ref={inputRef}
                                onChange={(e) => props.handleTextChange(props.id, e.target.value)}
                                onClick={() => props.setTabFocus(props.id)}
                                style={inputStyle}
                            />
                        }
                    {props.type === "textarea" &&
                        <textarea
                            value={props.text}
                            ref={inputRef}
                            onChange={(e) => props.handleTextChange(props.id, e.target.value)}
                            onClick={() => props.setTabFocus(props.id)}
                            style={inputStyle}
                        />
                    }
                    </div>
                }
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
