import React, { Component } from 'react';
import '../styles/App.css';

import mapicon from '../images/icon_map.png';

class Nav extends Component {


  render() {
        return (
          <div id="nav">
              <svg width="100%" height="65px">
              <rect width="100%" height="100%" position="fixed" top="0" left="0" right="0" bottom="0" fill="#43E895" stroke-width="3" stroke="#43E895" />
              <text className="detail-header" x="50%" y="70%" alignment-baseline="middle" text-anchor="middle">Lunch Tyme</text>
              <img src={mapicon} alt={"Map Icon"} width="100%" height= "100%" />
                Sorry, your browser does not support inline SVG.
              </svg>
          </div>
        )
    }
  }


export default Nav;
