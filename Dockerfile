# Use the official Node.js 14 image as the base
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json .

# Install project dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the desired port
# EXPOSE 3000

# Start the application
CMD [ "node", "prod" ]
