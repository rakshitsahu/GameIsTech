import Image from "next/image";
import Head from "next/head";
import Script from 'next/script'
import Navbar from "@/Components/Navbar";
import Link from "next/link";
export async function getServerSideProps(){
  const data = {}
    return {
      props :{
          data 
      },
    }
}
export default function Home() {

  const description = `GameIsTech is a website all about Gaming, Technology & Apps.`
  const title = `Epoch of Gaming, Technology & Apps`
  const HeadingCss = ''
  const MarginCss = 'mt-5'
  const descriptionCss = 'text-xl font-thin'
  console.log("worked till here on homepage")
  return (
    <div>
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
<Navbar className="z-30"/>
</div>
<div className= {`${MarginCss}` }>

<div className="grid justify-items-center bg-white ">
<span className="grid justify-items-center m-4 large-shadow p-8 rounded-2xl">
<center>
<h1 className=" font-thin flex text-3xl flex-wrap lg:text-8xl xl:text-8xl md:text-8xl ">GameIsTech</h1>
</center>
<h4 className={`${MarginCss} mt-2 justify font-mono decoration-blue-500 underline`}>GameIsTech is all about Sports, Gaming & Apps</h4>
</span>
</div>

<div className={`${descriptionCss} ${MarginCss}`}>
GameIsTech is just started, At the moment I have only Google Camera Ports for you.
stay tuned much more to come.
<div className="m-4 large-shadow p-8 rounded-2xl">
<h4 className="text-3xl ">Apps:</h4>

<Link rel="canonical" href= {`/apps/gcam`}>
<button className="grid mt-3 justify-items-center border-2 rounded-2xl p-3">
<Image src='/gcam/gcam.jpg'
width={120}
height={120}
alt="Google Camera"/>
<font> Gcam</font>
</button>
</Link>
</div>
</div>
</div>
</div>   
    </div>
  );
}
