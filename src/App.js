import React, {useState} from 'react';
import {BrowserRouter as Router, Link,Route} from 'react-router-dom';
import Main from "./Components/Main";
import Redirect from "./Components/Redirect";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import Products from "./Components/Products";
import Vendor from "./Components/Vendor";
import Profile from "./Components/Profile";
export default function App(){


return(
<div>
    <Homepage />
    <Router>
        <Route exact path="/" component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/get" component={Redirect} />
        <Route path="/products" component={Products} />
        <Route path="/vendor" component={Vendor}/>
        <Route path="/profile" component={Profile} />
    </Router>
</div>
)
}