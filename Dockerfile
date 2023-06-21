# Use the official Node.js 14 image as the base
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json /app/

# Install project dependencies
RUN npm install

# Copy the application code to the container
COPY . /app

# Build the application
RUN npm run build

# Expose the desired port
EXPOSE 3000

# Start the application
# CMD [ "node", "dist/index.js" ]
CMD [ "npm", "run", "prod" ]
