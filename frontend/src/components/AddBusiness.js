import React, { Component } from 'react';
import axios from 'axios';

export default class AddBusiness extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeLatitude = this.onChangeLatitude.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);
        this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            category: '',
            address: '',
            city: '',
            state: '',
            latitude: 0,
            longitude: 0,
            imageUrl: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        })
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value
        })
    }

    onChangeLatitude(e) {
        this.setState({
            latitude: e.target.value
        })
    }

    onChangeLongitude(e) {
        this.setState({
            longitude: e.target.value
        })
    }

    onChangeImageUrl(e) {
        this.setState({
            imageUrl: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const business = {
            name: this.state.name,
            category: this.state.category,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            imageUrl: this.state.imageUrl,
            reviewCount: 0
        }

        console.log(business);

        axios.post('http://localhost:8000/business/add', business)
            .then(res => console.log(res.data));
        
        window.location = ('/')
    }

    render() {
        return (
            <div>
                <h3>Add Restaurant</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Name: </label>
                    <input type="text" required onChange={this.onChangeName}/>

                    <label for="category">Category: </label>
                    <select name="category" id="category" onChange={this.onChangeCategory}>
                        <option>Select one</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Laundry">Laundry</option>
                        <option value="Coffee Shop">Coffee Shop</option>
                    </select>

                    <label>Address: </label>
                    <input type="text" required onChange={this.onChangeAddress}></input>
                    <br/>
                    <label>City: </label>
                    <input type="text" required onChange={this.onChangeCity}></input>

                    <label>State: </label>
                    <input type="text" required onChange={this.onChangeState}></input>

                    <label>Latitude: </label>
                    <input type="text" required onChange={this.onChangeLatitude}></input>
                    <br/>
                    <label>Longitude: </label>
                    <input type="text" required onChange={this.onChangeLongitude}></input>

                    <label>Image url: </label>
                    <input type="text" required onChange={this.onChangeImageUrl}></input>

                    <input type="submit" value="Create"></input>
                </form>
            </div>
        )
    }

}