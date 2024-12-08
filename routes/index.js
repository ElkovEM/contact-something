const express = require('express');
const router = express.Router();

const { Contact } = require('../models/contact');

// Get All Contacts
router.get('/api/contacts', (req, res) => {
    Contact.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// Get Single Contact
router.get('/api/contact/:id', (req, res) => {
    Contact.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
           console.log(err);
        }
    });
});

// Add Contact
router.post('/api/contact/add', (req, res) => {
    const emp = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });
    emp.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Contact Added Successfully', addContact: data})
        } else {
           console.log(err);
        }
    });
});

// Update Contact
router.put('/api/contact/update/:id', (req, res) => {
    const emp = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    };
    Contact.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Contact Updated Successfully', updateContact: data})
        } else {
            console.log(err);
        }
    });
});

// Delete Contact
router.delete('/api/contact/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Contact deleted', deleteContact: data})
        } else {
            console.log(err);
        }
    });
});


module.exports = router;