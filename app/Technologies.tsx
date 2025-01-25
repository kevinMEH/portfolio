import { getTechnologies, getTechnologiesDescriptions } from "./data";

export default async function Technologies() {
    const [ technologiesDescription, technologies ] = await Promise.all([
        getTechnologiesDescriptions(),
        getTechnologies()
    ]);

    return <div className="gap-2 flex flex-col">
        <h2 className="text-sub font-bold font-mono sm:text-lg">Technologies</h2>
        <p className="text-sm sm:text-base">{ technologiesDescription }</p>
        <div className="flex text-nowrap gap-2 sm:gap-2.5 flex-wrap font-mono -mx-1 pt-1">
            { technologies.map(group => {
                return group.items.map(item => {
                    return <span key={item} className={`rounded-md px-2.5 sm:px-3 py-1 sm:py-[5px] text-xs sm:text-sm ${group.textStyle} ${group.backgroundStyle}`}>
                        { item }
                    </span>
                });
            })}
        </div>
    </div>
}