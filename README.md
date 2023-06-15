# @siyuan0215/rs-cli

一键生成基于 React 和 UmiJS 的前端管理控制台单页面应用脚手架；

## 环境依赖

主要依赖 `Node@16` 版本；

> 未来有可能支持 16 以上版本，目前暂无计划。

如果你想要了解更多关于 npm 和 yarn 方面的知识，请点击「[npm 传送门](https://www.npmjs.com/)」或「[yarn 传送门](https://yarn.bootcss.com/)」。

## 安装

在终端中输入如下命令：

```
# 若当前使用 Npm 进行包管理
npm install @siyuan0215/rs-cli -g

# 若当前使用 Yarn 进行包管理
yarn global add @siyuan0215/rs-cli
```

🌈 最佳实践：不论使用哪种包管理工具，请以全局模式（`-g / global`）进行安装，以便于将 `rs-cli` 注入到系统路径随时使用。

## 使用

执行如下命令：

```bash
rs-cli create <project-name> [options]
```

自动在当前执行命令的目录创建 `<project-name>` 文件夹，下载脚手架项目并自动安装依赖。

> 目前 cli 仅支持创建项目。

## Commands 说明

| Commands                  | 说明                                                                    |
| :---------------------|:---------------------------------------------------------------------- |
| `rs-cli create <project-name> [options]`         | 创建名字为 `<project-name>` 的项目                        |


### `create` options


| 参数                   | 必须 | 说明                                                                    |
| :--------------------- | :--: | :---------------------------------------------------------------------- |
| `-C, --cache`          |  否  | 安装项目依赖时，使用缓存，默认 `false`                                  |
| `-F, --force`          |  否  | 如果 `projectName` 文件加已存在，会强制清空文件夹内的内容，默认 `false` |
| `-R, --registry <url>` |  否  | 指定安装项目依赖的源存                                                  |
| `-T, --taobao`         |  否  | 指定淘宝源为安装依赖的源存，默认 `false`                                |
| `-Y, --with-yarn`      |  否  | 使用 `yarn` 包管理器进行依赖安装，默认使用 npm 安装                     |
| `-H, --help`           |  否  | 帮助查看 `create 的 options`                                                                |
