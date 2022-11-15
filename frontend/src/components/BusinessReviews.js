import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Review = props => (
    <tr>
        <td>{props.review.text}</td>
        <td>{props.review.stars}</td>
    </tr>
)

function withParams(Component) {
    return props => <Component params={useParams()} />;
}

class BusinessReviews extends Component {
    constructor(props) {
        super(props);

        this.onChangeReview = this.onChangeReview.bind(this);
        this.onChangeStars = this.onChangeStars.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            city: '',
            state: '',
            businessStars: 0,
            text: '',
            stars: 0,
            reviews: []
        };
    }

    onChangeReview(e) {
        this.setState({
            text: e.target.value
        })
    }

    onChangeStars(e) {
        this.setState({
            stars: e.target.value
        })
    }

    componentDidMount() {
        let { id } = this.props.params;
        axios.get('/business/' + id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    city: response.data.city,
                    state: response.data.state,
                    businessStars: response.data.stars,
                    reviews: response.data.reviews
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        const review = {
            text: this.state.text,
            stars: this.state.stars
        }

        let { id } = this.props.params;
        axios.post('/business/add/' + id, review)
            .then(res => console.log(res.data));

        window.location = (id)
    }

    reviewsList() {
        return this.state.reviews.map(currentReview => {
            return <Review review={currentReview}></Review>
        })
    }

    render() {
        return (
            <div>
                <h2>Details</h2>
                <h3>{this.state.name}</h3>
                <h3>{this.state.address}</h3>
                <h3>{this.state.city}</h3>
                <h3>{this.state.state}</h3>
                <h3>{this.state.businessStars}</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Review</th>
                            <th>Stars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.reviewsList()}
                    </tbody>
                </table>

                <form onSubmit={this.onSubmit}>
                    <label>Write your review:</label>
                    <input type="text" required placeholder='Review' value={this.state.text} onChange={this.onChangeReview}></input>
                    <input type="number" required placeholder='Rating' onChange={this.onChangeStars}></input>

                    <input type="submit" value="Save"></input>
                </form>
            </div>
        )
    }
}

export default withParams(BusinessReviews);