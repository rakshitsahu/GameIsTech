from multiprocessing import Pool
from selenium import webdriver

class A:
    def __init__(self):
        self.driver = None

    def OpenWindow(self, url):
        self.driver = webdriver.Firefox()
        self.driver.get(url)

    def CloseWindow(self):
        if self.driver:
            self.driver.quit()

class B(A):
    def openUrl(self, url):
        # Call OpenWindow from class A to manage the webdriver instance
        self.OpenWindow(url)
        # Perform tasks with the webdriver
        # ...

    def useMultiprocessing(self, urls):
        with Pool() as pool:
            pool.map(self.openUrl, urls)

if __name__ == "__main__":
    # Create an instance of B
    b_instance = B()

    # URLs to open
    urls_to_open = ["https://www.example.com", "https://www.example2.com", "https://www.example3.com"]

    # Use multiprocessing within the class method
    b_instance.useMultiprocessing(urls_to_open)

    # Close the webdriver instances
    b_instance.CloseWindow()

    print("All processes have finished.")
