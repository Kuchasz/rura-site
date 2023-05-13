export const formatNumber = (n: number, precision = 2) =>
    n.toLocaleString("en-US", { minimumIntegerDigits: precision });

export const formatTimeWithSec = (time?: number) => {
    if (!time) return "--:--:--";

    const timeStampAsDate = new Date(time);
    const offset = timeStampAsDate.getTimezoneOffset();

    const dateTime = new Date(time + offset * 60_000);

    return `${formatNumber(dateTime.getHours())}:${formatNumber(dateTime.getMinutes())}:${formatNumber(
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