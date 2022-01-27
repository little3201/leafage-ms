import { Random } from 'mockjs'

import { Statistics } from '@/api/request'

const datas: Array<Statistics> = [];

for (let i = 0; i < 7; i++) {
    datas.push({
        code: Random.id(),
        date: Random.date(),
        viewed: Random.integer(1, 10000),
        overViewed: Random.float(1, 100),
        likes: Random.integer(1, 10000),
        overLikes: Random.float(1, 100),
        comment: Random.integer(1, 10000),
        overComment: Random.float(1, 100),
        description: Random.csentence(5),
        modifyTime: Random.date()
    })
}

export default [
    {
        url: '/api/assets/statistics',
        method: 'get',
        response: () => {
            return datas
        },
    },
]