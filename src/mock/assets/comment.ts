import { Random } from 'mockjs'

import { Comment } from '@/api/request'
import { parse } from '@/api/util';

const datas: Array<Comment> = [];

for (let i = 0; i < 19; i++) {
    datas.push({
        code: Random.id(),
        name: Random.cname(),
        avatar: Random.image('40x40'),
        content: Random.cparagraph(2),
        email: Random.email(),
        replier: Random.cname(),
        description: Random.csentence(5),
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
                return datas.slice(params.page * params.size, (params.page + 1) * params.size)
            } else {
                let code = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.code === code)[0]
            }
        }
    }
]