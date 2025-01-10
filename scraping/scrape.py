from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import psycopg2

def scrape_menu():
    url = "https://www.swiggy.com/city/mumbai/burger-king-central-plaza-kalina-santacruz-east-rest78036"
    
    driver = webdriver.Chrome()
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
    print(f"Menu Items Found: {len(menu_items)}")
    
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

def store_data_in_postgresql(data):
    print(f"Menu Data to Insert: {len(data)} records")

    try:
        with psycopg2.connect(
            dbname="postgres",
            user="postgres",
            password="naufil9175",
            host="localhost",
            port="5433"
        ) as connection:
            with connection.cursor() as cursor:
                cursor.execute("""
                CREATE TABLE IF NOT EXISTS menu_items (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    price TEXT,
                    description TEXT
                )
                """)
                
                cursor.executemany("""
                INSERT INTO menu_items (name, price, description)
                VALUES (%s, %s, %s)
                """, [(item['name'], item['price'], item['description']) for item in data])
                
                print(f"Inserted {len(data)} records into the menu_items table.")
    
    except Exception as e:
        print(f"Error: {e}")

menu_data = scrape_menu()
store_data_in_postgresql(menu_data)
