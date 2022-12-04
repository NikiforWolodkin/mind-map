function ListElement(props) {
    return (
        <div 
            className={"flex items-center text-xl py-1 pl-4 hover:bg-gray-200 tracking-tight cursor-pointer " + (props.currentSection === props.name ? "bg-gray-200" : "")}>
            {props.children}
            <div className="ml-2">
                {props.text}
            </div>
        </div>
    );
}

export default ListElement;