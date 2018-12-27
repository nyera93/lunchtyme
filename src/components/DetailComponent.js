import React, { Component } from 'react';
import '../styles/App.css'
import Nav from './NavComponent'
import axios from 'axios'
import mapicon from '../images/icon_map.png'
import markers from './ListComponent'
import Data from './DataComponent'

class Detail extends Component {
  state = {
      venues: []
    }

    componentDidMount() {
      this.getVenues()
    }

    renderMap = () => {
      loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDb2qz3J1Mybp2Ff7WDw7E22ymBLVHVDNY&callback=initMap")
      window.initMap = this.initMap
    }

    getVenues = () => {
      const endPoint = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        client_id: "I0VT23DXXXOQMN21AHLVLGH5WYWPQPO4I4FCB1JK4Q1ALKVT",
        client_secret: "42330LL4PCZT00J3SYJ3M13GMIWBRHKYIIYYHNUZASOZ455Q",
        query: "Hop",
        near: "Dallas",
        v: "20181211"
      }

      axios.get(endPoint + new URLSearchParams(parameters))
        .then(response => {console.log(markers)
          this.setState({
            venues: response.data.response.groups[0].items
          }, this.renderMap())
        })
        .catch(error => {
          console.log("ERROR!! " + error)
        })

    }

    initMap = () => {
      {console.log(markers)}
      //Create a Map
      var map = new window.google.maps.Map(document.getElementById('map'), {
           center: {lat: 32.950787, lng: -96.821118},
           zoom: 15
        })

        //Create An InfoWindow
        var infowindow = new window.google.maps.InfoWindow()

        //Display Dynamic Markers
        this.state.venues.map(myVenue => {
          {console.log({marker})};
          var contentString = `<h5>${myVenue.venue.name}</h5>` + `<br />` + `<h6>${myVenue.venue.location.address}</h6>` + `<h6>${myVenue.venue.location.city + "," + myVenue.venue.location.state}</h6>`

          //Create a Marker
          var marker = new window.google.maps.Marker({
            position: {lat: myVenue.venue.location.lat , lng:  myVenue.venue.location.lng},
            map: map,
            title: myVenue.venue.name
          })

          //Click on A Marker
          marker.addListener('click', function() {

            //Change the content
            infowindow.setContent(contentString)

            //Open an infowindow
            infowindow.open(map, marker)
        })

      })

  }
  render() {
    return (
      <div>
          <Nav />
                <div id="map" />

                <svg className="banner-container" width="100%" height="60px">

                    <rect width="100%" height="100%" position="fixed" top="0" left="0" right="0" bottom="0" fill="#34B379" stroke-width="3" stroke="#34B379"></rect>

                    <text className="App-header" x="50%" y="70%" alignment-baseline="middle" text-anchor="middle"></text>

                    <img src={mapicon} alt={"Map Icon"} width="100%" height= "100%" />

                    Sorry, your browser does not support inline SVG.
            </svg>
         <Data /> 

      </div>
  )
  }
  }


  function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
    index.parentNode.insertBefore(script, index)
  }

  export default Detail;
