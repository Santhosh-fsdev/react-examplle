import React, {useEffect, useState} from "react";
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import cookie from "react-cookies";

export default function Cart() {

    const [cart,setCart] = useState([]);
    const [ load,setLoad] = useState(false);
    const [open,setOpen] = useState(false);

    useEffect(()=>{
        const token = cookie.load("Access_token")
        const name = cookie.load("name")
        setLoad(true);
       axios({
           url:"http://localhost:8081/cart/"+ name,
           headers: {
               "Authorization": 'Bearer ' + token
           },
           method:"get"
       })
           .then((res)=> {
               console.log(res.data[0])
               setCart(res.data);
               setLoad(false);
               setOpen(true);
           })
    },[])
    return(
        <div>
            { load && <LinearProgress color="secondary" style={{width:"20rem",marginLeft:"2rem"}} /> }

        <h5 style={{marginTop:'2.7rem',fontSize:"1rem"}}>Your Cart</h5>
            <hr style={{width:"20%",float:"left"}} />
            <br />
            {open && cart.map((value,key)=>{
                return <div key={key}>
                    <p>{value.name} : {value.count}</p>
                </div>
            })}
        </div>)
            }