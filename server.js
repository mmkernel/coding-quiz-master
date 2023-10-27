'use strict';

import express from 'express';
import nano from 'nano';
import settings from './settings.js';
import routes from './routes.js';

// CONSTANTS & VARIABLES
const PORT = 3000;

// WEBSERVER
const server = express();
server.use(express.static('public', { extensions: ['html'] }));
server.use(express.json());
//server.use(routes);

const db = nano(`http://${settings.u}:${settings.p}@127.0.0.1:5984`).db;
const dbName = 'javascript';

// FUNCTIONS

server.get('/tables', (req, res) => {
    db.list((err, dbList) => {
      if (err) {
        res.status(500).json({ error: 'Could not retrieve table names' });
      } else {
        res.json({ tables: dbList });
      }
    });
});
  
server.listen(PORT, err => console.log(err || `Server is running on ${PORT}`));
// const init = () => {
    
//     db.list().then(
//         res => {
//             if (!res.includes(dbName)) {
//                 return db.create(dbName);
//             }
//         }
//     ).then(
//         () => {
//             server.listen(PORT, err => console.log(err || `Server is running on ${PORT}`));
//         }
//     ).catch(
//         console.warn
//     )    
// }

// init();