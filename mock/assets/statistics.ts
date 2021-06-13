
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
    {
        url: 'statistics',
        method: 'get',
        response: () => {
            return [
                {
                    date: "05-30",
                    viewed: 4978,
                    overViewed: 23,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-29",
                    viewed: 4780,
                    overViewed: 23,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-28",
                    viewed: 4678,
                    overViewed: 23,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-27",
                    viewed: 4290,
                    overViewed: 10,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-26",
                    viewed: 4199,
                    overViewed: 2.98,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-25",
                    viewed: 4678,
                    overViewed: 23,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-24",
                    viewed: 4290,
                    overViewed: 10,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-23",
                    viewed: 4199,
                    overViewed: 2.98,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-22",
                    viewed: 4099,
                    overViewed: 0.60,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-21",
                    viewed: 4079,
                    overViewed: 1.75,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-20",
                    viewed: 4083,
                    overViewed: 0.60,
                    likes: 30,
                    comment: 0
                },
                {
                    date: "05-19",
                    viewed: 4061,
                    overViewed: 0.53,
                    likes: 30,
                    comment: 0
                }
            ]
        },
    },

] as MockMethod[];