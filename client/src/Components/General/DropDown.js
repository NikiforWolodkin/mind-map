import { BsChevronDown } from 'react-icons/bs';

function DropDown(props) {
    return (
        <div className="flex items-center py-2 text-xl rounded hover:bg-gray-200 cursor-pointer">
            <div className="ml-2">
                Аккаунт
            </div>
            <BsChevronDown
                className="relative top-0.5 mx-2"
            />
        </div>
    );
}

export default DropDown;