const os = require('os'),
	xss = require('xss'),
	md5 = require('md5'),
	_ = require('lodash'),
	open = require('open'),
	knex = require('knex'),
	path = require('path'),
	hasha = require('hasha'),
	fs = require('fs-extra'),
	imgur = require('imgur'),
	mysql = require('mysql2'),
	crypt = require('crypto'),
	cache = require('js-cache'),
	cron = require('node-cron'),
	download = require('download'),
	readjson = require('readjson'),
	microdiff = require('microdiff'),
	mysqldump = require('mysqldump'),
	Store = require('electron-store'),
	si = require('systeminformation'),
	datetime = require('node-datetime'),
	html2canvas = require('html2canvas'),
	{ electron, ipcMain, ipcRenderer, remote } = require('electron')