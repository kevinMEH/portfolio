import Image from "next/image";
import { getProjects } from "./data";
import Link from "next/link";

export default async function Projects() {
    const projects = await getProjects();

    return <div className="flex flex-col gap-3">
            <h2 className="text-sub font-title font-bold tracking-wide">PROJECTS</h2>
        <div className="space-y-5 sm:space-y-8 sm:pt-3 -mx-1">
            { projects.map((project, index) => {
                return <Link key={index} className="relative rounded-xl overflow-clip flex flex-col gap-3 p-4 sm:px-6 justify-end h-44 md:h-36 lg:h-32 group" href={project.url} target="_blank">
                    <div className="font-mono tracking-tight flex flex-col justify-end gap-1">
                        <h3 className="font-semibold sm:text-lg">{ project.title }</h3>
                        <p className="text-xs sm:text-sm text-main/70">{ project.description }</p>
                    </div>
                    <div className={`absolute inset-0 -z-10 transition-colors ${project.overlayStyle}`} />
                    <Image
                        src={`/images/project_${index + 1}.png`}
                        alt={`Project ${index} thumbnail`}
                        width={750}
                        height={500}
                        quality={project.imageQuality}
                        // Unusual sizes because NextJS's image optimization algorithm is garbage
                        // and will not properly optimize otherwise.
                        sizes="(max-width: 639px) 100vw, (max-width: 1000vw) 640px, 33vw"
                        className="rounded-lg absolute inset-0 h-full -z-20 object-cover"
                    />
                </Link>
            }) }
        </div>
    </div>
}