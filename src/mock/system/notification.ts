import { Random } from 'mockjs'

import type { Pagation, Notification } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<Notification> = {
    page: 0,
    size: 10,
    totalElements: 0,
    content: []
}
const datas: Array<Notification> = [];

for (let i = 0; i < 36; i++) {
    datas.push({
        code: Random.string('number', 9),
        title: Random.ctitle(),
        content: Random.cparagraph(),
        receiver: Random.cname(),
        modifyTime: new Date()
    })
}

export default [
    {
        url: '/api/hypervisor/notification',
        method: 'get',
        response: (options: any) => {
            let url = options.url
            if (url.split('?').length > 1) {
                let params: any = parse(url)
                if (params.read && params.read === "true") {
                    pagation.totalElements = datas.length
                    pagation.content = datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
                    return pagation
                } else {
                    pagation.totalElements = datas.length
                    pagation.content = datas.slice(0, 5)
                    return pagation
                }
            } else {
                let code = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.code === code)[0]
            }
        }
    }
]