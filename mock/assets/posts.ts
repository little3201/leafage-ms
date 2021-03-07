
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'posts/count',
    method: 'get',
    response: () => {
      return 3
    },
  },
  {
    url: 'posts/20829TXGD/content',
    method: 'get',
    response: () => {
      return {
        catelog: '分布式架构，是一套很复杂的系统',
        content: '## 分布式架构，是一套很复杂的系统 ### 这是内容，一步步实现分布式架构，一步步实现分布式架构，一步步实现分布式架构'
      }
    },
  },
  {
    url: 'posts/20829TXGD',
    method: 'get',
    response: () => {
      return {
        code: '20829TXGD',
        title: '一步步实现分布式架构',
        category: '20A23D2D1',
        subtitle: '分布式架构，是一套很复杂的系统',
        cover: 'https://cdn.pixabay.com/photo/2019/11/12/09/03/proxy-4620557_1280.jpg'
      }
    },
  },
  {
    url: 'posts/20A23D2D1',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        title: '一步步实现分布式架构',
        subtitle: '分布式架构，是一套很复杂的系统',
        content: '## 分布式架构，是一套很复杂的系统'
      }
    },
  },
  {
    url: 'posts',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        title: '一步步实现分布式架构',
        subtitle: '分布式架构，是一套很复杂的系统',
        content: '## 分布式架构，是一套很复杂的系统'
      }
    },
  },
  {
    url: 'posts',
    method: 'get',
    response: () => {
      return [{ "code": "20829TXGD", "modifyTime": "2021-02-24T15:09:05.256", "title": "spring security 学习和踩坑总结（表单）", "subtitle": "本篇将介绍如何进行自定义的一些配置来实现自定义的登录，包括从数据库查用户信息等", "cover": "https://cdn.pixabay.com/photo/2015/07/31/15/01/security-869216_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 69 }, { "code": "2129YYQ4", "modifyTime": "2021-02-09T14:28:53.121", "title": "prometheus和grafana服务监控系统", "subtitle": "Prometheus受启发于Google的Brogmon监控系统（相似的Kubernetes是从Google的Brog系统演变而来），从2012年开始由前Google工程师在Soundcloud以开源软件的形式进行研发，并且于2015年早期对外发布早期版本", "cover": "https://cdn.pixabay.com/photo/2020/03/23/19/17/jack-russel-4961793_960_720.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 47 }, { "code": "21287YXM", "modifyTime": "2021-02-08T15:48:31.575", "title": "如何实现 mysql 字符串分割，转换为列", "subtitle": "在工作中，偶尔会遇到这样的情况，某系统数据库中，存储关联数据不是通过关联表，而是通过存储关联数据的某个唯一标识符号，且一对多的时", "cover": "https://cdn.pixabay.com/photo/2020/06/15/15/34/fog-5302291_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 42 }, { "code": "20C25YW6T", "modifyTime": "2021-02-08T15:36:17.99", "title": "如何配置nginx实现http和https代理", "subtitle": "nginx是个功能强大，性能彪悍的反向代理工具", "cover": "https://cdn.pixabay.com/photo/2019/11/12/09/03/proxy-4620557_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 45 }, { "code": "20815YW6T", "modifyTime": "2021-02-08T15:16:26.966", "title": "Mybatis批量操作sql写法", "subtitle": "使用mybatis时，如何自定义实现批量操作数据，SQL如何编写，其中需要注意的点有哪些", "cover": "https://cdn.pixabay.com/photo/2016/03/04/12/20/server-1235959_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 140 }, { "code": "20824ZB0N", "modifyTime": "2021-02-02T16:28:43.759", "title": "一步步带你实现redis分布式锁", "subtitle": "在开发过程中，那面遇到一些场景，需要实现锁，现在大都是分布式方案，那么分布式下如何实现锁", "cover": "https://cdn.pixabay.com/photo/2015/12/12/14/25/door-1089560_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 200 }, { "code": "21286KZA", "modifyTime": "2021-02-25T10:38:23.791", "title": "Leafage 前生今世", "subtitle": "Leafage 是【叶子】的意思，取名Leafage意为像一片叶子一样经历春、夏、秋、冬，完成一个循环", "cover": "https://cdn.pixabay.com/photo/2020/07/10/01/17/time-5389154_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 70 }, { "code": "208291JMJ", "modifyTime": "2021-02-24T15:10:21.999", "title": "spring security 学习和踩坑总结（入门）", "subtitle": "spring security 是个很强大的框架，但是网上没有一个完整的对于它的一个分析，或者使用的说明，本文将一步步的对其进行使用和分析做出说明", "cover": "https://cdn.pixabay.com/photo/2020/12/18/19/11/teenager-5842706_1280.jpg", "category": "Technology", "likes": 0, "comment": 0, "viewed": 71 }];
    },
  },
] as MockMethod[];