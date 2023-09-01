from bs4 import BeautifulSoup
from collections import defaultdict
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import string
import json
import requests
developersPage = "https://www.celsoazevedo.com/files/android/google-camera/developers/"
arnovaPage = "https://www.celsoazevedo.com/files/android/google-camera/dev-arnova8G2/"
phoneDownlaodPage = "https://www.celsoazevedo.com/files/android/google-camera/links/"
count = 0



developerList = []
gcamsData = {}
versionCountMap = defaultdict(list)
def getDeveloperURL(developerName):
    url = "https://www.celsoazevedo.com/files/android/google-camera/dev-{}/".format(developerName)
    return url
def getDeveloperList():
    html_doc = requests.get(developersPage).content
    soup = BeautifulSoup(html_doc, 'html.parser')
    devsSection = soup.find('p',attrs={'class':'devs'})
    anchorTags = devsSection.find_all('a')
    # tags = soup.find_all('a')
    developers = {}
    for devSection in devsSection:
        developerName = devSection.text.strip()
        if developerName:
            developers[developerName] = devSection["href"]
            # print(devSection["href"])
    return developers
def extractDate(string):
    start = string.rfind('(')
    end = string.rfind(')')
    if start == -1 or end == -1:
        return ""
    string = string[start + 1 : end]
    array = string.split(',')
    return array[1]
def extractDateAndDevelloper(string):
    start = string.rfind('(')
    end = string.rfind(')')
    if start == -1 or end == -1:
        return ""
    string = string[start + 1 : end]
    array = string.split(',')
    return array[:2]
def extractDeveloperData(developer ,url):
    html_doc = requests.get(url).content
    soup = BeautifulSoup(html_doc, 'html.parser')
    gcamsSection = soup.find('ul',attrs={'class':'listapks'})
    # print(gcamsSection)
    gcamsList = gcamsSection.find_all('li')
    gcamData = []
    global count
    count += len(gcamsList)
    for gcam in gcamsList:
        gcamTag = gcam.find('a')
        gcamDate = extractDate(gcam.text)
        gcamName = gcamTag.text
        gcamVersion = extractGcamVersion(gcamName)
        gcamLink = gcamTag.get('href')
        filterDownloadLink = [gcamLink]
        if len(gcamLink) >= 4 and gcamLink[len(gcamLink) - 4 : ] != '.apk':
            childrenGcams = mapDevelopersGcam(gcamLink)
            # print(gcamLink[len(gcamLink) - 4 : ])
            filterDownloadLink = childrenGcams
        versionCountMap[gcamVersion].append({"name" : gcamName , "downloads" : filterDownloadLink , "developer" : developer , "date" : gcamDate , "version" : gcamVersion })
        gcamData.append({"name" : gcamName , "downloads" : filterDownloadLink , "developer" : developer , "date" : gcamDate , "version" : gcamVersion })
    return gcamData
def extractAllDevelopersData():
    global developerList
    global gcamsData
    developerList = getDeveloperList()
    for developer in developerList:
        print(developer)
        gcamsData[developer] = extractDeveloperData(developer ,developerList[developer])
    return gcamsData

# html_doc = requests.get(phoneDownlaodPage).content
# soup = BeautifulSoup(html_doc, 'html.parser')
# print(soup)
# phonesSection = soup.find_all('details',attrs={'class':'details1 details3'})
# phonesData = {}
# for phoneSection in phonesSection:
#     print(phoneSection.find('summary').text)
# # print(len(phonesSection))
def getSourceName(string):
    if 't.me' in string:
        return 'telegram'
    if 'https://www.celsoazevedo.com/' in string:
        return 'official'
    if 'reddit.com' in string:
        return 'reddit'
    if 'xda-developers.com' in string:
        return 'xda'
def gcamForPhones():
    html_doc = requests.get(phoneDownlaodPage).content
    soup = BeautifulSoup(html_doc, 'html.parser')
    phonesSection = soup.find_all('details', attrs={'class':'details1 details3'})
    phonesData = []
    global count
    count += len(phonesSection)
    for phoneSection in phonesSection:
        downloadLinks = []
        phoneName = phoneSection.find('summary').text.strip()
        phoneName = phoneName[:len(phoneName) - 1].strip()
        # print(phoneName)
        downloadOptions = phoneSection.find_all('a')
        source = defaultdict(list)
        # print(downloadOptions)
        for downloadOption in downloadOptions:
            # print(downloadOption.get('href'))
            sourceName = getSourceName(downloadOption.get('href'))
            anchorText = downloadOption.text
            if not sourceName :
                continue
            source[sourceName].append({
                "anchorText" : anchorText,
                "downloadLink" : downloadOption.get('href')
            })
        # print('source is', source.keys())
        print(source)
        phonesData.append( {"phoneName" : phoneName , "source" : source } )
    phoneMap = defaultdict(list)
    for phoneData in phonesData[1:]:
        name = phoneData["phoneName"]
        brand = name[:name.find(' ')].strip()
        brand[0].upper()
        print(brand)
        phoneMap[brand].append(phoneData)
    print(phoneMap.keys())
    return phoneMap

