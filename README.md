<div align="center">
    <h1>Dashboard - Epitech 2021</h1>

    Author : Nicolas SANS, Victor SAUVAGET - EPITECH Promo 2024
</div>

## Aims of the project

The objective of the project is to create an dashboard application. Dashboard is a web application that allows you to drag and drop, configure, set up widgets from services.

## Services

- Calendarific
- NY Times
- OpenWeather

## Widgets

Calendarific
    - Is today a holiday ?
    - Holiday in yeat

NY Times
    - Top stories article
    - Most popular article

OpenWeather
    - Next 5 days forecast
    - Current weather

## Installation

### Clone repository

```
$ git clone https://github.com/EpitechPromo2024/B-DEV-500-NAN-5-1-dashboard-victor.sauvaget
```

### Go to directory

```
$ cd B-DEV-500-NAN-5-1-dashboard-victor.sauvaget
```
## Build

Prerequisites

Fill the 'example.env' in server directory.

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

At the root of the repository

```shell
$ sudo docker-compose build && sudo docker-compose up
```

OR

```shell
$ ./docker.sh
```

## Authors

- [Victor SAUVAGET](https://github.com/VicSAU/)
- [Nicolas SANS](https://github.com/frnikho/)