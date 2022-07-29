import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.colors, this.props.colorId); // this saves in the class instance.
        this.state = { format: "hex" };
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(paletteColors, colorToFilterBy) {
        let shades = [];
        let allColors = paletteColors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1); // returns from the second element on. (we dont need the element zero here because will be white)
    }
    changeFormat(newFormat) {
        this.setState({ format: newFormat });
    }
    render() {
        const { format } = this.state;
        const { paletteName, emoji, id } = this.props;
        const colorBoxes = this._shades.map(color => {
            return <ColorBox
                key={color.name}
                id={color.id}
                name={color.name}
                showLink={false}
                background={color[format]}
            />
        });

        return (
            <div className='SingleColorPallet Pallet'>
                <Navbar changeLevel={this.changeLevel} handleOnChange={this.changeFormat} showSliderBar={false} />
                <div className='Pallet-colors'>
                    {colorBoxes}
                    <div className='ColorBox go-back'>
                        <Link to={`/palette/${id}`} className='back-button'>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default SingleColorPalette;