import mongoose from 'mongoose';
import { Router } from 'express';
import Donations from '../model/donations';

export default({ config, db }) => {
  let api = Router();

  // '/v1/donations/add'
  api.post('/add', (req, res) => {
    let newDonation = new Donations();
    newDonation.name = req.body.name;
    newDonation.token = req.body.token;
    newDonation.amount = req.body.amount;

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
