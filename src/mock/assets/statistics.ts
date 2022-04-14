import { Random } from 'mockjs'

import type { Pagation, Statistics } from '@/api/request.type'

const pagation: Pagation<Statistics> = {
    page: 0,
    size: 10,
    totalElements: 0,
    content: []
}
const datas: Array<Statistics> = [];

for (let i = 0; i < 7; i++) {
    datas.push({
        code: Random.string('number', 9),
        date: Random.date(),
        viewed: Random.integer(100, 10000),
        overViewed: Random.float(1, 100, 1, 2),
        likes: Random.integer(100, 10000),
        overLikes: Random.float(1, 100, 1, 2),
        comments: Random.integer(100, 10000),
        overComments: Random.float(1, 100, 1, 2),
        modifyTime: Random.date()
    })
}

export default [
    {
        url: '/api/assets/statistics',
        method: 'get',
        response: () => {
            pagation.totalElements = datas.length
            pagation.content = datas
            return pagation
        },
    },
]