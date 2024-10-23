from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, WebAppInfo
from telegram.ext import Updater, CommandHandler

# Replace with your bot token
TELEGRAM_BOT_TOKEN = 'your-telegram-bot-token'

def start(update: Update, context):
    # Create an inline button with WebApp info
    keyboard = [
        [
            InlineKeyboardButton(
                text="Play Flappy Bird",
                web_app=WebAppInfo(url="https://flappy-bird-cyan-eight.vercel.app")  # Web App URL here
            )
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Send a message with the button
    update.message.reply_text("Click the button to play Flappy Bird:", reply_markup=reply_markup)

if __name__ == "__main__":
    updater = Updater(token=TELEGRAM_BOT_TOKEN, use_context=True)
    dp = updater.dispatcher

    # Start command handler
    dp.add_handler(CommandHandler("start", start))

    # Start the bot
    updater.start_polling()
    updater.idle()