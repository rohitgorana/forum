import React, { Component } from 'react'
import {  Switch, Route } from "react-router-dom";
import Profile from './containers/Profile' 
import Forum from './containers/Forum'
import EnsureAuth from './containers/EnsureAuth'
import AppWrapper from './containers/AppWrapper'
import Post from './containers/Post'
import { LinkedInPopUp } from 'react-linkedin-login-oauth2'
import './App.css'


class App extends Component{

  render(){
  
    return (
      <React.Fragment>
        <AppWrapper>
          <EnsureAuth>
              <Switch>
                <Route path="/" exact component={Forum} />
                <Route path='/linkedin' component={LinkedInPopUp} />
                <Route path="/discussion/:id" exact component={Post} />
                <Route path="/profile" component={Profile} />
                <Route path="/:username" render={(props) => (
                  <Profile username={props.match.params.username} />
                )} />
                
              </Switch>
          </EnsureAuth>
        </AppWrapper>
      </React.Fragment>
    );
  }
}



export default App;
