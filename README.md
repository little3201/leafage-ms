<p align="center">
  <a href="https://console.leafage.top" target="_blank">
    <img alt="Leafage Logo" src="public/svg/logo.svg" width="200" height="200"/>
  </a>
</p>

<p align="center">
  <br>
  <a href="https://github.com/little3201/leafage-ms/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/little3201/leafage-ms.svg" alt="License">
  </a>
  <img alt="Quality Gate Status" src="https://sonarcloud.io/api/project_badges/measure?project=little3201_leafage-ms&metric=alert_status">
</p>

## 项目介绍

基于 RBAC（Role-Based Access Control） 模型的管理系统实践，逐步实现 RBAC0、RBAC1、RBAC2 及 RBAC3 的各项功能，目前集成了博文帖子的管理模块（[博客网站](https://www.leafage.top) 帖子、书籍的维护、访问统计、评论等）；

采用 MIT 开源协议，使用 vue3、vite.js 的基础框架构建，完成了前端上传图片至七牛云 OSS、xlsx.js 导出数据、chart.js 统计图表、i18n国际化（支持中文、English）等功能。

### 功能依赖

- [x] tailwindcss(plugins: typography、forms) —— css样式
- [x] chart.js —— 统计图表（类型：line、bar）
- [x] qiniu.js —— 前端上传文件
- [x] heroicons —— 图标库
- [x] mockjs —— 测试数据 mock
- [x] axios —— api请求
- [x] marked(plugins: marked-extended-tables) —— markdown 解析（插件：表格）
- [x] hightlight.js —— 代码高亮
- [x] xlsx.js —— excel解析
- [x] vue-i18n —— 国际化支持

**访问地址：**<a href="https://www.leafage.top">博客站点</a>&nbsp;&nbsp;<a href="https://console.leafage.top">RBAC管理系统</a>

## 更新

近期更新请查看[更新日志](CHANGELOG.md) 。

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

<a href="https://github.com/little3201/leafage-ms/blob/master/LICENSE">
  <h2>MIT</h2>
</a>
