import { useState, useEffect } from "react";
import Line from './WorkspaceComponents/line';
import Tab from './WorkspaceComponents/tab';
import Search from './UIComponents/search';
import AddButton from "./UIComponents/addButton";
import ClearButton from "./UIComponents/clearButton";
import ToolBar from "./UIComponents/toolBar";
import "./mind-map.css";

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
    const [lines, setLines] = useState(JSON.parse(localStorage.getItem('lines')) || []);
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || "gradBlue");
    const [tabFocus, setTabFocus] = useState("none");
    const handleTextChange = (id, text) => {
        let tabsUpdated = tabs;
        const index = tabsUpdated.findIndex(element =>
            element.id === id
        );
        if (index === -1) {
            return;
        }
        tabsUpdated[index].text = text;
        setTabs(tabsUpdated);
        update(prevUpdater => !prevUpdater);
    };
    const setFocus = (id) => {
        let tabsUpdated = tabs;
        const index = tabsUpdated.findIndex(element =>
            element.id === id
        );
        if (index === -1) {
            return;
        }
        tabsUpdated[index].focus = true;
        setTabs(tabsUpdated);
        setTabFocus(id);
        update(prevUpdater => !prevUpdater);
    };
    const removeFocus = () => {
        let tabsUpdated = tabs;
        tabs.forEach(element => {
            element.focus = false;
        });
        setTabs(tabsUpdated);
        update(prevUpdater => !prevUpdater);
    };
    const addRootTab = () => {
        const id = "id" + Math.random().toString(16).slice(2);
        removeFocus();
        setTabs([...tabs, {
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
    };
    const addTab = (text, x, y, xNew, yNew, idExisting) => {
        const idNew = "id" + Math.random().toString(16).slice(2);
        removeFocus();
        setTabs([...tabs, {
            id: idNew,
            text: text,
            x: (window.innerWidth - 262) > xNew ? xNew : (window.innerWidth - 262),
            y: (window.innerHeight - 38) > yNew ? yNew : (window.innerHeight - 38),
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
        setLines([...lines, {
            idFirst: idExisting,
            xFirst: x,
            yFirst: y,
            idSecond: idNew,
            xSecond: (window.innerWidth - 262) > xNew ? xNew : (window.innerWidth - 262),
            ySecond: (window.innerHeight - 38) > yNew ? yNew : (window.innerHeight - 38),
        }]);
        setTabFocus(idNew);
    };
    const updateLines = (id, x, y) => {
        let linesUpdated = lines.map(element => {
            if (element.idFirst !== id && element.idSecond !== id) {
                return element;
            }
            let elementUpdated = element;
            if (element.idFirst === id) {
                element.xFirst = x;
                element.yFirst = y;
                return elementUpdated;
            }
            element.xSecond = x;
            element.ySecond = y;
            return elementUpdated; 
        });
        setLines(linesUpdated);
        update(prevUpdater => !prevUpdater);
        localStorage.setItem('tabs', JSON.stringify(tabs));
    };
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
    };
    const changeStyle = (id, prop, value) => {
        let tabsUpdated = tabs;
        const index = tabsUpdated.findIndex(element =>
            element.id === id
        );
        if (index === -1) {
            return;
        }
        tabsUpdated[index].style[prop] = value;
        setTabs(tabsUpdated);
        update(prevUpdater => !prevUpdater);
    };
    const changeType = (id, type) => {
        let tabsUpdated = tabs;
        const index = tabsUpdated.findIndex(element =>
            element.id === id
        );
        if (index === -1) {
            return;
        }
        tabsUpdated[index].type = type;
        setTabs(tabsUpdated);
        update(prevUpdater => !prevUpdater);
    };
    const clearTabs = () => {
        setTabs([]);
        setLines([]);
        setTabFocus("none");
        setTheme("gradBlue");
        update(prevUpdater => !prevUpdater);
        localStorage.clear();
    };

    useEffect(() => {
        localStorage.setItem('tabs', JSON.stringify(tabs));
        if (tabs.length === 0) {
            localStorage.clear();
        }
    }, [tabs, updater]);
    useEffect(() => {
        localStorage.setItem('lines', JSON.stringify(lines));
    }, [lines, updater]);
    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);


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
                tabs={tabs}
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
    );
} 
