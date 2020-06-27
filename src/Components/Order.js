import React, {useEffect, useState} from "react";
import cookie from "react-cookies";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function Order() {
    const [order,setOrder] = useState([]);
    const [load,setLoad] = useState(false);
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        const token = cookie.load("Access_token")
        const name = cookie.load("name");
        setLoad(true);
        axios({
            url:"http://localhost:8081/order/"+ name,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            method:"get"
        })
            .then((res)=> {
                console.log(res.data[0])
                console.log(res.data);
                setOrder(res.data);
                setLoad(false);
                setOpen(true);
            })

    },[])

    return(
        <div>
        { load && <LinearProgress color="primary" style={{width:"20rem",marginLeft:"2rem"}}/> }

    <h5 style={{marginTop:'2.7rem',fontSize:"1rem"}}>Your Orders</h5>
    <hr style={{width:"20%",float:"left"}} />
    <br />
    {open && order.map((value,key)=>{
        return <div key={key}>
            <p>{value.name},Date:{value.date}</p>
        </div>
    })}
</div>
    )
}