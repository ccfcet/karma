FROM node:12
WORKDIR /app
COPY package.json ./

RUN npm install
RUN npm -g install nodemon

#FOR PRODUCTION 
# COPY . .
# EXPOSE 8000

CMD [ "nodemon", "src/server.js" ]