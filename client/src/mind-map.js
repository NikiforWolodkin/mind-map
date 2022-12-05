import { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingSpinner from './Components/General/LoadingSpinner';
import Line from './WorkspaceComponents/line';
import Tab from './WorkspaceComponents/tab';
import Search from './UIComponents/search';
import AddButton from "./UIComponents/addButton";
import ClearButton from "./UIComponents/clearButton";
import ToolBar from "./Components/UI/toolBar";
import SaveBar from "./Components/UI/saveBar";
import SearchBar from "./Components/UI/searchBar";
import "./mind-map.css";

export default function Root(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [mindMap, setMindMap] = useState(null);

    const [updater, update] = useState(true);
    const [tabs, setTabs] = useState(
        [{
        id: "id" + Math.random().toString(16).slice(2),
        text: "Новая диаграмма",
        x: parseInt(window.innerWidth / 2 - 131),
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
    const [lines, setLines] = useState([]);
    const [theme, setTheme] = useState("gradBlue");
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
            x: parseInt((window.innerWidth / 2) - 131),
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
            x: xNew > 0 ? ((window.innerWidth - 262) > xNew ? xNew : (window.innerWidth - 262)) : 0,
            y: yNew > 0 ? ((window.innerHeight - 78) > yNew ? yNew : (window.innerHeight - 78)) : 0,
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
            xSecond: xNew > 0 ? ((window.innerWidth - 262) > xNew ? xNew : (window.innerWidth - 262)) : 0,
            ySecond: yNew > 0 ? ((window.innerHeight - 78) > yNew ? yNew : (window.innerHeight - 78)) : 0,
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
    };
    const updateTabPosition = (id, x, y) => {
        let tabsUpdated = tabs.map(element => {
            if (element.id !== id) {
                return element;
            }

            let elementUpdated = element;
            element.x = x;
            element.y = y;
            return elementUpdated; 
        });
        setTabs(tabsUpdated);
        update(prevUpdater => !prevUpdater);
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
    };

    const changeMindMap = async mindMapToSave => {
        try {
            const response = await fetch("/api/auth/changeMindMap", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Token ' +  props.token
                }, 
                body: JSON.stringify(mindMapToSave)
            });
    
            if (!response.ok) {
                // setError("Ошибка сервера");
                throw new Error(`POST error, status: ${response.status}`);
            }

            const result = await response.json();
        }
        catch (e) {
            console.log(e);
        }
    };

    const saveMindMap = async () => {
        update(prevUpdater => !prevUpdater);

        const mindMapUpdated = mindMap;
        mindMapUpdated.tabs = tabs;
        mindMapUpdated.lines = lines;
        mindMapUpdated.theme = theme;

        await changeMindMap(mindMapUpdated);

        navigate("/account");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/auth/mindMap", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': 'Token ' +  props.token
                    },
                    body: JSON.stringify({_id: props.mindMapId})
                });
        
                if (!response.ok) {
                    props.setGlobalToken();
                    props.setGlobalLoggedIn();
                    throw new Error(`GET error, status: ${response.status}`);
                }
    
                const result = await response.json();
                setMindMap(result.mindMap)
                setTabs(result.mindMap.tabs);
                setLines(result.mindMap.lines);
                setTheme(result.mindMap.theme);
                setIsLoading(false);
            }
            catch (e) {
                console.log(e);
                navigate("/error");
            }
        };
        
        fetchUser().catch(console.error);
    }, []);

    if (!props.loggedIn)
    return <Navigate to="/error" />;

    if (props.loggedIn && isLoading)
    return <LoadingSpinner />;

    return (
        <div>
            <div
                style={{
                    width: window.innerWidth,
                    height: window.innerHeight,
                    position: "fixed",
                    zIndex: "0",
                }}
                onClick={ () => removeTabFocus() }
            ></div>

            {/* <ClearButton
                theme={theme}
                clearTabs={clearTabs}
            /> */}

            <SaveBar 
                saveMindMap={saveMindMap}
            />

            <SearchBar 
                addRootTab={addRootTab}
            />

            <ToolBar />

            {/* <AddButton
                addRootTab={addRootTab}
                theme={theme}
            /> */}

            {/* <Search 
                tabs={tabs}
                setFocus={setFocus}
                theme={theme}
            /> */}

            {/* <ToolBar
                setTheme={setTheme}
                theme={theme}
                tabFocus={tabFocus}
                tabs={tabs}
                removeTab={removeTab}
                changeStyle={changeStyle}
                changeType={changeType}
            /> */}

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
                    updateTabPosition={updateTabPosition}
                    handleTextChange={handleTextChange}
                    removeFocus={removeFocus}
                    theme={theme}
                    tabFocus={tabFocus}
                    setTabFocus={setTabFocus}
                    style={element.style}
                    type={element.type}
                />
            ))}
        </div>
    );
} 
