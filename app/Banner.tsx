import Image from "next/image";

export default function Banner({ className = "" }: { className?: string }) {
    return <div className={`relative -z-10 md:mt-8 md:rounded-xl overflow-clip ${className}`}>
        <Image
            src="/images/banner.png"
            alt="Banner image"
            fill={true}
            priority={true}
            quality={85}
            // Unusual sizes because NextJS's image optimization algorithm is garbage and will not
            // properly optimize otherwise.
            sizes="(max-width: 699px) 100vw, (max-width: 1000vw) 700px, 33vw"
            className="object-cover"
        />
        <div className="w-full pb-[min(40%,200px)]" />
        <div className="absolute inset-0 bg-bg-dark/10" />
    </div>
}