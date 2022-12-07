import { BsBrush } from 'react-icons/bs';
import { AiOutlineSetting, AiOutlineArrowsAlt } from 'react-icons/ai';
import { MdColorLens } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import themes from './themes';

function ToolBar(props) {
    const theme = themes.find(element => 
        element.name === props.theme
    );

    return (
        <div className="absolute flex items-center h-screen">
            <div className="flex flex-col items-center justify-evenly w-14 h-60 shadow-2xl rounded-full ml-4 text-2xl z-50 bg-white">
                <div className={"cursor-pointer hover:" + theme.color}>
                    <BsBrush />
                </div>
                <div className={"cursor-pointer hover:" + theme.color}>
                    <AiOutlineSetting />
                </div>
                <div className={"cursor-pointer hover:" + theme.color}>
                    <CgClose />
                </div>
                <div className={"cursor-pointer hover:" + theme.color}>
                    <AiOutlineArrowsAlt />
                </div>
                <div className={"cursor-pointer hover:" + theme.color}>
                    <MdColorLens />
                </div>
            </div>
        </div>
        
    );
}
export default ToolBar;