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
		}
	}
}));
