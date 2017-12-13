// user.js
'use strict';


/*************************************************************
 * IMPORT MODULES
 *************************************************************/
const mongoose = require('mongoose');

const randtoken = require('rand-token');

const uuidv1 = require('uuid/v1');

/*************************************************************
 * SCHEMA - User
 *************************************************************/
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    info: {
        uuid: {
            type: String,
            default: uuidv1()
        },
        date: {
            type: Date,
            default: Date.now
        },
        email: {
            type: String,
            required: true,
            lowercase: false
        },
        name: {
            first: String,
            last: String,
        },
        phone: String,
        country: String,
        state: String,
        about: String,
        other: Schema.Types.Mixed,
    },
    meta: Schema.Types.Mixed,    
});

var User = mongoose.model('User', userSchema);

var Models = {
    User: User
};

module.exports = Models;
// END - user.js