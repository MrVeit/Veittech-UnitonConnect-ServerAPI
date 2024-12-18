# Specify the Node.js base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files into a container
COPY . .

# Open the port on which the application will run
EXPOSE 3000

# Define a command to start your API server
CMD ["node", "server.js"]