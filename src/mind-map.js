import { useState, useEffect } from "react";
import Line from './WorkspaceComponents/line';
import Search from './UIComponents/search';
import Tab from './WorkspaceComponents/tab';
import AddButton from "./UIComponents/addButton";
import ToolBar from "./UIComponents/toolBar";
import "./mind-map.css";
import ClearButton from "./UIComponents/clearButton";

export default function Root() {
  const [updater, update] = useState(true);
  const [tabs, setTabs] = useState(
    JSON.parse(localStorage.getItem('tabs')) || [{
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
    type: "input",
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
          type: element.type,
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
  const [lines, setLines] = useState(JSON.parse(localStorage.getItem('lines')) || []);
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
      type: "input",
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
        type: "input",
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
    localStorage.setItem('tabs', JSON.stringify(tabs));
    update(prevUpdater => !prevUpdater);
  }
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || "gradBlue");
  const [tabFocus, setTabFocus] = useState(JSON.parse(localStorage.getItem('tabFocus')) || "none");
  const removeTabFocus = () => setTabFocus("none");
  const removeTab = (id) => {
    setTabs(tabs.filter(element =>
      element.id !== id
    ));
    setLines(lines.filter(element =>
      (element.idFirst !== id) && (element.idSecond !== id)
    ));
    removeTabFocus();
    localStorage.removeItem(id);
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
  const changeType = (id, type) => {
    let tabsUpdated = tabs;
    tabsUpdated.forEach((element, index) => {
      if (element.id === id) {
        element.type = type;
      }
    });
    setTabs(tabsUpdated);
    update(prevUpdater => !prevUpdater);
  }
  const clearTabs = () => {
    setTabs([]);
    setLines([]);
    update(prevUpdater => !prevUpdater);
    localStorage.clear();
    setTheme("gradBlue");
  }

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
    localStorage.setItem('lines', JSON.stringify(lines));
    localStorage.setItem('theme', JSON.stringify(theme));
    localStorage.setItem('tabFocus', JSON.stringify(tabFocus));
    if (tabs.length === 0) {
      localStorage.clear();
    }
  }, [tabs, lines, theme, tabFocus, updater]);

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
    <>
      <ClearButton
        theme={theme}
        clearTabs={clearTabs}
      />
      
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
        changeType={changeType}
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
          type={element.type}
        />
      ))}
    </>
    </>
  );
}
