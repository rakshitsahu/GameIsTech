import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="flex flex-row place-items-center bg-neutral-800 ">
        <nav className="flex flex-row  bg-neutral-800 rounded-b-md">

          <span className="p-6 bg-gradient-to-r hover:bg-red-500 ml-4 delay-200 ">
            <font className="font-semibold text-xl text-white">Home</font>
          </span>

          <span className="p-6 bg-gradient-to-r hover:bg-red-500 ml-4 delay-200 ">
            <font className="font-semibold text-xl text-white">About Us</font>
          </span>

          <span className="p-6 bg-gradient-to-r hover:bg-red-500 ml-4 delay-200 ">
            <font className="font-semibold text-xl text-white">
              Privacy Policy
            </font>
          </span>

          <span className="p-6 bg-gradient-to-r hover:bg-red-500 ml-4 delay-200 ">
            <font className="font-semibold text-xl text-white">
              Terms & Conditions
            </font>
          </span>

        </nav>
      </div>
    </>
  );
}
