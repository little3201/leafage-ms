<p align="center">
  <a href="https://console.leafage.top" target="_blank">
    <img alt="Leafage Logo" width="200" src="public/svg/logo.svg">
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

一个使用 Vue3、Tailwindcss，基于 vite.js 构建的后台管理系统，用于基础 CMS 系统（[博客网站](https://www.leafage.top) 帖子、书籍的维护、访问统计、评论等），且提供完善的基础数据管理功能（基于 RBAC 完整的权限认证、数据授权），本项目将持续完善。

### 功能依赖

- [x] tailwindcss(plugins: typography、forms) —— css样式
- [x] chart.js —— 图表
- [x] qiniu.js —— 前端实现上传文件
- [x] feather-icons —— 图标
- [x] mockjs —— 数据 mock
- [x] axios —— api请求
- [x] marked(plugins: marked-extended-tables) —— markdown 解析（插件：表格）
- [x] hightlight.js —— 代码高亮
- [x] xlsx.js —— excel解析

**访问地址：**<a href="https://www.leafage.top">博客站点</a>&nbsp;&nbsp;<a href="https://console.leafage.top">后台管理系统</a>

### 更新

项目创建与 2019-11-08 历经好几次改版，从最初的 html+css 到 vue2+iview(viewui)/element-ui/vuetify 再到 vue3+tailwindcss，虽然过程很折腾，但是也明白和体会了很多，对于一些技术点理解更深了，近期更新请查看[更新日志](CHANGELOG.md) 。

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
