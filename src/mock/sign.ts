import { Random } from 'mockjs'

export default [
    {
        url: '/api/check',
        method: 'get',
        response: () => {
            return {
            }
        }
    },
    {
        url: '/api/login',
        method: 'post',
        response: () => {
            return {
                username: Random.name()
            }
        }
    },
    {
        url: '/api/logout',
        method: 'post',
        response: () => {
            return {
            }
        }
    },
    {
        url: '/api/register',
        method: 'post',
        response: () => {
            return {
            }
        }
    }
]