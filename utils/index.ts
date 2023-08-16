import CryptoJs from "crypto-js";
export function dateFormat(dateStr: string) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function ellipsisStr(str: string, length: number) {
    const sliceStr = str.slice(0, length);
    return str.length <= length ? str : `${sliceStr} ...`;
}

const SecretKey = "0123456789abcdef0123456789abcdef";
const aes256Iv = "0123456789abcdef";

export function encrypt(value: string) {
    return CryptoJs.AES.encrypt(value, SecretKey).toString();
}

export function decrypt(value: string) {
    const byte = CryptoJs.AES.decrypt(value, SecretKey);
    return byte.toString(CryptoJs.enc.Utf8);
}
