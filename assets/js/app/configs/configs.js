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
	download = require('download'),
	readjson = require('readjson'),
	microdiff = require('microdiff'),
	node_cron = require('node-cron'),
	Store = require('electron-store'),
	si = require('systeminformation'),
	datetime = require('node-datetime'),
	html2canvas = require('html2canvas'),
	{ electron, ipcMain, ipcRenderer, remote } = require('electron')