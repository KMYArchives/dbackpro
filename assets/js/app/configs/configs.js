window.$ = window.jQuery = require('jquery')

const os = require('os'),
    _ = require('lodash'),
    open = require('open'),
    knex = require('knex'),
    path = require('path'),
    hasha = require('hasha'),
    fs = require('fs-extra'),
    mysql = require('mysql'),
	imgur = require('imgur'),
	crypt = require('crypto'),
    sqlite3 = require('sqlite3'),
    node_cron = require('node-cron'),
	si = require('systeminformation'),
	datetime = require('node-datetime'),
    html2canvas = require('html2canvas'),
    { electron, ipcRenderer, remote } = require('electron'),

    DB = knex({
        client: 'sqlite3',
        connection: {
            filename: 'dbackpro.db',
        },
    })
