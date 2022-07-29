import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from '@material-ui/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement(props => {
    const { classes, color, name, deleteColor } = props;
    return (
        <div className={classes.root} style={{ background: color }}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={deleteColor} />
            </div>
        </div>
    );
});

export default withStyles(styles)(DraggableColorBox);
