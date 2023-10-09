import Link from 'next/link';
import React from 'react';
import Navbar from "@/Components/Navbar";
import Head from 'next/head';
export async function getStaticProps(){
  const data = {}
    return {
      props :{
          data 
      },
    }
}
function AboutUs() {
  return (
<>
<Head>
<title> AboutUs</title>
<link rel="canonical" href= {`https://apkhub.mobi/about`} />
</Head>
<Navbar className="z-30 "/>
<div className="bg-white p-8 rounded-lg shadow-lg">
  <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

  <p className="text-lg leading-relaxed mb-4">
    Welcome to <Link href={'/'}><span className="text-blue-500 font-semibold">apkhub.mobi</span></Link>, your ultimate destination for all things tech, sports, video games, and apps. We&apos;re passionate about delivering the latest updates, news, and reviews in the world of technology and entertainment.
  </p>

  <p className="text-lg leading-relaxed mb-4">
    Our team of dedicated tech enthusiasts and gamers is committed to providing you with insightful articles, comprehensive reviews, and helpful guides. Whether you&apos;re a tech-savvy individual looking for the newest gadgets or a gaming enthusiast seeking game reviews and tips, we&apos;ve got you covered.
  </p>

  <p className="text-lg leading-relaxed mb-4">
    At <Link href={'/'}><span className="text-blue-500 font-semibold">apkhub.mobi</span></Link>, we believe in the power of information and strive to keep you informed and entertained. Our goal is to create a vibrant community where tech enthusiasts, sports fans, and gamers can come together to explore, learn, and share their passion.
  </p>

  <p className="text-lg leading-relaxed mb-4">
    We appreciate your support and hope you enjoy your time exploring our website. If you have any questions, suggestions, or feedback, please don&apos;t hesitate to <Link href="/contact" className="text-blue-500 hover:underline">contact us</Link>. We value your input and look forward to hearing from you.
  </p>

  <p className="text-lg">
    Thank you for visiting <Link href={'/'}><span className="text-blue-500 font-semibold">apkhub.mobi</span></Link>!
  </p>
</div></>
  );
}

export default AboutUs;
