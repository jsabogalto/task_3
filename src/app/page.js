import { devIndicatorServerState } from "next/dist/server/dev/dev-indicator-server-state";
import Image from "next/image";
import Posts from "./components/Comments"

export default function Home() {
  return (
    <>
      
      <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <h1 className="text-lg text-white text center mb-4"></h1>
        <Posts />
      </div>
    </>
  );
}
