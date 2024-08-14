import { app, BrowserWindow, ipcMain, screen, shell } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { onAuthWindowsCtrl, onMainWindowsCtrl, onSigninSuccess } from './ipc.ts'
import { SigninSuccessData } from './ipc-types.ts'
import db from './sqlite.ts'

const auth_win_width = 600
const auth_win_height = 520
const main_win_width = 1050
const main_win_height = 750
let authWindow = null
let mainWindow = null

function createAuthWindow(): void {
  const width = screen.getPrimaryDisplay().workAreaSize.width
  const height = screen.getPrimaryDisplay().workAreaSize.height
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
      sandbox: false,
      //关闭web权限检查，允许跨域
      webSecurity: false
    }
  })

  authWindow.on('ready-to-show', () => {
    authWindow.show()
  })

  authWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // Windows Ctrl
  onAuthWindowsCtrl((ctrlStr: string) => {
    if (ctrlStr === 'close') {
      authWindow.close()
    } else if (ctrlStr === 'minimize') {
      authWindow.minimize()
    }
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  console.log(process.env['ELECTRON_RENDERER_URL'])
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    authWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    authWindow.webContents.openDevTools({ mode: 'detach' })
    authWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createMainWindow(config: SigninSuccessData): void {
  // 获取桌面大小
  let width: number = screen.getPrimaryDisplay().workAreaSize.width
  let height: number = screen.getPrimaryDisplay().workAreaSize.height
  width = width > 1750 ? 1750 * 0.6 : width * 0.6
  height = height > 1000 ? 1000 * 0.75 : height * 0.75
  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: icon,
    title: 'Main',
    resizable: true,
    width: width,
    height: height,
    maximizable: true,
    minWidth: width,
    minHeight: height,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    frame: true,
    transparent: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      //关闭web权限检查，允许跨域
      // webSecurity: false
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
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: config.url })
  }

  onMainWindowsCtrl((ctrlStr) => {
    if (ctrlStr == 'close') {
      mainWindow.close()
    } else if (ctrlStr == 'min') {
      mainWindow.minimize()
    } else if (ctrlStr == 'max') {
      mainWindow.maximize()
    } else if (ctrlStr == 'unmax') {
      mainWindow.unmaximize()
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


  createAuthWindow()

  // Signin success
  onSigninSuccess((config: SigninSuccessData) => {
    console.log('create main win')
    console.log(config)
    // 关闭认证窗口打开主窗口
    authWindow.close()
    db.each('SELECT * FROM test', (err, row) => {
      if (err) {
        console.error(err.message)
      }
      console.log(row)
    })
    createMainWindow(config)
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
