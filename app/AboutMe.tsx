import { getDescription, getTitle } from "./data";

export default async function AboutMe() {
    const [ title, description ] = await Promise.all([
        getTitle(),
        getDescription()
    ]);

    return <div className="space-y-3 text-center pb-2">
        <h1 className="text-xl font-semibold">
            { title }
        </h1>
        <p className="text-sm">
            { description }
        </p>
    </div>
}