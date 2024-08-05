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
 * 监听窗口控制事件
 * @param callback
 */
const onWindowsCtrl = (callback): void => {
  ipcMain.on('win-ctrl', (e, ctrlStr: string): void => {
    callback(ctrlStr)
  })
}
export { onSigninSuccess, onWindowsCtrl }
