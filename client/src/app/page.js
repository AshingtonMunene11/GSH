import fs from "fs";
import path from "path";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  // Read all files inside /public/banners
  const bannersDir = path.join(process.cwd(), "public", "banners");
  const files = fs.readdirSync(bannersDir);

  // Build public paths for each image
  const banners = files.map((file) => `/banners/${file}`);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow">
        <HeroSection banners={banners} />
      </main>
    </div>
  );
}
