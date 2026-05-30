import { DateAdded } from "./date-added";

export const PostDetails = ({ date, author }: { date: Date; author: string }) => (
    <div className="my-3 flex items-center gap-3 text-xs uppercase text-gray-500">
        <span>{author}</span>
        <span className="inline-block h-5 w-px bg-stone-200"></span>
        <DateAdded date={date} />
    </div>
);
