# Base image
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build (اگر از 'output: standalone' در next.config.js استفاده می‌کنید، بهینه‌تر است)
# RUN npm run build

# Expose port
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "dev"]

# برای پروداکشن:
# CMD ["npm", "start"]