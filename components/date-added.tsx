import Icon from "@mdi/react";
import { mdiClockTimeFourOutline } from "@mdi/js";

const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
};

export const DateAdded = ({ date }: { date: Date }) => (
    <div className="flex items-center">
        <Icon className="text-orange-600" size={1} path={mdiClockTimeFourOutline}></Icon>
        <span className="ml-2 text-xs font-extrabold uppercase">{formatDate(date)}</span>
    </div>
);
