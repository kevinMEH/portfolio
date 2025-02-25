import { getTechnologies, getTechnologiesDescriptions } from "./data";

export default async function Technologies() {
    const [ technologiesDescription, technologies ] = await Promise.all([
        getTechnologiesDescriptions(),
        getTechnologies()
    ]);

    return <div className="gap-3 flex flex-col">
        <h2 className="text-sub font-title font-bold tracking-wide">TECHNOLOGIES</h2>
        <p className="text-sm sm:text-base">{ technologiesDescription }</p>
        <div className="flex text-nowrap gap-2 md:gap-2.5 flex-wrap font-mono -mx-1">
            { technologies.map(group => {
                return group.items.map(item => {
                    return <span key={item} className={`cursor-pointer rounded-md px-2.5 py-1 text-xs md:text-[13px] md:leading-[18px] transition-colors ${group.textStyle} ${group.backgroundStyle}`}>
                        { item }
                    </span>
                });
            })}
        </div>
    </div>
}