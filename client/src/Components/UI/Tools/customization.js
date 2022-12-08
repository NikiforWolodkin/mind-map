import { useState } from 'react';
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';
import themes from '../themes';

function Customization(props) {
    const [page, setPage] = useState(0);

    return (
        <div className="flex flex-wrap content-start w-44 h-60 shadow-2xl rounded ml-4 text-2xl z-50 bg-white">
            <div className="flex h-fit mt-2 ml-2">
                Стиль
                <div className="ml-10 flex justify-center items-center">
                    <div 
                        className={"cursor-pointer hover:" + props.theme.color}
                        onClick={ () => setPage(0) }    
                    >
                        <HiArrowSmLeft />
                    </div>
                    <div 
                        className={"cursor-pointer hover:" + props.theme.color}
                        onClick={ () => setPage(1) }    
                    >
                        <HiArrowSmRight />
                    </div>
                </div>
            </div>
            {page === 0 ? <><div className="flex w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow basis-6/12 flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer " + props.theme.background}
                    onClick={ () => props.changeStyle(props.tabFocus, "font", "") }
                >
                    <div className="flex justify-center items-center bg-white w-full h-full rounded-sm">
                        Aa
                    </div>
                </div>
                <div 
                    className={"grow basis-6/12 flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer " + props.theme.background}
                    onClick={ () => props.changeStyle(props.tabFocus, "font", "italic") }
                >
                    <div className="italic flex justify-center items-center bg-white w-full h-full rounded-sm">
                        Aa
                    </div>
                </div>
            </div>
            <div className="flex w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow basis-6/12 flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer " + props.theme.background}
                    onClick={ () => props.changeStyle(props.tabFocus, "font", "font-bold") }
                >
                    <div className="font-bold flex justify-center items-center bg-white w-full h-full rounded-sm">
                        Aa
                    </div>
                </div>
                <div 
                    className={"grow basis-6/12 flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer " + props.theme.background}
                    onClick={ () => props.changeStyle(props.tabFocus, "font", "font-sans") }
                >
                    <div className="font-sans flex justify-center items-center bg-white w-full h-full rounded-sm">
                        Aa
                    </div>
                </div>
            </div>
            <div className="flex w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow basis-3/12 flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer bg-black"}
                    onClick={ () => props.changeStyle(props.tabFocus, "background", "theme") }
                >
                    <div className="w-full h-full bg-white text-white">
                        a
                    </div>
                </div>
                <div 
                    className={"grow basis-3/12 h-full flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer text-white bg-white"}
                    onClick={ () => props.changeStyle(props.tabFocus, "background", "bg-white") }
                >
                    a
                </div>
                <div 
                    className={"grow basis-3/12 h-full flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer text-black bg-black"}
                    onClick={ () => props.changeStyle(props.tabFocus, "background", "bg-black") }
                >
                    a
                </div>
                <div 
                    className={"grow basis-3/12 h-full flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer text-red-500 bg-red-500"}
                    onClick={ () => props.changeStyle(props.tabFocus, "background", "bg-red-500") }
                >
                    a
                </div>
            </div>
            <div className="flex w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow basis-3/12 h-full flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer text-amber-500 bg-amber-500"}
                    onClick={ () => props.changeStyle(props.tabFocus, "background", "bg-amber-500") }
                >
                    a
                </div>
                <div 
                    className={"grow basis-3/12 h-full flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer text-green-500 bg-green-500"}
                    onClick={ () => props.changeStyle(props.tabFocus, "background", "bg-green-500") }
                >
                    a
                </div>
                <div 
                    className={"grow basis-3/12 h-full flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer text-blue-500 bg-blue-500"}
                    onClick={ () => props.changeStyle(props.tabFocus, "background", "bg-blue-500") }
                >
                    a
                </div>
                <div 
                    className={"grow basis-3/12 h-full flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer text-pink-400 bg-pink-400"}
                    onClick={ () => props.changeStyle(props.tabFocus, "background", "bg-pink-400") }
                >
                    a
                </div>
            </div></> : null}
            {page === 1 ? <div className="flex w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow basis-6/12 flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer " + props.theme.background}
                    onClick={ () => props.changeStyle(props.tabFocus, "fill", "bg-white") }
                >
                    <div className="flex justify-center items-center bg-white w-full h-full rounded-sm">
                        Aa
                    </div>
                </div>
                <div 
                    className={"grow basis-6/12 flex justify-center items-center p-1 ml-2 rounded shadow-2xl cursor-pointer " + props.theme.background}
                    onClick={ () => props.changeStyle(props.tabFocus, "fill", "bg-transparent text-white") }
                >
                    <div className="flex justify-center items-center text-white w-full h-full rounded-sm">
                        Aa
                    </div>
                </div>
            </div> : null}
        </div>
    );
}

export default Customization;