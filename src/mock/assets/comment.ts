import { Random } from 'mockjs'

import { Comment } from '@/api/request'
import { parse } from '@/api/util';

const datas: Array<Comment> = [];

for (let i = 0; i < 19; i++) {
    datas.push({
        code: Random.string('number', 9),
        nickname: Random.cname(),
        avatar: Random.image('32x32'),
        posts: Random.word(),
        content: Random.cparagraph(2),
        email: Random.email(),
        replier: Random.cname(),
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
                return datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
            } else {
                let code = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.code === code)[0]
            }
        }
    }
]