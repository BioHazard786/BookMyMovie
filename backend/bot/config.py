from dotenv import load_dotenv
from os import getenv

try:
    load_dotenv(".env")
except:
    pass

BOT_TOKEN = getenv("BOT_TOKEN")
API_ID = int(getenv("API_ID"))
API_HASH = getenv("API_HASH")
MONGO_DB_URL = getenv("MONGO_DB_URL")
