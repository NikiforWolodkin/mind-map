import React, { useState } from 'react';
import { FcMindMap, FcFolder } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

function MindMapPreview(props) {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    return (
        <div 
            className="flex flex-col items-center w-80 h-64 mr-4 border rounded-md tracking-tight text-xl cursor-pointer shadow"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={ () => navigate("/mindmap") }
        >
            <div className="flex items-center h-3/4 text-4xl">
                {props.image !== null ? <img src={props.image} className="object-none w-full h-full rounded-md" /> : 
                    (props.type === "mind-map" ? <FcMindMap /> : <FcFolder />)
                }
            </div>
            <div className={"flex items-center w-full h-1/4 border-t " + (hover === true ? "bg-gray-200" : "")}>
                <div className={"ml-4 mr-2 text-2xl relative " + (props.type === "mind-map" ? "bottom-1" : "bottom-2")}>
                    {props.type === "mind-map" ? <FcMindMap /> : <FcFolder />}
                </div>
                <div className="flex flex-col">
                    <div>
                        {props.text}
                    </div>
                    <div className="text-sm text-gray-500">
                        Обновлено {props.updated} назад
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MindMapPreview;