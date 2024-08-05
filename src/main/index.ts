import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { onSigninSuccess, onWindowsCtrl } from './ipc.ts'
import { SigninSuccessData } from './ipc-types.ts'

const signin_width = 600
const signin_height = 520
let authWindow = null
function createWindow(): void {
  // Create the browser window.
  authWindow = new BrowserWindow({
    icon: icon,
    title: 'Sign In',
    width: signin_width,
    height: signin_height,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    resizable: false,
    frame: true,
    transparent: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  authWindow.on('ready-to-show', () => {
    authWindow.show()
  })

  authWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    authWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    authWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Signin success
  onSigninSuccess((config: SigninSuccessData) => {
    authWindow.setResizable(true)
    authWindow.setSize(config.width, config.height, true)
    authWindow.center()
    authWindow.setResizable(true)
    authWindow.setMaximumSize(1200, 800)
  })
  // Windows Ctrl
  onWindowsCtrl((ctrlStr: string) => {
    if (ctrlStr === 'close') {
      authWindow.close()
    } else if (ctrlStr === 'minimize') {
      authWindow.minimize()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
