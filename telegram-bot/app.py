import os
import requests
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext

# Get environment variables for bot token and game URL
BOT_TOKEN = os.getenv("BOT_TOKEN")
GAME_URL = os.getenv("GAME_URL")


# Start command handler
def start(update: Update, context: CallbackContext):
    keyboard = [[InlineKeyboardButton("Play Flappy Bird", url=GAME_URL)]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text("Click the button below to play the game:", reply_markup=reply_markup)


def main():
    updater = Updater(BOT_TOKEN, use_context=True)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))

    updater.start_polling()
    updater.idle()


if __name__ == "__main__":
    main()