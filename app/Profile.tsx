import Image from "next/image";
import ProfilePicture from "@/custom/profile.png";

export default function Profile() {
    return <div className="w-full flex justify-around -mb-8">
        <div className="w-[min(40%,128px)] min-w-[100px]">
            <Image
                src={ProfilePicture}
                alt="Profile Picture"
                className="rounded-full border-bg-dark border-[6px] -mt-[max(18%,80px)]"
            />
        </div>
    </div>
}