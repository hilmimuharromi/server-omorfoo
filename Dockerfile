FROM node:14-alpine
WORKDIR /usr/app
EXPOSE 5000
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]