# aloridal-cli
A multi-command CLI template for dulu





#### 基本目录结构

-- .vscode

​	-- launch.json 配置好各个子命令调试, 添加 attach 进程调试

-- bin

​	-- index.js 可执行文件, 命令入口

-- docs

​	-- USAGE.md markdown 的命令用法说明

-- man

​	-- doc.1 man 手册的说明, 通常你写的也就是用户命令, 1 就行了

-- src

-- test 测试代码

-- .eslintignore

-- .eslint.js

-- .gitignore

-- .jsinspectrc

-- .prettierrc.js

-- LICENSE

-- package.json

-- README.md

-- .npmrc 可选, 对于用到了 puppeteer, electron 之类的, 加一个配好国内下载地址

-- .npmignore 可选, 通常用 package.json 的 `files` 字段足够

-- .env 可选, 如果开发时需要用到很多环境变量的话

-- .travis.yml/circle.yml 可选, 如果有用到 CI 的话

-- .github 可选, 如果需要 issue 模板, contributing 模板或 pull request 模板的话, 参考 https://github.com/facebook/create-react-app, https://github.com/vuejs/vue-cli, https://github.com/eggjs/egg-core, https://github.com/oclif/oclif 等

-- CHANGELOG.md 可选, 更新说明, 参考 https://github.com/facebook/create-react-app, https://github.com/vuejs/vue-cli, https://github.com/mzabriskie/react-draggable, https://github.com/oclif/oclif, https://github.com/saojs/sao 等

-- types 可选, 如果还支持可编程的 API 的话, 考虑加入



#### package.json

-- `name`

-- `version`

-- `description`

-- `main` 可选, 如果支持可编程 API 的话, 指向 src/index.js

-- `bin`

-- `man`

-- `engines`

-- `scripts` 参考 npm hook

-- `repository`

-- `keywords`

-- `author`

-- `license`

-- `bugs`

-- `homepage`

-- `files`

-- `lint-staged` 有些项目喜欢直接格式化然后 git add, 个人觉得只 lint 就好, prettier 格式化可能和 eslint 的配置不一致, 关键是有些配置还没法配成一致的

-- `husky` 配置 pre-commit 和 pre-push 就好, 参考 git hook

-- `types`/`typings`

-- `contributors` 可选, 如果是多人协作的话

-- `directories` 可选, 没什么卵用, 装逼需要

-- `os` 你不是大佬, 用不到的

-- `cpu` 你不是大佬, 用不到的



#### NPM Hook

个人喜欢配置一个 lint 做 eslint 检查, 一个 format 做 prettier 格式化, 一个 inspect 做 jsinspect 代码重复检查, test 如果有测试就加个, prepare 用来跑测试, prepare 和 prepublishOnly 都会在 `npm publish` 前触发, 但是 prepare 还会在 `npm pack` 的时候触发, 所以个人倾向于用 prepare, 方便验证整个发布流程. 如果有 jsdoc 或其他文档生成工具的话, 也可以加个 docs 吧. 如果有什么 CI 相关的也可以再加个 ci.



#### Git Hook

平时常用的就是 pre-commit 跑 eslint, pre-push 跑 test.

