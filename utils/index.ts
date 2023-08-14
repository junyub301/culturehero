export function dateFormat(dateStr: string) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function ellipsisStr(str: string, length: number) {
    const sliceStr = str.slice(0, length);
    return str.length <= length ? str : `${sliceStr} ...`;
}
