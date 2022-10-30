function Submit(props) {
    return (
        <input
            type={props.type}
            name={props.name}
            id={props.id}
            className="w-80 my-2 px-4 py-2 bg-black outline-0 rounded-md border-4 border-black shadow-lg hover:cursor-pointer text-white text-lg font-bold"
            value={props.value}
        />
    );
}

export default Submit;