import qiniu from 'qiniu-js'

let file: File = new File([], "", {});
let key: string = "";
let token: string = "";
let putExtra: object = {
    fname: "qiniu.txt", // 文件原始文件名，若未指定，则魔法变量中无法使用 fname、ext、suffix
    mimeType: "text/plain", // 指定所传的文件类型
    customVars: { 'x:test': 'leafage' }, // 用来放置自定义变量，变量名必须以 x: 开始
    metadata: { 'x-qn-meta': 'leafage' }, // 用来防止自定义 meta，变量名必须以 x-qn-meta-开始
};
let config: object = {
    quality: 0.92,
    useCdnDomain: true
};
let observer: any = {
    // 接收上传进度信息的回调函数
    next(res: any) {
        // ...
    },
    // 上传错误后触发
    error(err: Error) {
        // ...
    },
    // 接收上传完成后的后端返回信息
    complete(res: any) {
        // ...
    }
};


const observable = qiniu.upload(file, key, token, putExtra, config)
const subscription = observable.subscribe(observer) // 上传开始
subscription.unsubscribe() // 上传取消