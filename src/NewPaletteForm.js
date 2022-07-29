import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from './ColorPickerForm';
import { withStyles } from '@material-ui/styles';
import styles from "./styles/NewPaletteFormStyles";
import { DRAWER_WIDTH } from "./constants";
import { PALETTES } from "./seedColors";


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: "calc(100vh - 64px)",  // this 64px are the calculated height from the navbar
        padding: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${DRAWER_WIDTH}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


class NewPaletteForm extends Component {

    static defaultProps = {
        maxColors: 20
    }

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            colors: PALETTES[0].colors
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteColorFromPalette = this.deleteColorFromPalette.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    }

    handleDrawerClose() {
        this.setState({ open: false });
    }

    addNewColor(newColor) {
        this.setState({
            colors: [...this.state.colors, newColor],
            newColorName: ""
        });
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    deleteColorFromPalette(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };

    clearColors() {
        this.setState({ colors: [] });
    }

    addRandomColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        let rand;
        let randomColor;

        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name);
        }

        this.setState({ colors: [...this.state.colors, randomColor] });
    }

    render() {
        const { open, colors } = this.state;
        const { maxColors, palettes, classes } = this.props;
        const paletteIsFull = colors.length >= maxColors;

        return (
            <Box sx={{ display: 'flex' }}>
                <PaletteFormNav
                    open={open}
                    colors={colors}
                    palettes={palettes}
                    savePalette={this.props.savePalette}
                    handleDrawerOpen={this.handleDrawerOpen} />
                <Drawer
                    sx={{
                        width: DRAWER_WIDTH,
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}>
                    <DrawerHeader>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant="h4" gutterBottom>Design your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button className={classes.button} variant="contained" color="secondary" onClick={this.clearColors}>Clear Palette</Button>
                            <Button className={classes.button} variant="contained" color="primary" onClick={this.addRandomColor} disabled={paletteIsFull}>Random Color</Button>
                        </div>
                        <ColorPickerForm colors={colors} paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} />
                    </div>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <DraggableColorList
                        colors={this.state.colors}
                        axis="xy"
                        distance={20}
                        onSortEnd={this.onSortEnd}
                        deleteColorFromPalette={this.deleteColorFromPalette} />
                </Main>
            </Box>
        )
    }
}

export default withStyles(styles)(NewPaletteForm);