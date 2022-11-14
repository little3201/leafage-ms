import { Random } from 'mockjs'

import type { Pagation, AccessLog } from '@/api/request.type'
import { parse } from '@/mock/utils';

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
        modifyTime: new Date(Random.date())
    })
}

export default [
    {
        url: '/api/hypervisor/access-logs',
        method: 'get',
        response: (options: any) => {
            const url = options.url
            if (url.split('?').length > 1) {
                const params: any = parse(url)
                pagation.totalElements = datas.length
                pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
                return pagation
            } else {
                const code = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.code === code)[0]
            }
        }
    }
]