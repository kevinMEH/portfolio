import { getTechnologies, getTechnologiesDescriptions } from "./data";

export default async function Technologies() {
    const [ technologiesDescription, technologies ] = await Promise.all([
        getTechnologiesDescriptions(),
        getTechnologies()
    ]);

    return <div className="gap-2 flex flex-col">
        <h2 className="text text-highlight font-bold font-mono leading-none">Technologies</h2>
        <p className="text-sm">{ technologiesDescription }</p>
        <div className="flex text-nowrap gap-2 flex-wrap font-mono -mx-1 pt-1">
            { technologies.map(group => {
                return group.items.map(item => {
                    return <span key={item} className={`rounded-md px-2.5 py-1 text-xs ${group.textStyle} ${group.backgroundStyle}`}>
                        { item }
                    </span>
                });
            })}
        </div>
    </div>
}