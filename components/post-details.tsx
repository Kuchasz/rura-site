import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import { DateAdded } from "./date-added";

export const AuthorName = ({ author }: { author: string }) => (
    <span className="text-xs capitalize inline-flex items-center gap-1.5">
        {author.toLowerCase() === "administrator" ? (
            <Icon className="text-orange-600" size={0.7} path={mdiAccount} aria-hidden="true" />
        ) : null}
        <span>{author}</span>
    </span>
);

export const PostDetails = ({ date, author }: { date: Date; author: string }) => (
    <div className="my-3 flex items-center gap-3 text-xs uppercase text-gray-500">
        <AuthorName author={author} />
        <span className="inline-block h-5 w-px bg-stone-200"></span>
        <DateAdded date={date} />
    </div>
);
