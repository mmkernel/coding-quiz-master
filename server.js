'use strict';

import express from 'express';
import nano from 'nano';
import settings from './settings.js';
import open from 'open';

// CONSTANTS & VARIABLES
const PORT = 3000;

// WEBSERVER
const server = express();
server.use(express.static('public', { extensions: ['html'] }));
server.use(express.json());
//server.use(routes);

const db = nano(`http://${settings.u}:${settings.p}@127.0.0.1:5984`).db;

// FUNCTIONS
const init = () => {
    
    // FETCHING TABLES FOR SELECT ELEMENT ----------------------------------------------------------------
    server.get('/tables', (req, res) => {
        db.list((err, dbList) => {
        if (err) {
            res.status(500).json({ error: 'Could not retrieve table names' });
        } else {
            res.json({ tables: dbList });
        }
        });
    });

    // FETCHING SELECTED TABLE FROM DATABASE ----------------------------------------------------------------
    server.get(`/tables/:tableName`, (req, res) => {
        const { tableName }  = req.params;
        const selectedTable = db.use(tableName);
        console.log(res.req.url);
        selectedTable.list({ include_docs: true }, (err, body) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: `Could not retrieve data from table ${tableName}` });
        } else {
            res.json({ data: body.rows });
        }
        });
    });

    // SAVE SCORE TO DATABASE ------------------------------------------------------------------------------
    server.post('/saveScore', (req, res) => {
        const { playerName, quiz, points } = req.body;
        const scoringTable = db.use('scoringlist'); 

        const scoringData = {
            playerName,
            quiz,
            points,
        };

        scoringTable.insert(scoringData, (err, body) => {
            if (err) {
                res.status(500).json({ error: 'Failed to save scoring data' });
            } else {
                scoringTable.list({ include_docs: true }, (err, body) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Failed to retrieve scoring data' });
                    } else {
                        res.json({ message: 'Scoring data saved and retrieved successfully', data: body.rows });
                    }
                });
            }
        });
    });
    
    
    server.listen(PORT, err => console.log(err || `Server is running on port => ${PORT}`));
    open('http://localhost:3000/', {wait: true});

}

init();