# @siyuan0215/rs-cli

一键生成基于 React 和 UmiJS 的前端管理控制台单页面应用脚手架；

## 环境依赖

主要依赖 `Node@16` 版本；

如果你想要了解更多关于 npm 和 yarn 方面的知识，请点击「[npm 传送门](https://www.npmjs.com/)」或「[yarn 传送门](https://yarn.bootcss.com/)」。

## 安装说明

在你的终端输入如下命令：

```
# 若当前使用 Npm 进行包管理
npm install @siyuan0215/rs-cli -g

# 若当前使用 Yarn 进行包管理
yarn global add @siyuan0215/rs-cli
```

需要注意的是，不论使用哪种包管理工具，请以全局模式（`-g / global`）进行安装，以便于将 `rs-cli` 注入到系统路径随时使用。

## 使用说明

执行如下命令：

```bash
rs-cli <projectName> [options]
```

自动在当前执行命令的目录创建 `<projectName>` 文件夹，下载脚手架项目并自动安装依赖。

## Options 说明

| 参数                   | 必须 | 说明                                                                    |
| :--------------------- | :--: | :---------------------------------------------------------------------- |
| `-V, --version`        |  否  | 显示当前 rs-cli 的版本                                                  |
| `-H, --help`           |  否  | 查看帮助                                                                |
| `-C, --cache`          |  否  | 安装项目依赖时，使用缓存，默认 `false`                                  |
| `-F, --force`          |  否  | 如果 `projectName` 文件加已存在，会强制清空文件夹内的内容，默认 `false` |
| `-R, --registry <url>` |  否  | 指定安装项目依赖的源存                                                  |
| `-T, --taobao`         |  否  | 指定淘宝源为安装依赖的源存，默认 `false`                                |
| `-Y, --with-yarn`      |  否  | 使用 `yarn` 包管理器进行依赖安装，默认使用 npm 安装                     |
