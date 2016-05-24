/**
 * Created by gail on 5/24/16.
 */
const validator = require('url-validator');

const fs = require('fs');
const _ = require('lodash');

const EventEmitter = require('events');

exports.process = process;

function process(filename) {

    // create emitter
    const myEmitter = new EventEmitter();

    // emit start
    // myEmitter.emit('start');

    const stream = fs.createReadStream(filename, {encoding: 'utf-8'});

    var buf = '';

    stream.on('data', function (chunk) {
        buf += chunk;
    });

    stream.on('readable', function () {
        myEmitter.emit('start');
    });
    
    stream.on('error', function () {
        myEmitter.emit('error');
    });

    stream.on('end', function () {
        var urls = buf.split('\n');
        evaluate(urls, myEmitter);
        
        myEmitter.emit('end');
        stream.close();
    });

    return myEmitter;
    
}

function evaluate(urls, emitter) {
    _.forEach(urls, function (url) {
        var result = validator.parse(url);
        
        if(!result) {
            emitter.emit('data-error', url);
        } else {
            emitter.emit('data', result);
        }
    });
}




