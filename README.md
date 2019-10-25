# Rs-Cli@1.0.2

全称：react staging cli

用于自动生成基于 react 和 umiJs 的前端 H5 脚手架；

## 环境依赖

* node.js：LTS 即可，链接地址：https://nodejs.org/en/ ；
* npm：随着 node 的安装被自动装入，与 node 版本相对应，也可自行安装；
* yarn：新一代依赖管理工具，https://yarn.bootcss.com/ 。

## 安装

在你的终端中，输入下述命令：
### npm

```
npm install @siyuan0215/rs-cli -g
```

### yarn

```
yarn global add @siyuan0215/rs-cli
```

## 使用

在你的开发目录下，执行下述命令：

```bash
# projectName is variable
rs-cli <projectName>
```

其中， projectName 是想要创建的项目的名称；

该命令会自动创建 projectName 文件夹，并生成相应的脚手架结构，并自动执行 npm install 安装所需依赖包。
