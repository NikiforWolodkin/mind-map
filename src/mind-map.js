import { useState } from "react";
import Line from './WorkspaceComponents/line';
import Search from './UIComponents/search';
import Tab from './WorkspaceComponents/tab';
import AddButton from "./UIComponents/addButton";
import ToolBar from "./UIComponents/toolBar";
import "./mind-map.css";

export default function Root() {
  const [updater, update] = useState(true);
  const [tabs, setTabs] = useState([{
    id: "id" + Math.random().toString(16).slice(2),
    text: "Новая диаграмма",
    x: parseInt(window.innerWidth / 2 - 130),
    y: parseInt(window.innerHeight / 2 - 150),
    focus: true,
    style: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: "500",
      fontStyle: "regular",
      background: "theme",
      fill: "fill",
    },
  }]);
  const handleTextChange = (eText, id) => {
    tabs.forEach((element, index) => {
      if (element.id === id) {
        let tabsUpdated = tabs;
        tabsUpdated[index] = {
          id: element.id,
          text: eText,
          x: element.x,
          y: element.y,
          focus: false,
          style: element.style,
        };
        setTabs(() => tabsUpdated);
        update(prevUpdater => !prevUpdater);
      }
    })
  };
  const setFocus = (id) => {
    let updatedTabs = tabs;
    updatedTabs.forEach(element => {
      if (element.id === id) {
        element.focus = true;
      }
    });
    setTabs(updatedTabs);
    setTabFocus(id);
    update(prevUpdater => !prevUpdater);
  };
  const removeFocus = () => {
    let updatedTabs = tabs;
    updatedTabs.forEach(element => {
      element.focus = false;
    });
    setTabs(updatedTabs);
    update(prevUpdater => !prevUpdater);
  };
  const [lines, setLines] = useState([]);
  const addRootTab = () => {
    const id = "id" + Math.random().toString(16).slice(2);
    removeFocus();
    setTabs(() => [...tabs, {
      id: id,
      text: '',
      x: parseInt((window.innerWidth / 2) - 130),
      y: parseInt((window.innerHeight / 2) - 60),
      focus: true,
      style: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: "500",
        fontStyle: "normal",
        background: "theme",
        fill: "noFill",
      },
    }]);
    setTabFocus(id);
  }
  const addTab = (text, x, y, xNew, yNew, idExisting) => {
    const idNew = "id" + Math.random().toString(16).slice(2);
    removeFocus();
    setTabs(() => [
      ...tabs,
      {
        id: idNew,
        text: text,
        x: xNew,
        y: yNew,
        focus: true,
        style: {
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: "500",
          fontStyle: "normal",
          background: "theme",
          fill: "noFill",
        },
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
    setTabFocus(idNew);
  };
  const updateLines = (id, x, y) => {
    let linesUpdated = lines;
    lines.forEach((element, index) => {
      if (element.idFirst === id || element.idSecond === id) {
        if (element.idFirst === id) {
          linesUpdated[index] = {
            idFirst: element.idFirst,
            xFirst: x,
            yFirst: y,
            idSecond: element.idSecond,
            xSecond: element.xSecond,
            ySecond: element.ySecond,
          };
        }
        else {
          linesUpdated[index] = {
            idFirst: element.idFirst,
            xFirst: element.xFirst,
            yFirst: element.yFirst,
            idSecond: element.idSecond,
            xSecond: x,
            ySecond: y,
          };
        }
      }
    })
    setLines(() => linesUpdated);
    update(prevUpdater => !prevUpdater);
  }
  const [theme, setTheme] = useState("gradBlue");
  const [tabFocus, setTabFocus] = useState("none");
  const removeTabFocus = () => setTabFocus("none");
  const removeTab = (id) => {
    setTabs(tabs.filter(element =>
      element.id !== id
    ));
    setLines(lines.filter(element =>
      (element.idFirst !== id) && (element.idSecond !== id)
    ));
    removeTabFocus();
  }
  const changeStyle = (id, prop, value) => {
    let tabsUpdated = tabs;
    tabsUpdated.forEach((element, index) => {
      if (element.id === id) {
        element.style[prop] = value;
      }
    });
    setTabs(tabsUpdated);
    update(prevUpdater => !prevUpdater);
  }

  return (
    <>
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        position: "fixed",
        zIndex: "-1",
      }}
      onClick={() => removeTabFocus()}
    ></div>
    <div className="root">

      
      <AddButton
        addRootTab={addRootTab}
        theme={theme}
      />

      <Search 
        tabs={tabs}
        setFocus={setFocus}
        theme={theme}
      />

      <ToolBar
        setTheme={setTheme}
        theme={theme}
        tabFocus={tabFocus}
        removeTab={removeTab}
        changeStyle={changeStyle}
      />

      {lines.map(element => (
        <Line
          key={element.idSecond}
          xFirst={element.xFirst}
          yFirst={element.yFirst}
          xSecond={element.xSecond}
          ySecond={element.ySecond}
          theme={theme}
        />
      ))}

      {tabs.map((element) => (
        <Tab
          key={element.id}
          id={element.id}
          text={element.text}
          x={element.x}
          y={element.y}
          focus={element.focus}
          addTab={addTab}
          updateLines={updateLines}
          handleTextChange={handleTextChange}
          removeFocus={removeFocus}
          theme={theme}
          tabFocus={tabFocus}
          setTabFocus={setTabFocus}
          style={element.style}
        />
      ))}
    </div>
    </>
  );
}
