import useWindowDimensions from '../../useWindowDimensions';

function DropDown(props) {
    const { height, width } = useWindowDimensions();

    return (
        <div className={"flex py-2 text-xl rounded cursor-pointer  hover:bg-gray-200 " + (parseInt(width) < 600 ? "" : "px-4")}>
            <div className="">
                {props.text}
            </div>
        </div>
    );
}

export default DropDown;