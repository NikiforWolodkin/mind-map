import React from 'react';

const styleBlack = "black";
const styleGreen = "#3EC70B";
const styleOrange = "#FF9F29";
const stylePurple = "#541690";
const styleGradBlue = "darkblue";
const styleGradRed = "red";

const Line = React.memo(function Line(props) {
    let style = {};
    switch (props.theme) {
        case "black":
            style = styleBlack;
            break;
        case "green":
            style = styleGreen;
            break;
        case "orange":
            style = styleOrange;
            break;
        case "purple":
            style = stylePurple;
            break;
        case "gradBlue":
            style = styleGradBlue;
            break;
        case "gradRed":
            style = styleGradRed;
            break;
        default:
            style = styleBlack;
            break;
    }

  return (
    <svg
        xmlns="http://www.w3.org/2000/svg" 
        height={window.innerHeight}
        width={window.innerWidth}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: "-999"
        }}
    >
        <path d={'M ' +
        + (props.xFirst + 131) + ' ' + 
        + (props.yFirst + 41) + ' Q ' +
        + (((props.xFirst + 131) + (props.xSecond + 131)) / 2) + ' ' +
        + (props.yFirst + 41) + ' ' +
        + (((props.xFirst + 131) + (props.xSecond + 131)) / 2) + ' ' +
        + (((props.yFirst + 41) + (props.ySecond + 41)) / 2) + ' M ' +
        + (((props.xFirst + 131) + (props.xSecond + 131)) / 2) + ' ' +
        + (((props.yFirst + 41) + (props.ySecond + 41)) / 2) + ' Q ' +
        + (((props.xFirst + 131) + (props.xSecond + 131)) / 2) + ' ' +
        + (props.ySecond + 41) + ' ' +
        + (props.xSecond + 131) + ' ' + 
        + (props.ySecond + 41)}
        stroke={style} strokeWidth="4" fill="none" />
    </svg>
  );
});

export default Line;