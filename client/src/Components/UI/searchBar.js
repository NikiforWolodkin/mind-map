import { AiOutlinePlus } from 'react-icons/ai';
import Search from '../General/Search';
import themes from './themes';
import useWindowDimensions from '../../useWindowDimensions';

function SearchBar(props) {
    const { height, width } = useWindowDimensions();

    const theme = themes.find(element => 
        element.name === props.theme
    );

    const matchesSearch = (name) => {
        if (props.search === "") {
            return false;
        }

        return name.toUpperCase().includes(props.search.toUpperCase());
    }
    console.log(width)

    return (
        <>
        <div className={"absolute flex w-screen " + (parseInt(width) <= 600 ? "" : "justify-end")}>
            <div 
                className={"flex items-center justify-evenly w-14 h-14 mt-4 ml-4 shadow-2xl rounded-full text-2xl text-white z-50 cursor-pointer " + theme.background}
                onClick={ () => props.addRootTab() }
            >
                <AiOutlinePlus />
            </div>
            <div className={"flex items-center justify-evenly h-14 m-4 shadow-2xl rounded-full text-2xl z-50 bg-white " + (parseInt(width) <= 600 ? "w-64" : "w-80")}>
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
        <div className={"absolute flex w-screen mt-2 " + (parseInt(width) <= 600 ? "ml-20" : "justify-end")}>
            <div className={"flex flex-col mr-4 ml-2 mt-20 shadow-2xl rounded text-xl z-50 bg-white " + (parseInt(width) <= 600 ? "w-64" : "w-80")}>
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