// schema_update.js
'use strict'


/*************************************************************
 * IMPORT MODULES
 *************************************************************/
const mongoose = require('mongoose');

const uuidv1 = require('uuid/v1');

/*************************************************************
 * SCHEMA - User
 *************************************************************/
var Schema = mongoose.Schema;

/*************************************************************
 * MONGOOSE MODELS
 *************************************************************/
/* USER - From User */
var User = require('./models/user.js').User;


/*************************************************************
 * MODULE FUNCTIONS
 *************************************************************/
function schema_update() {
    return 0;
}

// Update All Users
function updateUser() {
    var totalUpdated = 0;

    // http://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
    // https://stackoverflow.com/questions/43070692/update-schema-in-mongoose-to-add-new-property
    // https://docs.mongodb.com/manual/reference/method/db.collection.update/

    User.find({}, function (err, data) {
        if (err) throw err;

        if (data == null) {
            console.log('schema_update: No Users Found');
        }
        // Data Found
        else {
            var users = data;
            var totalUpdated = 0;

            // For Each User in Database
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                // Track if changed
                var updated = false;

                // user.local.user.info.uuid
                // ======================================================
                // if (!user.info.uuid) {
                //     // Set uuid
                //     user.info.uuid = uuidv1();
                //     updated = true;
                //     totalUpdated++;
                // }


                // If Changed
                if (updated) {
                    user.markModified('info');
                    // Save User
                    user.save(function (err, data) {
                        if (err) throw err;
                    });
                }
            }
            console.log('schema_update - Users - Updated: ' + totalUpdated);
        }
    });
}



// Update Users
schema_update.updateUser = updateUser;

module.exports = schema_update;