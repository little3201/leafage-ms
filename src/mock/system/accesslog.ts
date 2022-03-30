import { Random } from 'mockjs'

import type { AccessLog } from '@/api/request.type'
import { parse } from '@/util';

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
        url: '/api/hypervisor/accesslog/count',
        method: 'get',
        response: () => {
            return datas.length
        }
    },
    {
        url: '/api/hypervisor/accesslog',
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