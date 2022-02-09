import { Random } from 'mockjs'

import { Notification } from '@/api/request'
import { parse } from '@/api/util';

const datas: Array<Notification> = [];

for (let i = 0; i < 36; i++) {
    datas.push({
        code: Random.id(),
        title: Random.ctitle(),
        content: Random.cparagraph(),
        modifyTime: new Date(),
        description: Random.sentence(5)
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
                    return datas.slice(params.page * params.size, (params.page + 1) * params.size)
                }
            } else {
                let code = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.code === code)[0]
            }
        }
    }
]