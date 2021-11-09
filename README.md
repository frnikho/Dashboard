# Dashboard

## services

## widgets

## Installation

### from source

first, you need to clone the repository:

```shell
$ git clone https://github.com/EpitechPromo2024/B-DEV-500-NAN-5-1-dashboard-victor.sauvaget
```

#### Server

```shell
$ cd server && npm i
$ npm run start
```

#### Client

```shell
$ cd client && npm i
$ npm run build
# you need to launch the client with a http server like 'serve'
$ serve build
```

### Docker

```shell
$ git clone https://github.com/EpitechPromo2024/B-DEV-500-NAN-5-1-dashboard-victor.sauvaget
$ docker build -t dashboard-client:0.1 client
$ docker build -t dashboard-server:0.1 server 

$ docker run -p 3000:3000 dashboard-client:0.1
$ docker run -p 3030:3030 dashboard-server:0.1
```


## authors

- [Victor SAUVAGET](https://github.com/VicSAU/)
- [Nicolas SANS](https://github.com/frnikho/)