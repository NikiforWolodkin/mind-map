function Theme(props) {
    return (
        <>
            <div className="themeHeader">Тема</div>
            <div
                className="theme"
                onClick={() => props.setTheme("black")}
                style={{
                    background: "black"
                }}
            >
                <div className="themeInner"></div>
            </div>
            <div
                className="theme"
                onClick={() => props.setTheme("green")}
                style={{
                    background: "#3EC70B"
                }}
            >
                <div className="themeInner"></div>
            </div>
            <div
                className="theme"
                onClick={() => props.setTheme("orange")}
                style={{
                    background: "#FF9F29"
                }}
            >
                <div className="themeInner"></div>
            </div>
            <div
                className="theme"
                onClick={() => props.setTheme("purple")}
                style={{
                    background: "#541690"
                }}
            >
                <div className="themeInner"></div>
            </div>
            <div
                className="theme"
                onClick={() => props.setTheme("gradBlue")}
                style={{
                    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
                }}
            >
                <div className="themeInner"></div>
            </div>
            <div
                className="theme"
                onClick={() => props.setTheme("gradRed")}
                style={{
                    background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
                }}
            >
                <div className="themeInner"></div>
            </div>
        </>
    );
}

export default Theme;