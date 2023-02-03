const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const apiHandle = require('./api');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  ipcMain.handle('ping2', () => 'pong2s')
  ipcMain.handle('api', apiHandle)

  // win.loadFile('http://localhost:1420/')
  win.loadURL('http://localhost:1420/');
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});