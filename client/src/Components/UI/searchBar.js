import { AiOutlinePlus } from 'react-icons/ai';
import Search from '../General/Search';
import themes from './themes';

function SearchBar(props) {
    const theme = themes.find(element => 
        element.name === props.theme
    );

    return (
        <div className="absolute flex justify-end w-screen">
            <div 
                className={"flex items-center justify-evenly w-14 h-14 mt-4 shadow-2xl rounded-full text-2xl text-white z-50 cursor-pointer " + theme.background}
                onClick={ () => props.addRootTab() }
            >
                <AiOutlinePlus />
            </div>
            <div className="flex items-center justify-evenly w-76 h-14 m-4 shadow-2xl rounded-full text-2xl z-50 bg-white">
                <Search
                    theme={props.theme}
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Поиск..."
                />
            </div>
        </div>
    );
}
export default SearchBar;