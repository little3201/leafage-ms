/**
 * url 参数转json对象
 * @param str url地址
 * @returns  json对象
 */
export function parse(str: string) {
    const obj = {};
    const arr1 = str.split("?");
    const arr2 = arr1[1].split("&");
    for (const item of arr2) {
        const res = item.split("=");
        obj[res[0]] = res[1];
    }
    return obj;
}
