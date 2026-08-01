from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="GitLens API",
    description="Backend for the GitLens developer analytics dashboard",
    version="0.1.0",
)

# CORS settings (allow frontend dev server and production Vercel domain)
origins = [
    "http://localhost:5173",   # Vite dev server
    "https://gitlens.vercel.app",  # placeholder for production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "GitLens API is running"}