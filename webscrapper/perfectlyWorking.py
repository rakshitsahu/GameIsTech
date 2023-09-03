from bs4 import BeautifulSoup
from collections import defaultdict
import json
import requests
developersPage = "https://www.celsoazevedo.com/files/android/google-camera/developers/"
arnovaPage = "https://www.celsoazevedo.com/files/android/google-camera/dev-arnova8G2/"
phoneDownlaodPage = "https://www.celsoazevedo.com/files/android/google-camera/links/"
count = 0



developerList = []
gcamsData = {}
versionCountMap = defaultdict(int)
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

def extractDeveloperData(url):
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
            filterDownloadLink = childrenGcams["childLink"]
        gcamData.append({"name" : gcamName , "downloadLink" : filterDownloadLink , "date" : gcamDate , "gcamVersion" : gcamVersion })
    return gcamData
def extractAllDevelopersData():
    global developerList
    global gcamsData
    developerList = getDeveloperList()
    for developer in developerList:
        print(developer)
        gcamsData[developer] = extractDeveloperData(developerList[developer])
    return gcamsData

# html_doc = requests.get(phoneDownlaodPage).content
# soup = BeautifulSoup(html_doc, 'html.parser')
# print(soup)
# phonesSection = soup.find_all('details',attrs={'class':'details1 details3'})
# phonesData = {}
# for phoneSection in phonesSection:
#     print(phoneSection.find('summary').text)
# # print(len(phonesSection))

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
        # print(downloadOptions)
        for downloadOption in downloadOptions:
            # print(downloadOption.get('href'))
            downloadLinks.append(downloadOption.get('href'))
        phonesData.append( {"name" : phoneName , "downloadLinks" : downloadLinks } )
    phoneMap = defaultdict(list)
    for phoneData in phonesData[1:]:
        name = phoneData["name"]
        brand = name[:name.find(' ')]
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
        filterDownloadLink.append(gcamDownloadLink)
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
                    versionCountMap[version] += 1
                    return version
    versionCountMap['-'] += 1
    return '-'
def gatherAllData():
    extractAllDevelopersData()
    global developerList
    global gcamsData 
    global versionCountMap
    phonesData = gcamForPhones()[1:]

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

gatherAllData()
# print(gcamForPhones())
# extractAllDevelopersData()
# print( versionCountMap , len(versionCountMap))

# pretty = json.dumps(extractAllDevelopersData(), indent=4)
# with open("output.txt", "a") as f:
#   print(pretty, file=f)
#   print(pretty)
