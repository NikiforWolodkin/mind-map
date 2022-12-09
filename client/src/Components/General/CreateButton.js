function CreateButton(props) {
    return (
        <div 
            className="flex items-center w-80 h-16 px-4 mx-2 border rounded-md tracking-tight text-xl cursor-pointer hover:bg-gray-200 shadow"
            onClick={props.onClick}
        >
            <div className="text-2xl mr-4">
                {props.children}
            </div>
            {props.text}
        </div>
    );
}

export default CreateButton;