import { VscCircleOutline } from 'react-icons/vsc';
import { BiCheckbox } from 'react-icons/bi';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

function Settings(props) {
    return (
        <>
            <div className="themeHeader">Настройки</div>
            <div className="setting"
                onClick={() => props.changeType(props.tabFocus, "connector")}
            >
                <VscCircleOutline />
            </div>
            <div className="setting"
                onClick={() => props.changeType(props.tabFocus, "input")}
            >
                <BiCheckbox />
            </div>
            <div className="setting"
                onClick={() => props.changeType(props.tabFocus, "textarea")}
            >
                <MdCheckBoxOutlineBlank />
            </div>
        </>
    );
}

export default Settings;