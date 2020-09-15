import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import React from "react";
import './MiniMap.css';


export class MapContainer extends React.Component {

  onMapClicked(){
    console.log("map clicked");
  }

  render(){
    const pos = {
      lat: this.props.lat,
			lng: this.props.lng,
		};
		return (
			<div className='Map-container'>

				<Map className="Map"
					google={this.props.google}
					zoom={14}
					center={pos}
					initialCenter={pos}
					onClick={this.onMapClicked.bind(this)}
					fullscreenControl={false}
					streetViewControl={false}
					zoomControl={false}
					gestureHandling={"auto"}
					mapTypeControl={false}>
					<Marker
						visible={true}
						position={pos}>
					</Marker>
				</Map>
			</div>
		);
	}

}


const LoadingContainer = (props) => (
	<div className='Map-container'>Map is loading...</div>
);

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_MAP_API_KEY,
	language: "ja",
	LoadingContainer: LoadingContainer,
})(MapContainer);