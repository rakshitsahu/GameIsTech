import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import Script from 'next/script';
export default function App({ Component, pageProps }) {
  
  return<>
  <div className="container">
  <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5978783053272716"
  crossorigin="anonymous"></Script>
  <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-XQQXBF2PXL`} />
  <Script strategy="lazyOnload" id="google-analytics">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-XQQXBF2PXL');
    `}
  </Script>
</div>
  <NextNProgress />
<Component {...pageProps} />
</> 

  
}
