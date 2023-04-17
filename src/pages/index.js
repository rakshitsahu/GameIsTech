import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <div className=" flex justify-between bg-neutral-800">
    <span className="flex flex-row  bg-neutral-800">
    <Image
        src="/coder.png"
        alt="Picture of the author"
        width={250}
        height={250}
      />
    </span>
    </div>
      <div className="flex justify-center bg-red-800 ">
      
        <nav className="flex bg-neutral-800 rounded-b-md">

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
