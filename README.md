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

一个使用 Vue3、Tailwindcss 的 CMS 网站管理系统，包含帖子管理、作品资料管理、权限管理。网站建立之初为了实现一套可用的、通用的权限管理解决方案，因为在工作中几乎每个公司甚至每个项目都离不开一套权限管理的实现，然而这些年经历的都是凑活能用的一些权限管理方案。同时为了作为博客网站的帖子管理系统。

之前看到过一些比较好的方案的讲解说明，但是没有一个好看的、好用的开源的项目，大都是基于antd或者element-ui的模版提供的，都还没有成型，仅仅学习可以，或者很简单的权限也能凑活用，没有更加细粒度的权限管理，所以就自己试着来将想法落地实现，并开源供以后借鉴或者使用。

### 功能依赖

- [x] @nuxt/sitemap —— 自生成sitemap
- [x] @nuxt/image —— 图片加载优化
- [x] @tailwindcss/typography —— 排版优化
- [x] @tailwindcss/aspect-ratio —— 图片排版优化
- [x] markdown-it/hightlight.js —— markdown解析，代码高亮

**访问地址：**<a href="https://www.leafage.top">博客站点</a>&nbsp;&nbsp;<a href="https://console.leafage.top">后台管理系统</a>

### 更新

项目创建与 2019-11-08 历经好几次改版，从最初的html+css到vue2+iview(viewui)/element-ui/vuetify再到vue3+tailwindcss，虽然过程很折腾，但是也明白和体会了很多，对于一些技术点理接更深了，近期更新请查看[更新日志](CHANGELOG.md) 。

如果你遇到了 [FAQ文档](FAQ.md) 中没有出现的问题，并且已经解决了，欢迎联系我进行修改。

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
