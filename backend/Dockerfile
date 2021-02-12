# Create image based on the official Node 6 image from the dockerhub
FROM node:14-alpine3.10

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy everything into the working directort
COPY . .

# Create ENV variables
ENV PORT_node='3500'

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE $PORT_node

# Serve the app
CMD ["node", "server.js"]