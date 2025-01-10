from flask import Flask, jsonify
from scrape import scrape_menu  # Import scrape_menu from scrape.py
import psycopg2

app = Flask(__name__)

def store_data_in_postgresql(data):
    try:
        with psycopg2.connect(
            dbname="postgres",
            user="postgres",
            password="naufil9175",
            host="localhost",
            port="5432"
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

@app.route('/scrape', methods=['GET'])
def scrape():
    menu_data = scrape_menu()  # Call the scraping function from scrape.py
    store_data_in_postgresql(menu_data)
    return jsonify(menu_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
