import React, { Component } from "react";
import '../../App1.css';
import Navbar3 from '../Navbar/navbar3';
import Footer from '../Footer/footer';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
class listyourproperty extends Component {

  constructor() {

    super();

    this.state = {

      bathrooms: 0,

      bedrooms: 0,

      authFlag:false

    }
    this.handleOwner = this.handleOwner.bind(this);

  }

  handleOwner = () => {
    this.setState ({
      authFlag: true
    })
    // console.log(cookie.load("cookie"))

    // if (cookie.load("cookie")) {
    //   <Redirect to="/checkform"></Redirect>
    // } else {
    //   <Redirect to="/home"></Redirect>
    // }

  };

  bathroomIncreasehandler = e => {

    if (this.state.bathrooms < 9) {

      this.setState({

        bathrooms: this.state.bathrooms + 0.5

      });

    }

  };


  bathroomDeccreasehandler = e => {

    if (this.state.bathrooms > 0) {

      this.setState({

        bathrooms: this.state.bathrooms - 0.5

      });

    }

  };


  bedroomIncreasehandler = e => {

    if (this.state.bedrooms < 9) {

      this.setState({

        bedrooms: this.state.bedrooms + 1

      });

    }

  };


  bedroomDecreasehandler = e => {

    if (this.state.bedrooms > 0) {

      this.setState({

        bedrooms: this.state.bedrooms - 1

      });

    }

  };

  render() {
    console.log(this.props.location.state);
    let foot =  <Footer data= {this.props.data}/>; 
    let redirectVar=null;
    if(this.state.authFlag){
      if (cookie.load("cookie2") === "traveler") {
          redirectVar=<Redirect to= {
            {
                pathname: '/checkform',
               
                
            }
}/>
        } else if(cookie.load("cookie2") === "owner"){
         redirectVar= <Redirect to= {
          {
              pathname: '/list',      
          }
}/>
        }
        else {
          redirectVar= <Redirect to= {
            {
                pathname: '/ownerlogin',      
            }
  }/>
        }
    }
    return (

      <React.Fragment>
      {redirectVar}
        <div className="listprop">
        <Navbar3 
                        navdata = {this.props.navdata}
                    />
          <div className="quot">

            <h1 className="earn">

              <span className="span1">See how much </span>

              <br />

              <span className="span2">you could earn!</span>

            </h1>

          </div>

        </div>

        <div

          className="property"

          style={{

            position: "absolute",

            top: "100px",

            left: "550px",

            backgroundColor: "white"

          }}

        >

          <div class="basics">Let's start with the basics</div>

          <div className="row">

            <div

              className="col-md-6"

              style={{ width: "310px", borderRight: "1px solid lightgrey",textAlign:'center',fontSize:'16px'}}

            >

              <div className="bedroom div">

                <img src="images/bedroom.png" />

                <div className="bathtext">Bedrooms</div>

              </div>

              <br />

              <div className="increase">

                <button

                  className="btn btn-primary"

                  onClick={this.bedroomIncreasehandler}

                  style={{background:'none',border:'none'}}

                >

                  <i class="fas fa-chevron-up fa-2x" style={{color:'#2a6ebb'}}></i>

                </button>

              </div>

              <div className="text">

                <h1 style={{fontSize:'70px'}}>{this.state.bedrooms}</h1>

              </div>

              <div className="decrease">

                <button

                  className="btn btn-primary"

                  onClick={this.bedroomDecreasehandler}

                  style={{background:'none',border:'none'}}

                >

                  <i class="fas fa-chevron-down fa-2x" style={{color:'#2a6ebb'}}></i>

                </button>

              </div>

            </div>

            <div className="col-md-6"
            style={{ width: "310px", textAlign:'center',fontSize:'16px'}}>

              <div className="bathroom div">

                <img src="images/bathroom.png" />

                <div className="bathtext">Bathrooms</div>

              </div>

              <br />

              <div className="increase">

                <button

                  className="btn btn-primary"

                  onClick={this.bathroomIncreasehandler}

                  style={{background:'none',border:'none'}}

                >

                   <i class="fas fa-chevron-up fa-2x" style={{color:'#2a6ebb'}}></i>

                </button>

              </div>

              <div className="text">

                <h1 style={{fontSize:'70px'}}>{this.state.bathrooms}</h1>

              </div>

              <div className="decrease">

                <button

                  className="btn btn-primary"

                  onClick={this.bathroomDeccreasehandler}

                  style={{background:'none',border:'none'}}

                >

                   <i class="fas fa-chevron-down fa-2x" style={{color:'#2a6ebb'}}></i>

                </button>

              </div>

            </div>

          </div>

          <div>

            <button className="btn btn-primary" id="bt" onClick={this.handleOwner}>

              Next

            </button>

          </div>

        </div>

        <div className="ownerbenefits" style={{ height: "400px" ,textAlign:'center',marginTop:'100px'}}>

          <h1 id="vacation">Simply the perfect vacation rental marketplace</h1>

          <div className="features">

            <div className="col-md-4" style={{fontSize:'16px'}}>

              <img src="images/exposure.png" />


              <div>

                <br />

                <br />

                <strong>Maximum Exposure</strong>

              </div>

              <div>

                <span> Reach travellers in 190 countries</span>

                <br />

                <span>across 50+ dedicated sites</span>

              </div>

            </div>

            <div className="col-md-4" style={{fontSize:'16px'}}>

              <img src="images/control.png" />

              <div>

                <br />

                <br />

                <strong>You're in control</strong>

              </div>

              <div>

                <span>You control prices, availability, and </span>

                <br />

                <span>who stays at your property</span>

              </div>

            </div>

            <div className="col-md-4" style={{fontSize:'16px'}}>

              <img src="images/tools.png" />

              <div>

                <br />

                <br />

                <strong>Easy-to-use Tools</strong>

              </div>

              <div>

                <span>Access best-in-class reservation tools </span>

                <br />

                <span>for setting up your rates and managing </span>

                <br />

                <span>reservations </span>

              </div>

            </div>

          </div>

        </div>

        <div className="container-fluid" style={{backgroundSize:'cover',height:'700px',cursor:'pointer',overflow:'hidden',marginLeft:'70px'}}>

          <video poster="images/final.png" controls>

            <source src="images/Homeaway.mp4" type="video/mp4" />{" "}

          </video>

        </div>

          {foot}
      </React.Fragment>

    );

  }

}


export default listyourproperty;