<p align="center">
  <a href="https://console.leafage.top" target="_blank">
    <img alt="Leafage Logo" width="200" src="src/assets/logo.svg">
  </a>
</p>

## 更新记录
2021-06-21:
  1. 移除sweetalert;
  2. 使用vue3新特性，script setup替换历史代码；

2021-06-16:
  1. 修改打包后部分图标不显示的问题;
  2. 优化路由激活样式；

2021-05-29:
  1. 重构各数据列表页，完全采用setup方式;
  2. 用户操作添加设置分组和角色按钮；
  3. 其他细节优化；

2021-05-24:
  1. 统计接口完成，浏览量，周访问统计图标;
  2. 标签输入框完成；

2021-05-15:
  1. Model.vue重构，Confirm.vue, Tree.vue复用Model组件，同步更新使用;
  2. 动态渲染菜单，权限树；

2021-05-12:  
  1. 需要认证的路由添加元信息；
  2. 路由守卫进行元信息的判断；

2021-05-11:  
  1. 添加Settings.vue, Profile.vue, Secret.vue；

2021-05-06:  
  1. 固定layout大小，内部table滚动；

2021-04-30:  
  1. bugfix: 修改分页参数不能传递给父组件的问题；
  2. 优化所有列表查询方法，分页参数传递；

2021-04-28:  
  1. 更新posts的form布局，添加tags；
  2. 登录、注册优化：删除label，调整间距；
  3. 其他页面label间距优化；

2021-04-14:  
  1. 完成上传文件到七牛云的功能；
  2. posts、portfolio完成上传文件的处理；
  3. 优化size()报错问题；

2021-04-13:  
  1. 解决sonar分析的问题；
  2. 优化注册、登录页；

2021-04-04:  
  1. Dashboard去掉chart.js；
  2. 补充各模块相关联的下拉框数据问题；
  3. 添加Tree.vue，尚未完成接口;
  4. 登录/注册页，表单、样式优化；

2021-04-02: 
- 优化: 
  1. Dashboard加载echart太大问题；
  2. 补充role授权模块样式；
  3. 所有add/edit操作添加sweetalert;
- upgrade:
  1. 更新 chart.js 到 3.x 版本；
