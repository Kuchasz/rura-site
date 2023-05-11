export const formatNumber = (n: number, precision = 2) =>
    n.toLocaleString("en-US", { minimumIntegerDigits: precision });

export const formatTimeWithSec = (time?: number) => {
    if (!time) return "--:--:--";
    const dateTime = new Date(time);
    return `${formatNumber(dateTime.getHours() - 1)}:${formatNumber(dateTime.getMinutes())}:${formatNumber(
        dateTime.getSeconds()
    )}`;
};

export const sort = <T>(items: T[], func: (item: T) => number): T[] => {
    const i = [...items];

    return i.sort((a, b) => func(a) - func(b));
};


export const sortDesc = <T>(items: T[], func: (item: T) => number): T[] => {
    const i = [...items];

    return i.sort((a, b) => func(b) - func(a));
};