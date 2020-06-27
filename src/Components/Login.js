import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Divider } from '@material-ui/core';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '93vh',
        width:'99.7vw'
    },
    image: {
        backgroundImage:'url(https://source.unsplash.com/c9FQyqIECds)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {
    let history = useHistory();

    const classes = useStyles();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const submit = (e) =>{
        e.preventDefault();
        const payload = {
            username,
            password
        }
        console.log(payload);
        axios({
            url:'http://localhost:8080/login',
            method: 'POST',
            data: payload,
        })
            .then((res)=> {
                console.log(res.data);
                history.push('/main')

            })
            .catch((err) => console.log(err.message))

    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography variant="h4" component="h4">
                        Welcome to Spring Store!!!
                    </Typography>
                    <br />
                    <Divider style={{color:"red",width:"100%"}} variant="inset" />
                    <br />
                    <Typography variant="h6" component="h6">
                        Spring Store is the newest thing coming to the market and you can find cutting edge laptops
                        and mobiles here.
                    </Typography>
                    <br />
                    <Typography variant="h5" component="h5">
                        Login to continue
                    </Typography>
                    <br />
                    <a style={{textDecoration:"none",color:"#ffffff" }} href="http://localhost:8080/login"><Button variant="contained" style={{backgroundColor:"green",color:"#ffffff"}}>Login</Button></a>
                </div>
            </Grid>
        </Grid>
    );
}