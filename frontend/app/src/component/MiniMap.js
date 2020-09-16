import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import React from "react";
import './Comment.css';


export class MapContainer extends React.Component {

	onMapReady(props,map){

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
					onReady={this.onMapReady.bind(this)}
					center={pos}
					initialCenter={pos}
					fullscreenControl={true}
					streetViewControl={true}
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