
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'posts/20A23D2D1',
    method: 'get',
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
      return [
        {
          code: '20A23D2D1',
          title: '一步步实现分布式锁',
          modifyTime: new Date(),
        },
        {
          code: '20A23D2D1',
          title: '一步步实现分布式架构',
          modifyTime: new Date(),
        },
        {
          code: '20A23D2D1',
          title: '一步步实现分布式事务',
          modifyTime: new Date(),
        },
      ];
    },
  },
] as MockMethod[];