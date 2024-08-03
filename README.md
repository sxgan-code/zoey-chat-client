[中文](README.md) | [English](README.en.md)
<p align="center">
	<img width="200px" height="200px" alt="logo" src="">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">Zoey Chat Client v1.0.0</h1>
<h4 align="center">基于Electron31+vite5+TypeScript5+vue3+pinia等技术实现的聊天客户端</h4>
<p align="center">
	<a href="https://gitee.com/sxgan/zoey-music-boot"><img src="https://img.shields.io/badge/Zoey Music-v1.0.0-brightgreen.svg"></a>
	<a href="https://gitee.com/sxgan/zoey-music-boot/raw/master/LICENSE"><img src="https://img.shields.io/badge/LICENSE-Apache License-red.svg"></a>
</p>
持续更新中。。。@sxgan

所有资源来源于网络公开资源，仅供学习

## 平台简介

## 演示图

![review_01.gif](public%2Fdiagram%2Freview_01.gif)

## 项目启动说明
### 安装依赖

```sh
npm install
```
### 启动命令
注意：dev使用的为本地环境，pro为线上环境，图片采用云端，请使用pro环境启动，pro环境启动会存在图片无法加载，
但使用build构建后正常， 原因可能和本地开发有关，也可自行添加图片到本地，注意修改路径
```shell
npm run pro
```
### 构建命令
```shell
npm run build
```
注意：初次启动加载会较慢，打包后的文件在`dist-electron/release/`目录下，该目录下一般会存打包版本，
根据版本进入对应的安装执行文件，win-unpacked为绿色版免安装，可直接运行exe文件，其他系统环境同理

### 解决进程残留并快速重启
```shell
TASKKILL /F /IM electron.exe  | npm run dev
```

## 项目结构说明
```text
+ ├─┬ electron
+ │ ├── electron-env.d.ts             # Electron 变量声明文件
+ │ ├── main.ts                       # Electron Main文件
+ │ ├── ipcMain.ts                    # Electron ipcMain文件，用于IPC通信
+ │ └── preload.ts                    # Electron 预加载脚本
+ │ └── env                           # vite 环境变量文件夹
+ │ └── other                         # vite 其他配置文件夹,自动导入等
+ │ └── public                        # Electron 静态资源文件夹
  ├─┬ src
  │ └── main.ts                       # vue 入口ts文件
  │ └── App.vue                       # Vue 单页面，用于挂载到index.html
  │ └── vite-env.d.ts                 # vite 变量声明文件
  │ └─┬ assets
  │   └── css                         # vue 公共css文件夹
  │   └── fonts                       # vue 字体文件夹
  │   └── iconfonts                   # vue 字体图标文件夹
  │   └── images                      # vue 图片文件夹
  │ └── components                    # vue 组件-用于view目录的单页面组件
  │ └── router
  │ │   └── index.ts                  # vue-router 配置文件
  │ └── store                         # 存放pinia store文件目录
  │ └── hooks                         # 存放 hook 公共封装方法
  │ └── utils
  │ │   └── CommonUtils.ts            # vue 公共ts文件-通用方法
  │ │   └── http.ts                   # axios http配置文件
  │ └── views                         # 存放vue单页面
  ├── index.html
  ├── electron-builder.json5          # electron 构建配置文件
  ├── tsconfig.json                   # TypeScript 配置文件
  ├── tsconfig.node.json
  ├── package.json                    # 依赖
  └── vite.config.ts                  # vite 配置文件
```
svg图片可直接放入`src/assets/images/common/svg`目录下，将自动加载到svgplugin.vue页面
## 镜像及部分包管理工具安装

1、安装 cnpm 淘宝镜像：
```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org

npm install -g cnpm --registry=https://registry.npmmirror.com
```
2、将npm设置为淘宝镜像：
```shell
npm config set registry https://registry.npm.taobao.org

npm config set registry https://registry.npmmirror.com
```
3、通过npm查看cnpm镜像设置：
```shell
npm config get registry
```
4、通过cnpm查看cnpm镜像设置：(相当于使用cnpm)
```shell
cnpm config get registry
```
5、安装yarn
```shell
npm install -g yarn --registry=https://registry.npmmirror.com
```

## 构建问题
注意：使用`win+x`中的`终端管理员`窗口执行，防止权限原因下载失败

使用`npm run build` 时无法下载github必要构建包，此时我们需要使用yarn来构建下载，下载后的包
一般会在c盘，构建一次即可永久使用，所以再使用npm构建是就不会再去下载了
```shell
yarn run build
```
后续使用`npm run build`即可，上述命令只是为了方便下载
