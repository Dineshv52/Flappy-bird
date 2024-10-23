# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install any needed packages
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8443 available to the world outside this container
EXPOSE 8443

# Define environment variables (to be replaced by actual values during deployment)
ENV BOT_TOKEN=<your_bot_token>
ENV GAME_URL=<your_game_url>

# Run app.py when the container launches
CMD ["python", "app.py"]