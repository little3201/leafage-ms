import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: '/api/check',
        method: 'get',
        response: () => {
            return {

            }
        },
    },
    {
        url: '/api/login',
        method: 'post',
        response: () => {
            return {
                username: 'admin'
            }
        },
    },
    {
        url: '/api/logout',
        method: 'post',
        response: () => {
            return {

            }
        },
    },
] as MockMethod[];