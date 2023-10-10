from typing import Dict
from pyrogram import Client, filters, enums
from pyrogram.types import Message, Update, User, Chat, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from pyrogram.raw.types import UpdateBotPrecheckoutQuery
from pyrogram.raw.functions.messages import SetBotPrecheckoutResults
from config import BOT_TOKEN, API_HASH, API_ID
import json

# Initialize the pyrogram client with bot_token, api_id, api_hash
bot = Client(
    "Payment Handler",
    api_id=API_ID,
    api_hash=API_HASH,
    bot_token=BOT_TOKEN,
    parse_mode=enums.ParseMode.HTML
)


# Listening for messages with command start and help
@bot.on_message(filters.command(['start', 'help']) & filters.private)
async def start(client: Client, message: Message):
    """Function for handling new messages.

        Parameters:
            ``Client``: The client pyrogram object\n
            ``Message``: The message object refferencing the current chat
        """

    # Creating Inline Button with web app url
    button = [InlineKeyboardButton(
        text="Book Ticket",
        web_app=WebAppInfo(
            url="https://bookmymovie-telegram.vercel.app/"
        )
    )]
    markup = InlineKeyboardMarkup([button])
    # Sending message back to user
    await message.reply("<b>Let's get started 🎫</b>\n\nFor payment use the card number <code>4242 4242 4242 4242</code> with any CVV code and Expiry date\n\nPlease tap the button below to book your movie ticket!", reply_markup=markup)


# Listening for answerPreCheckoutQuery
@bot.on_raw_update()
async def answer_prechechout_query(client: Client, update: Update, users: Dict[int, User], chats: Dict[int, Chat]):
    """Function for handling new updates and filtering only UpdateBotPrecheckoutQuery update.
        """
    # Filtering query
    if not isinstance(update, UpdateBotPrecheckoutQuery):
        return
    payload = json.loads(update.payload)

    # Sending response to api answering PreCheckoutQuery with query id
    await bot.invoke(
        SetBotPrecheckoutResults(
            query_id=update.query_id,
            success=True,
            error=None,
        )
    )

    # Sending message to user for payment completed
    return await bot.send_message(
        chat_id=update.user_id,
        text=f"Thank you for your 'payment' for {payload['num_tickets']} tickets! Don't worry, your imaginary credit card was not charged. Your movie '{payload['movie_name']}' is not scheduled on {payload['schedule']}",
    )

# long polling the Client for listening updates
bot.run()
