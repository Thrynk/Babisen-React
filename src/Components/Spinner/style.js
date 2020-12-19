import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    main: {
        zIndex:2000,
        position:"fixed",
        width: '100%',
        height: '100%',
        backgroundColor:'rgba(10,10,10,0.7)',
        left:'0px',
        top:'0px',
    },
    display:{
        display:'none',
    },
    loading:{

    },
}));

export default useStyles;