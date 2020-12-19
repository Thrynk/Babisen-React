import React from 'react';
import { Button } from '@material-ui/core';
import { useStyle } from './style';

export const CustomMainButton = (props) => {

    const classes = useStyle();

    return (
        <Button
            onClick={props.onClick}
            className={classes.mainButton}
            type={props.type}
        >
            {props.children}
        </Button>
    )
}
