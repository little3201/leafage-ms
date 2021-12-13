import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: '/api/assets/comment',
        method: 'get',
        response: () => {
            return [
                {
                    nickname: '布吉岛',
                    avatar: '/images/avatar.jpg',
                    content: '优秀呀，怎么弄的？'
                },
                {
                    nickname: '跟着风吹',
                    avatar: '',
                    content: '很棒很棒！'
                },
                {
                    nickname: '无名之辈',
                    avatar: '',
                    content: '找了很久的vue+tailwindcss, 你这个很优秀，收藏了'
                },
                {
                    nickname: '无名之徒',
                    avatar: '',
                    content: '哇塞，关注了，喜欢'
                }
            ];
        },
    }
] as MockMethod[];