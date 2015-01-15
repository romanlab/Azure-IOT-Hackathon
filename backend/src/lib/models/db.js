'use strict';
var DoQmentDB  = require('doqmentdb');
var Client     = require('documentdb').DocumentClient;
var CONFIG     = require('../../config.js').DOCUMENT_DB;
// Create DocumentDB connection
var connection = new Client(CONFIG.HOST, CONFIG.AUTH);
// Create dbManager
var db = new DoQmentDB(connection, 'azure-iot');

/**
 * @export Database object
 */
module.exports = db;