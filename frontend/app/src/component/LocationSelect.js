import {GoogleApiWrapper, Map} from "google-maps-react";
import React from "react";
import "../styles/sass/component/CommentModal.scss";


export class LocationSelector extends React.Component {

	constructor(){
		super();
		this.state = {
			location: {
					lat: null,
					lng: null,
			}

		}
	}

	onMapReady(props, map) {

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				var location = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				}
				console.log("current location", location);
				this.props.callback(location);
				this.setState({location: location});
			},
			(err) => {
				console.log(err);
			}
		);
	}

	onBoundsChanged(props, map){
		var bounds = map.getBounds();
		var ne = bounds.getNorthEast();
		var sw = bounds.getSouthWest();
		var location = {
			lat: (ne.lat() + sw.lat())/2,
			lng: (ne.lng() + sw.lng())/2
		};
		this.props.callback(location);
	}

  render(){
		return (
			<div className='map-container'>

				<Map className="Map"
					google={this.props.google}
					zoom={14}
					onReady={this.onMapReady.bind(this)}
					onBoundsChanged={this.onBoundsChanged.bind(this)}
					initialCenter={this.props.init_location}
					center={this.state.location}
					fullscreenControl={false}
					streetViewControl={false}
					zoomControl={true}
					gestureHandling={"greedy"}
					mapTypeControl={false}>

				</Map>
				<div className='map-center-icon'>+</div>
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
})(LocationSelector);