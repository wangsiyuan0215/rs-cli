shorthand for `react staging cli`；

用于自动生成基于 react 和 umiJs 的前端 H5 脚手架；

## 环境依赖

* node.js：LTS 即可，链接地址：https://nodejs.org/en/ ；
* npm：随着 node 的安装被自动装入，与 node 版本相对应，也可自行安装；
* yarn：新一代依赖管理工具，https://yarn.bootcss.com/ （与 npm 二选一）。

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
rs-cli <projectName> [options]
```

其中， `projectName` 是想要创建的项目的名称, `options` 为命令执行时的选项，该命令会自动创建 `projectName` 文件夹，并生成相应的脚手架结构，并自动安装所需依赖包。

## 选项（optional)

* `-y, --with-yarn`: 在安装依赖时，使用 `yarn` 进行安装；

* `-r, --react-native`：构建 `react-native` 工程（feature，未上线）；

* `-c, --cache`：安装依赖时，禁止使用清除缓存功能；
