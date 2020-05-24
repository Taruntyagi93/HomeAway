import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavbarOwner from '../Navbar/navbar6';
import Footer from '../Footer/footer';
import {Link} from 'react-router-dom';
// import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';

//create the Navbar Component
class MyTrips extends Component {
    constructor(props){
    super(props);
        //maintain the state required for this component
        this.state = {
            username : cookie.load("cookie3"),
            Properties : [],
            imageView : [],
            displayprop :"", //to transfer props when clicked
            authFlag : false,
            message : ""
        }
        //Bind the handlers to this class
        this.propertyChangeHandler = this.propertyChangeHandler.bind(this);
       
    }
    //get the books data from backend  


    componentDidMount(){
        const data = {
            username : this.state.username,
        }
        //set the with credentials to true
        console.log("Inside Dashboard")
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3031/dashboard',data)
            .then(response => {
                console.log("Status Code : ",response.data);
                if(response.status === 200){  //if response data from search is not 400 i.e. empty query
                    this.setState({
                        authFlag  : true,
                        Properties : response.data,
                    })
                }else{
                    this.setState({
                        authFlag : false,
                        message : "Sorry! No properties avaliable for these" //message for empty query
                    })
                }
                console.log("dasboard",this.state.Properties)
            });
    }

    propertyChangeHandler = (e) => {
        this.setState({
            displayprop : e.target.dataset.attr
        })
        console.log("Successful test - ",e.target.dataset.attr)
        console.log("Successful test 1- ",e.target.dataset)
    }

    render(){
        //if not logged in go to login page

        let redirectVar = null; 

       /* if(this.state.displayprop!==""){
            this.props.history.push({
                pathname : '/property',
                state : {
                    displayprops : this.state.displayprop
                }

            })
        } */

        if(this.state.displayprop!==""){
            redirectVar = <Redirect 
            to= {{
                    pathname : '/property',
                    state : {
                        displayprops : this.state.displayprop
                    }
        
                
            }} />
        }

        
            //<img src={require('../Images/bkg.png')}/>
            // <div style={{backgroundColor: "yellow"}}>
            //<div class="container" style={{backgroundColor: "green"}} >
            // <div class="login-form" style={{backgroundImage:`url(${imgurl})`}}>
            // <div class="main-div-login" style={{backgroundColor: "red"}}>
            //style={{backgroundImage:`url(${imgurl})`, backgroundSize:'cover'}}
            let details = this.state.Properties.map(property => {
                const imgurl = require(`../uploads/${property.img}`);
                return(
                    <div>
                        
                        <div class="col-sm-4" style={{fontSize:"16px",textAlign:"center"}}>
                        <figure>
                        <img src={imgurl} height="300px" width="450px"></img>
                        </figure>
                        <div onClick={this.propertyChangeHandler} name="displayprop" data-attr={property.name} style={{fontSize:"20px",textAlign:"center",cursor:"pointer",fontWeight:"700"}}>
                        {property.name}
                        </div>
                        <div>
                            {property.Location}
                        </div>
                        {/* <div>
                            $ {property.price} per night
                        </div> */}
                        </div>
                    </div>
                )
            })
            let foot =  <Footer data= {this.props.data}/>; 
            return(
    
                <div>
                {redirectVar}
                <NavbarOwner
                        navdata = {this.props.navdata}
                    />
                <div class="main-div-listproperty" style={{marginTop:"10px"}}>
                    <h2 style={{marginLeft:"10px"}}>Recent Properties</h2>
                    <br></br>
                        <table class="table">
                            <thead>
                               
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div> 
                {foot} 
            </div> 

            
        )
    }
}

export default MyTrips;