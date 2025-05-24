# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import connections, queries

app = FastAPI(title="AI SQL Studio API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(connections.router, prefix="/api/connections", tags=["connections"])
app.include_router(queries.router, prefix="/api/queries", tags=["queries"])

@app.get("/")
async def root():
    return {"message": "Welcome to AI SQL Studio API"}
