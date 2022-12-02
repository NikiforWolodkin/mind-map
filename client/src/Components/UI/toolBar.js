import { BsBrush } from 'react-icons/bs';
import { AiOutlineSetting, AiOutlineArrowsAlt } from 'react-icons/ai';
import { MdColorLens } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';

function ToolBar(props) {
    return (
        <div className="absolute flex items-center h-screen">
            <div className="flex flex-col items-center justify-evenly w-14 h-60 shadow-2xl rounded-full ml-4 text-2xl z-50 bg-white">
                <div className="cursor-pointer">
                    <BsBrush />
                </div>
                <div className="cursor-pointer">
                    <AiOutlineSetting />
                </div>
                <div className="cursor-pointer">
                    <AiOutlineArrowsAlt />
                </div>
                <div className="cursor-pointer">
                    <CgClose />
                </div>
                <div className="cursor-pointer">
                    <MdColorLens />
                </div>
            </div>
        </div>
        
    );
}
export default ToolBar;