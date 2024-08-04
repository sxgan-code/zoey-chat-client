import { resolve } from 'path'
import { defineConfig, defineViteConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { loadEnv } from 'vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: defineViteConfig(({ command, mode }) => {
    const ENV_DIR = resolve('src/renderer/env')
    // 启动时根据 command 和 mode 加载 env 内容，全局生效
    const env = loadEnv(mode, ENV_DIR, '')
    // const isServe = command === "serve";
    // const isBuild = command === "build";
    // 启动时打印 key 的内容
    console.log('当前环境为:' + command)
    console.log('当前环境变量VITE_APP_NAME:' + env.VITE_APP_NAME)
    console.log('当前环境变量VITE_ENV_URL:' + env.VITE_ENV_URL)
    console.log('当前环境变量VUE_APP_PROXY_URL:' + env.VUE_APP_PROXY_URL)
    return {
      envDir: ENV_DIR,
      resolve: {
        alias: {
          '@': resolve('src/renderer/src')
        }
      },
      plugins: [
        vue(),
        createSvgIconsPlugin({
          // 指定需要缓存的图标文件夹
          iconDirs: [resolve('src/renderer/src/assets/svg')],
          // 指定symbolId格式
          symbolId: 'icon-[dir]-[name]',

          /**
           * 自定义插入位置
           * @default: body-last
           */
          inject: 'body-last',

          /**
           * custom dom id
           * @default: __svg__icons__dom__
           */
          customDomId: '__svg__icons__dom__',
          // 移除填充
          svgoOptions: {
            plugins: [
              {
                name: 'removeAttrs',
                params: {
                  attrs: 'fill'
                }
              }
            ]
          }
        })
      ],
      server: {
        port: 9999,
        host: 'localhost',
        proxy: {
          '/local': {
            target: 'http://localhost:9999/src/assets/images',
            changeOrigin: true, // 表示开启代理, 允许跨域请求数据
            secure: false, // 如果是https接口，需要配置这个参数
            rewrite: (path) => path.replace(/^\/local/, '')
          },
          '/dev': {
            target: env.VUE_APP_PROXY_URL,
            changeOrigin: true, // 表示开启代理, 允许跨域请求数据
            secure: false, // 如果是https接口，需要配置这个参数
            rewrite: (path) => path.replace(/^\/dev/, '')
          }
        }
      }
    }
  })
})
