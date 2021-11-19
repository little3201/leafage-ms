import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/assets/posts/count',
    method: 'get',
    response: () => {
      return 10
    },
  },
  {
    url: '/api/assets/posts/:code/content',
    method: 'get',
    response: () => {
      return {
        catelog: '## 分布式架构，是一套很复杂的系统',
        content: '## 分布式架构，是一套很复杂的系统 ### 这是内容，一步步实现分布式架构，一步步实现分布式架构，一步步实现分布式架构'
      }
    },
  },
  {
    url: '/api/assets/posts/:code',
    method: 'get',
    response: () => {
      return {
        code: '20829TXGD',
        title: '一步步实现分布式架构',
        category: '20A23D2D1',
        cover: 'https://cdn.pixabay.com/photo/2019/11/12/09/03/proxy-4620557_1280.jpg',
        tags: ["java", "redis", "分布式锁", "spring boot"]
      }
    },
  },
  {
    url: '/api/assets/posts/:code',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        title: '一步步实现分布式架构',
        content: '## 分布式架构，是一套很复杂的系统'
      }
    },
  },
  {
    url: '/api/assets/posts',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        title: '一步步实现分布式架构',
        content: '## 分布式架构，是一套很复杂的系统'
      }
    },
  },
  {
    url: '/api/assets/posts',
    method: 'get',
    response: () => {
      return [
        { "code": "20829TXGD", "modifyTime": "2021-02-24T15:09:05.256", "title": "spring security 学习和踩坑总结（表单）", "cover": "https://cdn.pixabay.com/photo/2015/07/31/15/01/security-869216_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 69 },
        { "code": "2129YYQ4", "modifyTime": "2021-02-09T14:28:53.121", "title": "prometheus和grafana服务监控系统", "cover": "https://cdn.pixabay.com/photo/2020/03/23/19/17/jack-russel-4961793_960_720.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 47 },
        { "code": "21287YXM", "modifyTime": "2021-02-08T15:48:31.575", "title": "如何实现 mysql 字符串分割，转换为列", "cover": "https://cdn.pixabay.com/photo/2020/06/15/15/34/fog-5302291_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 42 },
        { "code": "20C25YW6T", "modifyTime": "2021-02-08T15:36:17.99", "title": "如何配置nginx实现http和https代理", "cover": "https://cdn.pixabay.com/photo/2019/11/12/09/03/proxy-4620557_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 45 },
        { "code": "20815YW6T", "modifyTime": "2021-02-08T15:16:26.966", "title": "Mybatis批量操作sql写法", "cover": "https://cdn.pixabay.com/photo/2016/03/04/12/20/server-1235959_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 140 },
        { "code": "20824ZB0N", "modifyTime": "2021-02-02T16:28:43.759", "title": "一步步带你实现redis分布式锁", "cover": "https://cdn.pixabay.com/photo/2015/12/12/14/25/door-1089560_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 200 },
        { "code": "21286KZA", "modifyTime": "2021-02-25T10:38:23.791", "title": "Leafage 前生今世", "cover": "https://cdn.pixabay.com/photo/2020/07/10/01/17/time-5389154_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 70 },
        { "code": "208291JMJ", "modifyTime": "2021-02-24T15:10:21.999", "title": "spring security 学习和踩坑总结（入门）spring security 学习和踩坑总结（入门）", "cover": "https://cdn.pixabay.com/photo/2020/12/18/19/11/teenager-5842706_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 71 },
        { "code": "21286KZA", "modifyTime": "2021-02-25T10:38:23.791", "title": "Leafage 前生今世", "cover": "https://cdn.pixabay.com/photo/2020/07/10/01/17/time-5389154_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 70 },
        { "code": "208291JMJ", "modifyTime": "2021-02-24T15:10:21.999", "title": "spring security 学习和踩坑总结（入门）", "cover": "https://cdn.pixabay.com/photo/2020/12/18/19/11/teenager-5842706_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 71 }
      ];
    },
  },
  {
    url: '/api/assets/posts/:code',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
] as MockMethod[];