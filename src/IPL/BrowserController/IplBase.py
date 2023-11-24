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
from multiprocessing import Pool
from multiprocessing import Process
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
SEASON = "seasons"
MEN = "men"
WOMEN = "women"
PLAYERS = "players"
CAPTAIN_ICON ="https://www.iplt20.com/assets/images/teams-captain-icon.svg"
BrowserTabLimit = 1
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
        wait = WebDriverWait(self.driver, 100)
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
        
playerPageMap = {}
class IplBase(BrowserBase):
    browserTabObjects = []

    def __init__(self):
        super().__init__()
    def GetBrowserObject(self):
        #TODO must be fixed while using multithreading
        
        if len(self.browserTabObjects) == BrowserTabLimit:
            random_index = random.randrange(len(self.browserTabObjects))
            # print("array length is ", len(self.browserTabObjects) ,random_index )
            return self.browserTabObjects[random_index]
        newIplBaseObject = IplBase()
        self.browserTabObjects.append(newIplBaseObject)
        return newIplBaseObject
    def WaitForLoaderToDisappear(self):
        loader = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "loader-main")))
        WebDriverWait(self.driver, 10).until(EC.invisibility_of_element(loader))

    def GetTeamPlayers(self,URL):
        def isCaptain(imgTags):
            for imgTag in imgTags:
                if imgTag.get('src') == CAPTAIN_ICON:
                    return True
            return False
        teamPlayersJson = {}
        playerDataJson = {}
        def ExtractTableDetails(table):
            headings = table.find('thead').findAll('th')
            tableRows = table.findAll('tr')

            dataJson = {}
            for tableRow in tableRows[1:]:
                tdTags = tableRow.findAll('td')
                # print(tableRow)
                rowDataJson = {}
                for i in range(1 , len(tdTags)):
                    heading = headings[i].text.strip()
                    rowDataJson[heading] = tdTags[i].text.strip()
                leftHeading = tdTags[0].text.strip()
                dataJson[leftHeading] = rowDataJson
            if len(dataJson.keys()) == 1:
                print("Data Not Found")
            else:
                print(dataJson)
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

            # print("***************************** "+ str(len(statsTable)))
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
                # print("Captain is *******************"+ playerName)
            # print(playerName , playerRole , playerId , roleSvg , imagePath, isCaptain(imgTags) )
            # print(teamPlayersJson)
            return playerJson
        self.OpenInTabNo(1,URL)
        soup = self.GetHTMLByPageSource()
        playerCards = soup.find_all('li',{"class": "dys-box-color"})
        for card in playerCards:
            playerJson = PlayerDetailFromPlayerCard(card)
            if playerPageMap.get(playerJson["Id"]) != None:
                continue
            playPageUrl = card.find('a').get('href')
            playerJson.update(PlayerDetailFromPlayerPage(playPageUrl))
            if teamPlayersJson.get(playerJson["Role"]) == None:
                teamPlayersJson[playerJson["Role"]] = []
            teamPlayersJson[playerJson["Role"]].append(playerJson)
            teamPlayersJson['Captain'] = playerJson
            if(playerDataJson.get(playerJson["Id"]) == None):
                playerDataJson[playerJson["Id"]] = playerJson
            playerPageMap[playerJson["Id"]] = playerJson
            print(playerJson.get("Name"))
        print(playerDataJson)
        
    
        
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
    def GetMatchData(self , URL):
        self.OpenInNewTab(URL)
        MatchResultsListXpath = "//div[@class='vn-sheduleList vn-resultsList posRel vn-fullArchiveList col-100 floatLft menT mb-4']"
        LastElementXpath = "(//div[@class='vn-sheduleLogo'])[1]"
        self.WaitForElement( By.XPATH, LastElementXpath)
        sourceCode = self.GetHTMLByPageSource()
        MatchesList = sourceCode.find('div',{'class' :'vn-resultsList'}).find_all('li')
        Match = MatchesList[0]
        # print(MatchesList[0])
        Result = Match.find('div', {'class':'live-score'})
        print(Result)
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
                print(playerStatsJson)
        def GetInningsScoreBoard():
            ScorecardXpath = "(//a[normalize-space()='Scorecard'])[1]"
            # self.WaitForElement(By.XPATH, ScorecardXpath)
            # self.ClickElement(By.XPATH, ScorecardXpath)
            sourceCode = self.GetHTMLByPageSource()
            scoreBoardTables = sourceCode.find_all('table',{'class':'ap-scroreboard-table'})
            TableRows = scoreBoardTables[0].find('tbody' , {'class' : 'team1'}).find_all('tr')
            ExtractTableData(0,TableRows[:len(TableRows) - 1])
            print("++++++++++++++++")
            TableRows = scoreBoardTables[1].find('tbody' , {'class' : 'team1'}).find_all('tr')
            ExtractTableData(1,TableRows)
        self.OpenWindow(url)
        self.WaitForLoaderToDisappear()
        GetInningsScoreBoard()
        SwitchTeamButtonXpath = "(//span[@class='mob-hide'][normalize-space()='Innings'])[1]"
        self.WaitForElement(By.XPATH , SwitchTeamButtonXpath)
        self.ClickElement(By.XPATH , SwitchTeamButtonXpath)
        GetInningsScoreBoard()
        # sourceCode = self.GetHTMLByPageSource()
        # scoreBoardTables = sourceCode.find_all('table',{'class':'ap-scroreboard-table'})
        # TableRows = scoreBoardTables[0].find('tbody' , {'class' : 'team1'}).find_all('tr')
        # ExtractTableData(0,TableRows[:len(TableRows) - 1])
        # print("++++++++++++++++")
        # TableRows = scoreBoardTables[1].find('tbody' , {'class' : 'team1'}).find_all('tr')
        # ExtractTableData(1,TableRows)
        # self.WaitForElement(By.XPATH, ScorecardXpath)
        # self.ClickElement(By.XPATH, ScorecardXpath)
        
        # resultElement = self.WaitForElement(By.XPATH , SwitchTeamButtonXpath)

    def MatchCentrePageData(self,url):
        def GetTeamName(teamName):
            global TeamNamesJson
            for teamNameJson in TeamNamesJson:
                if teamNameJson["ShortName"].strip().lower() == teamName.strip().lower() or teamNameJson["FullName"].strip().lower() == teamName.strip().lower():
                    return teamNameJson
            raise ValueError("++++++++++++++++++THE TEAM NAME IS NOT FOUND IN JSON+++++++++++++++++++")
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
            print(GetTeamName(TeamName))
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
            print(i.text.strip())
            ComparisonResult = i.text.split('||')
            print(ComparisonResult[0].strip())
            print(ComparisonResult[1].strip())
            ExtractTextData(ComparisonResult[0].strip())
        # print(len(BlueTeamList))
        # print(len(YellowTeamList))
        # print(BlueTeamList[0].text)
        
        print("h")
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
    #         print(teamShortName , teamPageUrl)
    #     with Pool() as pool:
    #         pool.map(self.GetTeamAllSeasonData, urlList[:2])
