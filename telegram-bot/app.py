import os
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler

GAME_URL = "flappy-bird-cyan-eight.vercel.app"

async def start(update: Update, context) -> None:
    await update.message.reply_text(f"Welcome! Play the Flappy Bird game here: {GAME_URL}")

async def help_command(update: Update, context) -> None:
    await update.message.reply_text("Use /start to get the game link.")

if __name__ == "__main__":
    TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
    application = ApplicationBuilder().token(TOKEN).build()

    start_handler = CommandHandler('start', start)
    help_handler = CommandHandler('help', help_command)

    application.add_handler(start_handler)
    application.add_handler(help_handler)

    application.run_polling()