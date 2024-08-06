import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { onSigninSuccess, onWindowsCtrl } from './ipc.ts'
import { SigninSuccessData } from './ipc-types.ts'

const auth_win_width = 600
const auth_win_height = 520
const main_win_width = 1200
const main_win_height = 800
let authWindow = null
let mainWindow = null

function createAuthWindow(): void {
  // Create the browser window.
  authWindow = new BrowserWindow({
    icon: icon,
    title: 'Sign In',
    width: auth_win_width,
    height: auth_win_height,
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
  console.log(process.env['ELECTRON_RENDERER_URL'])
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    authWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    authWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createMainWindow(config: SigninSuccessData): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: icon,
    title: 'Main',
    width: main_win_width,
    height: main_win_height,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    resizable: false,
    frame: true,
    transparent: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + `#${config.url}`)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'), { url: config.url })
  }
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
  createAuthWindow()

  // Signin success
  onSigninSuccess((config: SigninSuccessData) => {
    console.log('create main win')
    console.log(config)
    // 关闭认证窗口打开主窗口
    authWindow.close()
    createMainWindow(config)
  })
  // Windows Ctrl
  onWindowsCtrl((ctrlStr: string) => {
    if (ctrlStr === 'close') {
      authWindow.close()
    } else if (ctrlStr === 'minimize') {
      authWindow.minimize()
    }
  })
  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createAuthWindow()
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
