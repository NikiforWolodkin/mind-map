import { BsSearch } from 'react-icons/bs';

function Search(props) {
    return (
        <div className="flex items-center px-4 py-2 outline-0 rounded-md text-xl focus:border-blue-500">
            <BsSearch className="mr-2 relative"/>
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                className="outline-0"
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default Search;