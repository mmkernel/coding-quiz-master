'use strict';

import express from 'express';
import formidable from 'formidable';
import nano from 'nano';
import settings from './settings.js';

// Webserver
const router = express.Router();
router.use(express.json());

// Datenbank
const db = nano(`http://${settings.u}:${settings.p}@127.0.0.1:5984`).db;
const dbName = 'javascript';

// FUNKTIONEN
const loadAndSendAllContents = (response) => {

    const myDB = db.use(dbName);

    myDB.list({ include_docs: true }).then(
        res => res.rows.map(row => row.doc)
    ).then(
        res => response.json({
            status: 'ok',
            data: res
        })
    ).catch(
        err => {
            console.warn(err);
            response.json({
                status: 'err',
                err
            })
        }
    )
}

// Routen
// Speichern eines neuen Content-Elements
// router.post('/save_content', (request, response) => {
//     const myForm = formidable({
//         uploadDir: 'public/uploads',
//         keepExtensions: true
//     })

//     myForm.parse(request, (err, fields, files) => {
//         if (err) console.warn(err);
//         else {
//             // Nutzdaten zu einem Objekt zusammentragen
//             const content = {
//                 header: fields.header[0],
//                 author: fields.author[0],
//                 text: fields.text[0],
//                 illu: files.illu[0].newFilename,
//                 crDate: Date.now()
//             }

//             // Datenbank ansprechen
//             const myDB = db.use(dbName);

//             // Content-Objekt in Datenbank schreiben
//             myDB.insert(content).then(
//                 () => loadAndSendAllContents(response)
//             )
//         }
//     })
// })

// Ausliefern aller Content-Daten
router.get('/load_contents', (request, response) => {

    // Aktuelle Contents aus der DB laden
    loadAndSendAllContents(response)

})



export default router;