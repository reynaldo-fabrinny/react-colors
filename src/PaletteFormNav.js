import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/styles';
import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/PaletteFormNavStyles";
import { DRAWER_WIDTH } from "./constants";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
    ...(open && {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

class PaletteFormNav extends Component {

    constructor(props) {
        super(props);
        this.state = { isFormShowing: false }
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    showForm() {
        this.setState({ isFormShowing: true });
    }
    hideForm() {
        this.setState({ isFormShowing: false });
    }

    render() {
        const { open, savePalette, colors, classes, palettes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" color="default" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Create a Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/" className={classes.link}>
                            <Button className={classes.button} variant='contained' color="secondary">Go Back</Button>
                        </Link>
                        <Button className={classes.button} variant="contained" onClick={this.showForm}>Save</Button>
                    </div>
                </AppBar>
                {this.state.isFormShowing && (<PaletteMetaForm savePalette={savePalette} colors={colors} palettes={palettes} hideForm={this.hideForm} />)}
            </div>
        )
    }
}

export default withStyles(styles)(PaletteFormNav);