[中文](README.md) | [English](README.en.md)
<p align="center">
	<img width="200px" height="200px" alt="logo" src="./resources/icon.png">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">Zoey Chat Client v1.0.0</h1>
<h4 align="center">Chat client based on Electron31+vite5+TypeScript5+vue3+pinia and other technologies</h4>
<p align="center">
	<a href="https://gitee.com/sxgan/zoey-chat-boot"><img src="https://img.shields.io/badge/Zoey Chat-v1.0.0-brightgreen.svg"></a>
	<a href="https://gitee.com/sxgan/zoey-chat-boot/raw/master/LICENSE"><img src="https://img.shields.io/badge/LICENSE-Apache License-red.svg"></a>
</p>
Continuously updated. . . @sxgan

All resources come from public resources on the Internet and are for learning only

## PLATFORM INTRODUCTION

## DEMONSTRATION DIAGRAM

![review_01.gif](public%2Fdiagram%2Freview_01.gif)

## PROJECT START INSTRUCTIONS

### INSTALL DEPENDENCIES

```sh
npm install
```

### START COMMAND

Note: dev uses the local environment, pro uses the online environment, and the pictures are in the cloud. Please use the pro environment to start. When the pro environment is started, the pictures will not be loaded.
But it works fine after using build. The reason may be related to local development. You can also add pictures to the local area by yourself. Be careful to modify the path.

```shell
npm run pro
```

### BUILD COMMAND

```shell
npm run build
```
Note: The initial startup loading will be slow. The packaged files are in the `dist-electron/release/` directory. The packaged version is usually stored in this directory.
Enter the corresponding installation execution file according to the version. Win-unpacked is a green version that requires no installation and can directly run the exe file. The same applies to other system environments.

### RESOLVE PROCESS RESIDUE AND RESTART QUICKLY

```shell
TASKKILL /F /IM electron.exe  | npm run dev
```

## PROJECT STRUCTURE DESCRIPTION

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
svg images can be placed directly into the `src/assets/images/common/svg` directory and will be automatically loaded into the svgplugin.vue page

## Installation of images and some package management tools

1、INSTALL CNPM TAOBAO IMAGE
```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org

npm install -g cnpm --registry=https://registry.npmmirror.com
```

2、SET NPM AS TAOBAO MIRROR

```shell
npm config set registry https://registry.npm.taobao.org

npm config set registry https://registry.npmmirror.com
```

3、VIEW CNPM MIRROR SETTINGS THROUGH NPM

```shell
npm config get registry
```

4、View cnpm image settings through cnpm: (equivalent to using cnpm)

```shell
cnpm config get registry
```

5、INSTALL YARN

```shell
npm install -g yarn --registry=https://registry.npmmirror.com
```

## BUILD ISSUES

Note: Use the `Terminal Administrator` window in `win+x` to prevent download failure due to permissions.

When using `npm run build`, the necessary github build package cannot be downloaded. At this time, we need to use yarn to build the downloaded package.
Generally it will be on the c drive, and it can be used permanently after building it once, so if you use npm to build it again, you will not download it again.
```shell
yarn run build
```

You can use `npm run build` later. The above command is just for convenience of downloading.
