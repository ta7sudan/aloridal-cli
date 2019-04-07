# ts-multicmd-template
Typescript multicmd template for dulu

* 启动, 启动守护进程后自己退出, 让守护进程后台运行
* 停止, 通知守护进程关闭worker
* 列出所有进程内存占用存活状况CPU占用
* 解析配置参数传递给守护进程



```shell
$ alo start --env production
$ alo start --config alo.production.js
$ NODE_ENV=dev alo start
$ alo start
$ alo stop
$ alo stop my-app
$ alo stop all
```

