# scrape.py (Your scraping logic)
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

def scrape_menu():
    url = "https://www.swiggy.com/city/mumbai/burger-king-central-plaza-kalina-santacruz-east-rest78036"
    
    # Set up headless Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    driver = webdriver.Chrome(executable_path='/path/to/chromedriver', options=chrome_options)
    driver.get(url)
    
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'sc-aXZVg'))
        )
        
        html = driver.page_source
    finally:
        driver.quit()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    menu_items = soup.find_all('div', {'data-testid': 'normal-dish-item'})
    menu_data = []
    for item in menu_items:
        item_name = item.find('div', {'class': 'sc-aXZVg cjJTeQ sc-hIUJlX gCYyvX'})
        item_price = item.find('div', {'class': 'sc-aXZVg kCbDOU'})
        item_description = item.find('div', {'class': 'sc-aXZVg iPKpeL sc-jnOGJG gaxbGu'})
        
        item_name = item_name.text.strip() if item_name else 'No name'
        item_price = item_price.text.strip() if item_price else 'No price'
        item_description = item_description.text.strip() if item_description else 'No description'
        
        menu_data.append({
            'name': item_name,
            'price': item_price,
            'description': item_description
        })
    
    return menu_data
