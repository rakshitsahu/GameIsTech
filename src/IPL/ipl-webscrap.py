from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ActionChains
from selenium.common.exceptions import TimeoutException
import json
import time

# Initialize the Chrome WebDriver cookie__message
def ConvertJsonToDictonary():
    with open('/JSON/team.json', 'r', encoding="utf-8") as f:
        json = json.load(f)
    return json
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
url = "https://www.iplt20.com/teams/chennai-super-kings"
acceptCookiesXpath = "(//button[normalize-space()='Accept cookies'])[1]"
driver = webdriver.Firefox()
driver.get(url)
def toCamelCase(input_string):
    # Split the input string into words based on spaces and underscores
    words = input_string.split(' ') + input_string.split('_')
    
    # Capitalize the first letter of each word except the first one
    camel_words = [words[0].lower()] + [word.capitalize() for word in words[1:]]
    
    # Join the words to form the camel case string
    camel_string = ''.join(camel_words)
    
    return camel_string
def LoadAndGetDataByClass(className):
    
    wait = WebDriverWait(driver, 100)
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, className)))
    html_content = driver.page_source
    html_content_cleaned = html_content.encode('utf-8', 'replace').decode('utf-8')
    soup = BeautifulSoup(html_content_cleaned, 'html.parser')
    # driver.quit()
    return soup
def LoadAndGetDataById(ID):
    wait = WebDriverWait(driver, 100)
    wait.until(EC.presence_of_element_located((By.ID, ID)))
    html_content = driver.page_source
    html_content_cleaned = html_content.encode('utf-8', 'replace').decode('utf-8')
    soup = BeautifulSoup(html_content_cleaned, 'html.parser')
    element = soup.find(id=ID)
    # driver.quit()
    return soup
def LoadClassAndClick(className):
    driver.get(url)
    wait = WebDriverWait(driver, 100)
    button = wait.until(EC.presence_of_element_located((By.CLASS_NAME, className)))
    button.click()
def  GetSourceCodeByXpath(xpath, timeout = 10):
    wait = WebDriverWait(driver, timeout)
    selenium_element = wait.until(EC.presence_of_element_located((By.XPATH, xpath)))
    # Extract the HTML code of the Selenium element
    selenium_element_html = selenium_element.get_attribute("outerHTML")
    # Parse the HTML code with Beautiful Soup
    soup_element = BeautifulSoup(selenium_element_html, 'html.parser')
    # print(soup_element)
    return soup_element
def scroll_element_into_view(element):
    driver.execute_script("arguments[0].scrollIntoView(true);", element)
def is_element_clickable(element, timeout=10):
    try:
        wait = WebDriverWait(driver, timeout)
        wait.until(EC.element_to_be_clickable(element))
        return True
    except TimeoutException:
        return False

def ClickByXpath(xpath, timeout=10):
    try:
        wait = WebDriverWait(driver, timeout)
        element = wait.until(EC.presence_of_element_located((By.XPATH, xpath)))
        scroll_element_into_view(element)  # Scroll the element into view
        if is_element_clickable(element):
            time.sleep(1)
            element.click()
            return True  # Return True if the click was successful
        else:
            print("Element is not clickable.")
            return False
    except Exception as e:
        print(f"An error occurred while clicking the element with XPath '{xpath}': {e}")
        return False  # Return False if the click was unsuccessful

def GetTeamPlayers():
    batsmanXpath = "(//div[@class='ih-pcard-wrap'])[1]"
    allRoundersXpath = "(//ul[@id='identifiercls1'])[1]"
    bowlersXpath = "(//ul[@id='identifiercls2'])[1]"
    def GetPlayersListByXpath (Xpath):
        sourceCode = GetSourceCodeByXpath(Xpath)
        batsManHtml = sourceCode.find_all('a',{"data-event_context": "player"})
        playerList = []
        for player in batsManHtml:
            playerList.append(player.get("data-player_name"))
            # print(player.get("data-player_name"))
        return playerList
    batsmansList = GetPlayersListByXpath(batsmanXpath)
    allRoundersList = GetPlayersListByXpath(allRoundersXpath)
    bowlersList = GetPlayersListByXpath(bowlersXpath)
    print(batsmansList)
    print(allRoundersList)
    print(bowlersList)
    # ClickByXpath(acceptCookiesXpath)
    # ClickByXpath("(//li[@class='dys-box-color ih-pcard1'])[7]")




GetTeamPlayers()
# source = LoadAndGetDataByClass("identifiercls0")

# print(source.find_all('a',{"data-event_context": "player"}))



# with open("ipldata.txt", "a", encoding="utf-8") as f:
#     f.write(str(middleTabSection))
