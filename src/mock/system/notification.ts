import { Random } from 'mockjs'

import type { Notification } from '@/api/request.type'
import { parse } from '@/util';

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
        url: '/api/hypervisor/notification/count',
        method: 'get',
        response: () => {
            return datas.length
        }
    },
    {
        url: '/api/hypervisor/notification',
        method: 'get',
        response: (options: any) => {
            let url = options.url
            if (url.split('?').length > 1) {
                let params: any = parse(url)
                if (!params.isRead || params.isRead === "false") {
                    return datas.slice(0, 5)
                } else {
                    return datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
                }
            } else {
                let code = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.code === code)[0]
            }
        }
    }
]