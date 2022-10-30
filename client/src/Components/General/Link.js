function Link(props) {
    return (
        <a
            className="text-blue-500 cursor-pointer hover:underline"
        >{props.children}</a>
    );
}

export default Link;