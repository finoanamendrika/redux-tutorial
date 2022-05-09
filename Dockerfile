# Extending image
FROM node:carbon

# Add a work directory
WORKDIR /app

# Versions
RUN npm -v
RUN node -v

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts@4.0.3 -g

# Copy app files
COPY . .

# Port to listener
EXPOSE 3000

# Environment variables
ENV NODE_ENV dev

# Main command
CMD [ "npm", "run", "start" ]