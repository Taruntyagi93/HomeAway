import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import Navbar2 from '../Navbar/navbar2';

//Define a SignUp Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email:"",
            password : "",
            authFlag : false,
            error: false,
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    //Removes the error meeage when inputs are focussed
    handleFocus = () => {
        this.setState({error : false});
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
       
        //prevent page from refresh
        e.preventDefault();
        const data = {
             email : this.state.email,
             password : this.state.password,
                     }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3031/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response.data);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        email:response.data
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            }).catch(err => {
                this.setState({error : true});
                console.log(err);
            });
    }
    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            //redirectVar= <Redirect to= "/home"/>
            redirectVar= <Redirect to= {
                                    {
                                        pathname: '/home',
                                        
                                        
                                    }
                        }/>
        }
        else{
            redirectVar= <Redirect to= "/login"/>
        }
        let errorMessage = null;
        if(this.state.error){
            errorMessage = <div style={{fontSize:'14px',backgroundColor:'#ed605a',lineHeight:'20px',color:'white',textAlign:'center',padding:'10px'}}><p>The username or password you entered is incorrect.</p></div>
        }
        return( <body id="LoginForm">
            <div>
                {redirectVar}
                    <Navbar2 
                        navdata = {this.props.navdata}
                    />
            <div class="container">
            <div class="panel">
                            <h2>Log in to HomeAway</h2>
                            <p>Need an account?<Link to="/register">Sign Up</Link></p>
            </div>
                <div class="login-form">
                    <div class="main-div">
                        
                        <div class="title">
                        <p>Account Login</p>
                        </div>
                    <div class="sub-div">   
                            {errorMessage}
                            <div class="form-group">
                                <input required onFocus = {this.handleFocus} onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email address"/>
                                <br></br>
                                <input onFocus={this.handleFocus} onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-warning">Log In</button>                 
                    </div>
                </div>
            </div>
            </div>
            </div> 
            </body>
        )
    }
}
//export Sign Up Component
export default Login;