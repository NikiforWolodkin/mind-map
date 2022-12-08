import { ImExit } from 'react-icons/im';
import { TiArrowBack } from 'react-icons/ti';
import { FaTrash } from 'react-icons/fa';
import themes from './themes';

function SaveBar(props) {
    const theme = Object.assign({}, themes.find(element => 
        element.name === props.theme
    ));
    if (theme.name === "black" || theme.name === "gradBlack") {
        theme.color = "text-blue-600"
    }

    return (
        <div className="absolute flex items-center justify-evenly w-40 h-14 shadow-2xl rounded-full m-4 text-xl z-50 bg-white">
            <div 
                className={"cursor-pointer hover:" + theme.color}
                onClick={props.saveMindMap}
            >
                <ImExit />
            </div>
            <div className={"text-3xl mb-0.5 cursor-pointer hover:" + theme.color}>
                <TiArrowBack />
            </div>
            <div 
                className={"cursor-pointer hover:" + theme.color}
                onClick={props.clearTabs}
            >
                <FaTrash />
            </div>
        </div>
    );
}
export default SaveBar;