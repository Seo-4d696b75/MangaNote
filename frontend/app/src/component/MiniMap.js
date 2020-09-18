import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import Spinner from "react-bootstrap/Spinner";
import React from "react";

import "../styles/sass/component/MiniMap.scss";
import "../styles/sass/component/Comment.scss";



export class MapContainer extends React.Component {

	onMapReady(props,map){

	}

  render(){
    const pos = {
      lat: this.props.lat,
			lng: this.props.lng,
		};
		return (
      <div className="map-container">
        <Map
          className="map-container__map"
          google={this.props.google}
          zoom={14}
          onReady={this.onMapReady.bind(this)}
          center={pos}
          initialCenter={pos}
          fullscreenControl={true}
          streetViewControl={true}
          zoomControl={false}
          gestureHandling={"auto"}
          mapTypeControl={false}
        >
          <Marker visible={true} position={pos}></Marker>
        </Map>
      </div>
		);
	}

}


const LoadingContainer = (props) => (
  <div className="map-container__map--loading">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_MAP_API_KEY,
	language: "ja",
	LoadingContainer: LoadingContainer,
})(MapContainer);