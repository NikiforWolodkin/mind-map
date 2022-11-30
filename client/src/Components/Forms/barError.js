import { TiDelete } from 'react-icons/ti';

function BarError(props) {
    return (
        <div
            className="flex items-center w-80 my-2 px-2 py-2 outline-0 rounded-md border-4 bg-red-500 border-red-500 text-white shadow-lg text-lg"
        >
            <div className="text-2xl mr-1">
                <TiDelete />
            </div>
            {props.text}
        </div>
    );
}

export default BarError;