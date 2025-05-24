from app.services.database import Connection, SessionLocal

def create_sample_connection():
    db = SessionLocal()
    try:
        connection = Connection(
            name='SQLite Local',
            server='localhost',
            database='sql_studio.db',
            username='admin',
            password='',
            connected=True
        )
        db.add(connection)
        db.commit()
        print('Connection added successfully!')
    except Exception as e:
        db.rollback()
        print(f'Error adding connection: {e}')
    finally:
        db.close()

if __name__ == '__main__':
    create_sample_connection()
