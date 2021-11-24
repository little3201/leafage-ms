import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: '/api/assets/statistics/viewed',
        method: 'get',
        response: () => {
            return {
                date: "2021-05-19",
                viewed: 4061,
                overViewed: 30,
                likes: 3009,
                overComment: 1.3,
                comment: 1001,
                overLikes: 1.3
            }
        },
    },
    {
        url: '/api/assets/statistics',
        method: 'get',
        response: () => {
            return [
                {
                    date: "05-30",
                    viewed: 4978,
                    overViewed: 1.3,
                    likes: 30,
                    overCommnet: 0.3,
                    comment: 0,
                    overLikes: 0.3
                },
                {
                    date: "05-29",
                    viewed: 4780,
                    overViewed: 2.3,
                    likes: 30,
                    overCommnet: 1.3,
                    comment: 0,
                    overLikes: 5.3
                },
                {
                    date: "05-28",
                    viewed: 4678,
                    overViewed: 0.93,
                    likes: 30,
                    overCommnet: 1.63,
                    comment: 0,
                    overLikes: 0.43
                },
                {
                    date: "05-27",
                    viewed: 4290,
                    overViewed: 1.0,
                    likes: 30,
                    overCommnet: 0.89,
                    comment: 0,
                    overLikes: 0.3
                },
                {
                    date: "05-26",
                    viewed: 4199,
                    overViewed: 2.98,
                    likes: 30,
                    overCommnet: 2.3,
                    comment: 0,
                    overLikes: 1.3
                },
                {
                    date: "05-25",
                    viewed: 4678,
                    overViewed: 1.03,
                    likes: 30,
                    overCommnet: 0.13,
                    comment: 0,
                    overLikes: 2.3
                },
                {
                    date: "05-24",
                    viewed: 4290,
                    overViewed: 0.7,
                    likes: 30,
                    overCommnet: 0.3,
                    comment: 0,
                    overLikes: 0.3
                },
                {
                    date: "05-23",
                    viewed: 4199,
                    overViewed: 2.98,
                    likes: 30,
                    overCommnet: 0.43,
                    comment: 0,
                    overLikes: 1.3
                }
            ]
        },
    },
] as MockMethod[];