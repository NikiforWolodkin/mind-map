import { ImExit } from 'react-icons/im';
import { TiArrowBack } from 'react-icons/ti';
import { FaTrash } from 'react-icons/fa';

function SaveBar(props) {
    return (
        <div className="absolute flex items-center justify-evenly w-44 h-14 shadow-2xl rounded-full m-4 text-2xl">
            <div className="">
                <ImExit />
            </div>
            <div className="text-4xl mb-0.5">
                <TiArrowBack />
            </div>
            <div className="">
                <FaTrash />
            </div>
        </div>
    );
}
export default SaveBar;