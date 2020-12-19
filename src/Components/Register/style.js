import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
  loginContainer: {
   height:'100%',
    [theme.breakpoints.down("sm")]: {
      height: "100vh"

    }
  },
}));
