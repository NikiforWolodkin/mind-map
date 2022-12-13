import { VscCircleOutline } from 'react-icons/vsc';
import { BiCheckbox } from 'react-icons/bi';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

function Settings(props) {
    return (
        <div className="flex flex-wrap content-start w-44 h-60 shadow-2xl rounded ml-4 text-2xl z-50 bg-white">
            <div className="h-fit mt-2 ml-2">
                Настройки
            </div>
            <div className="flex flex-wrap w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer"}
                    onClick={ () => props.changeType(props.tabFocus, "connector") }
                >
                    <VscCircleOutline />
                </div>
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer"}
                    onClick={ () => props.changeType(props.tabFocus, "input") }
                >
                    <BiCheckbox />
                </div>
            </div>
            <div className="flex w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow basis-6/12 flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer"}
                    onClick={ () => props.changeType(props.tabFocus, "textarea")  }
                >
                    <MdCheckBoxOutlineBlank />
                </div>
                <div 
                    className={"grow basis-6/12"}
                >
                    
                </div>
            </div>
        </div>
    );
}

export default Settings;