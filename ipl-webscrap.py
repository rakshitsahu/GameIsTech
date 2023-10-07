import requests
from bs4 import BeautifulSoup
import time

# Send an HTTP GET request to the URL
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize the Chrome WebDriver
driver = webdriver.Chrome()

# Define the URL you want to scrape
url = "https://www.iplt20.com/match/2023/1046"

# Load the page
driver.get(url)

# Wait for the page to fully load (you can adjust the timeout as needed)
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.CLASS_NAME, "your-element-class")))  # Replace "your-element-class" with the actual element you want to wait for

# Get the HTML content of the loaded page
html_content = driver.page_source

# Close the WebDriver
driver.quit()

# Now you can parse the HTML content using BeautifulSoup or any other method
soup = BeautifulSoup(html_content, 'html.parser')
print(soup)
with open("ipldata.txt", "a") as f:
        print(soup, file=f)