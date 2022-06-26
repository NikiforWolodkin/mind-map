import { useState, useEffect } from 'react';
import { BsBrush } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdColorLens, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { BiCircle, BiCheckbox } from 'react-icons/bi';
import { VscCircleOutline } from 'react-icons/vsc';
import { CgClose } from 'react-icons/cg';

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

function Customization(props) {
    return (
        <>
        <div className="themeHeader" style={{ marginBottom: "0" }}>Оформление</div>
        <div className="customizationFont"
        onClick={() => {
            props.changeStyle(props.tabFocus, "fontFamily", "'Montserrat', sans-serif");
            props.changeStyle(props.tabFocus, "fontWeight", "500");
            props.changeStyle(props.tabFocus, "fontStyle", "normal");
        }}
        >Aa</div>
        <div className="customizationFont" style={{ fontWeight: "bold" }}
        onClick={() => {
            props.changeStyle(props.tabFocus, "fontFamily", "'Montserrat', sans-serif");
            props.changeStyle(props.tabFocus, "fontWeight", "800");
            props.changeStyle(props.tabFocus, "fontStyle", "normal");
        }}
        >Aa</div>
        <div className="customizationFont" style={{ fontStyle: "italic" }}
        onClick={() => {
            props.changeStyle(props.tabFocus, "fontFamily", "'Montserrat', sans-serif");
            props.changeStyle(props.tabFocus, "fontWeight", "500");
            props.changeStyle(props.tabFocus, "fontStyle", "italic");
        }}
        >Aa</div>
        <div className="customizationFont" style={{ fontFamily: "'Lobster', cursive" }}
        onClick={() => {
            props.changeStyle(props.tabFocus, "fontFamily", "'Lobster', cursive");
            props.changeStyle(props.tabFocus, "fontWeight", "500");
            props.changeStyle(props.tabFocus, "fontStyle", "normal");
        }}
        >Aa</div>

        <div className="customizationColorContainer">
        <div className="customizationColor"
        style={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)" }}
        onClick={() => props.changeStyle(props.tabFocus, "background", "theme")}
        ></div>
        <div className="customizationColor"
        style={{
            width: "36px",
            height: "36px",
            border: "2px solid black",
            backgroundColor: "white",
        }}
        onClick={() => props.changeStyle(props.tabFocus, "background", "white")}
        ></div>
        <div className="customizationColor"
        style={{ backgroundColor: "black" }}
        onClick={() => props.changeStyle(props.tabFocus, "background", "black")}
        ></div>
        <div className="customizationColor"
        onClick={() => props.changeStyle(props.tabFocus, "background", "red")}
        ></div>
        <div className="customizationColor"
        style={{ backgroundColor: "orange" }}
        onClick={() => props.changeStyle(props.tabFocus, "background", "orange")}
        ></div>
        <div className="customizationColor"
        style={{ backgroundColor: "lime" }}
        onClick={() => props.changeStyle(props.tabFocus, "background", "lime")}
        ></div>
        <div className="customizationColor"
        style={{ backgroundColor: "blue" }}
        onClick={() => props.changeStyle(props.tabFocus, "background", "blue")}
        ></div>
        <div className="customizationColor"
        style={{ backgroundColor: "hotpink" }}
        onClick={() => props.changeStyle(props.tabFocus, "background", "hotpink")}
        ></div>
        </div>
        <div className="customizationFill"
        onClick={() => props.changeStyle(props.tabFocus, "fill", "noFill")}
        >
            <div className="fill">
                Aa
            </div>
        </div>
        <div className="customizationFill"
        onClick={() => props.changeStyle(props.tabFocus, "fill", "fill")}
        >
            <div className="noFill">
                Aa
            </div>
        </div>
        </>
    );
}

function Settings(props) {
    return (
        <>
        <div className="themeHeader">Настройки</div>
        <div className="setting"
        onClick={() => props.changeType(props.tabFocus, "connector")}
        >
            <VscCircleOutline />
        </div>
        <div className="setting"
        onClick={() => props.changeType(props.tabFocus, "input")}
        >
            <BiCheckbox />
        </div>
        <div className="setting"
        onClick={() => props.changeType(props.tabFocus, "textarea")}
        >
            <MdCheckBoxOutlineBlank />
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
            {(tool === "customization" && props.tabFocus !== "none") && 
                <Customization changeStyle={props.changeStyle} tabFocus={props.tabFocus} />
            }
            {(tool === "settings" && props.tabFocus !== "none") && 
                <Settings changeType={props.changeType} tabFocus={props.tabFocus} />
            }
        </div>
        </>
    );
}

export default ToolBar;