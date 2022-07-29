import sizes from "./sizes";
import bg from "./bg.svg";

const styles = {
    "@global": {
        ".item-exit": {
            opacity: 1
        },
        ".item-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-in"
        }
    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#1e8feb",
        /* background by SVGBackgrounds.com */
        backgroundImage: `url(${bg})`,
        overflow: "scroll"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",

        [sizes.down("xl")]: {
            width: "80%"
        },
        [sizes.down("sm")]: {
            width: "75%"
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        "& a": {
            color: " white"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.5rem",

        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)",
        },

        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1 rem",
        }
    },
    title: {
        fontSize: "2rems"
    }
}
export default styles;