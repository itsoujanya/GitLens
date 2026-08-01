from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import github

app = FastAPI(
    title="GitLens API",
    description="Backend for the GitLens developer analytics dashboard",
    version="0.1.0",
)

# CORS settings
origins = [
    "http://localhost:5173",
    "https://gitlens.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(github.router)

@app.get("/")
async def root():
    return {"message": "GitLens API is running"}