import React, { Component } from 'react';
//import { useState } from 'react';
import '../styles/App.css';
import Home from './HomeComponent';
import List from './ListComponent';
import Detail from './DetailComponent';
import Web from './WebComponent';
import '../fonts/Arcon-Regular.otf';
//import gradient from '../images/x.png';
//import mapicon from '../images/icon_map.png';
//import Nav from './NavComponent'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
//  Redirect
} from 'react-router-dom'

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    items: {},
    isLoaded: false,
    isClicked: false
  };
  this.handleClick = this.handleClick.bind(this);
}


handleClick() {
  this.setState(state => ({
    isClicked: true,
    item: this.state.item,
  }));

}


componentDidMount() {
  fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    });

}

  render() {

    var { isLoaded, items } = this.state;

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  else {

    return (
      <Router>
          <div className="App">
              <ul>
                <li><Link to="/list"></Link></li>
                <li><Link to="/detail"></Link></li>
                <li><Link to="/web"></Link></li>
              </ul>

  <Switch>
  <Route path="/" exact={true} component={Home} />
  <Route path="/list" component={List} />
  <Route path="/detail" component={Detail} />
  <Route path="/web" component={Web} />
  </Switch>



          </div>
        </Router>
    );
  }
}
}

export default App;
