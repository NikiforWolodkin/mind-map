import React, { useState, useRef, useEffect } from "react";
import { animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { VscCircleFilled } from 'react-icons/vsc';
import themes from './themes';

const Tab = React.memo(function Tab(props) {
    const theme = themes.find(element => 
        element.name === props.theme
    );

    const inputRef = useRef(null);
    const initialPosition = { x: props.x, y: props.y };
    const [hover, setHover] = useState("hidden");
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
            bottom: window.innerHeight - (props.type === "textarea" ? 270 : 90),
            right: window.innerWidth - 300,
        },
        from: [position.x, position.y],
    });

    useEffect(() => {
        if (props.type !== "connector" && props.focus === true) {
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
            }}
            className="absolute"
            onMouseEnter={() => setHover("block")}
            onMouseLeave={() => setHover("hidden")}
        >
            <div className={"flex flex-wrap justify-center content-center items-center w-72 " + (props.type === "textarea" ? "h-60" : "h-24")}>
                <div className="w-full flex justify-center items-center">
                    <button
                        className={"flex justify-center items-center w-5 h-5 text-xl " + hover}
                        onClick={() => props.addTab("", position.x, position.y, position.x, position.y - 100, props.id)}
                    >
                        <div>+</div>
                    </button>
                </div>
                <button
                    className={"flex justify-center items-center w-5 h-5 text-xl " + hover}
                    onClick={() => props.addTab("", position.x, position.y, position.x - 300, position.y, props.id)}
                >
                    <div>+</div>
                </button>
                {props.type === "connector" &&
                    <div className={"flex justify-center items-center w-5 h-5 text-2xl " + theme.color + " "
                        + (props.tabFocus === props.id ? "text-blue-600" : "")
                    }>
                        <VscCircleFilled />
                    </div>
                }
                {props.type !== "connector" &&
                    <div className={"flex items-center w-60 p-1 rounded shadow-2xl " + theme.background + " "
                        + (props.type === "textarea" ? "h-48 " : "h-10 ")
                        + (props.tabFocus === props.id ? "outline outline-offset-1 outline-3 outline-blue-600" : "")
                    }>
                        {props.type === "input" &&
                            <input
                                className="w-full h-full text-xl text-center rounded-sm outline-none"
                                type="text"
                                value={props.text}
                                ref={inputRef}
                                onChange={(e) => props.handleTextChange(props.id, e.target.value)}
                                onClick={() => props.setTabFocus(props.id)}
                            />
                        }
                        {props.type === "textarea" &&
                            <textarea
                                className="w-full h-full text-xl text-center rounded-sm outline-none resize-none"
                                value={props.text}
                                ref={inputRef}
                                onChange={(e) => props.handleTextChange(props.id, e.target.value)}
                                onClick={() => props.setTabFocus(props.id)}
                            ></textarea>
                        }
                    </div>
                }
                <button
                    className={"flex justify-center items-center w-5 h-5 text-xl " + hover}
                    onClick={() => props.addTab("", position.x, position.y, position.x + 300, position.y, props.id)}
                >
                    <div>+</div>
                </button>
                <div className="w-full flex justify-center items-center">
                    <button
                        className={"flex justify-center items-center w-5 h-5 text-xl " + hover}
                        onClick={() => props.addTab("", position.x, position.y, position.x, position.y + 100, props.id)}
                    >
                        <div>+</div>
                    </button>
                </div>
            </div>
        </animated.div>
    );
});

export default Tab;
