import React, { Component, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

new Picker({ data })

function EmojiPicker(props) {
    const ref = useRef()

    useEffect(() => {
        new Picker({ ...props, data, ref })
    }, [])

    return <div ref={ref} />
}

class PaletteMetaForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: "",
            stage: "form"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }

    handleClickOpen() {
        this.setState({ open: true });
    };

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    showEmojiPicker() {
        this.setState({ stage: "emoji" });
    }

    render() {
        const { newPaletteName } = this.state;
        const { savePalette, hideForm, colors } = this.props;

        const SaveNewPaletteForm = () => {
            let navigate = useNavigate();
            return (
                <EmojiPicker  onEmojiSelect={(emoji) => {
                    let name = newPaletteName;
                    const newPalette = {
                        id: name.toLowerCase().replace(/ /g, "-"),
                        paletteName: name,
                        emoji: emoji.native,
                        colors: colors
                    }
                    savePalette(newPalette);
                    this.setState({ stage: "" });
                    navigate("/");
                }} />
            )
        }

        return (
            <div>
                <Dialog open={this.state.stage === "emoji"} onClose={hideForm}>
                    <SaveNewPaletteForm />
                </Dialog>
                <Dialog open={this.state.stage === "form"} onClose={hideForm}>
                    <DialogTitle>Choose a palette name</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your palette and make sure its unique.
                        </DialogContentText>
                    </DialogContent>
                    <ValidatorForm key="1" onSubmit={this.showEmojiPicker}>
                        <TextValidator label="Palette Name"
                            name="newPaletteName"
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette name", "Palette name already used"]}
                            value={newPaletteName} />
                        <DialogActions>
                            <Button onClick={hideForm}>Cancel</Button>
                            <Button variant="contained" type="submit" color="primary">Save Palette</Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}

export default PaletteMetaForm;