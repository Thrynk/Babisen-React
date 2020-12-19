import React from 'react';
import { TextField } from '@material-ui/core';
import { useStyle } from './style';

export const CustomTextField = (props) => {

    const classes = useStyle();

    return (
        <TextField
            className={classes.textField}
            align="start"
            type={props.type}
            label={props.label}
            name={props.name}
            value={props.value}
            variant="outlined"
            size="medium"
            onChange={props.onChange}
            InputProps={{
                readOnly: props.readOnly,
                inputProps: props.inputProps
            }}
            multiline={props.multiline}
            defaultValue={props.defaultValue}
            style={props.style}
        />
    )
}