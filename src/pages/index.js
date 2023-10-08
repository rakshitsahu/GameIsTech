import Image from "next/image";
import Head from "next/head";
import Script from 'next/script'
import Navbar from "@/Components/Navbar";
export async function getStaticProps(){
  const data = {}

    return {
      props :{
          data 
      },
      // revalidate: 10,
    }
}
export default function Home() {
  
  // console.log('execution came till heree')
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
  const description = `GameIsTech is a website all about Gaming, Technology & Apps.`
  const title = `Epoch of Gaming, Technology & Apps`

  return (
    <>

<Head>
<title>{title}</title>
<meta
  name="description"
  content= {description}
  key="desc"
/>
<meta name="robots" content="index, follow"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<div className="container">

<Script src="https://www.googletagmanager.com/gtag/js?id=G-NQJL28G8E0" />
<Script id="google-analytics">
  {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NQJL28G8E0');
  `}
</Script>
</div>
</Head> 
<div className="w-screen h-screen">
<div className="navbar_section p-10">
<Navbar className="w-full"/>
</div>
</div>   


    </>
  );
}
