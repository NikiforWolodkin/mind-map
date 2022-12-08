import themes from '../themes';

function Theme(props) {
    return (
        <div className="flex flex-wrap content-start w-44 h-60 shadow-2xl rounded ml-4 text-2xl z-50 bg-white">
            <div className="h-fit mt-2 ml-2">
                Тема
            </div>
            <div className="flex flex-wrap w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer text-white " + themes[0].background}
                    onClick={ () => props.setTheme("black") }
                >
                    Аа
                </div>
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer text-white " + themes[1].background}
                    onClick={ () => props.setTheme("green") }
                >
                    Аа
                </div>
            </div>
            <div className="flex flex-wrap w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer text-white " + themes[2].background}
                    onClick={ () => props.setTheme("orange") }
                >
                    Аа
                </div>
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer text-white " + themes[3].background}
                    onClick={ () => props.setTheme("purple") }
                >
                    Аа
                </div>
            </div>
            <div className="flex flex-wrap w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer text-white " + themes[4].background}
                    onClick={ () => props.setTheme("gradBlue") }
                >
                    Аа
                </div>
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer text-white " + themes[5].background}
                    onClick={ () => props.setTheme("gradRed") }
                >
                    Аа
                </div>
            </div>
            <div className="flex flex-wrap w-full h-fit mt-2 mr-2">
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer text-white " + themes[6].background}
                    onClick={ () => props.setTheme("gradBlack") }
                >
                    Аа
                </div>
                <div 
                    className={"grow flex justify-center items-center py-1 ml-2 rounded shadow-2xl cursor-pointer text-white " + themes[7].background}
                    onClick={ () => props.setTheme("gradPurple") }
                >
                    Аа
                </div>
            </div>
        </div>
    );
}

export default Theme;