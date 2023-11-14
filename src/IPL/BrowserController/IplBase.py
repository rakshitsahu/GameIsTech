from abc import ABC, abstractmethod
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ActionChains
from selenium.common.exceptions import TimeoutException
import re
import requests
import random
SEASON = "seasons"
MEN = "men"
WOMEN = "women"
PLAYERS = "players"
CAPTAIN_ICON ="https://www.iplt20.com/assets/images/teams-captain-icon.svg"
BrowserTabLimit = 1
teamDictonary = {
    "men" : [
        {
    "fullName" : "",
    "shortName" : "",
    "seasons" : {
        "2023" : {
            "players" : {
                "batters" : [],
                "all-Rounders" : [],
                "Bowlers" : [],
                "wicketKeepers" : []
            },
            "totalMatches" : 0,
            "matchesWon" : 0,
            "matchesLost" : 0,
            "nrr" : "",
            "against" : "",
            "points" : 0 
        }
    },
    "recentForm" : [],
    "seasonWins":[],
    "owner" : "",
    "coach" : "",
    "Venue" : ""
    }
    ],

    "women" : []
}
IplFirstSeason = 2008
IplLastSeason = 2023
pageNotFoundMessage = "oop's something went wrong" 
class BrowserBase:
    acceptCookiesXpath = "(//button[normalize-space()='Accept cookies'])[1]"
    def __init__(self):
        self.driver = webdriver.Firefox()
        self.url = ""
    def GetHTMLByPageSource(self):
        html_content = self.driver.page_source
        html_content_cleaned = html_content.encode('utf-8', 'replace').decode('utf-8')
        soup = BeautifulSoup(html_content_cleaned, 'html.parser')
        return soup
    def WaitForElement(self,_by , _for):
        wait = WebDriverWait(self.driver, 100)
        return wait.until(EC.presence_of_element_located((_by, _for)))
    def OpenWindow(self,URL):
        self.driver.get(URL)
        # self.AcceptCookies()
    def GetHTML(self,className, _by ):
        return self.GetHTMLByPageSource()
    def ClickElement(self , _by , _for):
        button = self.WaitForElement(_by , _for)
        button.click()
        return True
    def AcceptCookies(self):
        self.ClickElement(By.XPATH , self.acceptCookiesXpath)
    def  GetSourceCodeByXpath(self,xpath, timeout = 10):
        selenium_element = self.WaitForElement(By.XPATH, xpath)
        selenium_element_html = selenium_element.get_attribute("outerHTML")
        soup_element = BeautifulSoup(selenium_element_html, 'html.parser')
        return soup_element
    def ScrollIntoView(self,element):
        self.driver.execute_script("arguments[0].scrollIntoView(true);", element)
    def IsClickableElement(self,element, timeout=10):
        try:
            wait = WebDriverWait(self.driver, timeout)
            wait.until(EC.element_to_be_clickable(element))
            return True
        except TimeoutException:
            return False
        

class IplBase(BrowserBase):
    browserTabObjects = []

    def __init__(self):
        super().__init__()
    def GetBrowserObject(self):
        #TODO must be fixed while using multithreading

        if len(self.browserTabObjects) == BrowserTabLimit:
            random_index = random.randrange(len(self.browserTabObjects))
            print("array length is ", len(self.browserTabObjects) ,random_index )
            return self.browserTabObjects[random_index]
        newIplBaseObject = IplBase()
        self.browserTabObjects.append(newIplBaseObject)
        return newIplBaseObject
    def GetTeamPlayers(self,URL):
        self.OpenWindow(URL)
        def isCaptain(imgTags):
            for imgTag in imgTags:
                if imgTag.get('src') == CAPTAIN_ICON:
                    return True
            return False
        teamPlayersJson = {}
        def PlayerDetailFromPlayerPage(URL):
            playerPageObject = self.GetBrowserObject()
            playerPageObject.OpenWindow(URL)
        def PlayerDetailFromPlayerCard (playerCard):
            imagePath = playerCard.find('div',{"class": "ih-p-img"}).find('img').get('src')
            playerList = []
            imgTags = playerCard.find('div',{"class": "teams-icon"}).find('span').find_all("img")
            roleSvg = playerCard.find('div',{"class": "teams-icon"}).find_all("img")[-1].get("src")
            playerId = playerCard.find('a').get('href').split('/')[-1]
            playerName = playerCard.find('div',{"class": "ih-p-name"}).text
            playerRole = playerCard.find('span',{"class": "d-block"}).text
            playerJson = {}
            playerJson["Image"] = imagePath.strip()
            playerJson["Role"] = playerRole.strip()
            playerJson["Name"] = playerName.strip()
            playerJson["Id"] = playerId.strip()
            if teamPlayersJson.get(playerRole) == None:
                teamPlayersJson[playerRole] = []
            teamPlayersJson[playerRole].append(playerJson)
            if isCaptain(imgTags):
                teamPlayersJson['Captain'] = playerJson
                print("Captain is *******************"+ playerName)
            # print(playerName , playerRole , playerId , roleSvg , imagePath, isCaptain(imgTags) )
            # print(teamPlayersJson)
            return (playerName , playerRole , playerId , roleSvg , imagePath, isCaptain(imgTags))
        soup = ipl.GetHTMLByPageSource()
        playerCards = soup.find_all('li',{"class": "dys-box-color"})
        for card in playerCards:
            teamDataJson = {}
            playerName , playerRole , playerId , roleSvg , imagePath, captain = PlayerDetailFromPlayerCard(card)
            playPageUrl = card.find('a').get('href')
            PlayerDetailFromPlayerPage(playPageUrl)
            print(playPageUrl)
        
    def PageExists(self,url):
        html_doc = requests.get(url).content
        soup = BeautifulSoup(html_doc, 'html.parser').text
        # print(soup)
        result = soup.find(pageNotFoundMessage) == -1
        # print(result)
        # print(soup.find(pageNotFoundMessage))
        return result
    def GetTeamAllSeasonData(self, baseUrl):
        for season in range(IplFirstSeason , IplLastSeason + 1):
            seasonUrl = baseUrl + str(season)
            if self.PageExists(seasonUrl):
                self.GetTeamPlayers(seasonUrl)
                print("data found for season "+str(season))
            else:
                print("data not found for season "+str(season))

# dys-box-color
ipl = IplBase()
# ipl.GenericTeam("https://www.iplt20.com/teams/chennai-super-kings/squad/")
# ipl.OpenWindow("https://www.iplt20.com/teams/chennai-super-kings/squad/")
# soup = ipl.GetHTMLByPageSource()
# result = soup.find_all('li',{"class": "dys-box-color"})
# for row in result:
#     print(row.text)
# print(len(result))
# ipl.GetTeamPlayers("https://www.iplt20.com/teams/chennai-super-kings/squad-details/297")
ipl.GetTeamPlayers("https://www.iplt20.com/teams/chennai-super-kings/squad/2009")

# ipl.GetTeamAllSeasonData("https://www.iplt20.com/teams/chennai-super-kings/squad/")



