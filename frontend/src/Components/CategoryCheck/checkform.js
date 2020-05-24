import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import Navbar2 from '../Navbar/navbar2';

//Define a SignUp Component
class CheckForm extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            authFlag : false,
            email: cookie.load("cookie3")
        }
        //Bind the handlers to this class
        this.submitConfirm = this.submitConfirm.bind(this);
       
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    
    //submit Login handler to send a request to the node backend
    submitConfirm = (e) => {
        
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email
                     }
        
        
        //make a post request with the user data
        axios.post('http://localhost:3031/check',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    render(){
        let redirect = null;
        
        
        //redirect based on successful login
        if(this.state.authFlag){
            redirect = <Redirect to="/list"></Redirect>
        }
        
        return( <body id="SignUpForm">
        {redirect}
            <div>
              
                <Navbar2 navdata = {this.props.navdata}/>
            <div class="container">
           
                <div class="signup-form">
                    <div class="main-div-signup">
                        <div class="sub-div">
                            <div class="form-group">
                                <div class="confirmtext">Please confirm to proceed as an Owner! Proceeding will give your account owner access.</div>
                                 <button onClick = {this.submitConfirm} class="btn btn-warning">Confirm</button> 
                                 </div>                 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        )
    }
}

export default CheckForm;