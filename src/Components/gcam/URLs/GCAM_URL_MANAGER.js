import GCAM_API_STATE from "@/Components/API/API_States";
import { GCAM_GET_REQUEST } from "@/Components/API/API_Manager";
import GCAM_URL_STATE from "./GCAM_URL_STATE";
const url = "http://localhost:3000/gcam/";

async function getUrls(prefix, STATE) {
  const result = await GCAM_GET_REQUEST(STATE);
  var urls = [];
  
  result.forEach((element) => {
    urls.push(url + prefix + `${element.name}`);
  });
  return urls;
}

async function getPhonePageUrls(prefix, STATE) {
  const result = await GCAM_GET_REQUEST(STATE);
  var urls = [];
  result.forEach((element) => {
    const brandName = element.brand.replaceAll(" ", "-");
    const deviceName = element.name.replaceAll(" ", "-");
    urls.push(url + prefix + `${brandName}/${deviceName}`);
  });
  return urls;
}
async function getDownlaodUrl(prefix, STATE) {
  const result = await GCAM_GET_REQUEST(STATE);
  var urls = [];
  result.forEach((element) => {
    const developerName = element.developerName.replaceAll(" ", "-");
    const gcamName = element.name.replaceAll(" ", "-");
    urls.push(url + prefix + `${developerName}/${gcamName}`);
  });
  return urls;
}
 export async function GCAM_URLS(STATE) {
  switch (STATE) {
    case GCAM_URL_STATE.GcamVersionPage:
      return getUrls("version/" , GCAM_API_STATE.GcamVersions);
      break;
    case GCAM_URL_STATE.DeveloperPage:
      return getUrls("developer/" , GCAM_API_STATE.DeveloperNames);
      break;
    case GCAM_URL_STATE.PhoneBrandPage:
      return getUrls("phones/" , GCAM_API_STATE.PhoneBrands);
      break;
    case GCAM_URL_STATE.PhonePage:
      return getPhonePageUrls("phones/" , GCAM_API_STATE.GcamPost);
      break;
    case GCAM_URL_STATE.DownloadPage:
      return getDownlaodUrl("download/" , GCAM_API_STATE.Gcam);
      break;
    case GCAM_URL_STATE.AndroidVersionPage:
        const urls = getUrls("android/" , GCAM_API_STATE.Androidversions);
        console.log(urls)
      return urls
      break;
    case GCAM_URL_STATE.Home:
      return [url];
      break;
    case GCAM_URL_STATE.All:
        const GcamVersionPage = await getUrls("version/" , GCAM_API_STATE.GcamVersions);
        const DeveloperPage =await getUrls("developer/" , GCAM_API_STATE.DeveloperNames);
        const PhoneBrandPage =await getUrls("phones/" , GCAM_API_STATE.PhoneBrands);
        const PhonePage =await getPhonePageUrls("phones/" , GCAM_API_STATE.GcamPost);
        const DownloadPage =await getDownlaodUrl("download/" , GCAM_API_STATE.Gcam);
        const AndroidVersionPage =await getUrls("android/" , GCAM_API_STATE.Androidversions);
        const home = [url]
        const allUrls = [...GcamVersionPage, ...DeveloperPage, ...PhoneBrandPage, ...PhonePage , ...DownloadPage,
        ...AndroidVersionPage , ...home
         ]
      return allUrls;
      break;
    default:
      break;
  }
}
