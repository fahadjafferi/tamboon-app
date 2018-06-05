import express from 'express';
import config from '../config';
import middleware from '../middleware'
import initializeDb from '../db';
import charities from '../controller/charities';
import donations from '../controller/donations';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));
  // api routes v1
  router.use('/charities', charities( {config, db }));
  router.use('/donations', donations( {config, db }));

});

export default router;
