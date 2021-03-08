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
                username: 'little3201'
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