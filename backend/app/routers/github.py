from fastapi import APIRouter, HTTPException
from app.services.github_service import get_user_profile
from app.schemas.github import UserProfileResponse

router = APIRouter(prefix="/api", tags=["github"])

@router.get("/user/{username}", response_model=UserProfileResponse)
async def get_user(username: str):
    try:
        profile = await get_user_profile(username)
        return profile
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch data from GitHub. Please try again later.")