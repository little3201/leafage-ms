import { Random } from 'mockjs'

import type { Pagation, Statistics, StatisticsTotal } from '@/api/request.type'

const total: StatisticsTotal = {
    viewed: Random.integer(1, 999999),
    likes: Random.integer(1, 999999),
    comments: Random.integer(1, 999999),
    downloads: Random.integer(1, 999999)
}

const timeSharingDatas: Array<Statistics> = []

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
        downloads: Random.integer(100, 9999),
        overDownloads: Random.float(1, 100, 1, 2),
        modifyTime: Random.date()
    })
}

for (let i = 0; i < 30; i++) {
    timeSharingDatas.push({
        code: Random.string('number', 9),
        date: Random.date(),
        viewed: Random.integer(100, 10000),
        overViewed: Random.float(1, 100, 1, 2),
        likes: Random.integer(100, 10000),
        overLikes: Random.float(1, 100, 1, 2),
        comments: Random.integer(100, 10000),
        overComments: Random.float(1, 100, 1, 2),
        downloads: Random.integer(100, 9999),
        overDownloads: Random.float(1, 100, 1, 2),
        modifyTime: Random.date()
    })
}

export default [
    {
        url: '/api/assets/statistics',
        method: 'get',
        response: (options: any) => {
            const url = options.url
            if (url.split('?').length == 1) {
                const path = url.substring(url.lastIndexOf('/') + 1)
                if (path === 'time') {
                    return timeSharingDatas
                }
                return total
            } else {
                pagation.totalElements = datas.length
                pagation.content = datas
                return pagation
            }
        },
    },
]