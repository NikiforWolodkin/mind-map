function Input(props) {
    return (
        <input
            type={props.type}
            name={props.name}
            id={props.id}
            className="w-80 my-2 px-4 py-2 outline-0 rounded-md border-4 border-black shadow-lg text-lg focus:border-blue-500"
            placeholder={props.placeholder}
        />
    );
}

export default Input;