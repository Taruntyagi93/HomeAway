import React, { Component } from "react";
import Navbar2 from '../Navbar/navbar2';
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";

class LoginOwner extends Component {
  constructor(props) {
    super(props);
    this.handlePass = this.handlePass.bind(this);
    this.handleEmail = this.handleEmail.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      uname: "",
      authFlag: false
    };
  }

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePass = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleLogin = e => {
    e.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:3031/login", data).then(response => {
      console.log("inside loginowner Post Request");
      if ((response.status = 200)) {
        this.setState({
          authFlag: true
        });
        console.log(response.data);
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };

  render() {
    let redi = null;
    var cook = cookie.load("cookie");
    console.log("cookie" + cook);
    if (cookie.load("cookie")) {
      redi = <Redirect to="/list" />;
    }
    return (
      <React.Fragment>
       <Navbar2 
                        navdata = {this.props.navdata}
                    />
      <body id="LoginForm">
        {redi}
        <div className="panel">
          <h2>Log in to HomeAway as Owner</h2>
          <p className="text-center">
            Need an account? <Link to="/ownersignup">Sign Up</Link>
          </p>
        </div>
        <section className="login-block">
          <div className="container">
            <div class="row">
              <div class="col-md-6 banner-sec">
                <div class="card" style={{marginTop:"30px",marginLeft:"120px"}}>
                  <img src="images/ownerlogin.png" alt="Card image" />     
                </div>
              </div>
              <div class="col-md-6 login-sec" style={{border:"1px solid #f4f4f4",backgroundColor:"white",borderRadius:"10px"}}>
                <h3 class="myh3">Owner Login</h3>
                <form class="login-form">
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      autoFocus
                      onChange={this.handleEmail}
                      placeholder="Email Address"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      required
                      onChange={this.handlePass}
                      placeholder="Password"
                    />
                  </div>

                 
                  <br />
                  <br />
                  <button
                    type="submit"
                    class="btn btn-warning btn-lg btn-block form-control"
                    onClick={this.handleLogin}
                  >
                    Log In
                  </button>
                  
                </form>
                <br />

                <hr width="300px" />
                <div class="copy-text">
                  Want to list your property? <a href="#">Learn more</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        </body>
      </React.Fragment>
    );
  }
}

export default LoginOwner;

