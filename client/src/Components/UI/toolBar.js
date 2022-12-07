import { BsBrush } from 'react-icons/bs';
import { AiOutlineSetting, AiOutlineArrowsAlt } from 'react-icons/ai';
import { MdColorLens } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import Connections from './Tools/connections';
import themes from './themes';

function ToolBar(props) {
    const theme = themes.find(element => 
        element.name === props.theme
    );

    return (
        <div className="absolute flex items-center h-screen">
            <div className="flex flex-col items-center justify-evenly w-14 h-60 shadow-2xl rounded-full ml-4 text-2xl z-50 bg-white">
                <div 
                    className={"cursor-pointer " + (props.tool === "customization" ? theme.color : "") + " "
                        + (props.tabFocus !== "none" ? "hover:" + theme.color : "text-gray-200 cursor-default")
                    }
                    onClick={ () => props.setTool("customization")}    
                >
                    <BsBrush />
                </div>
                <div 
                    className={"cursor-pointer " + (props.tool === "settings" ? theme.color : "") + " "
                        + (props.tabFocus !== "none" ? "hover:" + theme.color : "text-gray-200 cursor-default")
                    }
                    onClick={ () => props.setTool("settings")}    
                >
                    <AiOutlineSetting />
                </div>
                <div 
                    className={"cursor-pointer " + (props.tabFocus !== "none" ? "hover:" + theme.color : "text-gray-200 cursor-default")}
                    onClick={ () => {
                        if (props.tabFocus !== "none") {
                            props.removeTab(props.tabFocus);
                            if (props.tool === "connections") {
                                props.setTool("none")
                            }
                        }
                    }}
                >
                    <CgClose />
                </div>
                <div 
                    className={"cursor-pointer " + (props.tool.split("-")[0] === "connections" ? theme.color : "") + " hover:" + theme.color}
                    onClick={ () => props.setTool("connections")}    
                >
                    <AiOutlineArrowsAlt />
                </div>
                <div 
                    className={"cursor-pointer " + (props.tool === "themes" ? theme.color : "") + " hover:" + theme.color}
                    onClick={ () => props.setTool("themes")}    
                >
                    <MdColorLens />
                </div>
            </div>

            {props.tool.split("-")[0] === "connections" ? <Connections 
                theme={theme}
                tool={props.tool}
                setTool={props.setTool}
            /> : null}
        </div>
    );
}
export default ToolBar;