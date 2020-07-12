import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import cookie from 'react-cookies';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const styles = {
    link: {
        color: '#ffffff',
        textDecoration: 'none'
    },
    token: {
        height: '10rem',
        margin: '2rem',
        fontSize: '1.5rem'
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Redirect() {

    const classes = useStyles();
    let history = useHistory();

    const [token, setToken] = useState('');
    const [load, setLoad] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const getProfile = () =>{
        const token = cookie.load("Access_token");
        axios({
            url: "http://localhost:8081/get/profile",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            method: "get"
        })
            .then((res) => {
                cookie.save("name", res.data[0].name);
                setOpen(false);
                history.push("/products");
            })
            .catch((err) => window.alert(err.message))
    }

    const location = useLocation();
    useEffect(() => {
        setOpen(true);
        const code1 = location.search.substr(6);
        axios({
            url: 'http://localhost:8081/getToken?code=' + code1,
            method: 'get'
        })
            .then((res) => {
                console.log(res.data);
                console.log(res.data.access_token);
                setToken(res.data.access_token);
                cookie.save("Access_token", res.data.access_token);
                getProfile();
            })
            .catch((err) => window.alert(err.message))

    }, [])


    const makeRequest = () => {
        setOpen(true);
        setTimeout(() => {
            axios({
                url: "http://localhost:8081/get/show",
                headers: {
                    "Authorization": 'Bearer ' + token
                },
                method: 'get'
            })
                .then((res) => {
                    console.log(res.data);
                    setOpen(false);


                })
                .catch((err) => {
                    setOpen(false);
                    setLoad(true);
                    window.alert(err.message)
                })

        }, 2000)
    }


    return (
        <div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Snackbar open={load}
                      autoHideDuration={6000} onClose={() => setLoad(false)}>
                <Alert onClose={() => setLoad(false)} severity="error">
                    You are not Authorized to the access the Resource!
                </Alert>
            </Snackbar>

            <br/>


        </div>
    )
}



