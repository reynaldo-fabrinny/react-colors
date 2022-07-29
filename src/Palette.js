import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from "./PaletteFooter";
import { withStyles } from '@material-ui/styles';
import styles from "./styles/PaletteStyles";
import "./Palette.css";

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: "hex" };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel });
    }

    changeFormat(newFormat) {
        this.setState({ format: newFormat });
    }

    render() {
        const { colors, paletteName, emoji, id, classes } = this.props;
        const { level, format } = this.state;

        const colorBoxes = colors[level].map(color => {
            return <ColorBox
                key={color.id}
                id={color.id}
                name={color.name}
                showLink={true}
                moreUrl={`/palette/${id}/${color.id}`}
                background={color[format]}
            />
        });

        return (
            <div className={classes.Palette}>
                <Navbar level={level} changeLevel={this.changeLevel} handleOnChange={this.changeFormat} showSliderBar={true} />
                <div className={classes.colors}>{colorBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette);