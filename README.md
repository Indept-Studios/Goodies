<h1 align="center">Welcome to goodies 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/goodies" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/goodies.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> A small backend game server for testing and learning JavaScript, NodeJS and ExpressJS

## Elevator Pitch

You are an Business owner with a vehicle and limited resources. 
Travel from city to city and make deals to increase your money

## Install

After cloning and opening in VS code, simply

```sh
npm install
```

## Usage

To start the server in development mode, simply enter
```sh
npm run dev
```

To start the server in development mode with nodemon, simply enter
(nodemon is a tool to start the server in hot reload mode, it restarts automatically after every change)
```sh
npm run devn
```

Unless otherwise specified in the .env file, 
the server starts on port 3000 and can therefore be reached at
```sh
localhost:3000/api
```

To start a new game, the player must first register under 
```sh
localhost:3000/api/register
```

Afterwards you can log in under
```sh
localhost:3000/api/login
```

The token received there must be transmitted as a bearer token in the header for verification.

The following routes are then available

```sh
   └───routes
       ├───buy
       ├───move
       ├───sell
       └───state
```

## Cities and Goods

Here you will find two files for creating new cities or goods
```sh
├───generateCities
│       cities.txt
│       goods.txt
```

Simply make an entry in the next line and then execute the following command
```sh
npm run cities
```

## Savegames & Users

Players and their savegame are saved in ```users.json```

## Author

👤 **Chris Wesch**

* Github: [@Indept-Studios](https://github.com/Indept-Studios)

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_