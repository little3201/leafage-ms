
import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: 'statistics/viewed',
        method: 'get',
        response: () => {
            return {
                date: "2021-05-19",
                viewed: 4061,
                overViewed: 30,
                likes: 30,
                comment: 0
            }
        },
    },
] as MockMethod[];