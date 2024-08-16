import { ipcMain } from 'electron'
import { SigninSuccessData } from './ipc-types.ts'

/**
 * 监听登录成功事件
 * @param callback
 */
const onSigninSuccess = (callback): void => {
  ipcMain.on('signin-success', (e, config: SigninSuccessData): void => {
    callback(config)
  })
}
/**
 * 监听认证窗口控制事件
 * @param callback
 */
const onAuthWindowsCtrl = (callback): void => {
  ipcMain.on('auth-win-ctrl', (e, ctrlStr: string): void => {
    callback(ctrlStr)
  })
}

/**
 * 监听主窗口控制事件(min、max、unmax、close)
 * @param callback
 */
const onMainWindowsCtrl = (callback: Function): void => {
  ipcMain.on('main-win-ctrl', (e, ctrlStr: string): void => {
    callback(ctrlStr)
  })
}

const onTestMsg = (callback: Function): any => {
  ipcMain.handle('test-msg', (e, ctrlStr: string): void => {
    return callback(e, ctrlStr)
  })
}
export {
  onSigninSuccess,
  onAuthWindowsCtrl,
  onMainWindowsCtrl,
  onTestMsg
}
