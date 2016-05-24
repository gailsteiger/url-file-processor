/**
 * Created by gail on 5/24/16.
 */
const validator = require('url-validator');

const fs = require('fs');

const EventEmitter = require('events');


const myEmitter = new EventEmitter();

exports.process = function (fileName) {
    fs.readFile(filename, function (err, data) {
        if (err) throw err;
        console.log(data);
    });
}


