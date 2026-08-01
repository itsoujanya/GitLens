import httpx
from app.config import settings

class GitHubClient:
    def __init__(self):
        self.base_url = settings.GITHUB_API_BASE_URL
        self.headers = {
            "Accept": "application/vnd.github.v3+json"
        }
        if settings.GITHUB_TOKEN:
            self.headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"

    async def get(self, endpoint: str) -> dict | list:
        """Make a GET request to GitHub API and return JSON."""
        url = f"{self.base_url}{endpoint}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers)
            if response.status_code == 404:
                raise ValueError("User not found")
            if response.status_code == 403 and "rate limit" in response.text.lower():
                raise Exception("GitHub API rate limit exceeded. Try again later.")
            response.raise_for_status()  # throw for other 4xx/5xx
            return response.json()

# Singleton instance to reuse
github_client = GitHubClient()