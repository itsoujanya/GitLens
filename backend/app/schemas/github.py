from pydantic import BaseModel

class GitHubUser(BaseModel):
    login: str
    name: str | None
    avatar_url: str
    html_url: str
    bio: str | None
    location: str | None
    public_repos: int
    public_gists: int  # add this line
    followers: int
    following: int
    created_at: str  # ISO date string

class GitHubRepo(BaseModel):
    name: str
    html_url: str
    description: str | None
    language: str | None
    stargazers_count: int
    forks_count: int
    watchers_count: int
    updated_at: str
    # We'll add a computed field for "pushed_at" if needed

class LanguageStat(BaseModel):
    language: str
    count: int
    percentage: float  # computed

class UserProfileResponse(BaseModel):
    user: GitHubUser
    repos: list[GitHubRepo]  # add this line
    top_languages: list[LanguageStat]
    most_starred_repo: GitHubRepo | None
    total_stars: int
    insight_messages: list[str]