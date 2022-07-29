import React, { Component } from 'react'
import { ChromePicker } from "react-color";
import { Button } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';
import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "white",
            newColorName: ""
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isNameUnique', value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );

        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor)
        );
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }
    handleSubmit() {
        const newColor = { color: this.state.currentColor, name: this.state.newColorName };
        this.props.addNewColor(newColor);
        this.setState({ newColorName: "" });
    }

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;

        return (
            <div>
                <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} className={classes.picker} />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator
                        className={classes.colorNameInput}
                        placeholder="Color name"
                        onChange={this.handleChange}
                        name="newColorName"
                        margin="normal"
                        value={newColorName}
                        variant="filled"
                        validators={['required', "isNameUnique", "isColorUnique"]}
                        errorMessages={["Color name is required", 'A color must have a unique name', "This color already exists"]}
                    />
                    <Button variant="contained"
                        className={classes.addColor}
                        color="primary"
                        type="submit"
                        style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                        disabled={paletteIsFull}>{paletteIsFull ? "Platte full" : "Add Color"}</Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);
