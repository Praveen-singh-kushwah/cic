# Stage 1: Build the React-Vite app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:latest

# Copy the built frontend files to Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for serving the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
