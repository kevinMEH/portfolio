import Link from "next/link";
import { getHideAttribution } from "./data";

export default async function Footer() {
    const hideAttribution = await getHideAttribution();

    return <div className={`flex flex-col items-center py-4 ${hideAttribution ? "invisible" : ""}`}>
        <Link href="https://github.com/kevinMEH/portfolio" target="_blank" className="flex items-center gap-1.5 text-main/50 hover:text-main transition-colors">
            <StarIcon size={14} />
            <span className="text-xs font-mono leading-none pt-[0.5px]">
                kevinMEH/portfolio
            </span>
        </Link>
    </div>
}

function StarIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            width={size}
            height={size}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
        </svg>
    );
}