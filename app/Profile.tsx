import Image from "next/image";
import ProfilePicture from "@/custom/profile.png";

export default function Profile() {
    return <div className="w-full flex justify-around -mb-7">
        <div className="w-[min(37%,164px)] min-w-[100px]">
            <Image
                src={ProfilePicture}
                alt="Profile Picture"
                className="rounded-full outline outline-bg-dark outline-[6px] sm:outline-8 -mt-[max(18%,80px)]"
            />
        </div>
    </div>
}