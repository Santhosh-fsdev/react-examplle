import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "@material-ui/core/Button";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import cookie from 'react-cookies'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
export default function Products() {

    const classes = useStyles();
    const [load, setLoad] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [products, setProducts] = useState([]);
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        setOpen(true);
        const token = cookie.load("Access_token")
        axios({
            url: "http://localhost:8081/get/send",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            method: 'get'
        })
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
                setOpen(false);
            })
            .catch((err) => {
                setOpen(false);
                setLoad(true);
                window.alert(err.message)
            })

    }, [])

    const cart = (e) => {
        const token = cookie.load("Access_token")
        const username = cookie.load("name");
        const payload = {
            name: e,
            username,
            count: "1"
        }
        console.log(payload);
        axios({
            url: "http://localhost:8081/addtocart",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            method: "post",
            data: payload
        })
            .then((res) => window.alert(res.data))
            .catch((err) => window.alert(err.message))

    }
    const order = (product) => {
        const token = cookie.load("Access_token")
        const name = cookie.load("name");
        const payload = {
            username: name,
            name: product,
            date: Date.now()
        }
        axios({
            url: "http://localhost:8081/order",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            data: payload,
            method: "post"
        })
            .then((res) => {
                console.log(res.data);
                window.alert(res.data);
            })
            .catch((err) => {
                window.alert(err.message);
            })
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Card style={{margin: "3rem", textAlign: "center", backgroundColor: "honeydew"}}>
                <CardContent>
                    <Typography variant="h4" component="h4" color="textSecondary">
                        Products Page
                    </Typography>

                    <Typography variant="body2" component="p">
                        Choose from the variety of the products listed below.
                    </Typography>
                </CardContent>
            </Card>
            <Grid container spacing={3} style={{textAlign: "center"}}>

                {products.map((product, index) => {
                    return <Grid item xs={6} sm={3} key={index}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h4" component="h4">
                                    Name: {product.name}
                                </Typography>

                                <Typography variant="body2" component="p">
                                    Price: {product.price}
                                </Typography>
                                <Button style={{margin: "1rem"}} color="primary" variant="contained"
                                        onClick={() => order(product.name)}>Buy</Button>
                                <Button color="secondary" variant="contained" onClick={() => cart(product.name)}>Add to
                                    Cart</Button>

                            </CardContent>
                        </Card>
                    </Grid>
                })}
            </Grid>
        </div>
    )
}