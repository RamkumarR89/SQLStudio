# app/services/database.py
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import datetime
import os

# Create database directory if it doesn't exist
os.makedirs("data", exist_ok=True)

# SQLite connection
SQLALCHEMY_DATABASE_URL = "sqlite:///./data/sql_studio.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database models
class Connection(Base):
    __tablename__ = "connections"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    inputType = Column(String)
    server = Column(String)
    authType = Column(String)
    database = Column(String)
    encrypt = Column(String)
    trustServerCertificate = Column(Boolean)
    serverGroup = Column(String)
    name = Column(String, index=True)
    username = Column(String)
    password = Column(String)
    connectionString = Column(String)
    connected = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    queries = relationship("Query", back_populates="connection")

class Query(Base):
    __tablename__ = "queries"

    id = Column(Integer, primary_key=True, index=True)
    connection_id = Column(Integer, ForeignKey("connections.id"))
    sql = Column(Text)
    executed_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    connection = relationship("Connection", back_populates="queries")

# Create the database tables
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
