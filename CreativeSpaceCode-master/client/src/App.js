// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from "./utils/API";
import Detail from "./pages/Detail";
import Editprofile from "./pages/Editprofile";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NoMatch from "./pages/NoMatch";
import { ArtistOnIce, JamesWaite, Margwli, PinkSoda, Profile, SamGriffinGuitar } from "./pages/Profile";
import Signup from "./pages/SignUp";
import Upload from "./pages/Upload";
import Test from "./pages/Test"
import Home from "./pages/Home";
import VideoHome from "./pages/VideoHome";
import MusicHome from "./pages/MusicHome";
import About from "./pages/About";
import { OnePage, Waite2, Waite3, Dagger, Turtle, Assets, Guitar1, Guitar2, Pinksoda1, Pinksoda2, Pinksoda3, Pinksoda4, Iceskating1, Iceskating2, Iceskating3, Iceskating4} from "./pages/OnePage";
import OtherHome from "./pages/OtherHome";

// import Artists from "./pages/Artists";
import Footer from "./components/Footer";


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      displayname: '',
      username: '',
      password: '',
      id: '',
      loggedIn: false,
      session: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateLoginForm = this.validateLoginForm.bind(this);
    this.registerArtist = this.registerArtist.bind(this);
    this.getArtistId = this.getArtistId.bind(this);
    this.checkId = this.checkId.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
    this.artistLoggedIn = this.artistLoggedIn.bind(this);
    this.artistNotLoggedIn = this.artistNotLoggedIn.bind(this);
    this.logoutArtist = this.logoutArtist.bind(this);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  validateForm = () => {
    if (!this.state.displayname || !this.state.username || !this.state.password) {
      return null;
    } else {return;}
  }

  validateLoginForm = () => {
    if (!this.state.username || !this.state.password) {
      return null;
    } else {return;}
  }

  registerArtist = () => {
    API.saveArtist({
      username: this.state.username,
      displayname: this.state.displayname,
      password: this.state.password
      }).then(res => this.getArtistId(this.state.username))
        .catch(err => console.log(err));
  }

  loginArtist = () => {
    API.login({
      username: this.state.username,
      password: this.state.password
      })
      .then(res => this.getArtistId(this.state.username))
        .catch(err => console.log(err));
  }

  getArtistId = () => {
    var obj = this;
    API.getArtistId(this.state.username)
    .then(res => this.setState({ id: res.data._id }))
    .catch(err => console.log(err))
    .then(setTimeout(function(){
      obj.checkId();
    }, 500));
  }

  checkId = () => {
    var obj = this;
    API.checkSessionId()
      .then(res => this.setState({ session: res.data }))
      .catch(err => console.log(err)).then(setTimeout(function(){
        obj.renderComponent();
    }, 1000));
  }

  logoutArtist = () => {
    API.logout()
    .then(this.setState({ loggedIn: false}));
  };

   logoutArtist = () => {
    API.logout()
    .then(() => this.setState({ loggedIn: false}));
  };

  renderComponent = () => {
    var isThere = (JSON.stringify(this.state.session)).indexOf(this.state.id);
    if(-1 !== isThere){
      this.artistLoggedIn();
    } else{
      this.artistNotLoggedIn();
    }
  }

  artistLoggedIn = () => {
    console.log('the artist is logged in');
    this.setState({ loggedIn: true });
  };

  artistNotLoggedIn = () => {
    console.log('the artist has logged in');
    this.setState({ loggedIn: true });
  };

  // artistNotLoggedIn = () => {
  //   console.log('the artist is NOT logged in')
  // };

  // ***************************************************************************
  //--------------UPLOADING ARTWORK--------------------------------------------
  //****************************************************************************
 
 successMessage = () => {
    this.setState({ 
      message: 'Success! Your creation has been saved.',
      className: "success" 
    });
  };

  uploadArt = () => {

     API.upload({
      medium: this.state.medium,
      title: this.state.title,
      description: this.state.description
      })

      .then(res => this.successMessage())
        .catch(err => console.log(err));
  };  
  

  render() {
    return(
      <div>
        <Router>
          {!this.state.loggedIn ?(
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/video" component={VideoHome} />
              <Route exact path="/music" component={MusicHome} />
              <Route exact path="/other" component={OtherHome} />
              <Route exact path="/about" component={About} />
              
              <Route exact path="/artists/:id" component={Detail} />
              <Route exact path="/detail" component={Detail} />
              <Route exact path="/editprofile" component={Editprofile} />
              <Route exact path="/profile" component={Profile} />
              //
              <Route exact path="/game" component={Assets} />
              <Route exact path="/dagger" component={Dagger} />
              <Route exact path="/guitar1" component={Guitar1} />
              <Route exact path="/guitar2" component={Guitar2} />
              <Route exact path="/onepage" component={OnePage} />
              <Route exact path="/pinksoda1" component={Pinksoda1} />
              <Route exact path="/pinksoda2" component={Pinksoda2} />
              <Route exact path="/pinksoda3" component={Pinksoda3} />
              <Route exact path="/pinksoda4" component={Pinksoda4} />
              <Route exact path="/turtle" component={Turtle} />
              <Route exact path="/waite2" component={Waite2} />
              <Route exact path="/waite3" component={Waite3} />
              <Route exact path="/Iceskating1" component={Iceskating1} />
              <Route exact path="/Iceskating2" component={Iceskating2} />
              <Route exact path="/Iceskating3" component={Iceskating3} />
              <Route exact path="/Iceskating4" component={Iceskating4} />
              //
            
              <Route exact path="/artistonice" component={ArtistOnIce} />
              <Route exact path="/jameswaite" component={JamesWaite} />
              <Route exact path="/margwli" component={Margwli} />
              <Route exact path="/pinksoda" component={PinkSoda} />
              <Route exact path="/samgriffinguitar" component={SamGriffinGuitar} />

              <Route exact path="/login"
                render={() => <Login
                  username = {this.state.username}
                  password = {this.state.password}
                  handleInputChange = {this.handleInputChange}
                  validateLoginForm = {this.validateLoginForm}
                  loginArtist = {this.loginArtist}
                  />
                }
              />
              <Route exact path="/signup"
                render={() => <Signup
                  displayname = {this.state.displayname}
                  username = {this.state.username}
                  password = {this.state.password}
                  handleInputChange = {this.handleInputChange}
                  validateForm = {this.validateForm}
                  registerArtist = {this.registerArtist}/>}/>

                  
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/logout"
                render={() => <Logout
                  logoutArtist = {this.logoutArtist}
              />}/>
              <Route component={NoMatch} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/video" component={VideoHome} />
              <Route exact path="/music" component={MusicHome} />
              <Route exact path="/other" component={OtherHome} />
              <Route exact path="/about" component={About} />
              
              <Route exact path="/" component={NoMatch} />
              <Route exact path="/signup" component={Profile} />
              <Route exact path="/test" component={Test} />
              <Route exact path="/artists/:id" componpent={Detail} />
              <Route exact path="/detail" component={Detail} />
              
               <Route exact path="/game" component={Assets} />
              <Route exact path="/dagger" component={Dagger} />
              <Route exact path="/guitar1" component={Guitar1} />
              <Route exact path="/guitar2" component={Guitar2} />
              <Route exact path="/onepage" component={OnePage} />
              <Route exact path="/pinksoda1" component={Pinksoda1} />
              <Route exact path="/pinksoda2" component={Pinksoda2} />
              <Route exact path="/pinksoda3" component={Pinksoda3} />
              <Route exact path="/pinksoda4" component={Pinksoda4} />
              <Route exact path="/turtle" component={Turtle} />
              <Route exact path="/waite2" component={Waite2} />
              <Route exact path="/waite3" component={Waite3} />

              <Route exact path="/artistonice" component={ArtistOnIce} />
              <Route exact path="/jameswaite" component={JamesWaite} />
              <Route exact path="/margwli" component={Margwli} />
              <Route exact path="/pinksoda" component={PinkSoda} />
              <Route exact path="/samgriffinguitar" component={SamGriffinGuitar} />

              <Route exact path="/editprofile" component={Editprofile} />




              <Route exact path="/login" component={Profile} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/upload" component={Upload} />
              <Route component={NoMatch} />
              <Route exact path="/logout"
                render={() => <Logout
                  logoutArtist = {this.logoutArtist}
              />}/>
            </Switch>
          )}
        </Router>
        
        <Footer />
      </div>
      
    );
  }
}

export default App;
