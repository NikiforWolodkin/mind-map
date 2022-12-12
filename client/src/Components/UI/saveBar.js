import { ImExit } from 'react-icons/im';
import { TiArrowBack } from 'react-icons/ti';
import { FaTrash } from 'react-icons/fa';
import themes from './themes';
import useWindowDimensions from '../../useWindowDimensions';

function SaveBar(props) {
    const { height, width } = useWindowDimensions();

    const theme = Object.assign({}, themes.find(element => 
        element.name === props.theme
    ));
    if (theme.name === "black" || theme.name === "gradBlack") {
        theme.color = "text-blue-600"
    }

    return (
        <div className={parseInt(width) <= 600 ? "absolute flex h-screen items-end" : ""} >
            <div className="absolute flex items-center justify-evenly w-28 h-14 m-4 shadow-2xl rounded-full text-xl z-50 bg-white">
                <div 
                    className={"cursor-pointer hover:" + theme.color}
                    onClick={props.saveMindMap}
                >
                    <ImExit />
                </div>
                <div 
                    className={"cursor-pointer hover:" + theme.color}
                    onClick={props.clearTabs}
                >
                    <FaTrash />
                </div>
            </div>
        </div>
    );
}
export default SaveBar;