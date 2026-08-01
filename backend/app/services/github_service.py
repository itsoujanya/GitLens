from collections import Counter
from app.utils.github_client import github_client
from app.schemas.github import GitHubUser, GitHubRepo, LanguageStat, UserProfileResponse

async def get_user_profile(username: str) -> UserProfileResponse:
    # 1. Fetch user data
    user_data = await github_client.get(f"/users/{username}")
    user = GitHubUser(**user_data)  # validate and parse

    # 2. Fetch repositories (sorted by stars descending to pick top)
    repos_data = await github_client.get(f"/users/{username}/repos?per_page=100&sort=stars&direction=desc")
    repos = [GitHubRepo(**repo) for repo in repos_data]

    # 3. Calculate top languages
    language_counter = Counter()
    total_lang_repos = 0
    for repo in repos:
        if repo.language:
            language_counter[repo.language] += 1
            total_lang_repos += 1

    # Build language stats list with percentages
    top_languages = []
    for lang, count in language_counter.most_common(6):  # top 6 languages
        percentage = round((count / total_lang_repos) * 100, 2) if total_lang_repos > 0 else 0
        top_languages.append(LanguageStat(language=lang, count=count, percentage=percentage))

    # 4. Most starred repo
    most_starred = repos[0] if repos else None

    # 5. Total stars across all repos (we fetched max 100)
    total_stars = sum(repo.stargazers_count for repo in repos)

    # 6. Generate insights (pure logic, no AI)
    insights = generate_insights(user, repos, top_languages)

    return UserProfileResponse(
        user=user,
        top_languages=top_languages,
        most_starred_repo=most_starred,
        total_stars=total_stars,
        insight_messages=insights
    )

def generate_insights(user: GitHubUser, repos: list[GitHubRepo], languages: list[LanguageStat]) -> list[str]:
    insights = []

    # Insight 1: Strongest language
    if languages:
        top_lang = languages[0].language
        insights.append(f"Your strongest language appears to be {top_lang}.")

    # Insight 2: Most popular repo
    if repos:
        top_repo = max(repos, key=lambda r: r.stargazers_count)
        insights.append(f"Your most popular repository is '{top_repo.name}' with {top_repo.stargazers_count} stars.")

    # Insight 3: Consistency / total repos
    if user.public_repos > 10:
        insights.append("You maintain a large number of repositories — impressive consistency!")
    elif user.public_repos > 0:
        insights.append("You have a solid set of public repositories.")

    # Insight 4: Bio / location
    if user.bio:
        insights.append(f"Your bio — \"{user.bio}\" — reflects a clear personal brand.")
    if user.location:
        insights.append(f"Based in {user.location}, you're part of a global developer community.")

    # Keep it to 3-4 meaningful messages
    return insights[:4]