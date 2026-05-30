import Icon from "@mdi/react";
import { mdiClockTimeFourOutline } from "@mdi/js";

const formatDate = (date: Date) => `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

export const DateAdded = ({ date }: { date: Date }) => (
    <div className="flex items-center">
        <Icon className="text-orange-600" size={1} path={mdiClockTimeFourOutline}></Icon>
        <span className="ml-2 text-xs font-extrabold uppercase">{formatDate(date)}</span>
    </div>
);
