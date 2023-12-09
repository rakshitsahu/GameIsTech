from abc import ABC, abstractmethod
from bs4 import BeautifulSoup
import json
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
from multiprocessing import Pool
from multiprocessing import Process
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from collections import defaultdict
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import string
import json
import requests
teamPlayersJson = {}
playersDataJson = {}
playerCounterDebug = 0
TeamDataCollection = "Team-Data"
PlayerDataCollection = "Player-Data"
IplDataBase = "Ipl-DataBase"
SEASON = "seasons"
MEN = "men"
WOMEN = "women"
PLAYERS = "players"
CAPTAIN_ICON ="https://www.iplt20.com/assets/images/teams-captain-icon.svg"
BrowserTabLimit = 1
uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
TeamNamesJson = [
{
    "FullName" : "Chennai Super Kings",
    "ShortName" : "CSK"
},
{
    "FullName" : "Delhi Capitals",
    "ShortName" : "DC"
},
{
    "FullName" : "Gujarat Titans",
    "ShortName" : "GT"
},
{
    "FullName" : "Kolkata Knight Riders",
    "ShortName" : "KKR"
},
{
    "FullName" : "Lucknow Super Giants",
    "ShortName" : "LSG"
},
{
    "FullName" : "Mumbai Indians",
    "ShortName" : "MI"
},
{
    "FullName" : "Punjab Kings",
    "ShortName" : "PK"
},

{
    "FullName" : "Rajasthan Royals",
    "ShortName" : "RR"
},
{
    "FullName" : "Royal Challengers Bangalore",
    "ShortName" : "RCB"
},
{
    "FullName" : "Sunrisers Hyderabad",
    "ShortName" : "SRH"
},
]
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
TEAMS_PAGE = "https://www.iplt20.com/teams"
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
        wait = WebDriverWait(self.driver, 10)
        return wait.until(EC.presence_of_element_located((_by, _for)))
    def OpenWindow(self,URL):
        self.driver.get(URL)
    def CloseWindow(self):
        self.driver.quit()
    def OpenInNewTab(self,URL):
        if len(self.driver.window_handles) == 0:
            self.OpenWindow(URL)
        else:
            self.driver.execute_script("window.open('', '_blank');")
            # Switch to the new tab
            self.driver.switch_to.window(self.driver.window_handles[-1])
            # Open a website in the new tab
            self.driver.get(URL)
    def OpenInLastTabAfterLimit(self,LIMIT , URL , xpath = ""):
        if len(self.driver.window_handles) < LIMIT:
            self.OpenInNewTab(URL)
        else:
            self.driver.switch_to.window(self.driver.window_handles[-1])
            self.driver.get(URL)
    def OpenInTabNo(self,TabNo,URL):
        if len(self.driver.window_handles) < TabNo:
            self.OpenWindow(URL)
        else:
            self.driver.switch_to.window(self.driver.window_handles[TabNo-1])
            self.OpenWindow(URL)

    def GetHTML(self,className, _by ):
        return self.GetHTMLByPageSource()
    def ClickElement(self , _by , _for):
        button = self.WaitForElement(_by , _for)
        if self.IsClickableElement(button):
            button.click()
        time.sleep(0.3)
        return True
    def AcceptCookies(self):
        self.ClickElement(By.XPATH , self.acceptCookiesXpath)
    def  GetSourceCodeByXpath(self,xpath, timeout = 100):
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

        
playerPageMap = {}
def ToPascalCase(s):
    words = s.split(' ')  # Split the string into words using underscores
    return ''.join(word.capitalize() for word in words)
    
