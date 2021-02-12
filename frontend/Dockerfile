# Create image based on the official Node image from dockerhub
FROM node:14-alpine3.10

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy all project files into current working direct 
COPY . .

# Install angular 
RUN npm install -g @angular/cli@10.1.7

# Install all npm dependencies
RUN npm install

# Build angular project
RUN npm run build 

# Soon After, Delete alll uncessary files and node_modules.
RUN rm -rf ./src

RUN rm -rf ./node_modules

# Expose the port the app runs in
EXPOSE 4200

# Start test server
CMD ["node", "testserver.js"]

