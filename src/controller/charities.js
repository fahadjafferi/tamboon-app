import mongoose from 'mongoose';
import { Router } from 'express';
import Charities from '../model/charities';

export default({ config, db }) => {
  let api = Router();

   // CRUD - create , read, update, delete
  // 'v1/charities/add' - Create
  api.post('/add', (req, res) => {
    let newCharity = new Charities();
    newCharity.name = req.body.name;
    newCharity.logo_url = req.body.logo_url;

    newCharity.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Charity saved successfully' });
    });
  });

  // '/v1/charities' - Read
  api.get('/', (req, res) => {
    Charities.find({}, (err, charities) => {
      if (err) {
        res.send(err);
      }
      res.json(charities);
    });
  });

  // '/v1/charities/:id' - Read by id
  api.get('/:id', (req, res) => {
    Charities.findById(req.params.id, (err, charities) => {
      if (err) {
        res.send(err);
      }
      res.json(charities);
    });
  });

  // '/v1/charities/:id' - Update charity name
  api.put('/:id', (req, res) => {
    Charities.findById(req.params.id, (err, charities) => {
      if (err) {
        res.send(err);
      }
      charities.name = req.body.name;
      charities.logo_url = req.body.logo_url;
      charities.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Charity info updated" });
      });
    });
  });

  // '/v1/charities/:id' - Delete Charity
  api.delete('/:id', (req, res) => {
    Charities.remove({
      _id: req.params.id
    }, (err, charities) => {
      if (err) {
       res.send(err);
      }
        res.json({ message: "Charity Successfully Removed!" });
      });
    });
    
  return api;

}
