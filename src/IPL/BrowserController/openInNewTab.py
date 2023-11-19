from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# Create a new instance of the Chrome driver
driver = webdriver.Chrome()

# Open a website in the first tab
driver.get("https://www.example.com")

# Open a new tab using JavaScript
driver.execute_script("window.open('', '_blank');")

# Switch to the new tab
driver.switch_to.window(driver.window_handles[1])

# Open a website in the new tab
driver.get("https://www.example2.com")

# Perform your actions in the new tab as needed

# Do not close the browser
# driver.quit()
