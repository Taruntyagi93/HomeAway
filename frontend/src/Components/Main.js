import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import SignUp from './SignUp/signup';
import SignupOwner from './SignUp/ownersignup.js';
import Login from './Login/login';
import LoginOwner from './Login/ownerlogin.js';
import Navbar from './Navbar/navbar';
import Footer from './Footer/footer';
import Navbar2 from './Navbar/navbar2';
import Navbar3 from './Navbar/navbar3';
import Navbar4 from './Navbar/navbar4';
import landingpage from './Landing_Page/landingpage';
import Results from './Results/results';
import Account from './Profile/account';
import Profile from './Profile/profile';
import listproperty from './ListProperty/listproperty';
import Property from './Property/property';
import CheckForm from './CategoryCheck/checkform';
import OwnerMainPage from './Owner/ownermainpage';
import MyTrips from './Dashboard/mytrips';
import listyourproperty from './ListYourProperty/listyourproperty';
import NavProfile from './Navbar/navbar5';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/home" component={landingpage}/>
                <Route path="/list" component={listproperty}/>
                <Route path="/footer" component={Footer}/>
                <Route path='/navbar' component={Navbar}/>
                <Route path='/navbar2' component={Navbar2}/>
                <Route path='/navbar3' component={Navbar3}/>
                <Route path='/navbar4' component={Navbar4}/>
                <Route path='/navbar5' component={NavProfile}/>
                <Route path="/register" component={SignUp}/>
                <Route path="/ownersignup" component={SignupOwner}/>
                <Route path="/account" component={Account}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/login" component={Login}/>
                <Route path="/ownerlogin" component={LoginOwner}/>
                <Route path="/results" component={Results}/>
                <Route path="/property" component={Property}/>
                <Route path="/listyourproperty" component={listyourproperty}/>
                <Route path="/checkform" component={CheckForm}/>
                <Route path="/ownermainpage" component={OwnerMainPage}/>   
                <Route path="/mytrips" component={MyTrips}/>            
            </div>
        )
    }
}
//Export The Main Component
export default Main;