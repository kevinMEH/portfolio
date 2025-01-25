import Link from "next/link";
import Image from "next/image";

import { getDescription, getTag, getTitle, getUrl } from "./data";

import ProfilePicture from "@/custom/profile.png";

export default async function AboutMe() {
    const [ tag, url, title, description ] = await Promise.all([
        getTag(),
        getUrl(),
        getTitle(),
        getDescription()
    ]);

    return <div className="flex flex-col items-center gap-2 text-center pb-2">
        <div className="w-[min(37%,140px)] min-w-[100px] pb-2">
            <Image
                src={ProfilePicture}
                alt="Profile Picture"
                className="rounded-full outline outline-bg-dark outline-[6px] sm:outline-8 -mt-[80px]"
            />
        </div>
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