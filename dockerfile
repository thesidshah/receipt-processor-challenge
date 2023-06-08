# Use an official Node.js runtime as the base image
FROM  node:18-alpine

# Set the working directory inside the container
WORKDIR /solution

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the server listens (replace 3000 with your server's actual port)
EXPOSE 4000

# Start the server
CMD [ "npm", "start" ]
