import { Random } from 'mockjs'

import type { Pagation, Comment } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<Comment> = {
    page: 0,
    size: 10,
    totalElements: 0,
    content: []
}
const datas: Array<Comment> = [];

for (let i = 0; i < 19; i++) {
    datas.push({
        id: Random.increment(),
        postId: Random.integer(),
        context: Random.cparagraph(2),
        country: "china",
        location: Random.city(true),
        modifyTime: Random.date()
    })
}

export default [
    {
        url: '/api/assets/comments',
        method: 'get',
        response: (options: any) => {
            const url = options.url
            if (url.split('?').length > 1) {
                const params: any = parse(url)
                pagation.totalElements = datas.length
                pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
                return pagation
            } else {
                const id = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.id === id)[0]
            }
        }
    }
]