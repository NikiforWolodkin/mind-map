import { useState, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from '../styles';

function Search(props) {
    const style = { color: (props.theme !== "black" && props.theme !== "gradBlack") ? styles.find(element =>
        element.name === props.theme
    ).color : "lightblue" };

    const inputRef = useRef(null);
    const [updater, update] = useState(true);
    const [text, setText] = useState('');
    const [results, setResults] = useState([]);
    const handleSearch = (e) => {
        const search = e.target.value;
        setText(search);
        if (search === '') {
            return;
        }
      
        let resultsUpdated = props.tabs.filter(element => 
            element.text.toUpperCase().indexOf(search.toUpperCase()) !== -1
        );
        resultsUpdated = resultsUpdated.map(element => ({
            text: element.text,
            id: element.id,
            hover: false,
        }));
        setResults(resultsUpdated);
    };
    const setHover = (index) => {
        if (results.length === 0) {
            return;
        }

        let resultsUpdated = results;
        resultsUpdated.map(element => {
            element.hover = false;
        });
        if (index !== -1) {
            resultsUpdated[index].hover = true;
        }
        setResults(resultsUpdated);
        update(prevUpdater => !prevUpdater);
    }
    
    return (
        <div className="searchBar">
            <BsSearch
                className="searchIcon"
                onClick={() => inputRef.current.focus()}
            />
            <input
                type="text"
                placeholder="Поиск..."
                ref={inputRef}
                value={text}
                onChange={handleSearch}
            />
            <div className="searchResults" onMouseLeave={() => setHover(-1)}>
                {text === '' ? null : (
                    results.length === 0 ? <div className="noResults">Нет совпадений</div> : (
                        results.map((element, index) =>
                        <div 
                            key={element.text + index}
                            className="result"
                            onClick={() => {
                                setText('');
                                props.setFocus(element.id);
                            }}
                            style={element.hover === true ? style : { color: "black" }}
                            onMouseEnter={() => setHover(index)}
                        >
                            {element.text}
                        </div>)
                    )
                )}
            </div>
        </div>
    );
}

export default Search;