def MapUrl(url):
    iplObject = IplBase()
    iplObject.GetTeamAllSeasonData(url)
    iplObject.CloseWindow()
def GetAllTeamData():
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
        print(teamShortName , teamPageUrl)
    iplObject.CloseWindow()
    with Pool(processes=5) as pool:
        pool.map(MapUrl, urlList)

if __name__ == "__main__":
    ipl = IplBase()
    # ipl.OpenInNewTab("https://www.iplt20.com/teams/chennai-super-kings/squad/")
    # ipl.GetTeamPlayers("https://www.iplt20.com/teams/chennai-super-kings/squad/")
    # ipl.GetMatchData("https://www.iplt20.com/matches/results/2023")
    # ipl.MatchCentrePageData("https://www.iplt20.com/match/2023/1046")
    ipl.GetScorecardData("https://www.iplt20.com/match/2023/1046")

    # GetAllTeamData()
   




# ipl.GenericTeam("https://www.iplt20.com/teams/chennai-super-kings/squad/")
# ipl.OpenWindow("https://www.iplt20.com/teams/chennai-super-kings/squad/")
# soup = ipl.GetHTMLByPageSource()
# result = soup.find_all('li',{"class": "dys-box-color"})
# for row in result:
#     print(row.text)
# print(len(result))
# ipl.GetTeamPlayers("https://www.iplt20.com/teams/chennai-super-kings/squad-details/297")

# ipl.GetTeamAllSeasonData("https://www.iplt20.com/teams/chennai-super-kings/squad/")



