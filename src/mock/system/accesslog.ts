import { Random } from 'mockjs'

import type { Pagation, AccessLog } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<AccessLog> = {
    page: 0,
    size: 10,
    totalElements: 0,
    content: []
}
const datas: Array<AccessLog> = [];

for (let i = 0; i < 36; i++) {
    datas.push({
        code: Random.string('number', 9),
        ip: Random.ip(),
        location: Random.county(true),
        description: Random.csentence(),
        modifyTime: new Date()
    })
}

export default [
    {
        url: '/api/hypervisor/access-log',
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