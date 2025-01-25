import Link from "next/link";
import { getDescription, getTag, getTitle, getUrl } from "./data";

export default async function AboutMe() {
    const [ tag, url, title, description ] = await Promise.all([
        getTag(),
        getUrl(),
        getTitle(),
        getDescription()
    ]);

    return <div className="flex flex-col items-center gap-2 text-center pb-2">
        <Link href={url} target="_blank" className="text-sm sm:text-base font-mono text-sub leading-none">
            { tag }
        </Link>
        <h1 className="text-xl sm:text-2xl font-semibold leading-none pb-1">
            { title }
        </h1>
        <p className="text-sm sm:text-base sm:max-w-[510px]">
            { description }
        </p>
    </div>
}