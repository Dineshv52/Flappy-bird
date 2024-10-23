from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler

# Replace with your bot token
BOT_TOKEN = 'your-telegram-bot-token'

async def start(update, context):
    # Create an inline button with WebApp info
    keyboard = [
        [
            InlineKeyboardButton(
                text="Play Flappy Bird",
                web_app=WebAppInfo(url="https://flappybird-game.vercel.app")  # Web App URL here
            )
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Send a message with the button
    await update.message.reply_text("Click the button to play Flappy Bird:", reply_markup=reply_markup)

def main():
    # Create the application with your bot token
    application = Application.builder().token(BOT_TOKEN).build()

    # Add the start command handler
    application.add_handler(CommandHandler("start", start))

    # Start the bot using the run_polling() method (no need for async here)
    application.run_polling()

if __name__ == "__main__":
    main()