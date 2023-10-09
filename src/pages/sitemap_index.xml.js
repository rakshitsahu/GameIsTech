import GCAM_API_STATE from "@/API/API_States";
import { GCAM_GET_REQUEST } from "@/API/GET_API_Manager";
import GCAM_URL_STATE from "@/Components/gcam/URLs/GCAM_URL_STATE";
import { GCAM_URLS } from "@/Components/gcam/URLs/GCAM_URL_MANAGER";
// <url>
// <loc>https://jsonplaceholder.typicode.com</loc>
// </url>
// <url>
// <loc>https://jsonplaceholder.typicode.com/guide</loc>
// </url>
const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';
function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->

     ${Object.keys(posts)
       .map((id) => {
         return `
       <url>
           <loc>${`${posts[id]}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
function encryptAllUrls(urlList){
  const newUrlList = []
}
export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const allData = await GCAM_URLS(GCAM_URL_STATE.All)

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(allData);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;