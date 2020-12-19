import { makeStyles } from "@material-ui/core";

 export const useStyle = makeStyles(theme => ({
	textField: {
		'& label.Mui-focused': {
			color: theme.palette.primary.main
		},
		'& .MuiOutlinedInput-root': {
		    '& fieldset': {
		      borderColor: theme.palette.primary.main,
		    },
		    '&.Mui-focused fieldset': {
		      borderColor: theme.palette.primary.main,
		    },
	    },
	},
	errorTextField: {
		margin: "1em 0 0 0",
		'& label.Mui-focused': {
			color: "red",
		},
		'& .MuiOutlinedInput-root': {
		    '& fieldset': {
		      borderColor: "red",
		    },
		    '&.Mui-focused fieldset': {
		      borderColor: "red",
		    },
	    },
	}	
}));
