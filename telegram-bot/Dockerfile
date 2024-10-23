# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container
COPY . .

# Install dependencies
RUN pip install python-telegram-bot

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV TELEGRAM_BOT_TOKEN=<YOUR_TELEGRAM_BOT_TOKEN>

# Run the bot
CMD ["python", "./app.py"]