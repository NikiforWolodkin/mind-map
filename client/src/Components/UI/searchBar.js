import { AiOutlinePlus } from 'react-icons/ai';
import Search from '../General/Search';
import themes from './themes';

function SearchBar(props) {
    const theme = themes.find(element => 
        element.name === props.theme
    );

    const matchesSearch = (name) => {
        if (props.search === "") {
            return false;
        }

        return name.toUpperCase().includes(props.search.toUpperCase());
    }

    return (
        <>
        <div className="absolute flex justify-end w-screen">
            <div 
                className={"flex items-center justify-evenly w-14 h-14 mt-4 shadow-2xl rounded-full text-2xl text-white z-50 cursor-pointer " + theme.background}
                onClick={ () => props.addRootTab() }
            >
                <AiOutlinePlus />
            </div>
            <div className="flex items-center justify-evenly w-80 h-14 m-4 shadow-2xl rounded-full text-2xl z-50 bg-white">
                <div className="mr-auto">
                    <Search
                        theme={props.theme}
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Поиск..."
                        value={props.search}
                        setSearch={props.setSearch}
                    />
                </div>
            </div>
        </div>
        <div className="absolute flex justify-end w-screen mt-2">
            <div className="flex flex-col w-80 mr-4 mt-20 shadow-2xl rounded text-xl z-50 bg-white">
                {props.results.map(element => {
                    if (element.text !== "" && matchesSearch(element.text)) {
                        return <div 
                            key={element.id}
                            className={"mx-4 my-1 cursor-pointer hover:" + theme.color}
                            onClick={ () => { 
                                props.setFocus(element.id);
                                props.setSearch("");
                            }}
                        >
                            {element.text}
                        </div>;
                    }

                    return null;
                })}
            </div>
        </div>
        </>
    );
}
export default SearchBar;