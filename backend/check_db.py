import sqlite3
import os

print(f"Current directory: {os.getcwd()}")
print(f"Database file exists: {os.path.exists('data/sql_studio.db')}")
print(f"Database file size: {os.path.getsize('data/sql_studio.db') if os.path.exists('data/sql_studio.db') else 'N/A'}")

try:
    conn = sqlite3.connect('data/sql_studio.db')
    cursor = conn.cursor()
    print("Successfully connected to the database")
    
    cursor.execute('SELECT name FROM sqlite_master WHERE type="table"')
    tables = cursor.fetchall()
    print(f"Number of tables found: {len(tables)}")
    print("Tables in the database:")
    for table in tables:
        print(f"- {table[0]}")
        
        # Show structure of each table
        cursor.execute(f'PRAGMA table_info({table[0]})')
        columns = cursor.fetchall()
        print(f"  Columns in {table[0]}:")
        for col in columns:
            print(f"  - {col[1]} ({col[2]})")
        print()

    conn.close()
    print("Database connection closed")
except Exception as e:
    print(f"Error: {str(e)}")
