FROM node:12.14.1-alpine
WORKDIR /home/src/top5_radio
COPY /frontend/package.json .
RUN npm install
COPY /frontend/src ./src
COPY /frontend/will_package ./will_package
COPY /frontend/webpack.config.js .

EXPOSE 8080
CMD ["npm", "start"]
