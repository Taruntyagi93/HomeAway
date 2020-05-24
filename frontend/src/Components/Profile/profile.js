import React, { Component } from "react";
import NavProfile from '../Navbar/navbar5';
import cookie from "react-cookies";
import { Redirect } from "react-router";
import '../../App.css';
import Footer from '../Footer/footer';
import axios from 'axios';
class Profile extends Component {
  constructor(props) {
    super(props);
        this.state = {
        UserData : [],
        email:"",
        firstname:"",
        lastname:"",
        city : "",
        company : "",
        school :"",
        hometown : "",
        languages: '',
        gender: '',
        about : "",
        authFlag : false,
        MainName:"",
        
  }
   //Bind the handlers to this class
   this.emailChangeHandler = this.emailChangeHandler.bind(this);
   this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
   this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
   this.aboutChangeHandler = this.aboutChangeHandler.bind(this);
   this.cityChangeHandler = this.cityChangeHandler.bind(this);
   this.companyChangeHandler = this.companyChangeHandler.bind(this);
   this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
   this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
   this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
   this.genderChangeHandler = this.genderChangeHandler.bind(this);
   this.submitUpdate = this.submitUpdate.bind(this);

   this.first_name = React.createRef();
   this.last_name = React.createRef();

  }
  //Call the Will Mount to set the auth Flag to false
componentWillMount(){
  this.setState({
      authFlag : false,
      UserData : []
  }) 
  console.log("my cookie",cookie.load("cookie"))
  console.log("testprops",this.state.UserData)

}

componentDidMount(){
  const data = {
      email: cookie.load("cookie3"),
  }
  console.log("User Info Page1:",this.state.email);
 // let redirectVar = null;
  console.log("authFlagNav",this.state.authFlag)

  axios.post('http://localhost:3031/userdisplay',data)
      .then(response => {
          console.log("Status Code : ",response.status);
          console.log("Status",response.data); 
          if(response.status === 200){
              this.setState({
                  loginFlag : true,
                  UserData : response.data
              })
             // alert(this.state.err)
          }else{
              this.setState({
                  loginFlag : false,
                  //err : "Invalid Request"
              })
              //alert(this.state.err)
          }

          console.log("User Data",this.state.UserData)
          console.log("User1 Data",response.data)
         
      });
           
}

//username change handler to update state variable with the text entered by the user
emailChangeHandler = (e) => {
  this.setState({
      email : e.target.value
  })
  console.log("email",this.state.email)
}
//username change handler to update state variable with the text entered by the user
firstnameChangeHandler = (e) => {
  this.setState({
      firstname : e.target.value
  })
}
//username change handler to update state variable with the text entered by the user
lastnameChangeHandler = (e) => {
  this.setState({
      lastname : e.target.value
  })
}

//password change handler to update state variable with the text entered by the user
cityChangeHandler = (e) => {
  this.setState({
      city : e.target.value
  })
}

//password change handler to update state variable with the text entered by the user
companyChangeHandler = (e) => {
  this.setState({
      company : e.target.value
  })
}

schoolChangeHandler = (e) => {
  this.setState({
      school : e.target.value
  })
}

hometownChangeHandler = (e) => {
  this.setState({
      hometown : e.target.value
  })
}

languagesChangeHandler = (e) => {
  this.setState({
      languages : e.target.value
  })
}

genderChangeHandler = (e) => {
  this.setState({
      gender : e.target.value
  })
}

aboutChangeHandler = (e) => {
  this.setState({
      about : e.target.value
  })
}

//submit Property handler to send a request to the node backend
submitUpdate = (e) => {
   
  //prevent page from refresh
  console.log(this.first_name.current.value);
  console.log(this.last_name.current.value);
  e.preventDefault();
  const data = {
      email : this.state.UserData[0].email,
      firstname : this.first_name.current.value,
      lastname : this.last_name.current.value,
      city: this.state.city,
      company : this.state.company,
      school : this.state.school,
      hometown : this.state.hometown,
      languages : this.state.languages,
      gender : this.state.gender,
      about : this.state.about,
  }
  console.log("email",this.state.UserData[0].email);
  console.log("data",data);
  //set the with credentials to true
  axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.post('http://localhost:3031/userupdate',data)
      .then(response => {
          console.log("Status Code : ",response.data);
          if(response.status === 200){
              this.setState({
                  authFlag : true,
                  
                  message : "Congratulations! Successfully updated"
              })
             window.location.reload(1);
          }else{
              this.setState({
                  authFlag : false,
                  message : "Invalid Data "
              })
          }
      });

}

