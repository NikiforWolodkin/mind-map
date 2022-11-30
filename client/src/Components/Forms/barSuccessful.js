import { BsCheck } from 'react-icons/bs';

function BarSuccessful(props) {
    return (
        <div
            className="flex items-center w-80 my-2 px-2 py-2 outline-0 rounded-md border-4 bg-green-500 border-green-500 text-white shadow-lg text-lg"
        >
            <div className="text-2xl mr-1">
                <BsCheck />
            </div>
            {props.text}
        </div>
    );
}

export default BarSuccessful;