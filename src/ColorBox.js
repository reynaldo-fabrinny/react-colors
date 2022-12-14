import React, { Component } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
// import { withStyles } from '@material-ui/styles';

import "./ColorBox.css";


// THOSE STYLES ARE BUGGED .. cant understand why thats happening so I will jsut use the manual styles
/* const styles = {
    ColorBox: {
        width: "20%",
        height: props => (props.showingFullPalette ? "25%" : "50%"),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button": {
            opacity: 1
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0, 0 , 0, 0.6)" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: 0
    }
} */

class ColorBox extends Component {

    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        });
    }

    render() {
        const { name, background, moreUrl, showLink } = this.props;
        const { copied } = this.state;

        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.7;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className='ColorBox'>
                    <div style={{ background }} className={`copy-overlay ${copied ? "show" : ""}`} />
                    <div className={`copy-msg ${copied ? "show" : ""}`}>
                        <h1>copied!</h1>
                        <p className={isLightColor ? "dark-text" : ""}>{this.props.background}</p>
                    </div>
                    <div>
                        <div className='box-content'>
                            <span className={isDarkColor ? "light-text" : ""}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor ? "dark-text" : ""}`}>Copy</button>
                    </div>
                    {showLink && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${isLightColor ? "dark-text" : ""}`}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}
export default ColorBox;
