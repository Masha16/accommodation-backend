const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Accom = require('../models/accommodation-model');
const Requests = require('../models/request-model')


// GET route to get a specific request for accommodation 

router.get('/accommodation/:accomId/requests/:requestId', (req, res, next) => {
  Requests.findById(req.params.requestId)
    .then(request => {
      res.json(request);
    })
    .catch(error => {
      res.json(error);
    });
});


// POST route to create a new requests 

router.post('/requests', (req, res, next) => {
  Requests.create({
    requestDesc: req.body.requestDesc,
    accommodation: req.body.accomId
  })
    .then(response => {
      return Accom.findByIdAndUpdate(req.body.accomId, {
        $push: { requests: response._id }
      });
    })
    .then(theResponse => {
      res.json(theResponse);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT route to update a specific request

router.put('/requests/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Requests.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Request with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE route to delete a specific request

router.delete('/requests/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Requests.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Request with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;