  render() {
    var redirect = null;
    if (!cookie.load("cookie")) {
      redirect = <Redirect to="/login" />;
    }
    let MainName = this.state.UserData.map(user1 =>{
      return(
      <div>
       {user1.name}
      </div>
      );
    })
    let details = this.state.UserData.map(user => {
      let first_name = "";  
      let last_name = "";
      if(user.name !== undefined){
        let username = user.name.split(" ");
        first_name =  username[0];
        last_name = username[1];
      }
    
    return (
      
      <React.Fragment>               
      
          <form>
         
            <div className="inputdiv" style={{border:"1px solid #eee",padding:"20px"}}>
              <div class="row">
              <div id="profileheading" style={{marginLeft:"15px"}}>
            <h3>Profile Information</h3>
              </div>
                <div class="form-group form-group-lg col-md-6">
                  <label className="sr-only" for="firstname">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="firstname"
                    name="firstname"
                    ref= {this.first_name}
                    value={first_name}
                    placeholder={first_name}
                    onChange={this.firstnameChangeHandler}
                  />
                </div>
              </div>
              <div class="row">
                <div className="form-group form-group-lg col-md-6">
                  <label className="sr-only" for="lastname">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    placeholder={last_name}
                    value={last_name}
                    ref = {this.last_name}
                    onChange={this.lastnameChangeHandler}
                  />
                </div>
              </div>
              <div class="row">
                <div className="form-group form-group-lg col-md-12">
                  <label className="sr-only" for="About">
                    About
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="about"
                    placeholder={user.About}
                    onChange={this.aboutChangeHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group form-group-lg col-md-6">
                  <label className="sr-only" for="city">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder={user.City}
                    onChange={this.cityChangeHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group form-group-lg col-md-6">
                  <label className="sr-only" for="company">
                    Company
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    placeholder={user.Company}
                    onChange={this.companyChangeHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group form-group-lg col-md-6">
                  <label className="sr-only" for="school">
                    School
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="school"
                    placeholder={user.School}
                    onChange={this.schoolChangeHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group form-group-lg col-md-6">
                  <label className="sr-only" for="hometown">
                    Hometown
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="hometown"
                    placeholder={user.Hometown}
                    onChange={this.hometownChangeHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group form-group-lg col-md-6">
                  <label className="sr-only" for="languages">
                    Languages
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="languages"
                    placeholder={user.Languages}
                    onChange={this.languagesChangeHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group form-group-lg col-md-6">
                  <label className="sr-only" for="gender">
                    Gender
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="languages"
                    placeholder={user.Gender}
                    onChange={this.genderChangeHandler}
                  />
                </div>
              </div>
            </div>
            
          </form>
        
        
      </React.Fragment>
    );
  })

  if(this.state.UserData!=""){        
    return(
        
        <div>
            {redirect}
            <NavProfile
          navdata={this.props.navdata}
          style={{ backgroundColor: "white" }}
        />
            <div class="main-div2">
            <div className="profilephoto" style={{ textAlign: "center" }}>
          {/* <div id="phto1" className="phtoto">
            <img src="images/defaultprofile.jpeg" />
          </div>
          <div>
            <button id="profileb" type="submit" className="btn btn-lg">
              Edit
            </button>
          </div> */}
          <div style={{fontSize:"32px"}}>
           {MainName}
          </div>
        </div>
        <div
          className="container profilemaindiv"
        >
          
                        <div>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </div>
            </div> 
            <div class="col-sm-3">
                <button onClick = {this.submitUpdate} style={{backgroundColor:"#0067db",borderColor:"#0067db",fontSize:"18px",marginLeft:"143px",marginTop:"10px"}} class="btn btn-primary button-search">Save Changes</button>
            </div>
            <div style={{ marginTop: "100px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
              </div>
        </div> 

        
    )
}else{
    return(

        <div>
                  <NavProfile
          navdata={this.props.navdata}
          style={{ backgroundColor: "white" }}
        />
                <div class="main-div">
                    <h2>No results for this query</h2>
                </div> 
                <div style={{ marginTop: "100px" }}>
          <Footer footdata={this.props.footdata} />
        </div>
         </div> 

            
        )
}

  }
}
export default Profile;