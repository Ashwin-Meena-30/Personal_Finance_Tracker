# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Install additional dependencies for Sequelize
RUN npm install sequelize sequelize-cli pg pg-hstore

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run migration and then start the ap

CMD ["npm", "start"]
