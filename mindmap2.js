import React, { useState } from "react";
import { animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import "./mind-map.css";

const Tab = React.memo(function Tab(props) {
  const [text, setText] = useState(props.text);
  const [hover, setHover] = useState({ display: "none" });
  const initialPosition = { x: props.x, y: props.y };
  const [position, setPosition] = useState({
    x: initialPosition.x,
    y: initialPosition.y
  });
  const bindPosition = useDrag((params) => {
    props.updateLines(props.id, initialPosition.x + params.offset[0], initialPosition.y + params.offset[1]);
    setPosition({
      x: initialPosition.x + params.offset[0],
      y: initialPosition.y + params.offset[1]
    });
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
        <div className="tab">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
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

export default function Root() {
  const [tabs, setTabs] = useState([{
    id: "id" + Math.random().toString(16).slice(2),
    text: "Новая диаграмма",
    x: parseInt(window.innerWidth / 2 - 130),
    y: parseInt(window.innerHeight / 2 - 80),
  }]);
  const [lines, setLines] = useState([]);
  const [updater, update] = useState(0);
  const addTab = (text, x, y, xNew, yNew, idExisting) => {
    const idNew = "id" + Math.random().toString(16).slice(2);
    setTabs([
      ...tabs,
      {
        id: idNew,
        text: text,
        x: xNew,
        y: yNew,
      }
    ]);
    setLines([...lines, {
      idFirst: idExisting,
      xFirst: x,
      yFirst: y,
      idSecond: idNew,
      xSecond: xNew,
      ySecond: yNew,
    }]);
  };
  const updateLines = (id, x, y) => {
    lines.forEach((element, index) => {
      if (element.idFirst === id || element.idSecond === id) {
        if (element.idFirst === id) {
          let linesUpdated = lines;
          linesUpdated[index] = {
            idFirst: element.idFirst,
            xFirst: x,
            yFirst: y,
            idSecond: element.idSecond,
            xSecond: element.xSecond,
            ySecond: element.ySecond,
          };
          setLines(prevLines => linesUpdated);
          update(prevUpdater => prevUpdater + 1);
        }
        else {
          let linesUpdated = lines;
          linesUpdated[index] = {
            idFirst: element.idFirst,
            xFirst: element.xFirst,
            yFirst: element.yFirst,
            idSecond: element.idSecond,
            xSecond: x,
            ySecond: y,
          };
          setLines(prevLines => linesUpdated);
          update(prevUpdater => prevUpdater - 1);
        }
      }
    })
  }

  return (
    <div className="root">
      <button
        onClick={() =>
          setTabs([...tabs, {
            id: "id" + Math.random().toString(16).slice(2),
            text: '',
            x: parseInt((window.innerWidth / 2) - 130),
            y: parseInt(window.innerHeight / 2),
          }])
        }
        className="addBig"
      >
        +
      </button>

      {lines.map(element => (
        <svg
        key={element.idSecond}
        xmlns="http://www.w3.org/2000/svg" 
        height={window.innerHeight}
        width={window.innerWidth}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <path d={'M ' + (element.xFirst + 139)+ ' ' + 
        + (element.yFirst + 41)+ ' ' +
        + (element.xSecond + 139) + ' ' +
        + (element.ySecond + 41)} stroke="red"
  strokeWidth="3" fill="none" />
      </svg>
      ))}

      {tabs.map((element) => (
        <Tab
          key={element.id}
          id={element.id}
          text={element.text}
          x={element.x}
          y={element.y}
          addTab={addTab}
          updateLines={updateLines}
        />
      ))}
    </div>
  );
}
