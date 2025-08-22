import type { NextConfig } from "next";

const imageQualities = [];
for(let i = 50; i <= 100; i+= 5) {
    imageQualities.push(i);
}

const nextConfig: NextConfig = {
    images: {
        imageSizes: [32, 48, 64, 96, 128, 140, 192, 256, 280, 384, 420],
        qualities: imageQualities,
    }
};

export default nextConfig;
