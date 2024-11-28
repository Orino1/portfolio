import logging
import os
from urllib.parse import quote

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = quote(
    os.getenv("DB_PASSWORD")
)  # having an @ at the end is a pain in the ass
DB_NAME = os.getenv("DB_NAME")


class Config:

    SQLALCHEMY_DATABASE_URI = (
        f"mysql://{DB_USERNAME}:{DB_PASSWORD}@localhost:3306/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_CSRF_PROTECT = False

    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads/thumbnails")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024


logger = logging.getLogger("main")
logger.setLevel(logging.INFO)

handler = logging.FileHandler(os.getenv("LOG_FILE"))
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)

logger.addHandler(handler)
