import mongoose from 'mongoose';
import { Router } from 'express';
import Charities from '../model/charities';

export default({ config, db }) => {
  let api = Router();

  // 'v1/charities/add'
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

  return api;
}
