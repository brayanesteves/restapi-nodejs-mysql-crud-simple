const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
const v1 = '/api/v1';
const v2 = '/api/v2';
/**
 * List all data
 * @url 'http://localhost:3000/api/v1/0_usrs'
 */
router.get(v1 + '/0_usrs', (req, res) => {
    /**
     * @param {String} err
     * @param {String} rows of register
     * @param {String} fields of tables database
     */
    mysqlConnection.query('SELECT * FROM `0_usrs` AS `A`;', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.error(err);
        }
    });
});

/**
 * List all data not deleted and locked
 * @url 'http://localhost:3000/api/v1/0_usrs/1'
 * 1 => ':Rrfrnc' => { Rfrnc }
 */
router.get(v1 + '/0_usrs/:Rfrnc', (req, res) => {
    /**
     * { Rfrnc } it's ':Rfrnc'
     */
    const { Rfrnc } = req.params;
    /**
     * @param {String} err
     * @param {String} rows of register
     * @param {String} fields of tables database
     */
    mysqlConnection.query('SELECT * FROM `0_usrs` AS `A` WHERE `A`.`Rfrnc` = ? AND `A`.`Cndtn` = 1 AND `A`.`Rmvd` = 0 AND `A`.`Lckd` = 0;', [Rfrnc], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.error(err);
        }
    });
    
});

/**
 * Add data to table '0_usrs'
 * 
 * @url 'http://localhost:3000/api/v1/0_usrs/new'
 * 
 * curl --location --request POST 'http://localhost:3000/api/v1/0_usrs/new' \
 * --header 'Content-Type: application/json' \
 * --data-raw '{
 *   "Rfrnc": 0,
 *   "Usrnm":"Test", 
 *   "Psswrd":1234, 
 *   "Rfrnc_Prsn":1, 
 *   "UsrTyp_Rfrnc":1, 
 *   "Cndtn":1, 
 *   "Rmvd":0, 
 *   "Lckd":0,
 *   "DtAdmssn":"2021-09-06", 
 *   "ChckTm": "14:09:00"
 * }'
 */
router.post(v1 + '/0_usrs/new', (req, res) => {
    const { Rfrnc, Usrnm, Psswrd, Rfrnc_Prsn, UsrTyp_Rfrnc, Cndtn, Rmvd, Lckd, DtAdmssn, ChckTm } = req.body;    
    const query = `
        CALL 0_usrsAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    mysqlConnection.query(query, [Rfrnc, Usrnm, Psswrd, Rfrnc_Prsn, UsrTyp_Rfrnc, Cndtn, Rmvd, Lckd, DtAdmssn, ChckTm], (err, rows, fields) => {
        if(!err) {
            res.json({message: 'Users saved'});
        } else {
            console.error(err);
        }
    });
});

/**
 * Update data to table '0_usrs'
 * 
 * @url 'http://localhost:3000/api/v1/0_usrs/edit/1'
 * 1 => ':Rrfrnc' => { Rfrnc }
 * 
 * curl --location --request PUT 'http://localhost:3000/api/v1/0_usrs/edit/5' \
 * --header 'Content-Type: application/json' \
 * --data-raw '{    
 *   "Usrnm":"Test", 
 *   "Psswrd":1234, 
 *   "Rfrnc_Prsn":1, 
 *   "UsrTyp_Rfrnc":1, 
 *   "Cndtn":1, 
 *   "Rmvd":0, 
 *   "Lckd":0,
 *   "DtAdmssn":"2021-09-06", 
 *   "ChckTm": "14:09:00"
 * }'
 */
router.put(v1 + '/0_usrs/edit/:Rfrnc', (req, res) => {
    const { Usrnm, Psswrd, Rfrnc_Prsn, UsrTyp_Rfrnc, Cndtn, Rmvd, Lckd, DtAdmssn, ChckTm } = req.body;
    const { Rfrnc } = req.params;
    const query = `
        CALL 0_usrsAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    mysqlConnection.query(query, [Rfrnc, Usrnm, Psswrd, Rfrnc_Prsn, UsrTyp_Rfrnc, Cndtn, Rmvd, Lckd, DtAdmssn, ChckTm], (err, rows, fields) => {
        if(!err) {
            res.json({message: 'Users updated'});
        } else {
            console.error(err);
        }
    });
});

/**
 * Delete data to table '0_usrs', update field 'Rmvd' value 0 to 1, 1 [Delete data]
 * 
 * @url 'http://localhost:3000/api/v1/0_usrs/delete/1'
 * 1 => ':Rrfrnc' => { Rfrnc }
 * 
 * curl --location --request PUT 'http://localhost:3000/api/v1/0_usrs/edit/5' \
 * --header 'Content-Type: application/json' \
 * --data-raw '{    
 *   "Usrnm":"Test", 
 *   "Psswrd":200, 
 *   "Rfrnc_Prsn":1, 
 *   "UsrTyp_Rfrnc":1, 
 *   "Cndtn":1, 
 *   "Rmvd":0, 
 *   "Lckd":0,
 *   "DtAdmssn":"2021-09-06", 
 *   "ChckTm": "14:09:00"
 * }'
 */
 router.put(v1 + '/0_usrs/delete/:Rfrnc', (req, res) => {    
    const { Rfrnc } = req.params;
    mysqlConnection.query("UPDATE `0_Usrs` SET `Rmvd` = 1 WHERE `Rfrnc` = ?;", [Rfrnc], (err, rows, fields) => {
        if(!err) {
            res.json({message: 'Users deleted'});
        } else {
            console.error(err);
        }
    });
});

module.exports = router;