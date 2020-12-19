import React from "react";
import { InputLabel, FormControl, OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useStyle } from "./style";

export const CustomPasswordTextField = (props) => {
  const classes = useStyle();

  return (
    <FormControl
      variant="outlined"
      style={props.style}
    >
      <InputLabel>{props.label}</InputLabel>
      <OutlinedInput
        type={props.showPassword ? "text" : "password"}
        value={props.value}
        onChange={props.onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={props.handleClickShowPassword}
              edge="end"
            >
              {props.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label={props.label}
        align="start"
        className={classes.textField}
      />
    </FormControl>
  );
};
