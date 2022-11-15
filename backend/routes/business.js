const router = require('express').Router();
let Business = require('../models/business.model');

router.route('/').get((req, res) => {
    Business.find()
        .then(businesses => res.json(businesses))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/category/:category').get((req, res) => {
    console.log("Print3", req.params)
    Business.find({ category: req.params.category })
        .then(businesses => res.json(businesses))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a business
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const imageUrl = req.body.imageUrl;
    const reviewCount = Number(req.body.reviewCount);
    const stars = 0;

    const newBusiness = new Business({
        name,
        category,
        address,
        city,
        state,
        latitude,
        longitude,
        imageUrl,
        reviewCount,
        stars
    });

    newBusiness.save()
        .then(() => res.json('Business added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// To add a review to an existing business and recalculate its rating
router.route('/add/:id').post((req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    const stars = Number(req.body.stars);
    const name = req.body.name

    var update = {
        "$push":
        {
            'reviews':
            {
                'text': text,
                'stars': stars,
                'name': name,
            }
        },
        "$inc":
        {
            reviewCount: 1
        }
    };

    // Insert review into business model and update reviewCount += 1
    var newStars;
    Business.updateOne({ _id: id }, update, { upsert: true }, function (err, data) {
        if (err) res.json(err);
        else {
            // Recalculate business' rating
            Business.findById(id, function (err, data) {
                if (err) res.json(err);
                else {
                    newStars = (data.stars * data.reviewCount + stars) / (data.reviewCount + 1);

                    Business.findByIdAndUpdate(id, {
                        stars: newStars
                    }, function (err, data) {
                        if (err) res.json(err);
                        else res.json(data);
                    });

                }
            });
        }
    });

    // Business.findByIdAndUpdate(id, {
    //     $inc: { reviewCount: 1 }
    // }, function(err, data) {
    //     if(err) res.json(err);
    //     else res.json(data);
    // });
});

// Find business by id
router.route('/:id').get((req, res) => {
    console.log("Print", req.params)
    Business.findById(req.params.id)
        .then(business => res.json(business))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete business by id
router.route('/:id').delete((req, res) => {
    Business.findByIdAndDelete(req.params.id)
        .then(() => res.json('Business deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;