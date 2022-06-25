import { useState, useEffect } from 'react';
import { BsBrush } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdColorLens, MdDeleteOutline } from 'react-icons/md';

const styleBlack = { color: "lightblue" };
const styleGreen = { color: "#3EC70B" };
const styleOrange = { color: "#FF9F29" };
const stylePurple = { color: "#541690" };
const styleGradBlue = { color: "darkblue" };
const styleGradRed = { color: "red" };
const styleDisabled = {
    color: "lightgrey",
    cursor: "default",
}

function Theme(props) {
    return (
        <>
        <div className="themeHeader">Тема</div>
        <div
            className="theme"
            onClick={() => props.setTheme("black")}
            style={{
                background: "black"
            }}
        >
            <div className="themeInner">
                
            </div>
        </div>
        <div
            className="theme"
            onClick={() => props.setTheme("green")}
            style={{
                background: "#3EC70B"
            }}
        >
            <div className="themeInner">
                
            </div>
        </div>
        <div
            className="theme"
            onClick={() => props.setTheme("orange")}
            style={{
                background: "#FF9F29"
            }}
        >
            <div className="themeInner">
                
            </div>
        </div>
        <div
            className="theme"
            onClick={() => props.setTheme("purple")}
            style={{
                background: "#541690"
            }}
        >
            <div className="themeInner">
                
            </div>
        </div>
        <div
            className="theme"
            onClick={() => props.setTheme("gradBlue")}
            style={{
                background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
            }}
        >
            <div className="themeInner">
                
            </div>
        </div>
        <div
            className="theme"
            onClick={() => props.setTheme("gradRed")}
            style={{
                background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
            }}
        >
            <div className="themeInner">
                
            </div>
        </div>
        </>
    );
}

function ToolBar(props) {
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

    const [themeStyle, setThemeStyle] = useState({ color: "black" });
    const [deleteStyle, setDeleteStyle] = useState({ color: "black" });
    const [settingsStyle, setSettingsStyle] = useState({ color: "black" });
    const [customizationStyle, setCustomizationStyle] = useState({ color: "black" });
    const [tool, setTool] = useState("none");
    const chooseTool = (toolName) => {
        if (tool === toolName) {
            setTool("none");
        }
        else {
            setTool(toolName);
        }
    }

    return (
        <>
        <div className="toolBar">
            <div
                onClick={() => chooseTool("customization")}
                onMouseEnter={() => {
                    setCustomizationStyle(style);
                }}
                onMouseLeave={() => {
                    setCustomizationStyle({ color: "black" });
                }}
                style={props.tabFocus === "none" ? styleDisabled : (
                    tool === "customization" ? style : customizationStyle
                )}
            >
                <BsBrush />
            </div>
            <div 
                onClick={() => chooseTool("settings")}
                onMouseEnter={() => {
                    setSettingsStyle(style);
                }}
                onMouseLeave={() => {
                    setSettingsStyle({ color: "black" });
                }}
                style={props.tabFocus === "none" ? styleDisabled : (
                    tool === "settings" ? style : settingsStyle
                )}
            >
                <AiOutlineSetting />
            </div>
            <div
                onClick={() => props.removeTab(props.tabFocus)}
                onMouseEnter={() => {
                    setDeleteStyle(style);
                }}
                onMouseLeave={() => {
                    setDeleteStyle({ color: "black" });
                }}
                style={props.tabFocus === "none" ? styleDisabled : deleteStyle}
            >
                <MdDeleteOutline />
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
        </div>
        </>
    );
}

export default ToolBar;