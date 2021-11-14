const {app, ipcMain, BrowserWindow} = require('electron')

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 702,
		show: false,
		resizable: false,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		}
	})

	mainWindow.loadFile('pages/index.html')
	mainWindow.once('ready-to-show', e => {
		mainWindow.show()
		mainWindow.webContents.openDevTools()
	})

	mainWindow.removeMenu()
	mainWindow.setMenuBarVisibility(false)
	mainWindow.on('closed', e => mainWindow = null )

	ipcMain.on('close', () => { mainWindow.close() })
	ipcMain.on('min', () => { mainWindow.minimize() })
}

app.whenReady().then( e => {
	createWindow()

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})