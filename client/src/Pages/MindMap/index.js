import { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { animated } from "react-spring";
import LoadingSpinner from '../../Components/General/LoadingSpinner';
import SavingSpinner from '../../Components/General/SavingBar';
import BarError from '../../Components/Forms/barError';
import Line from '../../Components/UI/line';
import Tab from '../../Components/UI/tab';
import ToolBar from "../../Components/UI/toolBar";
import SaveBar from "../../Components/UI/saveBar";
import SearchBar from "../../Components/UI/searchBar";

export default function Root(props) {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(0);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [mindMap, setMindMap] = useState(null);

    const [tool, setTool] = useState("none");
    const [search, setSearch] = useState("");

    const [updater, update] = useState(true);
    const [tabs, setTabs] = useState(
        [{
        id: "id" + Math.random().toString(16).slice(2),
        text: "Новая диаграмма",
        x: parseInt(window.innerWidth / 2 - 144),
        y: parseInt(window.innerHeight / 2 - 150),
        focus: true,
        style: {
            font: "",
            background: "theme",
            fill: "bg-white",
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
        if (tool === "connections-delete" && tabFocus !== "none" && tabFocus !== id) {
            setLines(lines.filter(element =>
                (element.idFirst !== id) || (element.idSecond !== tabFocus)
            ));
            setLines(lines.filter(element =>
                (element.idFirst !== tabFocus) || (element.idSecond !== id)
            ));
        }
        if (tool === "connections-add" && tabFocus !== "none" && tabFocus !== id) {
            const line = lines.find(element =>
                ((element.idFirst === id) && (element.idSecond === tabFocus)) ||
                ((element.idFirst === tabFocus) && (element.idSecond === id))
            );
            if (line === undefined) {
                const tabFirst = tabs.find(element => element.id === tabFocus);
                const tabSecond = tabs.find(element => element.id === id);
                setLines([...lines, {
                    idFirst: tabFocus,
                    xFirst: tabFirst.x,
                    yFirst: tabFirst.y,
                    idSecond: id,
                    xSecond: tabSecond.x,
                    ySecond: tabSecond.y,
                }]);
            }
        }

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
            x: parseInt((window.innerWidth / 2) - 144),
            y: parseInt((window.innerHeight / 2) - 60),
            focus: true,
            style: {
                font: "",
                background: "theme",
                fill: "bg-white",
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
            x: xNew > 0 ? (4000 > xNew ? xNew : 4000) : 0,
            y: yNew > 0 ? (3000 > yNew ? yNew : 3000) : 0,
            focus: true,
            style: {
                font: "",
                background: "theme",
                fill: "bg-white",
            },
            type: "input",
        }]);
        setLines([...lines, {
            idFirst: idExisting,
            xFirst: x,
            yFirst: y,
            idSecond: idNew,
            xSecond: xNew > 0 ? (4000 > xNew ? xNew : 4000) : 0,
            ySecond: yNew > 0 ? (3000 > yNew ? yNew : 3000) : 0,
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
                throw new Error(`POST error, status: ${response.status}`);
            }

            const result = await response.json();
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };

    const saveMindMap = async () => {
        setIsSaving(true);

        if (mindMap.userId === "Demo") {
            navigate("/account");
        }

        update(prevUpdater => !prevUpdater);

        const mindMapUpdated = mindMap;
        mindMapUpdated.tabs = tabs;
        mindMapUpdated.lines = lines;
        mindMapUpdated.theme = theme;

        const result = await changeMindMap(mindMapUpdated);
        
        if (result) {
            navigate("/account");
        }
        else {
            setError("Ошибка сервера");
        }
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
                    throw new Error(`GET error, status: ${response.status}`);
                }
                
    
                const result = await response.json();
                console.log(response, result)
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

    useEffect(() => {
        const save = async () => {
            update(prevUpdater => !prevUpdater);

            const mindMapUpdated = mindMap;
            mindMapUpdated.tabs = tabs;
            mindMapUpdated.lines = lines;
            mindMapUpdated.theme = theme;

            const result = await changeMindMap(mindMapUpdated);

            if (!result) {
                setError("Ошибка сервера")
            }
        }

        if (timer >= 10 && mindMap.userId !== "Demo") {
            console.log(mindMap.userId)
            save();
            setTimer((prevTimer) => 0);
        }

    }, [tabs]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    if (!props.loggedIn)
    return <Navigate to="/error" />;

    if (props.loggedIn && isLoading)
    return <LoadingSpinner />;

    return (
        <div>
            {error !== null ? <div 
                className="absolute flex w-full h-0 mt-4 justify-evenly cursor-pointer"
                onClick={ () => setError(null) }
            >
                <BarError text={error} />
            </div> : null}
            {isSaving === true ? <div className="absolute flex w-full h-0 mt-4 justify-evenly">
                <SavingSpinner />
            </div> : null}

            <div
                style={{
                    width: window.innerWidth,
                    height: window.innerHeight,
                    position: "fixed",
                    zIndex: "0",
                }}
                onClick={ () =>{
                    removeTabFocus();
                    setTool("none");
                }}
            ></div>

            <div
                className="fixed z-50"
            >
                <SaveBar
                    theme={theme}
                    saveMindMap={saveMindMap}
                    clearTabs={clearTabs}
                />
    
                <SearchBar 
                    theme={theme}
                    addRootTab={addRootTab}
                    search={search}
                    setSearch={setSearch}
                    setFocus={setFocus}
                    results={tabs}
                />
    
                <ToolBar 
                    theme={theme}
                    tool={tool}
                    setTool={setTool}
                    tabFocus={tabFocus}
                    removeTab={removeTab}
                    setTheme={setTheme}
                    changeType={changeType}
                    changeStyle={changeStyle}
                    removeTabFocus={removeTabFocus}
                />
            </div>

            {lines.map(element => (
                <Line
                    key={element.idSecond + element.idFirst}
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
                    setTabFocus={ () => setFocus(element.id) }
                    style={element.style}
                    type={element.type}
                />
            ))}
        </div>
    );
} 
