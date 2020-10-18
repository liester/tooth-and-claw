const { app, remote } = require('electron');
const Datastore = require('nedb-promises');

const dbFactory = (fileName) =>
  Datastore.create({
    filename: `./data/${fileName}`,
    timestampData: true,
    autoload: true,
  });

const db = {
  customers: dbFactory('customers.db'),
  schedule: dbFactory('schedule.db'),
  notes: dbFactory('notes.db'),
};
module.exports = db;
