export const formatNumber = (n: number, precision = 2) =>
    n.toLocaleString("en-US", { minimumIntegerDigits: precision });

export const formatTimeWithSec = (time?: number) => {
    if (!time) return "--:--:--";
    const dateTime = new Date(time);
    return `${formatNumber(dateTime.getHours() - 1)}:${formatNumber(dateTime.getMinutes())}:${formatNumber(
        dateTime.getSeconds()
    )}`;
};