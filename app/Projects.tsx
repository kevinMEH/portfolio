import Image from "next/image";
import { getProjects } from "./data";
import Project_1 from "@/custom/project_1.png"
import Project_2 from "@/custom/project_2.png"
import Project_3 from "@/custom/project_3.png"
import Link from "next/link";

export default async function Projects() {
    const projects = await getProjects();
    const projectImages = [ Project_1, Project_2, Project_3 ];
    if(projects.length !== projectImages.length) {
        throw new Error("Please ensure that you have an image for each featured project.");
    }

    return <div className="space-y-3">
        <h2 className="text-sub font-bold font-mono sm:text-lg">Featured Projects</h2>
        <div className="space-y-5 sm:space-y-8 sm:pt-3">
            { projects.map((project, index) => {
                return <Link key={index} className="relative rounded-xl flex flex-col gap-3 p-4 sm:p-6 justify-end h-48" href={project.url} target="_blank">
                    <div className="font-mono tracking-tight flex flex-col justify-end gap-1">
                        <h3 className="font-semibold sm:text-lg">{ project.title }</h3>
                        <p className="text-xs sm:text-sm text-main/70">{ project.description }</p>
                    </div>
                    <div className={`absolute inset-0 -z-10 ${project.overlayStyle}`} />
                    <Image src={projectImages[index]} alt={`Project ${index} thumbnail`} className="rounded-lg absolute inset-0 h-full -z-20 object-cover" />
                </Link>
            }) }
        </div>
    </div>
}