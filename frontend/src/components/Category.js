import '../App.css';
import Place from './Place';
import Divider from '@mui/material/Divider';
import React, { Component } from 'react';
import axios from 'axios';

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = { businesses: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/business/')
            .then(response => {
                this.setState({ businesses: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    businessList() {
        return this.state.businesses.map(currentBusiness => {
            return <Place business={currentBusiness}></Place>
        })
    }

    render() {
        return (
            <div className="feed">
                <div style={{ marginTop: 10, fontSize: 12, color: "gray" }}>
                    {/* Mau's code <Divider> {name.toUpperCase()}</Divider> */}
                    { this.businessList() }
                </div>
            </div>
        )
    }
}
