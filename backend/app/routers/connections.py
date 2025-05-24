# app/routers/connections.py
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from app.models.models import ConnectionInfo, ConnectionRequest
from app.services.database import get_db, Connection
import datetime

router = APIRouter()

@router.get("/", response_model=List[ConnectionInfo])
async def get_connections(db: Session = Depends(get_db)):
    connections = db.query(Connection).all()
    return [
        ConnectionInfo(
            id=conn.id,
            name=conn.name,
            server=conn.server,
            database=conn.database,
            username=conn.username,
            connected=conn.connected,
            created_at=conn.created_at
        ) for conn in connections
    ]

@router.post("/", response_model=ConnectionInfo)
async def create_connection(connection: ConnectionRequest, db: Session = Depends(get_db)):
    db_connection = Connection(
        type=connection.type,
        inputType=connection.inputType,
        server=connection.server,
        authType=connection.authType,
        database=connection.database,
        encrypt=connection.encrypt,
        trustServerCertificate=connection.trustServerCertificate,
        serverGroup=connection.serverGroup,
        name=connection.name,
        username=connection.username,
        password=connection.password,
        connectionString=connection.connectionString,
        connected=True,
        created_at=datetime.datetime.utcnow()
    )
    db.add(db_connection)
    db.commit()
    db.refresh(db_connection)
    
    return ConnectionInfo(
        id=db_connection.id,
        name=db_connection.name,
        server=db_connection.server,
        database=db_connection.database,
        username=db_connection.username,
        connected=db_connection.connected,
        created_at=db_connection.created_at
    )

@router.delete("/{connection_id}")
async def delete_connection(connection_id: int, db: Session = Depends(get_db)):
    connection = db.query(Connection).filter(Connection.id == connection_id).first()
    if not connection:
        raise HTTPException(status_code=404, detail="Connection not found")
        
    db.delete(connection)
    db.commit()
    return {"message": "Connection deleted successfully"}
