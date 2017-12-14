// server.js
'use strict'


console.log('*************************************');
/*************************************************************
 * IMPORT MODULES
 *************************************************************/
/* 
 * 
 *  */

/* HTTP
 * Native NodeJS module designed to support many features of the protocol which have been traditionally difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire requests or responses--the user is able to stream data.
 * https://nodejs.org/api/http.html#http_http */
const http = require('http');

const https = require('https');

/* OS
 * The os module provides a number of operating system-related utility methods.
 * https://nodejs.org/api/os.html#os_os */
const os = require('os');

/* File System
 * The Node.js file system module allow you to work with the file system on your computer.
 * https://nodejs.org/api/fs.html#fs_file_system */
const fs = require('fs');

/* Path
 * Native NodeJS module for resolving file and directory paths.
 * https://nodejs.org/api/path.html#path_path */
const path = require('path');

/* Child Process
 * provides the ability to spawn child processes
 * https://nodejs.org/api/child_process.html */
const {
    spawn
} = require('child_process');



/* express
 * Fast, unopinionated, minimalist web framework for Node.js
 * https://expressjs.com */
const express = require('express');

/** cookie-parser
 * Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 * https://github.com/expressjs/cookie-parser */
const cookie_parser = require('cookie-parser');

/* body-parser
 * Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
 * https://github.com/expressjs/body-parser */
const body_parser = require('body-parser');

/* method-override
 * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
 * https://github.com/expressjs/method-override */
const method_override = require('method-override');

/** express-session
 * Manage Express Sessions
 * https://github.com/expressjs/multergithub.com/expressjs/session */
const session = require('express-session');

/** connect-mongo
 * MongoDB session store for Connect and Express
 * https://github.com/jdesboeufs/connect-mongo */
const connect_mongo = require('connect-mongo')(session);

/** mongoose
 * elegant mongodb object modeling for node.js
 * http://mongoosejs.com */
const mongoose = require('mongoose');

/** moment
 * arse, validate, manipulate, and display dates and times.
 * https://momentjs.com/docs/ */
const moment = require('moment');

/** socket.io
 * elegant mongodb object modeling for node.js
 * https://www.npmjs.com/package/socket.io */
const socketio = require('socket.io');

/** jsonfile
 * Writing JSON.stringify() and then fs.writeFile() and JSON.parse() with fs.readFile() enclosed in try/catch blocks became annoying.
 * https://www.npmjs.com/package/jsonfile */
const jf = require('jsonfile');

/** uuid
 * Simple, fast generation of RFC4122 UUIDS. (Universally Unique Identifier)
 * https://github.com/kelektiv/node-uuid */
const uuidv1 = require('uuid/v1');

/** ejs
 * EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.
 * http://ejs.co/#docs */
const ejs = require('ejs');



/*************************************************************
 * GLOBAL VARIABLES
 *************************************************************/
// Server IP
global.server_IP = 0;
// Server Port
global.port = 0;
// Server Startup Time
global.server_start_time = new Date().toString();
// Environment
global.ENV = '';
// Commit Branch
global.server_commit_branch = require('child_process')
    .execSync("git branch | grep \\* | cut -d ' ' -f2").toString().trim();
console.log('Branch == ' + server_commit_branch);
// Commit Hash
global.server_commit_sha = require('child_process')
    .execSync('git rev-parse HEAD').toString().trim();
// absolute path to views
global.views_path = path.join(__dirname + '/client/views/');
// Root Domain Name
global.ROOT_HOST = '';



// Get Command Line Input for Running Production Manually
process.argv.forEach(function (val, index, array) {
    // Production CMD
    if (val == 'production') {
        console.log('Command Line == Production');
        ENV = 'production';
        server_IP = '127.0.0.1';
        port = 8080;

        // If Set in Env
        if (process.env.IP)
            server_IP = process.env.IP;
        if (process.env.PORT)
            port = process.env.PORT;

        return;
    }
    // Development Command Line
    if (val == 'development') {
        console.log('Command Line == Development');
        ENV = 'development';
        server_IP = '127.0.0.1';
        port = 8080;

        return;
    }
});

