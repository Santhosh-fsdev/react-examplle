import React from 'react';
import Button from '@material-ui/core/Button';
import {image} from '../authorize.png';

const styles = {
    link: {
        color: '#ffffff',
        textDecoration: 'none'
    }
}


export default function Main() {


    return (
        <div>
            <br/>
            <br/>
            <Button style={{marginLeft: '52rem'}} variant="contained" color="primary"><a style={styles.link}
                                                                                         href="http://localhost:8080/oauth/authorize?response_type=code&client_id=santhosh&scope=READ+WRITE">Authorize
                in order to continue</a>
            </Button>
            <br/>
            <img src={require('../authorize.png')} style={{height: "40rem", width: "40rem", marginLeft: "40rem"}}/>
            <br/>
            <h5 style={{fontSize: "2rem", textAlign: "center"}}>You must authorize the application in order to proceed.
                It enforces security between you and our application.</h5>

        </div>
    )

}