import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env file if present

class Settings:
    GITHUB_API_BASE_URL: str = "https://api.github.com"
    # Optional token to increase rate limit (if provided)
    GITHUB_TOKEN: str | None = os.getenv("GITHUB_TOKEN")

settings = Settings()