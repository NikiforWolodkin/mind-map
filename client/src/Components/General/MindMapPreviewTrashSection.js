import React, { useState, useEffect, useFocus, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcMindMap, FcFolder } from 'react-icons/fc';
import { CgClose } from 'react-icons/cg';
import { MdRefresh } from 'react-icons/md';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

function MindMapPreviewTrashSection(props) {
    const [hover, setHover] = useState(false);
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const inputReference = useRef(null);
    const navigate = useNavigate();
    
    const getFriendlyTime = time => {
        const delta = Math.round(((new Date()) - new Date(time)) / 1000);
        console.log()

        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;

        let friendlyTime;
        
        if (delta < minute) {
            friendlyTime = delta + ' секунд';
        } else if (delta < 2 * minute) {
            friendlyTime = 'минуту'
        } else if (delta < hour) {
            friendlyTime = Math.floor(delta / minute) + ' минут';
        } else if (Math.floor(delta / hour) == 1) {
            friendlyTime = 'час'
        } else if (delta < day) {
            friendlyTime = Math.floor(delta / hour) + ' часов';
        } else if (delta < day * 2) {
            friendlyTime = 'день';
        } else if (delta < day * 2 * 30) {
            friendlyTime = Math.floor(delta / day) + ' дней';
        } else {
            friendlyTime = 'больше месяца'
        }

        return friendlyTime;
    };

    const submit = async e => {
        e.preventDefault();
        e.stopPropagation();

        const mindMapUpdated = props.mindMap;
        mindMapUpdated.name = text;

        await props.changeMindMap(mindMapUpdated);

        setIsTyping(false);
    };

    const changeName = e => {
        e.stopPropagation();
        setIsTyping(true);
    };

    const changeMindMap = (e, property) => {
        e.stopPropagation();

        const mindMapUpdated = props.mindMap;
        mindMapUpdated[property] = !mindMapUpdated[property];

        props.changeMindMap(mindMapUpdated);
    };

    const deleteMindMap = e => {
        e.stopPropagation();

        props.deleteMindMap(props.mindMap);
    };

    useEffect(() => {
        setText(props.mindMap.name)
    }, []);

    useEffect(() => {
        if (inputReference.current !== null) {
            inputReference.current.focus();
        }
    }, [isTyping]);

    return (
        <div 
            className="flex flex-col w-80 h-64 mr-4 mb-4 border rounded-md tracking-tight text-xl cursor-pointer shadow"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={ () => {
                if (!isTyping) {
                    navigate("/mindmap");
                }
            }}
        >
            <div className="absolute flex justify-end w-80 text-2xl text-gray-400">
                <div 
                    className="my-2 mr-1 hover:text-red-500"
                    onClick={ e => deleteMindMap(e) }
                >
                    <CgClose />
                </div>
                <div 
                    className="my-2 mr-2 hover:text-blue-500"
                    onClick={ e => changeMindMap(e, "markedForDeletion") }
                >
                    <MdRefresh />
                </div>
            </div>
            <div className="flex justify-evenly items-center h-3/4 w-full text-4xl">
                <FcMindMap />   
            </div>
            <div className={"flex items-center w-full h-1/4 border-t " + (hover === true ? "bg-gray-200" : "")}>
                <div className="ml-4 mr-2 text-2xl relative bottom-1">
                    <FcMindMap />
                </div>
                <div className="flex flex-col">
                    {isTyping === false ? <div onClick={ e => changeName(e) }>
                        {props.mindMap.name}
                    </div> : null}
                    {isTyping === true ? <form
                        onSubmit={ e => submit(e) }
                    >
                        <input
                            className={"outline-none tracking-tight text-blue-600 " + (hover === true ? "bg-gray-200" : "")}
                            ref={inputReference}
                            type="text"
                            value={text}
                            onChange={ e => setText(e.target.value) }
                            onClick={ e => e.stopPropagation() }
                        /> 
                    </form> : null}
                    <div className="text-sm text-gray-500">
                        Обновлено {getFriendlyTime(props.mindMap.lastAccessTime)} назад
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MindMapPreviewTrashSection;