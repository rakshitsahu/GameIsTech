import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import GCAM_API_STATE from "@/Components/API/API_States";
import { GCAM_GET_REQUEST } from "@/Components/API/GET_API_Manager";
const inter = Inter({ subsets: ["latin"] });
export async function getStaticProps(){
  const data = {}

    return {
      props :{
          data 
      },
      revalidate: 10,
    }
}
export default function Home() {
  
  console.log('execution came till heree')
  const data = [
    {
      name: "Apex Legends",
      PosterPath: "/ApexLegends/poster.jpg",
    },
    {
      name: "BattleField",
      PosterPath: "/BattleField/poster.jpg",
    },
    {
      name: "ClashRoyale",
      PosterPath: "/ClashRoyale/poster.jpg",
    },
    {
      name: "COC",
      PosterPath: "/COC/poster.jpg",
    },
    {
      name: "COD",
      PosterPath: "/COD/poster.jpg",
    },
    {
      name: "CSGO",
      PosterPath: "/CSGO/poster.jpg",
    },
    {
      name: "Fortnite",
      PosterPath: "/Fortnite/poster.jpg",
    },
    {
      name: "LOL",
      PosterPath: "/LOL/poster.jpg",
    },
    {
      name: "OverWatch",
      PosterPath: "/OverWatch/poster.jpg",
    },
    {
      name: "PUBG",
      PosterPath: "/PUBG/poster.jpg",
    },
  ];
  const notready = ()  =>{

  }
  const SocialIcons = () => {
    return (
      <div className="flex flex-wrap pb-4  justify-center ">
        <span className="pt-3 px-2 ">
          <Image
            src="/Social_Media_Icons/facebook.png"
            height={30}
            width={30}
          />
        </span>
        <span className="pt-3 px-2 ">
          <Image
            src="/Social_Media_Icons/instagram.png"
            height={30}
            width={30}
          />
        </span>
        <span className="pt-3 px-2 ">
          <Image src="/Social_Media_Icons/twitter.png" height={30} width={30} />
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="shadow-lg overflow-hidden">
        <nav className="flex flex-wrap gap-5 px-6 text-white bg-neutral-900 justify-between">
          <div className="flex  ">
            <span className="pt-3 pb-4 px-2 hover:bg-red-500 delay-150">
              Home
            </span>
            <span className="pt-3 px-2 hover:bg-red-500 delay-150">
              About Us
            </span>
            <span className="pt-3 px-2 hover:bg-red-500 delay-150">
              Privacy & Policy
            </span>
            <span className="pt-3 px-2 hover:bg-red-500 delay-150">
              Terms & Conditions
            </span>
          </div>
          <SocialIcons />
        </nav>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-4 mx-4">
        <div className="flex flex-wrap p-6 gap-3 bg-black rounded-lg sm:col-span-2 md:col-span-2 lg:col-span-2 text-3xl text-white">
          <div className="flex flex-wrap gap-4 justify-center">
            <font className="mx-4 w-full">Games That are ready to Track:-</font>
            <Link href='/tracker/valorant/home'>
            <div className="grid text-white text-lg justify-items-center">
              <div className=" flex h-80 w-50 rounded-lg shadow-2xl  border-red-500 border-4 place-self-start">
                <Image
                  src="/Valorant/poster/poster.jpg"
                  className=" hover:scale-110 duration-500 rounded-lg "
                  height={180}
                  width={180}
                />
              </div>
              Valorant
            </div>
            </Link>
            

          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <font className="mx-4 w-full">Game Under maintainence</font>
            {data.map((game) =>{
              
              return (
                <>
                <div className="grid text-white justify-items-center text-lg ">
                <div className="flex h-80 w-50 rounded-lg shadow-2xl  border-red-500 border-4 place-self-start">
                  <Image
                    src={game.PosterPath}
                    className=" hover:scale-110 duration-500 rounded-lg "
                    height={180}
                    width={180}
                  />
                </div>
                {game.name}
              </div>
                </>
                )
            })}

          </div>
          
        </div>

        <div className="py-10 w-1/4  w-full justify-items-center text-white bg-black rounded-lg px-3 py-3">
          <font className="justify-center text-3xl">
            Welcome to the sports Tracker!
          </font>
          <p className="mt-4">
            The one Application to Track the stats of Sports & video Games We
            Aim to share and provide the best & accurate stats of Sports and
            video Games..
            <br />
            Do not forget to Connect with Us on Social Media in case you haven&apos;t
          </p>
          <SocialIcons />
        </div>
      </div>

    </>
  );
}
