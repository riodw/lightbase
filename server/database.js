// database.js
'use strict';


module.exports = function (server_IP) {
    return {
        'url': 'mongodb://' + server_IP
    };
};
// END - database.js