import { useState, useRef } from "react";
import { BsSearch } from 'react-icons/bs';
import themes from '../UI/themes';
import useWindowDimensions from '../../useWindowDimensions';

function Search(props) {
    const inputRef = useRef(null);
    const { height, width } = useWindowDimensions();

    let theme = themes.find(element => {
        if (element.name === props.theme) {
            return true;
        }

        return false;
    });
    if (theme === undefined) {
        theme = { color: "text-blue-600" }
    }

    return (
        <div className="flex items-center px-4 py-2 outline-0 rounded-md text-xl focus:border-blue-500 cursor-pointer">
            <div className={"mr-2 relative hover:" + theme.color}
                onClick={() => {
                    if (inputRef.current !== null) {
                        inputRef.current.focus();
                    }
                }}
            >
                <BsSearch />
            </div>
            <input
                ref={inputRef}
                type={props.type}
                name={props.name}
                id={props.id}
                className={"outline-0 " + (parseInt(width) < 600 ? "w-48" : "")}
                placeholder={props.placeholder}
                value={props.value}
                onChange={ e => props.setSearch(e.target.value)}
            />
        </div>
    );
}

export default Search;