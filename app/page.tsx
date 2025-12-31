import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen bg-[#f0f0f0]">
      <Navbar />
      <h1 className="text-7xl font-semibold px-10 pt-10">
        Unleash Your{" "}
        <span className="bg-linear-to-r from-blue-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
          brand's
        </span>{" "}
        <br />{" "}
        <span className="bg-linear-to-r from-red-500 via-purple-700 to-purple-900 bg-clip-text text-transparent">
          {" "}
          potential
        </span>
        in seconds.
      </h1>
      <Card />
    </div>
  );
}
