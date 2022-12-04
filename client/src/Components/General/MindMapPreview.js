import React, { useState, useEffect, useFocus, useRef } from 'react';
import { FcMindMap, FcFolder } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { CgClose } from 'react-icons/cg';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

function MindMapPreview(props) {
    const [hover, setHover] = useState(false);
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const inputReference = useRef(null);
    const navigate = useNavigate();
    

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
                    onClick={ e => changeMindMap(e, "markedForDeletion") }
                >
                    <CgClose />
                </div>
                <div 
                    className="my-2 mr-2 hover:text-yellow-500"
                    onClick={ e => changeMindMap(e, "favorited") }
                >
                    {props.mindMap.favorited === true ? <div className="text-yellow-500">
                        <AiFillStar />
                    </div> : <AiOutlineStar />}
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
                        Обновлено {} назад
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MindMapPreview;