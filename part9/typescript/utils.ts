export const containsNaN = (arr: Array<string>) =>
    arr.some((e) => isNaN(Number(e)));
