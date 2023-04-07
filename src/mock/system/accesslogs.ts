import { Random } from 'mockjs'

import type { Pagation, AccessLog } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<AccessLog> = {
    page: 0,
    size: 10,
    totalElements: 0,
    content: []
}
const datas: Array<AccessLog> = [];

for (let i = 0; i < 36; i++) {
    datas.push({
        id: Random.integer(),
        ip: Random.ip(),
        location: Random.county(true),
        context: Random.csentence(),
        modifyTime: Random.date()
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
                const id = url.substring(url.lastIndexOf('/') + 1)
                return datas.filter(item => item.id === id)[0]
            }
        }
    }
]