if (!ENV) {
    // Production
    if (process.env.ENV == 'production') {
        console.log('ENV == production');
        ENV = 'production';
        server_IP = '127.0.0.1';
        port = 8080;
    }
    // Development - Development Server
    else if (process.env.ENV == 'development') {
        console.log('ENV == development');
        ENV = 'development';
        server_IP = '127.0.0.1';
        port = 8080;
    }
    // Localhost
    else if (!ENV) {
        console.log('ENV == local');
        ENV = 'local';
        port = 8080;
        // Set IP Address
        var ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function (ifname) {
            var alias = 0;

            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    return;
                }

                if (alias >= 1) {
                    // this single interface has multiple ipv4 addresses
                    console.log(ifname + ':' + alias, iface.address);
                    throw "Error: " +
                        "There are multiple IPV4 addresses. You must hard code the the IP address.";
                } else {
                    // this interface has only one ipv4 adress
                    console.log(ifname, iface.address);
                    // Setting IP
                    server_IP = iface.address;
                }
                ++alias;
            });
        });

        // If Set in Env
        if (process.env.IP)
            server_IP = process.env.IP;
        if (process.env.PORT)
            port = process.env.PORT;
    }
}





// Set Host Domain
if (ENV == 'local') {
    ROOT_HOST = 'http://localhost:8080';
}


/*************************************************************
 * CONNECT TO MONGODB
 *************************************************************/
var configDB = require('./server/database.js')(server_IP);
mongoose.connect(configDB.url);


/*************************************************************
 * DEFINE APP
 *************************************************************/
var app = express();

/*************************************************************
 * DEFINE SERVER
 *************************************************************/
var server = http.createServer(app);

// -----------------------------jkl;skladfsjkl;adfsljkl;dfsdfjklsjklfsjkl;adfsjkljkl
var io = socketio.listen(server);

/*************************************************************
 * USE MIDDLEWARE 
 *************************************************************/
app.use(express.static(path.resolve(__dirname, 'client')));

/* Use Cookie Parser */
app.use(cookie_parser());

/* Body Parser  */
app.use(body_parser.json());

/* Use Method Override  */
app.use(method_override());

// Cookie Expiration time
var hour = 3600000;
//              hour    day     week    month   year
var cookie_ttl = hour * 24 * 7 * 4 * 12;
// Define Session
app.use(
    session({
        secret: 'securedsession',
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: cookie_ttl
        },
        store: new connect_mongo({
            mongooseConnection: mongoose.connection,
            ttl: 14 * 24 * 60 * 60
        })
    })
);


/*************************************************************
 * Enable CORS (Cross-Origin Resource Sharing)
 * https://enable-cors.org/server_expressjs.html
 *************************************************************/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});

// set the view engine to ejs
app.set('view engine', 'ejs');

/*
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 ************************* MAIN ****************************
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
*/

/*************************************************************
 * GET SERVER CONFIG SETTINGS serverConfig.json
 *************************************************************/
var serverConfig = require('./serverConfig.json');
console.log('(serverConfig.json) ' + serverConfig.signup_email_domain_type);

/*************************************************************
 * GENERAL FUNCTIONS
 *************************************************************/
require('./server/generalFunctions.js');

/*************************************************************
 * SERVER LOGGING - (req))
 *************************************************************/
var serverLog = require('./server/server_log.js');

// Log All Requests
app.use((req, res, next) => {
    serverLog.log(req, {});
    return next();
});


/*************************************************************
 * MONGOOSE MODELS
 *************************************************************/
/* USER - From User */
var User = require('./server/models/user.js').User;


//==========================================================
/*************************************************************
 * DATABASE SCHEMA UPDATES
 *************************************************************/
var schema_update = require('./server/schema_update.js');
schema_update.updateUser();
//===========================================================


/*
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 *********************** URL ROUTES ************************
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
*/

/*************************************************************
 * URL ROUTES
 *************************************************************/
require('./server/routes.js')(
    app,
    path,
    io,
    fs,
    jf,
    User
);


/*************************************************************
 * Request Global
 *************************************************************/

// Final Redirect Catch All
app.all('/*', (req, res) => {

    res.redirect(ROOT_HOST);
});



/*
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
 ********************** START SERVER ***********************
 ///////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////
*/

// For Local Server Creation
if (ENV == 'local') {

    // http.createServer(app).listen(port, function () {
    //     console.log('\nSERVER RUNNING.... http://' + server_IP + ':' + port);
    // });

    server.listen(port, function () {
        console.log("Chat server listening at", server_IP + ":" + port);
    });
}
// END - server.js