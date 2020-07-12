import React, {useEffect, useState} from "react";
import cookie from "react-cookies";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";


export default function Displayitems() {
    const [load, setLoad] = useState(false);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const token = cookie.load("Access_token");
        setLoad(true);
        axios({
            url: "http://localhost:8082/listall",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            method: "get"
        })
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
                setLoad(false);
                setOpen(true);
            })
            .catch((err) => {
                window.alert(err.message);
            })

    }, []);
    const submit = (id) => {
        const token = cookie.load("Access_token")

        axios({
            url: "http://localhost:8082/delete/" + id,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            method: "delete"
        })
            .then((res) => {
                console.log(res.data);
                window.alert(res.data);
                window.location.reload(true);
            })
            .catch((err) => {
                window.alert(err.message);
            })
    }


    return (
        <div>
            {load && <LinearProgress color="primary" style={{width: "20rem", marginLeft: "2rem"}}/>}

            <h5 style={{marginTop: '2.7rem', fontSize: "1rem"}}>Your Products</h5>
            <hr style={{width: "20%", float: "left"}}/>
            <br/>
            {open && products.map((value, key) => {
                return <div key={key}>
                    <p>{value.name}</p>
                    <Button variant="contained" color="secondary" onClick={() => submit(value.id)}>Delete</Button>
                </div>
            })}

        </div>
    )
}