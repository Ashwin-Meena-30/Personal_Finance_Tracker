# Start with a base Node image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend application source code
COPY . .

# Expose port 3000 for the development server
EXPOSE 3001

# Command to start the development server
CMD ["npm", "run", "start"]
