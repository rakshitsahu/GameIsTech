import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <div >
      <nav className="flex w-full justify-self-center justify-items-center bg-red-500 ">
        <ul className=" flex rounded-b-md">

          <li className="flex  p-6 bg-gradient-to-r hover:bg-red-500 ml-4 delay-200 ">
            <font className="flex font-semibold text-xl text-white">Home</font>
          </li>

          <li className="flex p-6 bg-gradient-to-r hover:bg-red-500 ml-4 delay-200 ">
            <font className="flex font-semibold text-xl text-white">About Us</font>
          </li>

          <li className="flex p-6 bg-gradient-to-r hover:bg-red-500 ml-4 delay-200 ">
            <font className="flex font-semibold text-xl text-white">
              Privacy Policy
            </font>
          </li>

          <li className="flex p-6 bg-gradient-to-r hover:bg-red-500 ml-4 delay-200 ">
            <font className="flex font-semibold text-xl text-white">
              Terms & Conditions
            </font>
          </li>
        </ul>
      </nav>
      </div>
    </>
  );
}