class IplBase(BrowserBase):
    browserTabObjects = []

    def __init__(self):
        super().__init__()
    def GetBrowserObject(self):
        #TODO must be fixed while using multithreading
        
        if len(self.browserTabObjects) == BrowserTabLimit:
            random_index = random.randrange(len(self.browserTabObjects))
            return self.browserTabObjects[random_index]
        newIplBaseObject = IplBase()
        self.browserTabObjects.append(newIplBaseObject)
        return newIplBaseObject
    def WaitForLoaderToDisappear(self):
        loader = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "loader-main")))
        WebDriverWait(self.driver, 10).until(EC.invisibility_of_element(loader))
    def GetTeamName(self ,teamName : str):
        global TeamNamesJson
        for teamNameJson in TeamNamesJson:
            if teamNameJson["ShortName"].strip().lower() == teamName.strip().lower() or teamNameJson["FullName"].strip().lower() == teamName.strip().lower():
                return teamNameJson
        raise ValueError("++++++++++++++++++THE TEAM NAME IS NOT FOUND IN JSON+++++++++++++++++++")
    def UpdatePlayerDataOfGivenId(self ,playerData):
        global IplDataBase
        global PlayerDataCollection
        global client
        print("UpdatePlayerDataOfGivenId has been called" , len(playerData.keys()))
        database = client[IplDataBase]
        collection = database[PlayerDataCollection]
        # Specify the key and the new value you want to set
        # Update the first document that contains the specified key
        result = collection.insert_one(playerData)
        # result = collection.update_one({}, {"$set": playerData})
        print("Result found is " , result.acknowledged)


    def GetTeamPlayers(self,URL):
        global playersDataJson
        global playerCounterDebug
        def isCaptain(imgTags):
            for imgTag in imgTags:
                if imgTag.get('src') == CAPTAIN_ICON:
                    return True
            return False

        def ExtractTableDetails(table):
            headings = table.find('thead').findAll('th')
            tableRows = table.findAll('tr')
            dataJson = {}
            for tableRow in tableRows[1:]:
                tdTags = tableRow.findAll('td')
                rowDataJson = {}
                for i in range(1 , len(tdTags)):
                    heading = headings[i].text.strip()
                    rowDataJson[heading] = tdTags[i].text.strip()
                leftHeading = tdTags[0].text.strip()
                dataJson[leftHeading] = rowDataJson

            return dataJson
        
        def PlayerDetailFromPlayerPage(URL):

            playerStatsTableXpath = "//div[@class='SMplayerStatsWidget ng-scope']"
            self.OpenInLastTabAfterLimit(2,URL,playerStatsTableXpath)
            self.WaitForElement(By.XPATH,playerStatsTableXpath)
            SourceCode = self.GetHTMLByPageSource()
            playerNationality = SourceCode.find('div', {"class":"plyr-name-nationality"}).find('span').text
            playerDetailGridArray = SourceCode.find('div', {"class":"player-overview-detail"}).find_all('div' , {"class": "grid-items"})
            playerMatchesPlayed = playerDetailGridArray[3].find('p').text
            playerIplDebut = playerDetailGridArray[0].find('p').text
            playerDob = playerDetailGridArray[2].find('p').text
            statsTable = SourceCode.findAll('table', 'sm-pp-table')
            BattingAndFieldingStats = ExtractTableDetails(statsTable[0])
            BowlingStats = ExtractTableDetails(statsTable[0])
            playerJson = {"Nationality": playerNationality.strip(), "MatchesPlayed": playerMatchesPlayed.strip() , "IplDebut": playerIplDebut.strip() , "Dob":playerDob.strip() , "BattingAndFielding" :BattingAndFieldingStats , "BowlingStats" :BowlingStats }
            return playerJson
        def PlayerDetailFromPlayerCard (playerCard):
            global playerPageMap
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
            if isCaptain(imgTags):
                playerJson['Captain'] = playerJson
            return playerJson
        self.OpenInTabNo(1,URL)
        soup = self.GetHTMLByPageSource()
        playerCards = soup.find_all('li',{"class": "dys-box-color"})
        for card in playerCards:
            playerJson = PlayerDetailFromPlayerCard(card)
            if playersDataJson.get(playerJson["Id"]) != None:
                continue
            playPageUrl = card.find('a').get('href')
            playerJson.update(PlayerDetailFromPlayerPage(playPageUrl))
            if teamPlayersJson.get(playerJson["Role"]) == None:
                teamPlayersJson[playerJson["Role"]] = []
            teamPlayersJson[playerJson["Role"]].append(playerJson)
            teamPlayersJson['Captain'] = playerJson
            
            if(playersDataJson.get(playerJson["Id"]) == None):
                playersDataJson[playerJson["Id"]] = playerJson
            playerPageMap[playerJson["Id"]] = playerJson
            playerCounterDebug += 1
        print("total is", playerCounterDebug)
    
        
    def PageExists(self,url):
        html_doc = requests.get(url).content
        soup = BeautifulSoup(html_doc, 'html.parser').text
        result = soup.find(pageNotFoundMessage) == -1
        return result
    def GetTeamAllSeasonData(self, baseUrl):
        for season in range(IplFirstSeason , IplLastSeason + 1):
            seasonUrl = baseUrl + str(season)
            if self.PageExists(seasonUrl):
                self.GetTeamPlayers(seasonUrl)
                print("Team data found for season "+str(season))
            else:
                print("Team data not found for season "+str(season))
    def GetMatchData(self , URL):
        self.OpenInNewTab(URL)
        MatchResultsListXpath = "//div[@class='vn-sheduleList vn-resultsList posRel vn-fullArchiveList col-100 floatLft menT mb-4']"
        LastElementXpath = "(//div[@class='vn-sheduleLogo'])[1]"
        self.WaitForElement( By.XPATH, LastElementXpath)
        sourceCode = self.GetHTMLByPageSource()
        MatchesList = sourceCode.find('div',{'class' :'vn-resultsList'}).find_all('li')
        Match = MatchesList[0]
        Result = Match.find('div', {'class':'live-score'})
    def GetScorecardData(self , url):
        def ExtractTableData(index, tableRows):
            # index 0 for batsmans and 1 for bowlers
            HeadingList = [['Runs','Balls','Fours','sixes','StrikeRate'] ,['Overs','Runs','Wickets','Economy','Dots'] ]
            PlayerIdMapToStatsJson = {}
            # todo: make sure to map data with playerid 
            for row in tableRows:
                cols = row.findAll('td')
                playerStatsJson = {}
                statsCols = cols[2:7]
                for i in range(len(statsCols)):
                    playerStatsJson[HeadingList[index][i]] = statsCols[i].text.strip()
        def GetInningsScoreBoard():
            ScorecardXpath = "(//a[normalize-space()='Scorecard'])[1]"
            self.WaitForElement(By.XPATH, ScorecardXpath)
            self.ClickElement(By.XPATH, ScorecardXpath)
            sourceCode = self.GetHTMLByPageSource()
            scoreBoardTables = sourceCode.find_all('table',{'class':'ap-scroreboard-table'})
            TableRows = scoreBoardTables[0].find('tbody' , {'class' : 'team1'}).find_all('tr')
            ExtractTableData(0,TableRows[:len(TableRows) - 1])
            TableRows = scoreBoardTables[1].find('tbody' , {'class' : 'team1'}).find_all('tr')
            ExtractTableData(1,TableRows)
        def ExtractWagonWheelData():
            wagonWheelManager = WagonWheelManager(self)
            wagonWheelButtonXpath = "(//a[normalize-space()='Wagon Wheel'])[1]"
            inningsXpath = "//select[@class='mcSelectDefault inningsList innsFilter ng-pristine ng-untouched ng-valid']"
            inningsXpathList = wagonWheelManager.GetAllInningsNameAndXpath()

            inningsOpetion1Xpath =inningsXpathList[0]['Xpath']
            inningsOpetion2Xpath = inningsXpathList[1]['Xpath']
            inningsXpathClicked =  "(//select[@class='mcSelectDefault inningsList innsFilter ng-valid ng-dirty ng-valid-parse ng-touched'])[1]"
            self.ClickElement(By.XPATH ,wagonWheelButtonXpath)
            BowlerNameAndXpath = wagonWheelManager.GetAllBowlersNameAndXpath()
            batsmanNameAndXpath = wagonWheelManager.GetAllBatsmansNameAndXpath()
            wagonWheelManager.GetAllStats()
            wagonWheelManager.GetRuns()

        self.OpenWindow(url)
        self.WaitForLoaderToDisappear()
        GetInningsScoreBoard()
        SwitchTeamButtonXpath = "(//span[@class='mob-hide'][normalize-space()='Innings'])[1]"
        self.WaitForElement(By.XPATH , SwitchTeamButtonXpath)
        self.ClickElement(By.XPATH , SwitchTeamButtonXpath)
        GetInningsScoreBoard()
        ExtractWagonWheelData()
        # sourceCode = self.GetHTMLByPageSource()
        # scoreBoardTables = sourceCode.find_all('table',{'class':'ap-scroreboard-table'})
        # TableRows = scoreBoardTables[0].find('tbody' , {'class' : 'team1'}).find_all('tr')
        # ExtractTableData(0,TableRows[:len(TableRows) - 1])
        # TableRows = scoreBoardTables[1].find('tbody' , {'class' : 'team1'}).find_all('tr')
        # ExtractTableData(1,TableRows)
        # self.WaitForElement(By.XPATH, ScorecardXpath)
        # self.ClickElement(By.XPATH, ScorecardXpath)
        
        # resultElement = self.WaitForElement(By.XPATH , SwitchTeamButtonXpath)
    
    def GetMathesList(self,url):
        Xpath = "(//ul[@id='team_archive'])[1]"
        self.OpenWindow(url)
        self.WaitForLoaderToDisappear()
        # time.sleep(6)
        self.WaitForElement(By.XPATH , Xpath )
        sourceCode = self.GetHTMLByPageSource()
        mathesListLiTags = sourceCode.find('ul' , {'id' : 'team_archive'}).findAll('li')
        urlList = []
        for liTag in mathesListLiTags:
            lastAnchorTag = liTag.findAll('a')[-1]
            urlList.append(lastAnchorTag.get('href'))
        return urlList
    def GetTeamLeaderboard(self , url):
        self.OpenInTabNo(1,url)
        self.WaitForLoaderToDisappear()
        tableXpath = "(//tbody)[2]"
        self.WaitForElement(By.XPATH , tableXpath )
        sourceCode = self.GetHTMLByPageSource()
        tableBody = sourceCode.find('table')
        tableRows = tableBody.findAll('tr')
        tableHead = tableRows[0].findAll('th')
        tableRows = tableRows[1:]
        teamLeaderboardJsonList = []
        for tableRow in tableRows:
            tableColumns = tableRow.findAll('td')
            teamDataJson = {}
            for i in range(0 , len(tableColumns)):
                if i == 1:
                    continue
                headingText = ToPascalCase(tableHead[i].text.strip()) 
                dataText = tableColumns[i].text.strip()
                teamDataJson[headingText] = dataText
            teamLeaderboardJsonList.append(teamDataJson)
        return teamLeaderboardJsonList


    def MatchCentrePageData(self,url):

        def ExtractTextData(Text):
            char_index = Text.find('-')
            TeamName = Text[:char_index].strip()
            scorePattern = r'\b\d+/\d+\b'
            rpoPattern = r'\((\d+\.\d+)\s+rpo'
            foursPattern = r'\b(\d+)x4\b'
            sixesPattern = r'\b(\d+)x6\b'
            match = re.search(scorePattern, Text)
            Score = match.group().strip()
            match = re.search(rpoPattern, Text)
            RPO = match.group(1).strip()
            match = re.search(foursPattern, Text)
            Fours = match.group(1).strip() if match else "0"
            match = re.search(sixesPattern, Text)
            Sixes = match.group(1).strip() if match else "0"
            dataJson = { 'FullName' : TeamName ,'Score' :Score , 'Rpo' :RPO , 'Fours' :Fours , 'Sixes' :Sixes}
            return dataJson
        self.OpenWindow(url)
        LestElementXpath = "(//div[@id='ball-by-ball'])[1]"
        self.WaitForElement( By.XPATH, LestElementXpath)
        sourceCode = self.GetHTMLByPageSource()
        outerContainer = sourceCode.find('div',{'id':'cmdBlockSmipl'})
        ListOfPTages = outerContainer.find_all('p')[:7]
        useFullPTags = [ ListOfPTages[2] , ListOfPTages[4] , ListOfPTages[6] ]
        # for PTag in ListOfPTages:
        #     BlueResult = PTag.find('span',{'style':'color:#2980b9'})
        for i in useFullPTags:
            ComparisonResult = i.text.split('||')
            ExtractTextData(ComparisonResult[0].strip())

    # def GetAllTeamData(self):
    #     self.OpenInNewTab(TEAMS_PAGE)
    #     sourceCode = self.GetHTMLByPageSource()
    #     allTeamsLiList = sourceCode.find("div" , {"class" , "vn-teamswrap"}).find_all("li")
    #     urlList = []
    #     for team in allTeamsLiList:
    #         teamShortName = team.get("class")[0].split("_")[-1]
    #         teamPageUrl = team.find("a").get("href")
    #         urlList.append(teamPageUrl+"/squad/")
    #         # iplObject.GetTeamAllSeasonData(teamPageUrl+"/squad/")
    #     with Pool() as pool:
    #         pool.map(self.GetTeamAllSeasonData, urlList[:2])
