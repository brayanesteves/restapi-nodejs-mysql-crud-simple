# Step 0: From node verison 12 run
FROM node:12
# Step 1: Direcotry work
WORKDIR /app
# Step 2: Copy files
COPY package*.json ./
# Step 3: Execute command 'npm install'
RUN npm install
# Step 4: Copy all files 
COPY . .
# Step 5: 
CMD ["npm", "start"]