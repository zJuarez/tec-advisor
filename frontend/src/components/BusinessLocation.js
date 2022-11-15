import { GoogleMap, MarkerF } from '@react-google-maps/api';
import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function withParams(Component) {
    return props => <Component params={useParams()} />;
}

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            name: '',
            address: '',
        };
    }

    componentDidMount() {
        let { id } = this.props.params;
        axios.get('http://localhost:8000/business/' + id)
            .then(response => {
                this.setState({
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                    name: response.data.name,
                    address: response.data.address
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <>
                <GoogleMap
                    zoom={15}
                    center={{ lat: this.state.latitude, lng: this.state.longitude }}
                    mapContainerClassName="map-container"
                >
                    <MarkerF position={{ lat: this.state.latitude, lng: this.state.longitude }} />
                </GoogleMap>
                <h3> {this.state.name} </h3>
                <h4> {this.state.address} </h4>

            </>
        )
    }
}

export default withParams(Map);