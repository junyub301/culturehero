export function dateFormat(dateStr: string) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일`;
}
