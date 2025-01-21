# Use Node.js LTS version as the base image
FROM node:18-slim AS builder

# Set working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
# RUN npm install --only=production
RUN npm install

# Rebuild native modules (like bcrypt) inside the container
# RUN npm rebuild bcrypt --build-from-source

# Copy the entire backend project into the container
COPY . .

# Build the project (if applicable, e.g., TypeScript to JavaScript)
RUN npm run build

# Expose the application port
EXPOSE 3001

# Define the command to run the application
CMD ["node", "dist/main.js"]
