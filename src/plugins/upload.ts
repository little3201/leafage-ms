import {region, upload} from 'qiniu-js';
import CryptoJS from 'crypto-js'

// 请求接口上传图片
export const uploadFile = (file: File) => {
    const uptoken = getToken("accessKey", "secretKey", "bucketName");
    const key = file.name;
    const config = {
        useCdnDomain: true,
        region: region.z2,
        forceDirect: true // 是否上传全部采用直传方式
    };
    const putExtra: any = {
        fname: file.name, //文件原文件名
        mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'] //用来限制上传文件类型，为 null 时表示不对文件类型限制；
    };
    return upload(file, key, uptoken, putExtra, config);
}

const getToken = (access_key: string, secret_key: string, bucketname: string):string => {
    // 构造策略
    const putPolicy = {
        "scope": bucketname,
        "deadline": 3600 + Math.floor(Date.now() / 1000)
    }
    const encoded = base64Encode(utf16to8(JSON.stringify(putPolicy)));
    const hash = CryptoJS.HmacSHA1(encoded, secret_key);
    // 构造凭证
    const encodedSign = hash.toString(CryptoJS.enc.Base64).replace(/\//g, '_').replace(/\+/g, '-');
    return access_key + ':' + encodedSign + ':' + encoded;
}

const utf16to8 = (str: string):string => {
    let out = "", i: number, c: number
    const len: number = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

const base64Encode = (str: string): string => {
    let out = "", i = 0
    const len: number = str.length;
    let c1: number, c2: number, c3: number;
    const base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
