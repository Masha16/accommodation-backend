const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Accom = require('../models/accommodation-model');
const Requests = require('../models/request-model')


/* POST route to create a new accomodation */
router.post('/accommodationcreate', (req, res, next) => {
  const { postname, city, size, description, price, imageUrl} = req.body;
  Accom.create({
    postname,
    city,
    size,
    description,
    price,
    requests: [], 
    owner: req.user._id, 
    imageUrl,
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET route to show the list of accommodation 
router.get('/accommodation', (req, res, next) => {
  Accom.find()
    .populate('requests')
    .then(allAccommodation => {
      res.json(allAccommodation);
    })
    .catch(err => {
      res.json(err);
    });
});



// GET route to see a specific accommodation

router.get('/accommodation/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Accom.findById(req.params.id)
    .populate('requests')
    .then(accomodation => {
      res.status(200).json(accomodation);
    })
    .catch(error => {
      res.json(error);
    });
});

// PUT route to update an accommodation post there 

router.put('/accommodation/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Accom.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Accomodation with ${req.params.id} is updated successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

// DELETE route to delete specific accomodation post 

router.delete('/accommodation/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Accom.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Accommodation with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});




module.exports = router;
