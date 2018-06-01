import mongoose from 'mongoose';
import { Router } from 'express';
import Charities from '../model/charities';

export default({ config, db }) => {
  let api = Router();

  // 'v1/charities/add'
  api.post('/add', (res, req) => {
    let newCharity = new Charity();
    newCharity.name = req.body.name;

    newCharity.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Charity saved successfully' });
    });
  });

  return api;
}
