import Link from "next/link";
import { getDescription, getTag, getTitle, getUrl } from "./data";

export default async function AboutMe() {
    const [ tag, url, title, description ] = await Promise.all([
        getTag(),
        getUrl(),
        getTitle(),
        getDescription()
    ]);

    return <div className="space-y-2 text-center pb-2">
        <Link href={url} target="_blank" className="text-sm font-mono text-sub leading-none">
            { tag }
        </Link>
        <h1 className="text-xl font-semibold leading-none pb-1">
            { title }
        </h1>
        <p className="text-sm">
            { description }
        </p>
    </div>
}