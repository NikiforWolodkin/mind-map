import { MdDeleteOutline } from 'react-icons/md';
import styles from '../styles';

function ClearButton(props) {
    const style = { background: styles.find(element =>
        element.name === props.theme
    ).background };
    
    return (
        <button
            onClick={() => props.clearTabs()}
            className="clearButton"
            style={style}
        >
            <MdDeleteOutline />
        </button>
    );
}

export default ClearButton;