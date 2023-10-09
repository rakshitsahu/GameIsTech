import React from 'react';
import Navbar from "@/Components/Navbar";
import Link from 'next/link';
import Head from 'next/head';
export async function getStaticProps(){
    const data = {}
      return {
        props :{
            data 
        },
      }
  }
function ContactUs() {
  // Replace this email address with your own
  const email = 'rakshitsahu20@gmail.com';

  return (
<>
<Head>
<title> ContactUs</title>
<link rel="canonical" href= {`https://apkhub.mobi/contact`} />
</Head>
<Navbar className="z-30 "/>
<div className="bg-white p-8 rounded-lg shadow-lg">
  <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

  <p className="text-lg leading-relaxed mb-4">
    Have a question, suggestion, or just want to get in touch? You can reach us at:
  </p>

  <p className="text-xl font-semibold text-blue-500 mb-2">{email}</p>

  <p className="text-lg leading-relaxed mb-6">
    We&apos;d love to hear from you and will do our best to respond promptly to your inquiries.
  </p>

  <p className="text-lg">
    Thank you for choosing <Link href={'/'}><span className="text-blue-500 font-semibold">apkhub.mobi</span></Link>!
  </p>
</div>
</>
  );
}

export default ContactUs;
