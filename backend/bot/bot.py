from typing import Dict
from pyrogram import Client, filters, enums
from pyrogram.types import Message, Update, User, Chat, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from pyrogram.raw.types import UpdateBotPrecheckoutQuery
from pyrogram.raw.functions.messages import SetBotPrecheckoutResults
from config import BOT_TOKEN, API_HASH, API_ID
import json

bot = Client(
    "Payment Handler",
    api_id=API_ID,
    api_hash=API_HASH,
    bot_token=BOT_TOKEN,
    parse_mode=enums.ParseMode.HTML
)


@bot.on_message(filters.command(['start', 'help']) & filters.private)
async def start(client: Client, message: Message):
    button = [InlineKeyboardButton(
        text="Book Ticket",
        web_app=WebAppInfo(
            url="https://bookmymovie-telegram.vercel.app/"
        )
    )]
    markup = InlineKeyboardMarkup([button])
    await message.reply("<b>Let's get started 🎫</b>\n\nFor payment use the card number <code>4242 4242 4242 4242</code> with any CVV code and Expiry date\n\nPlease tap the button below to book your movie ticket!", reply_markup=markup)


@bot.on_raw_update()
async def answer_prechechout_query(client: Client, update: Update, users: Dict[int, User], chats: Dict[int, Chat]):
    if not isinstance(update, UpdateBotPrecheckoutQuery):
        return
    payload = json.loads(update.payload)
    await bot.invoke(
        SetBotPrecheckoutResults(
            query_id=update.query_id,
            success=True,
            error=None,
        )
    )
    return await bot.send_message(
        chat_id=update.user_id,
        text=f"Thank you for your 'payment' for {payload['num_tickets']} tickets! Don't worry, your imaginary credit card was not charged. Your movie '{payload['movie_name']}' is not scheduled on {payload['schedule']}",
    )


bot.run()
