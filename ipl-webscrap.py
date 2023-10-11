from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize the Chrome WebDriver
driver = webdriver.Chrome()

# Define the URL you want to scrape
url = "https://www.iplt20.com/match/2023/1046"
waitTillLastClass = "recentBallsList"
teamBattleCssClass = "ap-teams-battle-wrp"

# Load the page
driver.get(url)

# Wait for the page to fully load (you can adjust the timeout as needed)
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.CLASS_NAME, waitTillLastClass)))

# Get the HTML content of the loaded page
html_content = driver.page_source

# Close the WebDriver
driver.quit()

# Replace problematic characters with a placeholder (e.g., '?')
html_content_cleaned = html_content.encode('utf-8', 'replace').decode('utf-8')

# Now you can parse the cleaned HTML content using BeautifulSoup or any other method
soup = BeautifulSoup(html_content_cleaned, 'html.parser')
battleSection = soup.find('div', attrs={'class':teamBattleCssClass})
# Write the cleaned HTML content to a file with UTF-8 encoding
# print(battleSection)
with open("ipldata.txt", "a", encoding="utf-8") as f:
    f.write(str(battleSection))
