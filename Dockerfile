# Sử dụng Node.js LTS
FROM node:18

# Tạo thư mục app
WORKDIR /app

# Copy package.json trước để cache cài đặt
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ code
COPY . .

# Mặc định chạy dev server
CMD ["npm", "start"]


