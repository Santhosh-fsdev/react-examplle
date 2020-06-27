import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title1: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
}));

export default function Homepage() {
    const classes = useStyles();



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Spring Store
                    </Typography>
                    <a style={{ textDecoration: "none",color:"#ffffff" }} href="http://localhost:5000/products"> <Button  color="inherit">Products Page</Button> </a>
                    <a style={{ textDecoration: "none",color:"#ffffff" }} href="http://localhost:5000/vendor"> <Button  color="inherit">Vendor Page</Button> </a>
                    <a style={{ textDecoration: "none",color:"#ffffff" }} href="http://localhost:5000/profile"> <Button color="inherit">Profile</Button> </a>

                </Toolbar>
            </AppBar>

        </div>
    );
}
