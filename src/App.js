import React, {useState} from 'react';
import {BrowserRouter as Router, Link,Route} from 'react-router-dom';
import Main from "./Main";
import Redirect from "./Redirect";
export default function App(){


return(

    <Router>
        <Route exact path="/" component={Main} />
        <Route path="/get/" component={Redirect} />
    </Router>
)






}