function DropDown(props) {
    return (
        <div className="flex px-4 py-2 text-xl rounded cursor-pointer hover:bg-gray-200">
            <div className="">
                {props.text}
            </div>
        </div>
    );
}

export default DropDown;