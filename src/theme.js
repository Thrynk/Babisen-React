import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

export const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: {
                main: "#6200EE",
            },
            contrastThreshold: 3,
            tonalOffset: 0.1,
        }
    })
);
