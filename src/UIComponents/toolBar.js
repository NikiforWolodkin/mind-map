import { useState, useEffect } from 'react';
import { BsBrush } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdColorLens } from 'react-icons/md';
import { BiCircle } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import styles from '../styles';
import Customization from './Tools/customization';
import Theme from './Tools/theme';
import Settings from './Tools/settings';

const styleDisabled = {
    color: "lightgrey",
    cursor: "default",
};

function ToolBar(props) {
    let style = { color: (props.theme !== "black" && props.theme !== "gradBlack") ? styles.find(element =>
        element.name === props.theme
    ).color : "lightblue" };

    const [themeStyle, setThemeStyle] = useState({ color: "black" });
    const [deleteStyle, setDeleteStyle] = useState({ color: "black" });
    const [settingsStyle, setSettingsStyle] = useState({ color: "black" });
    const [customizationStyle, setCustomizationStyle] = useState({ color: "black" });
    const [tool, setTool] = useState("none");
    const chooseTool = (toolName) => {
        if (tool === toolName) {
            setTool("none");
            return;
        }

        setTool(toolName);
    }

    return (
        <>
            <div className="toolBar">
                <div
                    onClick={() => chooseTool("customization")}
                    onMouseEnter={() => setCustomizationStyle(style)}
                    onMouseLeave={() => setCustomizationStyle({ color: "black" })}
                    style={
                        props.tabs.find(element => element.id === props.tabFocus) !== undefined ? (
                            props.tabFocus === "none" || 
                            props.tabs.find(element => element.id === props.tabFocus).type === "connector") ? styleDisabled : (
                            tool === "customization" ? style : customizationStyle
                        ) : styleDisabled
                    }
                >
                    <BsBrush />
                </div>
                <div 
                    onClick={() => chooseTool("settings")}
                    onMouseEnter={() => setSettingsStyle(style)}
                    onMouseLeave={() => setSettingsStyle({ color: "black" })}
                    style={props.tabFocus === "none" ? styleDisabled : (
                        tool === "settings" ? style : settingsStyle
                    )}
                >
                    <AiOutlineSetting />
                </div>
                <div
                    onClick={() => props.removeTab(props.tabFocus)}
                    onMouseEnter={() => setDeleteStyle(style)}
                    onMouseLeave={() => setDeleteStyle({ color: "black" })}
                    style={props.tabFocus === "none" ? styleDisabled : deleteStyle}
                >
                    <CgClose />
                </div>
                <div
                    onClick={() => chooseTool("theme")}
                    onMouseEnter={() => setThemeStyle(style)}
                    onMouseLeave={() => setThemeStyle({ color: "black" })}
                    style={tool === "theme" ? style : themeStyle}
                >
                    <MdColorLens />
                </div>
            </div>
            <div className="tool">
                {tool === "theme" && 
                    <Theme setTheme={props.setTheme} />
                }
                {((tool === "customization" && props.tabFocus !== "none") && 
                    props.tabs.find(element => element.id === props.tabFocus).type !== "connector") &&
                    <Customization 
                        changeStyle={props.changeStyle} 
                        tabFocus={props.tabFocus}
                    />
                }
                {(tool === "settings" && props.tabFocus !== "none") && 
                    <Settings
                        changeType={props.changeType}
                        tabFocus={props.tabFocus}
                    />
                }
            </div>
        </>
    );
}

export default ToolBar;