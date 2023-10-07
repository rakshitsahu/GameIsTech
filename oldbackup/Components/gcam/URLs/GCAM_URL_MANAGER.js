import { GCAM_GET_REQUEST } from "@/API/GET_API_Manager";
import { getAllPathsForDeveloperPage } from "@/pages/apps/gcam/developer/[developer]";
import { getAllPathsForGcamDownload } from "@/pages/apps/gcam/download/[...gcam]";
import { getAllPathsForPhoneDownloadPage } from "@/pages/apps/gcam/phones/[...phone]";
import { getAllPathsForPhonePage } from "@/pages/apps/gcam/phones/[phone]";
import { getAllPathsForVersionPage } from "@/pages/apps/gcam/version/[version]";
import GCAM_URL_STATE from "./GCAM_URL_STATE";
const url = "https://apkhub.mobi";


async function getGcamVersions() {
  const result = await getAllPathsForVersionPage()
  // console.log(result[1])
  var urls = [];
  result[1].forEach((element) => {
    urls.push( url + "/apps/gcam/version/"+ `${element}`);
  });
  return urls;
}
async function getGcamDeveloper() {
  const result = await getAllPathsForDeveloperPage()
  // console.log(result[1])
  var urls = [];
  result[1].forEach((element) => {
    urls.push( url + "/apps/gcam/developer/"+ `${element}`);
  });
  return urls;
}
async function getGcamPhoneBrands() {
  const result = await getAllPathsForPhonePage()
  // console.log(result[1])
  var urls = [];
  result[1].forEach((element) => {
    urls.push( url + "/apps/gcam/phones/"+ `${element}`);
  });
  return urls;
}

async function getGcamPhone() {
  const result = await getAllPathsForPhoneDownloadPage()
  // console.log(result[1])
  var urls = [];
  result[1].forEach((element) => {
    urls.push( url + "/apps/gcam/phones/"+ `${element[0]}/${element[1]}`);
  });
  return urls;
}

async function getGcamDownloadPage() {
  const result = await getAllPathsForGcamDownload()
  // console.log(result[0])
  var urls = [];
  result[1].forEach((element) => {
    urls.push( url + "/apps/gcam/download/"+ `${element[0]}/${element[1]}`);
  });
  return urls;
}

async function getDownlaodUrl(prefix, STATE) {
  const result = await GCAM_GET_REQUEST(STATE);
  var urls = [];
  result.forEach((element) => {
    const developerName = encodeURIComponent(element.developerName);
    const gcamName = encodeURIComponent(element.name);
    urls.push(url + prefix + `${developerName}/${gcamName}`);
  });
  return urls;
}
 export async function GCAM_URLS(STATE) {
  switch (STATE) {
    case GCAM_URL_STATE.GcamVersionPage:
      return getGcamVersions()
      break;
    case GCAM_URL_STATE.DeveloperPage:
      return getGcamDeveloper();
      break;
    case GCAM_URL_STATE.PhoneBrandPage:
      return getGcamPhoneBrands();
      break;
    case GCAM_URL_STATE.PhonePage:
      return getGcamPhone();
      break;
    case GCAM_URL_STATE.DownloadPage:
      return getGcamDownloadPage() ;
      break;
    case GCAM_URL_STATE.Home:
      return [url];
      break;
    case GCAM_URL_STATE.All:
      const [GcamVersionPage, DeveloperPage, PhoneBrandsPage, GcamPage , GcamDownloadPage] = await Promise.all([
        getGcamVersions(),
        getGcamDeveloper(),
        getGcamPhoneBrands(),
        getGcamPhone(),
        getGcamDownloadPage()
      ])
        .then((results) => {
          return results
        })

        const home = [url]
        const allUrls = [...GcamVersionPage, ...DeveloperPage, ...PhoneBrandsPage, ...GcamPage , ...GcamDownloadPage,
         ...home
         ]
         console.log(allUrls.length)
      return allUrls;
      break;
    default:
      break;
  }
}
