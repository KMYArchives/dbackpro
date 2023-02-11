const {
	app, 
	Tray,
	Menu,
	ipcMain, 
	BrowserWindow
} = require('electron')

var mainWindow,
	homeWindow,
	splashWindow,
	customWindow

Window = (params) => {
	return new BrowserWindow({
		x: params.x || '',
		y: params.y || '',
		width: params.width,
		height: params.height,
		title: params.title || '',
		frame: params.frame || false,
		opacity: params.opacity || 1,
		modal: params.modal || false,
		parent: params.parent || null,
		center: params.center || true,
		movable: params.movable || true,
		minWidth: params.minWidth || '',
		maxWidth: params.minWidth || '',
		minHeight: params.minHeight || '',
		maxHeight: params.minHeight || '',
		closable : params.closable || true,
		hasShadow: params.hasShadow || true,
		focusable : params.focusable || true,
		resizable: params.resizable || false,
		show: params.show ? params.show : false,
		skipTaskbar: params.skipTaskbar || false,
		transparent: params.transparent || false,
		alwaysOnTop : params.alwaysOnTop || false,
		icon: params.icon || './assets/imgs/icon.png',
		backgroundColor: params.backgroundColor || '',
		fullscreenable: params.fullscreenable || false,
		useContentSize: params.useContentSize || false,
		autoHideMenuBar: params.autoHideMenuBar || true,

		webPreferences: {
			preload: params.preload || null,
			sandbox: params.sandbox || false,
			allowpoup: params.allowpoup || false,
			webSecurity: params.webSecurity || true,
			nodeIntegration: params.nodeIntegration || true,
			contextIsolation: params.contextIsolation || false,
			enableRemoteModule: params.enableRemoteModule || true,
			allowRunningInsecureContent: params.allowRunningInsecureContent || false,
		}
	})
}

createWindow = () => {
	mainWindow = Window({
		width: 1050,
		height: 700,
	})

	mainWindow.loadFile('pages/index.html')
	mainWindow.once('ready-to-show', e => {
		mainWindow.show()
		mainWindow.webContents.openDevTools()
	})

	mainWindow.removeMenu()
	mainWindow.setMenuBarVisibility(false)
	mainWindow.on('closed', e => mainWindow = null)
}

all_ipc_functions = () => {
	// Close splash screen and open main screen
	ipcMain.on('open-main', e => { createWindow() })
	ipcMain.on('close-splash', e => { splashWindow.close() })

	// Main window
	ipcMain.on('close-main', e => { mainWindow.close() })
	ipcMain.on('min-main', e => { mainWindow.minimize() })

	// Main window
	ipcMain.on('close-login', e => { loginWindow.close() })
	ipcMain.on('min-login', e => { loginWindow.minimize() })

	// Close custom window
	ipcMain.on('close-custom', e => { customWindow.close() })

	// Open devtool
	ipcMain.on('open-devtool', e => { mainWindow.webContents.openDevTools() })

	// Reload window
	ipcMain.on('force-reload', e => { mainWindow.webContents.reloadIgnoringCache() })
}

splashScreenWindow = () => {
	splashWindow = Window({
		width: 480,
		height: 360,
		show: false,
	})

	splashWindow.loadFile('pages/splash.html')
	splashWindow.once('ready-to-show', e => {
		splashWindow.show()
		//splashWindow.webContents.openDevTools()
	})

	splashWindow.removeMenu()
	splashWindow.setMenuBarVisibility(false)
	splashWindow.on('closed', e => splashWindow = null)
}

app.whenReady().then( e => {
	all_ipc_functions()
	splashScreenWindow()

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('open-screen', (event, params) => {
	// regex to check params.url is url
	if (params.parent) {
		params.modal = true

		switch (params.parent) {
			case 'main':
				params.parent = mainWindow
				break
			
			case 'login':
				params.parent = loginWindow
				break
	
			default:
				params.parent = mainWindow
				break
		}
	}

	customWindow = Window(params)
	if (params.url.match(/^(http|https):\/\/[^ "]+$/)) {
		customWindow.loadURL(params.url)
	} else {
		customWindow.loadFile(params.url)
	}

	customWindow.once('ready-to-show', e => {
		customWindow.show()
		customWindow.webContents.openDevTools()
	})

	customWindow.removeMenu()
	customWindow.setMenuBarVisibility(false)
	customWindow.on('closed', e => customWindow = null)
})