const os = require('os'),
	xss = require('xss'),
	md5 = require('md5'),
	_ = require('lodash'),
	ba64 = require('ba64'),
	open = require('open'),
	knex = require('knex'),
	path = require('path'),
	Zip = require('adm-zip'),
	axios = require('axios'),
	hasha = require('hasha'),
	fs = require('fs-extra'),
	imgur = require('imgur'),
	shell = require('shell'),
	mysql = require('mysql'),
	crypt = require('crypto'),
	mysql2 = require('mysql2'),
	zxcvbn = require('zxcvbn'),
	cache = require('js-cache'),
	cron = require('node-cron'),
	archiver = require('archiver'),
	download = require('download'),
	readjson = require('readjson'),
	unzipper = require('unzipper'),
	microdiff = require('microdiff'),
	mysqldump = require('mysqldump'),
	Store = require('electron-store'),
	si = require('systeminformation'),
	MysqlTools = require('mysql-tools'),
	datetime = require('node-datetime'),
	{ Howl, Howler } = require('howler'),
	html2canvas = require('html2canvas'),
	dialog = require('node-file-dialog'),
	{ ipcMain, ipcRenderer } = require('electron')