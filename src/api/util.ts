/**
 * url 参数转json对象
 * @param str url地址
 * @returns  json对象
 */
export function parse(str: string) {
    var obj = {};
    var arr1 = str.split("?");
    var arr2 = arr1[1].split("&");
    for (var i = 0; i < arr2.length; i++) {
        var res = arr2[i].split("=");
        obj[res[0]] = res[1];
    }
    return obj;
}
