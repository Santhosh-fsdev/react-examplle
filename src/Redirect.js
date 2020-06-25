import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


const styles = {
    link:{
        color: '#ffffff',
        textDecoration:'none'
    },
    token:{
        height:'10rem',
        margin:'2rem',
        fontSize:'1.5rem'
    }
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Redirect() {

    const classes = useStyles();

    const [token, setToken] = useState('');
    const [code, setCode] = useState('');
    const [res, setRes] = useState('');
    const [load, setLoad] = useState(false);
    const [got, setGot] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const location = useLocation();
    useEffect(()=>{
        setOpen(true);
        setTimeout(()=>{
            const code1 = location.search.substr(6);

            axios({
                url: 'http://localhost:8081/getToken?code=' + code1,
                method: 'get'
            })
                .then((res) => {
                    console.log(res.data);
                    console.log(res.data.access_token);
                    setToken(res.data.access_token);
                    setOpen(false);
                })
                .catch((err) => console.log(err.message))


        },2000)
        },[])


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
                    setRes(res.data);
                    setOpen(false);


                })
                .catch((err) => {
                    setOpen(false);
                    setLoad(true);

                })

        }, 2000)
    }
    const writeRequest = () =>{
        setOpen(true);
        setTimeout(() => {
            axios({
                url: "http://localhost:8081/get/send",
                headers: {
                    "Authorization": 'Bearer ' + token
                },
                method: 'get'
            })
                .then((res) => {
                    console.log(res.data);
                    setRes(res.data);
                    setOpen(false);


                })
                .catch((err) => {
                    setOpen(false);
                    setLoad(true);
                    console.log(err.message)
                })

        }, 2000)
    }


    return (
        <div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={load}
                      autoHideDuration={6000} onClose={()=>setLoad(false)}>
                <Alert onClose={()=>setLoad(false)} severity="error">
                    You are not Authorized to the access the Resource!
                </Alert>
            </Snackbar>

            <br/>
            <h4 style={{marginLeft: "2rem"}}>The access token will be displayed here</h4>
            <textarea style={styles.token} rows={100} cols={100} value={token}
                      onChange={(e) => setToken(e.target.value)}></textarea>
            <br/>
            <Button style={{margin: '4rem'}} variant="contained" color="primary"
                    onClick={makeRequest}
            >Make Read Request</Button>
            <Button style={{margin: '4rem'}} variant="contained" color="primary"
                    onClick={writeRequest}
            >Make Write Request</Button>
            <h4 style={{marginLeft: "2rem"}}>The Response will be displayed here</h4>

            <textarea style={styles.token} rows={100} cols={100} value={res} readOnly={true}>
        </textarea>

        </div>
    )
}



