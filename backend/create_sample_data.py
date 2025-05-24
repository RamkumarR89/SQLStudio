import sqlite3
import os

print(f"Current directory: {os.getcwd()}")
print(f"Database file exists: {os.path.exists('data/sql_studio.db')}")

try:
    conn = sqlite3.connect('data/sql_studio.db')
    cursor = conn.cursor()
    print("Successfully connected to the database")

    # Create a test table
    print("Creating employees table...")
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        department TEXT,
        salary REAL,
        hire_date TEXT
    )
    ''')

    # Insert some sample data
    print("Inserting sample data...")
    employees = [
        (1, 'John Doe', 'Engineering', 85000.00, '2022-01-15'),
        (2, 'Jane Smith', 'Marketing', 75000.00, '2022-03-10'),
        (3, 'Michael Johnson', 'Finance', 90000.00, '2021-11-05'),
        (4, 'Emily Williams', 'Human Resources', 65000.00, '2023-02-20'),
        (5, 'David Brown', 'Engineering', 82000.00, '2022-08-12'),
        (6, 'Sarah Miller', 'Sales', 78000.00, '2023-04-30'),
        (7, 'James Wilson', 'Engineering', 88000.00, '2021-09-18'),
        (8, 'Emma Taylor', 'Marketing', 72000.00, '2022-07-22'),
        (9, 'Robert Anderson', 'Finance', 95000.00, '2021-06-14'),
        (10, 'Olivia Thomas', 'Human Resources', 68000.00, '2023-01-08')
    ]

    cursor.executemany('INSERT OR REPLACE INTO employees VALUES (?, ?, ?, ?, ?)', employees)

    conn.commit()
    print("Sample table 'employees' created with 10 records")

    # Verify data
    cursor.execute('SELECT COUNT(*) FROM employees')
    count = cursor.fetchone()[0]
    print(f"Number of records: {count}")

    conn.close()
    print("Database connection closed")
except Exception as e:
    print(f"Error: {str(e)}")