class WagonWheelManager():
    wagonWheelButtonXpath = "(//a[normalize-space()='Wagon Wheel'])[1]"
    isInningsDropDownClicked = False
    ipl : IplBase = None
    BowlersNamesAndXPaths = None
    BatsmansNamesAndXPaths = None
    InningsNamesAndXPaths = None
    inningsXpath = "//select[@class='mcSelectDefault inningsList innsFilter ng-pristine ng-untouched ng-valid']"
    inningsXpathClickedXpath =  "(//select[@class='mcSelectDefault inningsList innsFilter ng-valid ng-dirty ng-valid-parse ng-touched'])[1]"

    batsmanXpath = "(//select[@class='mcSelectDefault batsmenFilter ng-pristine ng-untouched ng-valid'])[1]"
    batsmanClickedXpath = "(//select[@class='mcSelectDefault batsmenFilter ng-valid ng-dirty ng-valid-parse ng-touched'])[1]"
    runsSectionXpath = '//ul[@class="wagon-points uniform-grid wp-values"]'
    isBatsmanClicked = False
    def SwitchBatsmanOption(self , optionXpath):
        if self.isBatsmanClicked == False:
            self.ipl.ClickElement(By.XPATH , self.batsmanXpath)
            self.isBatsmanClicked = True
        else:

            self.ipl.ClickElement(By.XPATH , self.batsmanClickedXpath)
        self.ipl.ClickElement(By.XPATH , optionXpath)
        time.sleep(0.3)

    def GetRuns(self ):
        sourceCode = self.ipl.GetSourceCodeByXpath(self.runsSectionXpath)
        iTagsList = sourceCode.findAll('i')[1:]
        scoreKeys = ['1','2','3','4','6']
        wagonWheenRunsjson = {}
        for i in range(0 , len(iTagsList)) :
            wagonWheenRunsjson[scoreKeys[i]] = int(iTagsList[i].text.strip())
        return wagonWheenRunsjson
    def GetAllStats(self):
        def AddScoresOfScoreJson(json1: {}, json2 :{}):
            newjson = {}
            for key in json1.keys():
                newjson =  json2[key] + json1[key]
            return newjson

        teamVsTeamStatsJson = {}
        teamVsPlayerStatsJson = {}
        playersVsTeamStatsJson = {}
        templateJson = {
            "Batting" : {},
            "Bowling" : {},
            "Team" : {}
        }  
        PlayerStatsJson = {}
        TeamStatsJson = {}
         # make sure you maintain the orded of arguments
        def GetPlayerVsData(T :{} , V :{} , S : str , data):
            if PlayerStatsJson.get(T['Name']) == None:
                PlayerStatsJson[T['Name']] = templateJson
            if PlayerStatsJson[T['Name']][S].get(V['Name']) == None:
                PlayerStatsJson[T['Name']][S][V['Name']] = []
            PlayerStatsJson[T['Name']][S][V['Name']].append(data)
            return PlayerStatsJson
        def GetTeamVsData( team1 , team2 , S: str , data):
            if TeamStatsJson[team1] == None:
                TeamStatsJson[team1] = templateJson
            if TeamStatsJson[team1][S][team2] == None:
                TeamStatsJson[team1][S][team2] = data
            else:
                TeamStatsJson[team1][S][team2] = AddScoresOfScoreJson(TeamStatsJson[team1][S][team2] , runsJson)
            return TeamStatsJson
        
        inningsXpathList = self.GetAllInningsNameAndXpath()
        text = self.SwitchInningsOption(inningsXpathList[0]['Xpath'])
        word = text.split()[0].strip()
        
        team1NameJson = ipl.GetTeamName(word)
        text = self.SwitchInningsOption(inningsXpathList[1]['Xpath'])
        word = text.split()[0].strip()
        
        team2NameJson = ipl.GetTeamName(word)
        teamsNameJsonList = [team1NameJson , team2NameJson]

        # for i in range(0 , len(batsmanXpathList)):
        #     self.SwitchBatsmanOption(batsmanXpathList[i]['Xpath'])
        # for i in range(0 , len(bowlersXpathList)):
        #     self.SwitchBowlerOption(bowlersXpathList[i]['Xpath'])
        # self.SwitchBowlerOption(bowlersXpathList[0]['Xpath'])
        for inningsIndex in range(0 , len(inningsXpathList)):
            self.SwitchInningsOption(inningsXpathList[inningsIndex]['Xpath'])
            batsmanXpathList = self.GetAllBatsmansNameAndXpath()
            bowlersXpathList = self.GetAllBowlersNameAndXpath()
            for batsman in batsmanXpathList:
                self.SwitchBatsmanOption(batsman['Xpath'])
                for bowler in bowlersXpathList:
                    self.SwitchBowlerOption(bowler['Xpath'])
                    runsJson = self.GetRuns()
                    if sum(runsJson.values()) == 0:
                        continue
                    currentTeam = teamsNameJsonList[inningsIndex]
                    opponentTeam = teamsNameJsonList[(inningsIndex + 1) % 2]
                    # batsman vs bowler part
                    GetPlayerVsData(batsman , bowler , "Bowling" , runsJson) 
                    # Bowler vs Batsman part
                    GetPlayerVsData(bowler , batsman , "Batting" , runsJson)
                    # firstTeam vs Second team
                    # TeamStatsJson[currentTeam]["Team"][opponentTeam] = GetTeamVsData(currentTeam , opponentTeam , "Team")

                    
    def GetAllBatsmansNameAndXpath(self):
        if self.BatsmansNamesAndXPaths != None:
            return self.BatsmansNamesAndXPaths
        XpathToCLick =  self.batsmanClickedXpath if self.isBatsmanClicked else self.batsmanXpath
        sourceCode = self.ipl.GetSourceCodeByXpath(XpathToCLick)
        options = sourceCode.findAll('option')[1:]
        playerNameAndXpath = []
        for option in options:
            playerNameAndXpath.append({
                "Name" : option.text.strip(),
                "Xpath" : f"(//option[@value='{option.get('value')}'])[1]"
            })
        self.BatsmansNamesAndXPaths = playerNameAndXpath
        return playerNameAndXpath
    def GetAllInningsNameAndXpath(self):

        if self.InningsNamesAndXPaths != None:
            return self.InningsNamesAndXPaths
        sourceCode = self.ipl.GetSourceCodeByXpath(self.inningsXpath)
        options = sourceCode.findAll('option')
        InningsNameAndXpath = []
        for option in options:
            InningsNameAndXpath.append({
                "Name" : option.text.strip(),
                "Xpath" : f"//option[normalize-space()='{option.text.strip()}']"
            })
        self.InningsNamesAndXPaths = InningsNameAndXpath
        return InningsNameAndXpath

    bowlerXpath = "(//select[@class='mcSelectDefault bowlerFilter ng-pristine ng-untouched ng-valid'])[1]"
    bowlerClickedXpath = "(//select[@class='mcSelectDefault bowlerFilter ng-valid ng-dirty ng-valid-parse ng-touched'])[1]"
    isBowlerClicked = False

    def GetAllBowlersNameAndXpath(self):
        if self.BowlersNamesAndXPaths != None:
            return self.BowlersNamesAndXPaths
        XpathToCLick =  self.bowlerClickedXpath if self.isBowlerClicked else self.bowlerXpath
        sourceCode = self.ipl.GetSourceCodeByXpath(XpathToCLick)
        options = sourceCode.findAll('option')[1:]
        playerNameAndXpath = []
        for option in options:
            playerNameAndXpath.append({
                "Name" : option.text.strip(),
                "Xpath" : f"(//option[@value='{option.get('value')}'])[1]"
            })
        self.BowlersNamesAndXPaths = playerNameAndXpath
        return playerNameAndXpath
    def SwitchBowlerOption(self , optionXpath):
        if self.isBowlerClicked == False:
            self.ipl.ClickElement(By.XPATH , self.bowlerXpath)
            self.isBowlerClicked = True
        else:
            self.ipl.ClickElement(By.XPATH , self.bowlerClickedXpath)
        self.ipl.ClickElement(By.XPATH , optionXpath)
        time.sleep(0.3)

    def SwitchInningsOption(self , optionXpath):
        self.BowlersNamesAndXPaths = None
        self.BatsmansNamesAndXPaths = None
        if self.isInningsDropDownClicked == False:
            self.ipl.ClickElement(By.XPATH , self.inningsXpath)
            self.isInningsDropDownClicked = True
        else:
            self.ipl.ClickElement(By.XPATH , self.inningsXpathClickedXpath)
        self.ipl.ClickElement(By.XPATH , optionXpath)
        sourceCode = self.ipl.GetSourceCodeByXpath(optionXpath)
        time.sleep(1)
        # self.ipl.WaitForElement(By.XPATH , self.batsmanXpath)
        # self.ipl.WaitForElement(By.XPATH , self.bowlerXpath)
        return sourceCode.text.strip()

        
    def __init__(self, Ipl : IplBase ):
        super().__init__()
        self.ipl = Ipl



