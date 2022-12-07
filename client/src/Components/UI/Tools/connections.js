import { TbPlugConnectedX, TbPlugConnected } from 'react-icons/tb';

function Connections(props) {
    return (
        <div className="flex flex-wrap content-start w-44 h-60 shadow-2xl rounded ml-4 text-2xl z-50 bg-white">
            <div className="h-fit mt-2 ml-2">
                Связи
            </div>
            <div className="flex w-full h-fit mt-2 mr-2">
                <div 
                    className={
                        "grow flex justify-center items-center py-2 ml-2 rounded shadow-2xl cursor-pointer hover:" + props.theme.color + " "
                        + (props.tool === "connections-delete" ? props.theme.color : "")

                    }
                    onClick={ () => props.setTool("connections-delete") }
                >
                    <TbPlugConnectedX />
                </div>
                <div 
                    className={
                        "grow flex justify-center items-center py-2 ml-2 rounded shadow-2xl cursor-pointer hover:" + props.theme.color + " "
                        + (props.tool === "connections-add" ? props.theme.color : "")

                    }
                    onClick={ () => props.setTool("connections-add") }
                >
                    <TbPlugConnected />
                </div>
            </div>

            {props.tool === "connections-add" ?<div className="text-base m-2">
                Выберите два элемента для соединения
            </div> : null}
            {props.tool === "connections-delete" ?<div className="text-base m-2">
                Выберите два элемента для разъединения
            </div> : null}
        </div>
    );
}

export default Connections;