import Image from "next/image";
import ContactImage from "@/custom/contact.png";
import { getContactButtonText, getContactOverlayStyle, getContactTitle } from "./data";

export default async function Contact() {
    const [ contactOverlayStyle, contactTitle, contactButtonText ] = await Promise.all([
        getContactOverlayStyle(),
        getContactTitle(),
        getContactButtonText()
    ]);

    return <div className="space-y-3 pt-8">
        <div className="relative rounded-2xl overflow-clip flex flex-col items-center justify-center text-center gap-5 h-[calc(100vh-64px)] pb-8">
            <h2 className="text-sub font-bold font-mono text-center">Contact</h2>
            <h3 className="text-2xl leading-tight font-bold w-[240px] pb-1.5">{ contactTitle }</h3>
            <button className="flex items-center gap-2 px-4 py-3 rounded-lg border border-main/40">
                <span className="font-mono font-medium text-sm tracking-tight leading-none">{ contactButtonText }</span>
                <RightArrow size={14} />
            </button>
            <div className={`absolute inset-0 -z-10 ${contactOverlayStyle}`} />
            <Image src={ContactImage} alt="Contact section background image" className="absolute inset-0 -z-20 object-cover" fill={true} />
        </div>
    </div>
}

function RightArrow({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            width={size}
            height={size}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
        </svg>
    );
}