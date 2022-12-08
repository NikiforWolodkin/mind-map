import React from 'react';
import themes from './themes';

const Line = React.memo(function Line(props) {
    const theme = themes.find(element => 
        element.name === props.theme
    );

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg" 
            className={"absolute h-full w-full " + theme.color}
            style={{
                width: window.innerWidth + window.pageXOffset,
                height: window.innerHeight + window.pageYOffset,
                zIndex: "-999"
            }}
        >
            <path d={'M ' +
            + (props.xFirst + 144) + ' ' + 
            + (props.yFirst + 48) + ' Q ' +
            + (((props.xFirst + 144) + (props.xSecond + 144)) / 2) + ' ' +
            + (props.yFirst + 48) + ' ' +
            + (((props.xFirst + 144) + (props.xSecond + 144)) / 2) + ' ' +
            + (((props.yFirst + 48) + (props.ySecond + 48)) / 2) + ' M ' +
            + (((props.xFirst + 144) + (props.xSecond + 144)) / 2) + ' ' +
            + (((props.yFirst + 48) + (props.ySecond + 48)) / 2) + ' Q ' +
            + (((props.xFirst + 144) + (props.xSecond + 144)) / 2) + ' ' +
            + (props.ySecond + 48) + ' ' +
            + (props.xSecond + 144) + ' ' + 
            + (props.ySecond + 48)}
            stroke="currentColor" strokeWidth="4" fill="none" />
        </svg>
    );
});

export default Line;