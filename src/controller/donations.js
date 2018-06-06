import mongoose from 'mongoose';
import { Router } from 'express';
import Donations from '../model/donations';

// list of donations hard coded


export default({ config, db }) => {
  let api = Router();

  // '/v1/donations/add'
  api.post('/add', (req, res) => {
    let newDonation = new Donations();
    newDonation.name = req.body.name;
    newDonation.token = req.body.token;
    newDonation.amount = req.body.amount;

    var fs = require('fs');
    var data = JSON.stringify(newDonation, null, 2);
    fs.writeFile(__dirname + '/donationsfile.json', data, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Donation Recieved Successfully' });
    });

    // Creates a charge using the supplied token against the Omise API
    /*fetch('https://api.omise.co/charges', {
      method: 'POST',
      headers: new Headers(),
      body: JSON.stringify({
        'amount': 'newDonation.amount',
        'currency': 'thb',
        'card': 'newDonation.token'
      })
    }), (err, charge) => {
        if (err) {
         res.send(err);
        }
          res.json({ message: "Charged Card Successfully" });
        },*/

    newDonation.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Donation Recieved Successfully' });
    });
  });

  // get all donations
  api.get('/all', (req, res) => {
    var fs = require('fs');
    var data = fs.readFileSync(__dirname + '/donationsfile.json');
    var donationsList = JSON.parse(data);
    res.send(donationsList);
  });

  // '/v1/donations/:id' - Read donations by id
  api.get('/:id', (req, res) => {
    Donations.findById(req.params.id, (err, donations) => {
      if (err) {
        res.send(err);
      }
      res.json(donations);
    });
  });

  // '/v1/donations' - Read
  api.get('/', (req, res) => {
    Donations.find({}, (err, donations) => {
      if (err) {
        res.send(err);
      }
      res.json(donations);
    });
  });

  return api;

}
