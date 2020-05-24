import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import Footer from '../Footer/footer';
import NavOwner from '../Navbar/navbar6';
class OwnerMainPage extends Component {

render() {

let foot =  <Footer data= {this.props.data}/>; 
let navbar =<NavOwner data= {this.props.data}/>;

return ( 

<div>

    {navbar}

<div>
    {foot}
</div>
</div>

)
}
}

export default OwnerMainPage;