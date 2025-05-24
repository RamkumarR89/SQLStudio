# app/routers/queries.py
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from app.models.models import QueryResult, QueryRequest, QueryHistory
from app.services.database import get_db, Connection, Query
import time
import sqlite3
import datetime

router = APIRouter()

@router.post("/execute", response_model=QueryResult)
async def execute_query(query_request: QueryRequest, db: Session = Depends(get_db)):
    # Save query to history
    connection = db.query(Connection).filter(Connection.id == query_request.connectionId).first()
    if not connection:
        raise HTTPException(status_code=404, detail="Connection not found")
    
    db_query = Query(
        connection_id=query_request.connectionId,
        sql=query_request.sql,
        executed_at=datetime.datetime.utcnow()
    )
    db.add(db_query)
    db.commit()
    
    # Execute query on SQLite (for demonstration)
    start_time = time.time()
    try:
        # Connect to the database specified in the connection
        # For demo purposes, we'll just use a local SQLite database
        conn = sqlite3.connect("data/sql_studio.db")
        cursor = conn.cursor()
        cursor.execute(query_request.sql)
        
        # Get column names
        columns = [description[0] for description in cursor.description] if cursor.description else []
        
        # Get rows
        rows = cursor.fetchall()
        row_count = len(rows)
        
        # Convert rows to list of lists
        rows_as_lists = [list(row) for row in rows]
        
        conn.close()
        
        execution_time = time.time() - start_time
        
        return QueryResult(
            columns=columns,
            rows=rows_as_lists,
            rowCount=row_count,
            executionTime=execution_time
        )
    except Exception as e:
        execution_time = time.time() - start_time
        return QueryResult(
            columns=[],
            rows=[],
            rowCount=0,
            executionTime=execution_time,
            error=str(e)
        )

@router.get("/history", response_model=List[QueryHistory])
async def get_query_history(db: Session = Depends(get_db)):
    queries = db.query(Query).order_by(Query.executed_at.desc()).all()
    return [
        QueryHistory(
            id=q.id,
            connectionId=q.connection_id,
            sql=q.sql,
            executed_at=q.executed_at
        ) for q in queries
    ]
