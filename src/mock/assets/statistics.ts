import { Random } from 'mockjs'

import type { Statistics } from '@/api/request.type'

const datas: Array<Statistics> = [];

for (let i = 0; i < 7; i++) {
    datas.push({
        code: Random.string('number', 9),
        date: Random.date(),
        viewed: Random.integer(100, 10000),
        overViewed: Random.float(1, 100, 1, 2),
        likes: Random.integer(100, 10000),
        overLikes: Random.float(1, 100, 1, 2),
        comment: Random.integer(100, 10000),
        overComment: Random.float(1, 100, 1, 2),
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