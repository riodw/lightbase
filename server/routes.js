// routes.js
'use strict'


module.exports = function (
    app,
    path,
    User
) {

    /*************************************************************
     * SHOW MAIN PAGE
     *************************************************************/
    app.get('/', (req, res) => {

        res.render(views_path + 'index', {
            'ENV': ENV,
            'ROOT_HOST': ROOT_HOST, 
            'year': new Date().getFullYear(),
            'server_start_time': server_start_time,
            'server_current_time': new Date().toString()
        });
    });

    /*************************************************************
     * ENV
     *************************************************************/
    app.get('/ENV', (req, res) => {
        // Send Environment
        res.send(ENV);
    });


    /*************************************************************
     * LOAD HOME
     *************************************************************/
    app.get('/home', (req, res) => {

        // DANGER
        // res.redirect('/');
        // res.sendFile(views_path + 'app-' + ENV + '.html');
        res.render(views_path + 'app', {
            'ENV': ENV, 
            'ROOT_HOST': ROOT_HOST, 
            'year': new Date().getFullYear(),
            'server_commit_sha': server_commit_sha,
            'server_start_time': server_start_time,
            'server_current_time': new Date().toString()
        });
    });
    
};