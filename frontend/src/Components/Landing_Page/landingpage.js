import React, {Component} from 'react';
import '../../App.css';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';

class landingpage extends Component{

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            location:"",
            startdate : "",
            enddate:"",
            guests:0,
            authFlag : false,
            error: false,
          
            properties: [],
        }
        //Bind the handlers to this class
        this.LocationChangeHandler = this.LocationChangeHandler.bind(this);
        this.startdateChangeHandler = this.startdateChangeHandler.bind(this);
        this.enddateChangeHandler = this.enddateChangeHandler.bind(this);
        this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //location change handler to update state variable with the text entered by the user
    LocationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }
    //start date change handler to update state variable with the text entered by the user
    startdateChangeHandler = (e) => {
        this.setState({
            startdate : e.target.value
        })
    }
    //end date change handler to update state variable with the text entered by the user
    enddateChangeHandler = (e) => {
        this.setState({
            enddate : e.target.value
        })
    }
    //guests change handler to update state variable with the text entered by the user
    guestsChangeHandler = (e) => {
        this.setState({
            guests : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitSearch = (e) => {
       
        //prevent page from refresh
        e.preventDefault();
        const data = {
             location : this.state.location,
             startdate : this.state.startdate,
             enddate: this.state.enddate,
             guests: this.state.guests
            };
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3031/home',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response.data);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        //properties: response.data    
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

render() {
    let redirectVar = null;
        if(this.state.authFlag){
            this.props.history.push({
                pathname: '/results',
                state: {
                    properties: this.state.properties,
                }
              })
        }
          let errorMessage = null;
        if(this.state.error){
            errorMessage = <div style={{fontSize:'14px',backgroundColor:'#ed605a',lineHeight:'20px',color:'white',textAlign:'center',padding:'10px'}}><p>No results found!.</p></div>
        }
console.log(this.props.location.state);
let foot =  <Footer data= {this.props.data}/>; 
let navbar =<Navbar data= {this.props.data}/>;

return ( <React.Fragment>

    <header id="main" className="page-landing">
    {redirectVar}
        {navbar}
        <div class="MainContent">
        <h1 className="Headline">
            <span className="Headline_Text">
            Book beach houses, cabins,
            </span><br></br>
            <span className="Headline_Text">
            condos and more, worldwide
            </span>
        </h1>
        <form class="form-inline" >
    <div class="form-group form-group-lg">
    
      <label class="sr-only" for="location">Location:</label>
      <input type="text" class="form-control" id="loc" placeholder="Where do you want to go?" name="location" onChange = {this.LocationChangeHandler} style={{width:'380px'}}/>
    </div>
    <div class="form-group form-group-lg">
      <label class="sr-only" for="startdate">Arrive:</label>
      <input type="date" class="form-control" id="arr" placeholder="Arrive?" name="startdate" onChange = {this.startdateChangeHandler} style={{width:'150px'}}/>
    </div>
    <div class="form-group form-group-lg">
      <label class="sr-only" for="enddate">Depart:</label>
      <input type="date" class="form-control" id="depart" placeholder="Depart" name="enddate" onChange = {this.enddateChangeHandler} style={{width:'150px'}}/>
    </div>
    <div class="form-group form-group-lg">
      <label class="sr-only" for="guests">Number of Guests:</label>
      <input type="text" class="form-control" id="loc" placeholder="Guests" name="guests" onChange = {this.guestsChangeHandler} style={{width:'150px'}}/>
    </div>
    <button type="submit" onClick = {this.submitSearch} class="btn btn-lg">Search</button>
  </form>
        </div>
        <div class="SubContent">
        <ul class="Font_List">
            <li class="Font_Item">
                <strong class="Font_Title">Your whole vacation starts here</strong><br></br>
                <span class="Font_subTitle">Choose a rental from the world's best selection</span>
            </li>
            <li class="Font_Item">
                <strong class="Font_Title">Book and stay with confidence</strong><br></br>
                <span class="Font_subTitle">Secure payments, peace of mind</span>
            </li>
            <li class="Font_Item">
                <strong class="Font_Title">Your vacation your way</strong><br></br>
                <span class="Font_subTitle">More space, more privacy, no compromises</span>
            </li>
        </ul>
        </div>
        
        <div class="container">
  <div class="row" style={{font:'white'}}>
   
  </div>
</div>

    </header>  


            <div class="content">
            <div class="subtext">
                <h2 id="hh">List your property on HomeAway and open your <br></br> door to rental income</h2>
                <a href="listyourproperty" ><button class="content_btn btn btn-lg" href="/listyourproperty">List Your Property</button></a>
            </div>
</div>
    
    <div>
        {foot}
    </div>

</React.Fragment>
)
}
}

export default landingpage;