FROM node:16-alpine3.13

COPY package.json client/package.json
COPY public client/public
COPY src client/src

WORKDIR client

RUN npm install
RUN npm install -g serve

RUN npm run build

WORKDIR /

CMD ["serve", "client/build"]