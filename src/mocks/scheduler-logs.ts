import { http, HttpResponse } from 'msw'
import type { SchedulerLog } from 'src/models'

const datas: SchedulerLog[] = [
  {
    id: 1,
    name: "DailyBackup",
    method: "backupDatabase",
    params: "()",
    cronExpression: "0 0 * * *",
    startTime: "2024-06-19T00:00:00",
    endTime: "2024-06-19T00:30:00",
    status: 1
  },
  {
    id: 2,
    name: "GenerateReport",
    method: "generateDailyReport",
    params: "()",
    cronExpression: "0 6 * * *",
    startTime: "2024-06-19T06:00:00",
    endTime: "2024-06-19T06:15:00",
    status: 1
  },
  {
    id: 3,
    name: "SyncData",
    method: "synchronizeData",
    params: "()",
    cronExpression: "0 */2 * * *",
    startTime: "2024-06-19T02:00:00",
    endTime: "2024-06-19T02:10:00",
    status: 1
  },
  {
    id: 4,
    name: "ClearTempFiles",
    method: "clearTempFiles",
    params: "()",
    cronExpression: "0 3 * * *",
    startTime: "2024-06-19T03:00:00",
    endTime: "2024-06-19T03:05:00",
    status: 1
  },
  {
    id: 5,
    name: "SendEmails",
    method: "sendPendingEmails",
    params: "()",
    cronExpression: "0 4 * * *",
    startTime: "2024-06-19T04:00:00",
    endTime: "2024-06-19T04:20:00",
    status: 0
  },
  {
    id: 6,
    name: "UpdateStats",
    method: "updateStatistics",
    params: "()",
    cronExpression: "0 1 * * *",
    startTime: "2024-06-19T01:00:00",
    endTime: "2024-06-19T01:10:00",
    status: 1
  },
  {
    id: 7,
    name: "ReindexSearch",
    method: "reindexSearchEngine",
    params: "()",
    cronExpression: "0 2 * * *",
    startTime: "2024-06-19T02:00:00",
    endTime: "2024-06-19T02:30:00",
    status: 1
  },
  {
    id: 8,
    name: "ArchiveLogs",
    method: "archiveOldLogs",
    params: "()",
    cronExpression: "0 5 * * *",
    startTime: "2024-06-19T05:00:00",
    endTime: "2024-06-19T05:45:00",
    status: 1
  },
  {
    id: 9,
    name: "RefreshCache",
    method: "refreshApplicationCache",
    params: "()",
    cronExpression: "*/30 * * * *",
    startTime: "2024-06-19T00:30:00",
    endTime: "2024-06-19T00:35:00",
    status: 1
  },
  {
    id: 10,
    name: "GenerateInvoices",
    method: "generateMonthlyInvoices",
    params: "()",
    cronExpression: "0 0 1 * *",
    startTime: "2024-07-01T00:00:00",
    endTime: "2024-07-01T01:00:00",
    status: 1
  },
  {
    id: 11,
    name: "GenerateInvoices",
    method: "generateMonthlyInvoices",
    params: "()",
    cronExpression: "0 0 1 * *",
    startTime: "2024-07-01T00:00:00",
    endTime: "2024-07-01T01:00:00",
    status: 1
  }
]


export const schedulerLogsHandlers = [
  http.get('/api/scheduler-logs/:id', ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get('/api/scheduler-logs', ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    // Construct a JSON response with the list of all Role
    // as the response body.
    const data = {
      content: Array.from(datas.slice((Number(page) - 1) * Number(size), Number(page) * Number(size))),
      totalElements: datas.length
    }

    return HttpResponse.json(data)
  }),
  http.delete('/api/scheduler-logs/:id', ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params

    // Let's attempt to grab the Role by its ID.
    const deletedData = datas.filter(item => item.id === Number(id))

    // Respond with a "404 Not Found" response if the given
    // Role ID does not exist.
    if (!deletedData) {
      return new HttpResponse(null, { status: 404 })
    }

    // Delete the Role from the "allRole" map.
    datas.pop()

    // Respond with a "200 OK" response and the deleted Role.
    return HttpResponse.json(deletedData)
  })
]
