import React, {useEffect, useState} from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import cookie from 'react-cookies';
import Grid from "@material-ui/core/Grid";
import Cart from './Cart';
import Order from "./Order";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Profile() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [profile,setProfile] = useState([]);
    const [load,setLoad] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        setOpen(true);
        const token = cookie.load("Access_token")
        setTimeout(()=>{
            axios({
                url:"http://localhost:8081/get/profile",
                headers: {
                    "Authorization": 'Bearer ' + token
                },
                method:"get"
            })
                .then((res)=> {
                    console.log(res.data);
                    console.log(res.data[0].name)
                    setProfile(res.data[0]);
                    setLoad(true);
                    setOpen(false);
                })
                .catch((err) => console.log(err.message))
        },2000)
        },[])


    const logout = () =>{
        cookie.remove("Access_token");
        cookie.remove("name");
        window.location.replace("http://localhost:8080/logout")
    }
    return(
        <div style={{margin:"2rem"}}>

            <Card style={{textAlign:"center",backgroundColor:"lightpink"}}>
                <CardContent>
                    <Typography  variant="h4" component="h4" color="textSecondary" >
                        Profile Page
                    </Typography>

                    <Typography variant="body2" component="p">
                        you can view your informations here!.
                    </Typography>
                </CardContent>
            </Card>
            <br />
            <Button style={{float:"right"}} variant="contained" color="secondary" onClick={logout}>Logout</Button>
            <br />
            <Grid container>

            <Grid item sm={4}>


            <div>
                { open && <LinearProgress color="primary" style={{width:"20rem",marginLeft:"2rem"}} />}
                <br />
                <h5 style={{fontSize:"1rem"}}>Profile Details</h5>
                <hr style={{width:"20%",float:"left"}}/>
                { load && Object.entries(profile).map(([key,value],i) => <div key={i}><br /><p  value={key}> {key} : {value}</p> <br /></div>) }

            </div>
            </Grid>
                <Grid item sm={3}>
                    <Cart />
                </Grid>
                <Grid item sm={3}>
                    <Order />
                </Grid>

            </Grid>

        </div>
    )

}