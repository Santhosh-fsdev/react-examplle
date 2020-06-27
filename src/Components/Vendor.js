import React, {useEffect, useState} from "react";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import cookie from "react-cookies";
import TextField from '@material-ui/core/TextField';
import Displayitems from "./Displayitems";
import Grid from "@material-ui/core/Grid";

export default function Vendor() {
    const [load,setLoad] = useState(false);
    const [open,setOpen] = useState(false);
    const[auth,setAuth] = useState(false);
    const [name,setName] = useState("");
    const [item,setItem] = useState("");
    const [price,setPrice] = useState(0);
    const [quantity,setQuantity] = useState(0);

    useEffect(()=>{
        const token = cookie.load("Access_token")
        setLoad(true);
        axios({
            url:"http://localhost:8082/check",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            method:"get"
        })
            .then((res)=> {
                console.log(res.data);
                if(res.data){
                    setAuth(true);
                }
                setLoad(false);
                setOpen(true);
            })
            .catch((err) => {
                window.alert(err.message);
                setAuth(false);
            })

    },[])

    const submit = (e) =>{
        const token = cookie.load("Access_token")

        e.preventDefault();
        const payload = {
            item,
            name,
            quantity,
            price
        }
        axios({
            url:"http://localhost:8082/insert",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            data:payload,
            method:"post"
        })
            .then((res)=> {
                window.alert(res.data);
                setName("");
                setItem("");
                setPrice(0);
                setQuantity(0);
            })
            .catch((err)=> window.alert(err.message));
    }

    return(
        <div>
        { auth === true ?<div style={{margin:"3rem"}}>
            <Card style={{backgroundColor:"lavender"}} >
                <CardContent >
                    <div style={{textAlign:"center"}}>
                    <Typography  variant="h4" component="h4">
                        Vendor Page
                    </Typography>

                    <Typography variant="body2" component="p">
                        See Your inventory and you can also add your products.
                    </Typography>
                    </div>

                </CardContent>
            </Card>
            <br />
            <br />
            <Button style={{float:"right"}} variant="contained" color="primary">Add Product</Button>
            <div>

            </div>
            <br />
            <div>
                <Grid container>

                    <Grid item sm={4}>
                        <h4 style={{marginLeft:"3rem"}} >Add to the inventory</h4>
                        <hr style={{width:"12rem",float:"left",marginLeft:"3rem"}}/>
                        <form onSubmit={submit} style={{margin:"3rem"}} noValidate autoComplete="off">
                            <h4>Item:</h4> <TextField id="outlined-basic"
                                                      label="Item"
                                                      variant="outlined"
                                                      value={item}
                                                      onChange={(e)=>setItem(e.target.value)}
                        />
                            <h4>Name:</h4> <TextField id="outlined-basic"
                                                      label="Name"
                                                      variant="outlined"
                                                      value={name}
                                                      onChange={(e)=>setName(e.target.value)}
                        />
                            <h4>Quantity:</h4> <TextField id="outlined-basic"
                                                          type="number"
                                                          label="quantity"
                                                          variant="outlined"
                                                          value={quantity}
                                                          onChange={(e)=>setQuantity(e.target.value)}
                        />
                            <h4>Price:</h4> <TextField id="outlined-basic"
                                                       type="number"
                                                       label="price"
                                                       variant="outlined"
                                                       value={price}
                                                       onChange={(e)=>setPrice(e.target.value)}
                        />
                            <br />
                            <br />
                            <Button type="submit" variant="contained" color="secondary">Add</Button>
                        </form>
                    </Grid>
                    <Grid item sm={4}>
                        <Displayitems />
                    </Grid>
                </Grid>
            </div>

        </div> : <div><h1 style={{margin:"3rem", color:"red"}}>You dont have proper authority!!! </h1></div> }
        </div>
    )
}