def mapDevelopersGcam(url):
    html_doc = requests.get(url).content
    soup = BeautifulSoup(html_doc, 'html.parser')
    gcamsDownloadSection= soup.find('div', attrs={'class':'contentarticle'})
    gcamsList = gcamsDownloadSection.find('ul').find_all('li')
    # print(gcamsList)
    gcamData = []
    filterDownloadLink = []
    for gcam in gcamsList:
        gcamAnchor = gcam.find('a')
        # print(gcamAnchor)
        gcamName = gcamAnchor.text
        gcamDownloadLink =  gcamAnchor.get('href')

        filterDownloadLink.append({ "name" : gcamAnchor.text , "downloadLink" : gcamDownloadLink })
    return { "name" : gcamName, "childLink" : filterDownloadLink , "parentLink" : url }
    # print(gcamData)
def extractGcamVersion(string):
    global versionCountMap
    start = 0
    for i in range(start, len(string)):
        if string[i : i + 1].isdigit() and string[i] != '0' and i + 2 < len(string):
            if i - 1 > 0 and string[i-1].isdigit() == True:
                break
            if string[i+1] == '.':
                if string[i+2 : i + 3].isdigit():
                    version = string[i:i + 3]
                    return version
 
    return '-'
def gatherAllData():
    extractAllDevelopersData()
    global developerList
    global gcamsData 
    global versionCountMap
    phonesData = gcamForPhones()
    stableGcam = stableGcams()
    developerListJson = json.dumps(developerList, indent=4)
    gcamsDataJson = json.dumps(gcamsData, indent=4)
    versionCountMapJson = json.dumps(versionCountMap, indent=4)
    phonesDataJson = json.dumps(phonesData, indent=4)
    with open("developerList.txt", "a") as f:
        print(developerListJson, file=f)
    with open("gcamsData.txt", "a") as f:
        print(gcamsDataJson, file=f)
    with open("versionCountMap.txt", "a") as f:
        print(versionCountMapJson, file=f)
    with open("phonesData.txt", "a") as f:
        print(phonesDataJson, file=f)
    with open("stableGcams.txt", "a") as f:
        print(stableGcam, file=f)

def uploadData():
    uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority"
    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        stableGcam = stableGcams()
        extractAllDevelopersData()
        global developerList
        global gcamsData 
        global versionCountMap
        phonesData = gcamForPhones()
        
        db = client["Webscrap-GCAM"]

        mycol = db["phonesData"]
        resultList = [{ "phoneBrand" : key , "data" : value} for key, value in phonesData.items()]
        mycol.insert_many(resultList)

        mycol = db["developerList"]
        resultList = [{ "developerName" : key, "data" : value} for key, value in developerList.items()]
        mycol.insert_many(resultList)

        mycol = db["gcamsData"]
        resultList = [{ "developerName" : key , "data" : value} for key, value in gcamsData.items()]
        mycol.insert_many(resultList)

        mycol = db["gcamVersionsData"]
        myKeys = list(versionCountMap.keys())
        myKeys.sort()
        myKeys = myKeys[::-1]
        sorted_dict = {i: versionCountMap[i] for i in myKeys}
        # resultList = [{ "version" : key , "count" : value} for key, value in versionCountMap.items()]
        mycol.insert_one(sorted_dict)

        mycol = db["stableGcams"]
        mycol.insert_many(stableGcam)


        print("Pinged your deployment. You successfully connected to MongoDB!")
        client.close()
    except Exception as e:
        print(  e)
def stableGcams():
    html_doc = requests.get('https://www.celsoazevedo.com/files/android/google-camera/dev-suggested/').content
    soup = BeautifulSoup(html_doc, 'html.parser')
    gcamsDownloadSection= soup.find_all('details', attrs={'class':'details1 details3'}) 

    gcamData = []
    for gcamDownloadSection in gcamsDownloadSection:
        print('tes')
        summary = gcamDownloadSection.find('summary')
        requiredAndroid = summary.find('small').text.strip()
        gcamSummary = summary.text
        gcamSummary = gcamSummary[:-1].strip()

        requiredAndroid = requiredAndroid[1:-2]
        apkList = gcamDownloadSection.find_all('ul',attrs={'class':'listapks'})
        data = []
        for apkLine in apkList:
            apk = apkLine
            gcamName = apk.find('a').text
            gcamVersion = extractGcamVersion(gcamName)
            apk = apk.text
            [developer , date] = extractDateAndDevelloper(apk)
            date = date.strip()
            developer = developer.strip()
            info = apkLine.find('strong').text.strip()
            while info[-1] in string.punctuation: 
                print("yes")
                info = info[:-1]
            data.append({
                    "name" :gcamName,
                    "developer" :developer,
                    "date" :date,
                    "info" : info,
                    "version" : gcamVersion
             })
            versionCountMap[gcamVersion].append({
                    "name" :gcamName,
                    "developer" :developer,
                    "date" :date,
                    "info" : info,
                    "version" : gcamVersion
             })
            print(gcamName)
            print(developer)
            print(date)
            print(info)
        gcamData.append(
            {
                "requiredAndroidVersion" :requiredAndroid,
                "gcamSummary" : gcamSummary,
                "data" : data
            }
        )
    print(gcamData)
    return gcamData

# This is added so that many files can reuse the function get_database()
uploadData()

# gatherAllData()
# print(gcamForPhones())
# extractAllDevelopersData()
# print( versionCountMap , len(versionCountMap))

# pretty = json.dumps(extractAllDevelopersData(), indent=4)
# with open("output.txt", "a") as f:
#   print(pretty, file=f)
#   print(pretty)
