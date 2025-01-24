import Image from "next/image";
import BannerImage from "@/custom/banner.png";

export default function Banner({ className = "" }: { className?: string }) {
    return <div className={`relative -z-10 ${className}`}>
        <Image
            src={BannerImage}
            alt="Banner image"
            fill={true}
            className="object-cover"
        />
        <div className="w-full pb-[min(40%,200px)]" />
        <div className="absolute inset-0 bg-bg-dark/10" />
    </div>
}