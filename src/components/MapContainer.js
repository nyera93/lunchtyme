const { Component, PropTypes } = React;
const { render } = ReactDOM;

class GoogleMap extends Component {
  constructor(props) {
    super(props);
  };

  static propTypes = {
    config: PropTypes.object.isRequired,
  };

  static defaultProps = {
    config: {},
  };

  componentDidMount () {
    this.map = this._createMap();
    this.marker = this._createMarkers();
  };

  _createMap = () => {
    const { mapCanvas } = this.refs;
    const { config } = this.props;

    if (config.type === 'street') {
      return new google.maps.StreetViewPanorama(mapCanvas, config.mapOptions);
    }

    return new google.maps.Map(mapCanvas, config.mapOptions);
  };

  _createMarkers = () => {
    const { config } = this.props;
    const { _createInfoWindow } = this;

    if (config.allowClusters) {
      const markers = _.map(config.locations, (location, i) => {
        const marker = new google.maps.Marker({ position: location });
        _createInfoWindow(marker, location);
        return marker;
      });

      const markerCluster = new MarkerClusterer(
        this.map,
        markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
      );
    } else {
      _.forEach(config.locations, location => {
        const marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: location.infoWindowContent.title || ''
        });
        _createInfoWindow(marker, location);
      });
    }
  };

  _createInfoWindow = (marker, location) => {
    const { title, text, imgUrl } = location.infoWindowContent;

    const infoWindowTemplate = `
      <div class="info-window" style="background-image: url(${imgUrl})"}>
        <h4>${ title }</h4>
        <p>${ text }</p>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowTemplate
    });

    marker.addListener('click', function() {
      infoWindow.open(this.map, marker);
    });
  };

  render () {
    return (
      <div className="google-map" ref="mapCanvas">
        LOADING MAP...
      </div>
    );
  };
}

const App = () => {

  const streetViewConfig = {
    type: 'street',
    mapOptions: {
      position: {
        lat: 41.8916,
        lng: -87.6079
      },
      pov: {
        heading: 200,
        pitch: 0
      },
      scrollwheel: false
    }
  };

  const mapViewConfig = {
    mapOptions: {
      center: {
        lat: 41.8916,
        lng: -87.6079,
      },
      zoom: 13,
      streetViewControl: true,
      scrollwheel: true
    },
    type: 'map',
    allowClusters: false,
    locations: [
      {
        lat: 41.8789,
        lng: -87.6359,
        infoWindowContent: {
          title: 'Willis Tower',
          text: 'The new Willis Tower will provide one of the most compelling and dynamic work, dining, shopping and entertainment environments available in any city.',
          imgUrl: 'http://static.thousandwonders.net/Willis.Tower.original.1014.jpg'
        }
      },
      {
        lat: 41.8916,
        lng: -87.6079,
        infoWindowContent: {
          title: 'Navy Pier',
          text: 'Navy Pier is a 3,300-foot-long (1,010 m) pier on the Chicago shoreline of Lake Michigan. It is located in the Streeterville neighborhood of the Near North Side',
          imgUrl: 'http://www.ncmahq.org/images/default-source/default-album/ev/wc17/wc17_navypier.jpg?sfvrsn=0'
        }
      },
      {
        lat: 41.8988,
        lng: -87.6229,
        infoWindowContent: {
          title: 'John Hancock Center',
          text: 'The John Hancock Center is a 100-story, 1,128-foot supertall skyscraper at 875 North Michigan Avenue, Chicago, Illinois.',
          imgUrl: 'https://aptamigo-production.s3.amazonaws.com/uploads/property/profile_photo/1032/a486a78b-54ca-4961-a403-5ea5c05a10be.jpg'
        }
      }
    ]
  };

  return (
    <div className="page">

      <div className="flexbox">
        <div className="map-container u-vr">
          <GoogleMap config={ mapViewConfig } />
        </div>
        <div className="map-container">
          <GoogleMap config={ streetViewConfig } />
        </div>
      </div>

    </div>
  );
}

render(<App />, document.body);
