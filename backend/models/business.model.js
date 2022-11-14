const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Separated schema for reviews - Currently not in use
// const ReviewSchema = new Schema({
//     text: { type: String },
//     stars: { type: Number },
//     datePosted: { type: Date },
//     post: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Business'
//     }
// }, {
//     timestamps: true,
// });

const BusinessSchema = new Schema({
  name: { type: String },
  category: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  stars: { type: Number },
  reviewCount: { type: Number },
  imageUrl: { type: String },
  reviews: [
    { 
      text: String,
      stars: Number
    }
  ]
}, {
  timestamps: true,
});

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;