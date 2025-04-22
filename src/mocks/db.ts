import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'
import type { TableInfo } from 'src/types'

const datas: TableInfo[] = [
]

for (let i = 1; i < 28; i++) {
  const row: TableInfo = {
    tableName: 'table_name' + i,
    tableComment: 'table_comment'
  }
  datas.push(row)
}

export const dbHandlers = [
  http.get(`/api${SERVER_URL.DB}/tables`, () => {
      return HttpResponse.json(datas)
  })
]
