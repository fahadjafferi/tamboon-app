import mongoose from 'mongoose';
import { Router } from 'express';
import Charities from '../model/charities';

// list of charities hard coded
var fs = require('fs');
var data = fs.readFileSync(__dirname + '/charitiesfile.json');
var charitiesList = JSON.parse(data);

export default({ config, db }) => {
  let api = Router();

   // CRUD - create , read, update, delete
  // '/v1/charities/add' - Create
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

  // Get all charities
  api.get('/all', (req, res) => {
    res.send(charitiesList);
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
    Charities.findById(req.params.id, (err, charities) => {
      if (err) {
        res.status(500).send(err);
        //return alllows to exit out the function if reach error
        return;
      }
      if (charities === null) {
        res.status(404).send("Charities not found");
        return;
      }
      Charities.remove({
        _id: req.params.id
      }, (err, charities) => {
        if (err) {
         res.stauts(500).send(err);
         return;
        }
          res.json({ message: "Charity Successfully Removed!" });
        });
      });
    });


  return api;

}
