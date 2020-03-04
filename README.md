# RS-CLI

自动生成基于 react 和 umiJs 的前端控制台类单页面应用脚手架；

## 一、环境依赖

本 `CLI` 主要依赖以下环境：
* `Node.js`：长期稳定支持版本（LTS） 即可，点击「[传送门](https://nodejs.org/en/ )」进行安装；
* `Npm` 或 `Yarn` ，包管理工具，其中 `Node.js` 会自带安装 `Npm`，但是鉴于 `Npm` 对于依赖包的下载时好时坏（需要翻墙），推荐使用 `Yarn`；

如果你想要了解更多关于 Npm 和 Yarn 方面的知识，请点击「[传送门 - Npm](https://www.npmjs.com/)」或「[传送门 - Yarn](https://yarn.bootcss.com/)」。

## 二、安装说明

确保当前的开发环境已经安装了上述的依赖后，在你的终端中输入如下命令：

```
# 若当前使用 Npm 进行包管理
npm install @siyuan0215/rs-cli -g

# 若当前使用 Yarn 进行包管理
yarn global add @siyuan0215/rs-cli
```

需要注意的是，不论使用哪种包管理工具，请以全局模式（`-g / global`）进行安装，以便于将 `rs-cli` 注入到系统环境随时使用。

## 三、使用说明

本 `CLI` 会自动在当前目录创建 `projectName` 文件夹，下载脚手架项目并自动完成所需依赖包的安装。

**请注意，确保你传入的 `projectName` 参数对应的文件夹内不会有你的重要的数据。**

具体执行命令如下：

```bash
# projectName is variable
rs-cli <projectName> [options]
```
其中：
*  `projectName` ：想要创建的项目的名称；
*  `options` ：命令执行时传入的参数；

## 四、参数说明

| 完成 | 参数 | 必须 | 说明 |
| :--: | :----: | :--: | :---- |
|- [x]|`-y, --with-yarn`|否|安装依赖时，使用 `yarn` 包管理器进行安装|
|- [x]|`-c, --cache`|否|安装依赖时，禁止清除缓存|
|- [ ]|`-r, --react-native`|否|构建 `react-native` 工程（feature，未上线）|
