import { useState, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';

const styleBlack = { color: "lightblue" };
const styleGreen = { color: "#3EC70B" };
const styleOrange = { color: "#FF9F29" };
const stylePurple = { color: "#541690" };
const styleGradBlue = { color: "darkblue" };
const styleGradRed = { color: "red" };

function Search(props) {
    const [updater, update] = useState(true);
    const inputRef = useRef(null);
    const [text, setText] = useState('');
    const [results, setResults] = useState([]);
    const handleSearch = (e) => {
      const search = e.target.value;
      setText(search);
      if (search === '') {
        return;
      }
      let updatedResults = [];
      props.tabs.forEach(element => {
        if (element.text.toUpperCase().indexOf(search.toUpperCase()) !== -1) {
          updatedResults.push({
            text: element.text,
            id: element.id,
            hover: false,
          });
        }
      });
      setResults(updatedResults);
    };

    let style = {};
    switch (props.theme) {
        case "black":
            style = styleBlack;
            break;
        case "green":
            style = styleGreen;
            break;
        case "orange":
            style = styleOrange;
            break;
        case "purple":
            style = stylePurple;
            break;
        case "gradBlue":
            style = styleGradBlue;
            break;
        case "gradRed":
            style = styleGradRed;
            break;
        default:
            style = styleBlack;
            break;
    }

    const setHover = (index) => {
        if (results.length === 0) {
            return;
        }

        let updatedResults = results;
        if (index === -1) {
            updatedResults.forEach((element, indexSecond) => {
                updatedResults[indexSecond].hover = false;
            })
        }
        else {
            updatedResults.forEach((element, indexSecond) => {
                updatedResults[indexSecond].hover = false;
            })
            updatedResults[index].hover = true;
        }
        setResults(() => updatedResults);
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
            results.length === 0 ? <div style={{ cursor: "default" }}>Нет совпадений</div> : (
              results.map((element, index) => {
              return (<div 
                key={element.text + index}
                className="result"
                onClick={() => {
                  setText('');
                  props.setFocus(element.id);
                }}
                style={element.hover === true ? style : {color: "black"}}
                onMouseEnter={() => setHover(index)}
              >
                {element.text}
              </div>)})
            )
          )}
        </div>
      </div>
    );
}

export default Search;