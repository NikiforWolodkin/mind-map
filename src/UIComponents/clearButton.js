import { MdDeleteOutline } from 'react-icons/md';

const styleBlack = { background: "black" };
const styleGreen = { background: "#3EC70B" };
const styleOrange = { background: "#FF9F29" };
const stylePurple = { background: "#541690" };
const styleGradBlue = { background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)" };
const styleGradRed = { background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)" };

function ClearButton(props) {
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