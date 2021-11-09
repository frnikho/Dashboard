FROM node:16-alpine3.13

COPY src src
COPY package.json .

WORKDIR .
RUN npm install
CMD ["npm", "run", "start"]