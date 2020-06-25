import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
    link: {
        color: '#ffffff',
        textDecoration: 'none'
    }
}


export default function Main() {


   return(
       <div>
       <Button style={{margin: '5rem'}} variant="contained" color="primary"><a style={styles.link}
                                                                               href="http://localhost:8080/oauth/authorize?response_type=code&client_id=santhosh&scope=READ">Authorize with READ access</a>
       </Button>
    <Button style={{margin: '5rem'}} variant="contained" color="primary"><a style={styles.link}
                                                                            href="http://localhost:8080/oauth/authorize?response_type=code&client_id=santhosh&scope=WRITE">Authorize with WRITE access</a>
    </Button>
       </div>
   )

}