def MapUrl(url):
    iplObject = IplBase()
    iplObject.GetTeamAllSeasonData(url)
    iplObject.CloseWindow()
def GetAllTeamData():
    global playersDataJson
    iplObject = IplBase()
    iplObject.OpenWindow(TEAMS_PAGE)
    sourceCode = iplObject.GetHTMLByPageSource()
    allTeamsLiList = sourceCode.find("div" , {"class" , "vn-teamswrap"}).find_all("li")
    urlList = []
    for team in allTeamsLiList:
        teamShortName = team.get("class")[0].split("_")[-1]
        teamPageUrl = team.find("a").get("href")
        urlList.append(teamPageUrl+"/squad/")
        # iplObject.GetTeamAllSeasonData(teamPageUrl+"/squad/")
    iplObject.CloseWindow()
    for url in urlList:
        MapUrl(url)
    # with Pool(processes=4) as pool:
    #     pool.map(MapUrl, urlList[:1])
    print("Execution done")
    print(len(playersDataJson.keys()))
    # for key , value in playersDataJson.items():
    iplObject.UpdatePlayerDataOfGivenId(playersDataJson)
    # uploadData("Team-Details" , dict(teamPlayersJson))
    # uploadData("Player-Details" , dict(playersDataJson))


def uploadData( collection , data):
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        
        db = client["Ipl-Test"]

        mycol = db[collection]
        mycol.insert_one(data)
        # resultList = [{ "phoneBrand" : key , "data" : value} for key, value in phonesData.items()]
        # mycol.insert_many(resultList)
        print("Pinged your deployment. You successfully connected to MongoDB!")
        client.close()
    except Exception as e:
        print(  e)
