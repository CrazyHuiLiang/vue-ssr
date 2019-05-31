# vue-ssr-learn

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# ssr构建配置

1. 创建vue项目
2. 通过webpack打包生成两份bundle文件，client & server
3. 安装vue-server-render, lodash.merge, webpack-node-externals, cross-env, koa, koa-static
4. 创建server.js,使用koa来处理网络请求，集成ssr
5. 新建entry-client.js用来挂载main.js创建的vue对象, entry-server.js用来使用main.js创建的对象生成
6. 新建main.js用来导出创建vue的工厂方法
7. 创建vue.config.js用来覆盖webpack的配置，将entry指定为entry-client.js/entry-server.js
8. 集成server.js

9. 创建ssr-dev，使用webpack watch，使用koa进行请求处理