import { makeStyles } from "@material-ui/core";

 export const useStyle = makeStyles(theme => ({
	mainButton: {
		backgroundColor: theme.palette.primary.main,
		borderRadius: 5,
		border: "1px solid " + theme.palette.primary.main,
		height: "3em",
		minWidth: "10em",
		color: "white",
		"box-sizing": "border-box",
		transition: "all 250ms ease-out",
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			borderRadius: 30,
		},
	},	
}));
