import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: '/api/assets/statistics',
        method: 'get',
        response: () => {
            return [
                {
                    date: "11-30",
                    viewed: 14978,
                    overViewed: 28.03,
                    likes: 6300,
                    overLikes: 36.03,
                    comment: 798,
                    overComment: 53.39
                },
                {
                    date: "11-29",
                    viewed: 10780,
                    overViewed: 28.77,
                    likes: 4030,
                    overLikes: 25.56,
                    comment: 340,
                    overComment: 14.7
                },
                {
                    date: "11-28",
                    viewed: 7678,
                    overViewed: 44.13,
                    likes: 3000,
                    overLikes: 65.67,
                    comment: 209,
                    overComment: 52.15
                },
                {
                    date: "11-27",
                    viewed: 4290,
                    overViewed: 25.43,
                    likes: 1030,
                    overLikes: 48.54,
                    comment: 100,
                    overComment: 51.0
                },
                {
                    date: "11-26",
                    viewed: 3199,
                    overViewed: 16.27,
                    likes: 530,
                    overLikes: 37.74,
                    comment: 49,
                    overComment: 38.76
                },
                {
                    date: "11-25",
                    viewed: 2678,
                    overViewed: 74.23,
                    likes: 330,
                    overLikes: 60.61,
                    comment: 30,
                    overComment: 46.67
                },
                {
                    date: "11-24",
                    viewed: 690,
                    overViewed: 27.68,
                    likes: 130,
                    overLikes: 70.0,
                    comment: 16,
                    overComment: 43.75
                },
                {
                    date: "11-23",
                    viewed: 499,
                    overViewed: 81.96,
                    likes: 39,
                    overLikes: 23.08,
                    comment: 9,
                    overComment: 33.33
                },
                {
                    date: "11-22",
                    viewed: 90,
                    overViewed: 56.67,
                    likes: 30,
                    overLikes: 90.0,
                    comment: 6,
                    overComment: 83.33
                },
                {
                    date: "11-21",
                    viewed: 39,
                    overViewed: 0.0,
                    likes: 3,
                    overLikes: 0.0,
                    comment: 1,
                    overComment: 0.0
                }
            ]
        },
    },
] as MockMethod[];