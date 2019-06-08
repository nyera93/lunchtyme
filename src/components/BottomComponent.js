import React, { Component } from 'react'
import '../styles/App.css'
//import gradient from '../images/x.png'
import mapicon from '../images/icon_map.png'
import Nav from './NavComponent'


class Bottom extends Component {

  render() {
      return (
        <div>
        <Nav />
            <svg className="banner-container" width="100%" height="60px">

                <rect width="100%" height="100%" position="fixed" top="0" left="0" right="0" bottom="0" fill="#34B379" stroke-width="3" stroke="#34B379"></rect>

                <text className="App-header" x="50%" y="70%" alignment-baseline="middle" text-anchor="middle"></text>

                <img src={mapicon} alt={"Map Icon"} width="100%" height= "100%" />

                Sorry, your browser does not support inline SVG.
        </svg>
  </div>
          )
        }
      }

export default Bottom
