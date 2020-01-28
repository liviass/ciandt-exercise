FROM node:12.14.1-alpine
WORKDIR /home/src/top5_radio
COPY /backend/package.json .
RUN npm install
COPY /backend/src ./src

EXPOSE 5000
CMD ["npm", "start"]