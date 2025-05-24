# app/models/models.py
from pydantic import BaseModel
from typing import List, Any, Optional
from datetime import datetime

# Connection models
class ConnectionRequest(BaseModel):
    type: str
    inputType: str
    server: str
    authType: str
    database: str
    encrypt: str
    trustServerCertificate: bool
    serverGroup: str
    name: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    connectionString: Optional[str] = None

class ConnectionInfo(BaseModel):
    id: int
    name: str
    server: str
    database: str
    username: str
    connected: bool
    created_at: datetime

# Query models
class QueryRequest(BaseModel):
    connectionId: int
    sql: str

class QueryResult(BaseModel):
    columns: List[str]
    rows: List[List[Any]]
    rowCount: int
    executionTime: float
    error: Optional[str] = None

# History models
class QueryHistory(BaseModel):
    id: int
    connectionId: int
    sql: str
    executed_at: datetime
