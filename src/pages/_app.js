import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import Script from 'next/script';
export default function App({ Component, pageProps }) {
  
  return<>
  <div className="container">
  <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`} />
  <Script strategy="lazyOnload" id="google-analytics">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${process.env.GOOGLE_ANALYTICS}');
    `}
  </Script>
</div>

  <NextNProgress />
<Component {...pageProps} />
</> 

  
}
