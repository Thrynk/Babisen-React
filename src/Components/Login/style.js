import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
    loginContainer: {
        height:'100%',
        [theme.breakpoints.down("sm")]: {
            height: "100vh"
        }
    },
    avatar: {
        margin: 'auto',
        width: theme.spacing(30),
        height: theme.spacing(30)
    },
}));
