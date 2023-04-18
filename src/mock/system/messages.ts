import { Random } from 'mockjs'

import type { Pagation, Message } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<Message> = {
    page: 0,
    size: 10,
    totalElements: 0,
    content: []
}
const datas: Array<Message> = [];

for (let i = 0; i < 36; i++) {
    datas.push({
        id: Random.increment(),
        title: Random.ctitle(),
        context: Random.cparagraph(),
        receiver: Random.cname(),
        modifyTime: Random.date()
    })
}

export default [
    {
        url: '/api/hypervisor/messages',
        method: 'get',
        response: (options: any) => {
            const url = options.url
            if (url.split('?').length > 1) {
                const params: any = parse(url)
                if (params.read && params.read === "true") {
                    pagation.totalElements = datas.length
                    pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
                    return pagation
                } else {
                    pagation.totalElements = datas.length
                    pagation.content = datas.slice(0, 5)
                    return pagation
                }
            } else {
                const id = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.id === id)[0]
            }
        }
    }
]