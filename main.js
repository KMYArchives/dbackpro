const {
	app, 
	ipcMain, 
	BrowserWindow
} = require('electron')
const path = require('path')

const icon_app = './assets/imgs/icon.png'

createWindow = () => {
	var mainWindow = new BrowserWindow({
		width: 1050,
		height: 700,
		show: false,
		frame: false,
		icon: icon_app,
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

	ipcMain.on('close', e => { mainWindow.close() })
	ipcMain.on('min', e => { mainWindow.minimize() })
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