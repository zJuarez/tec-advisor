import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function withParams(Component) {
    return props => <Component params={useParams()} />;
}

class EditReview extends Component {
    constructor(props) {
        super(props);

        this.onChangeReview = this.onChangeReview.bind(this);
        this.onChangeStars = this.onChangeStars.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
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
        var { id } = this.props.params;
        this.state.id = id;

        axios.get('/business/review/' + id)
            .then(response => {
                this.setState({
                    reviews: response.data.reviews
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        var text = document.getElementById("text").value;
        var stars = document.getElementById("stars").value;
        var old_stars = document.getElementById("old_stars").value;

        const review = {
            text: text,
            stars: stars,
            old_stars: old_stars
        }

        let { id } = this.props.params;
        axios.post('/business/update/' + id, review)
            .then(res => console.log(res.data));

        window.history.back()
    }

    render() {
        return (
            <div>
                <h2>Edit!</h2>

                {this.state.reviews?.map(review => {
                    return (
                        review._id === this.state.id ?

                            <form onSubmit={this.onSubmit}>
                                <label>Edit your review:</label>
                                <input type="text" id="text" required onChange={this.onChangeReview} defaultValue={review.text}></input>
                                <input type="text" id="stars" required onChange={this.onChangeStars} defaultValue={review.stars.$numberDecimal}></input>

                                <input type="hidden" id="old_stars" defaultValue={review.stars.$numberDecimal} ></input>
                                <input type="submit" value="Save"></input>
                            </form>

                            : null
                    )
                }
                )}

            </div>
        )
    }
}

export default withParams(EditReview);