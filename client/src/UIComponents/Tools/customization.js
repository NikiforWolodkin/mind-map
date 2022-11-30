function Customization(props) {
    return (
        <>
            <div className="themeHeader" style={{ marginBottom: "0" }}>Оформление</div>
            <div className="customizationFont"
                onClick={() => {
                    props.changeStyle(props.tabFocus, "fontFamily", "'Montserrat', sans-serif");
                    props.changeStyle(props.tabFocus, "fontWeight", "500");
                    props.changeStyle(props.tabFocus, "fontStyle", "normal");
                }}
            >Aa</div>
            <div className="customizationFont" style={{ fontWeight: "bold" }}
                onClick={() => {
                    props.changeStyle(props.tabFocus, "fontFamily", "'Montserrat', sans-serif");
                    props.changeStyle(props.tabFocus, "fontWeight", "800");
                    props.changeStyle(props.tabFocus, "fontStyle", "normal");
                }}
            >Aa</div>
            <div className="customizationFont" style={{ fontStyle: "italic" }}
                onClick={() => {
                    props.changeStyle(props.tabFocus, "fontFamily", "'Montserrat', sans-serif");
                    props.changeStyle(props.tabFocus, "fontWeight", "500");
                    props.changeStyle(props.tabFocus, "fontStyle", "italic");
                }}
            >Aa</div>
            <div className="customizationFont" style={{ fontFamily: "'Lobster', cursive" }}
                onClick={() => {
                    props.changeStyle(props.tabFocus, "fontFamily", "'Lobster', cursive");
                    props.changeStyle(props.tabFocus, "fontWeight", "500");
                    props.changeStyle(props.tabFocus, "fontStyle", "normal");
                }}
            >Aa</div>
    
            <div className="customizationColorContainer">
                <div className="customizationColor"
                    style={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)" }}
                    onClick={() => props.changeStyle(props.tabFocus, "background", "theme")}
                ></div>
                <div className="customizationColor"
                    style={{
                        width: "36px",
                        height: "36px",
                        border: "2px solid black",
                        backgroundColor: "white",
                    }}
                    onClick={() => props.changeStyle(props.tabFocus, "background", "white")}
                ></div>
                <div className="customizationColor"
                    style={{ backgroundColor: "black" }}
                    onClick={() => props.changeStyle(props.tabFocus, "background", "black")}
                ></div>
                <div className="customizationColor"
                    onClick={() => props.changeStyle(props.tabFocus, "background", "red")}
                ></div>
                <div className="customizationColor"
                    style={{ backgroundColor: "orange" }}
                    onClick={() => props.changeStyle(props.tabFocus, "background", "orange")}
                ></div>
                <div className="customizationColor"
                    style={{ backgroundColor: "lime" }}
                    onClick={() => props.changeStyle(props.tabFocus, "background", "lime")}
                ></div>
                <div className="customizationColor"
                    style={{ backgroundColor: "blue" }}
                    onClick={() => props.changeStyle(props.tabFocus, "background", "blue")}
                ></div>
                <div className="customizationColor"
                    style={{ backgroundColor: "hotpink" }}
                    onClick={() => props.changeStyle(props.tabFocus, "background", "hotpink")}
                ></div>
            </div>
            <div className="customizationFill"
                onClick={() => props.changeStyle(props.tabFocus, "fill", "noFill")}
            >
                <div className="fill">
                    Aa
                </div>
            </div>
            <div className="customizationFill"
                onClick={() => props.changeStyle(props.tabFocus, "fill", "fill")}
            >
                <div className="noFill">
                    Aa
                </div>
            </div>
        </>
    );
}

export default Customization;