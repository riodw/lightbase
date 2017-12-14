// server.log.js
'use strict';


/*************************************************************
 * IMPORT MODULES
 *************************************************************/
// File System
const fs = require('fs');

// Operating System
const os = require('os');

// Path
const path = require('path');


/*************************************************************
 * CONSTANTS
 *************************************************************/
var logs_path = path.join(__dirname + '/../server/logs/');

var logFileBase = 'serverlog-';


/*************************************************************
 * MODULE FUNCTIONS
 *************************************************************/
function serverLog() {
    return 0;
}

// Current Version
function version() {
    return 'version 1.0.0';
}

function getServerLog(req, res) {
    // res.setHeader('Content-disposition', 'attachment; filename=' + logFileName);
    // res.set('Content-Type', 'text/csv');

    // logFileName += '.csv';

    // var logFile = logs_path + logFileName;

    // // res.redirect('/');
    // res.sendFile(views_path + 'logs.html');
}

function log(req, other, callback) {
    var CSV = '';

    // Method - GET, POST
    var req_method = '';
    // HOST - 10.1.1.155:8080
    var req_host = '';
    // URL - /signup
    var req_path = '';
    // IP ADDRESS - (10.1.1.155
    var req_ip = '';
    // User Browser Agent - (59c2a8698862ec024b27e45e)
    var req_agent = '';
    // Modified Since
    var req_modified_since = '';
    // Local Port
    var req_local_port = '';
    // Remote Port
    var req_remote_port = '';



    // Method - GET, POST
    if (req && req.method) {
        req_method = String(req.method);
        req_method = req_method.replace(/"/g, '');
    }


    // HOST - 10.1.1.155:8080
    if (req && req.headers && req.headers.host) {
        req_host = String(req.headers.host);
        if (req_host.includes(':')) {
            req_host = req_host.split(':');
            req_host = req_host[0];
        }
        req_host = req_host.replace(/"/g, '');
    }


    // URL - /signup
    if (req && req.url) {
        req_path = String(req.url);
        req_path = req_path.replace(/"/g, '');
    }


    // IP ADDRESS - (10.1.1.155)
    if (req && req.connection && req.connection.remoteAddress) {
        req_ip = String(req.connection.remoteAddress);

        if (req_ip.includes(':')) {
            req_ip = req_ip.split(':');
            req_ip = req_ip[req_ip.length - 1];
        }
        req_ip = req_ip.replace(/"/g, '');
    }


    // User Browser Agent - (59c2a8698862ec024b27e45e)
    if (req && req.headers && req.headers['user-agent']) {
        req_agent = String(req.headers['user-agent']);
        req_agent = req_agent.replace(/"/g, '');
    }


    // Modified Since
    if (req && req.headers && req.headers['if-modified-since']) {
        req_modified_since = String(req.headers['if-modified-since']);
        req_modified_since = req_modified_since.replace(/"/g, '');
    }


    // Local Port
    if (req && req.socket && req.socket.localPort) {
        req_local_port = String(req.socket.localPort);
        req_local_port = req_local_port.replace(/"/g, '');
    }


    // Remote Port
    if (req && req.socket && req.socket.remotePort) {
        req_remote_port = String(req.socket.remotePort);
        req_remote_port = req_remote_port.replace(/"/g, '');
    }


    var date = new Date();
    var utcDate = date.toUTCString();
    var unixTime = Math.floor(date.getTime() / 1000);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var day = date.getUTCDate();
    var hour = date.getUTCHours();
    var minute = date.getUTCMinutes();
    var second = date.getUTCSeconds();


    // var writeFile = String('server/CSVs/csvImport_' + newdate + '.csv');
    // // Log Import FILE
    // var wstream = fs.createWriteStream(writeFile);

    // Make CSV String
    CSV += '"' + unixTime + '",';

    // Time - Date
    CSV += '"' + utcDate + '",';
    CSV += '"' + year + '",';
    CSV += '"' + month + '",';
    CSV += '"' + day + '",';
    CSV += '"' + hour + '",';
    CSV += '"' + minute + '",';
    CSV += '"' + second + '",';

    // Request
    CSV += '"' + req_method + '",';
    CSV += '"' + req_host + '",';
    CSV += '"' + req_local_port + '",';
    CSV += '"' + req_remote_port + '",';
    CSV += '"' + req_path + '",';
    CSV += '"' + req_ip + '",';
    CSV += '"' + req_agent + '",';
    CSV += '"' + req_modified_since + '"';
    CSV += '\n';

    if (true || ENV != 'production') {
        console.log(req_method + '\t' + '\t' + req_host + ':' + req_local_port + req_path);
    }

    var d = new Date();
    var logFileName = logFileBase + ENV;
    logFileName += '-(';
    logFileName += d.toISOString().substring(0, 10);
    logFileName += ')';
    logFileName += '.csv';


    var logFile = logs_path + logFileName;

    // fs.appendFileSync(logFile, CSV);

    // Finish
    if (callback && typeof callback == 'function') {
        return callback();
    }
    else {
        return;
    }

}

/*************************************************************
 * LINK FUNCTIONS
 *************************************************************/
serverLog.log = log;
// 
serverLog.getServerLog = getServerLog;

module.exports = serverLog;
// END - server_logs.js