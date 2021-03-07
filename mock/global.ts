import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: 'check',
        method: 'get',
        response: () => {
            return {

            }
        },
    },
    {
        url: 'login',
        method: 'post',
        response: () => {
            return {
                username: 'little3201',
                nickname: '管理员',
                avatar: '/images/avatar.jpg'
            }
        },
    },
    {
        url: 'logout',
        method: 'post',
        response: () => {
            return {

            }
        },
    },
] as MockMethod[];