if __name__ == "__main__":
    ipl = IplBase()
    # ipl.OpenInNewTab("https://www.iplt20.com/teams/chennai-super-kings/squad/")
    # ipl.GetTeamPlayers("https://www.iplt20.com/teams/chennai-super-kings/squad/")
    # ipl.GetMatchData("https://www.iplt20.com/matches/results/2023")
    # ipl.MatchCentrePageData("https://www.iplt20.com/match/2023/1046")
    # ipl.GetScorecardData("https://www.iplt20.com/match/2023/1046")
    # ipl.GetMathesList("https://www.iplt20.com/matches/results/2023")
    # ipl.GetTeamLeaderboard("https://www.iplt20.com/points-table/men/2023")

    # ipl.UpdatePlayerDataOfGivenId({"100" : "dedwe"})
    GetAllTeamData()
   




# ipl.GenericTeam("https://www.iplt20.com/teams/chennai-super-kings/squad/")
# ipl.OpenWindow("https://www.iplt20.com/teams/chennai-super-kings/squad/")
# soup = ipl.GetHTMLByPageSource()
# result = soup.find_all('li',{"class": "dys-box-color"})
# for row in result:

# ipl.GetTeamPlayers("https://www.iplt20.com/teams/chennai-super-kings/squad-details/297")

# ipl.GetTeamAllSeasonData("https://www.iplt20.com/teams/chennai-super-kings/squad/")


