FROM node

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
EXPOSE 4173
CMD ["sh", "-c", "npm run production"]