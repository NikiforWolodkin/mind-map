import { BsChevronDown } from 'react-icons/bs';

function DropDown(props) {
    return (
        <>
            <div className="flex items-center py-2 w-34 text-xl rounded hover:bg-gray-200 cursor-pointer">
                <div className="ml-2">
                    {props.text}
                </div>
                <BsChevronDown className="relative top-0.5 mx-2" />
            </div>
            {props.show === true ? <div className="absolute p-2 w-32 bg-white text-xl rounded shadow-2xl cursor-pointer">
                {props.children}
            </div> : null}
        </>
    );
}

export default DropDown;