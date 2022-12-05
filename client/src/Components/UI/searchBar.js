import { AiOutlinePlus } from 'react-icons/ai';
import Search from '../General/Search';

function SearchBar(props) {
    return (
        <div className="absolute flex justify-end w-screen">
            <div 
                className="flex items-center justify-evenly w-14 h-14 mt-4 shadow-2xl rounded-full text-2xl text-white z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer"
                onClick={() => props.addRootTab()}
            >
                <AiOutlinePlus />
            </div>
            <div className="flex items-center justify-evenly w-76 h-14 m-4 shadow-2xl rounded-full text-2xl z-50 bg-white">
                <Search
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