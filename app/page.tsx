import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-screen h-screen">
  {/* Left Spacer */}
  <div className="w-1/4"></div>

  {/* Center Content */}
  <div className="w-1/2 flex flex-col justify-items-start">
    <h1 className="p-4 text-4xl font-bold">
      
    </h1>
  </div>

  {/* Right Spacer */}
  <div className="w-1/4"></div>
</div>
  );
}
