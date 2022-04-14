import { Random } from 'mockjs'

import type { Pagation, Comment } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<Comment> = {
    page: 0,
    size: 10,
    totalElements: 0,
    content: []
}
const datas: Array<Comment> = [];

for (let i = 0; i < 19; i++) {
    datas.push({
        code: Random.string('number', 9),
        posts: Random.id(),
        content: Random.cparagraph(2),
        country: "china",
        location: Random.city(),
        modifyTime: Random.date()
    })
}

export default [
    {
        url: '/api/assets/comment',
        method: 'get',
        response: (options: any) => {
            let url = options.url
            if (url.split('?').length > 1) {
                let params: any = parse(url)
                pagation.totalElements = datas.length
                pagation.content = datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
                return pagation
            } else {
                let code = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.code === code)[0]
            }
        }
    }
]