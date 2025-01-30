# Snappic Assessment

Thank you for the opportunity to present my full-stack assessment - Dom

## Demo website:

A working version of the web app is available at

```aiignore
https://qfq3cdusux0qryz713290.cleavr.one/
```

## Technologies used

### VueJS

Vue was chosen for its effective management of pages, routes and components.

### Quasar

Quasar is a VueJS framework that provides ready-made components and animations. I chose a server-side rendered mode in
Quasar that also exposes a NodeJS/Express API.

### Pinia store

Persistence in the app is done using Pinia, a state management library for Vue.

### NodeJS

Node was chosen for the backend stack as it integrates well with Vue and Quasar. Node gives us access to low-level
system functions without the need for a stand-alone backend. The backend functionality implements an ExpressJS server.
The Express server code can be found in ``/src-ssr/server.ts``

### SQLite

I chose SQLite as it is flexible and fast, and can easily be accessed using the ``better-sqlite3`` npm package.

### Animations

Animations are handled by both the Greensock Animation Platform as well as animate.css, depending on use case.

## Database

Database functionality is encapsulated in ``/src-ssr/DatabaseService.ts``

### Schema

```aiignore
id INTEGER PRIMARY KEY AUTOINCREMENT,
color STRING NOT NULL,
startTime STRING NOT NULL,
endTime STRING NOT NULL,
uuid STRING NOT NULL,
name STRING NOT NULL
```

## API Details

The API is exposed via GET and POST routes managed by the ExpressJS server.

### Endpoints

The endpoints are set in ``src/abstract/Settings.ts``

```
export const ENDPOINTS = {
    FETCH_STREAMS: '/fetchstreams',
    SAVE_STREAM: '/savestream',
    UPDATE_STREAM: '/updatestream',
    DELETE_STREAM: '/deletestream',
}
```

## Why server-side rendered?

SSR has several benefits, including better SEO. The Vue app is pre-rendered on the server for the first page load, after
which the app behaves like a PWA. This combines the best of both worlds.

## Further improvements

### API security

Currently the API is accessed without a token. For production I would add JWT functionality to better secure the API.

### Improved error handling

While every effort has been made to handle errors, additional checks and balances could be implemented.

### Better responsivity

A mobile screen version of the web app is available but could do with some improvements.

### Database

For production I would add database versioning and upgrade functionality in case the schema changes.

### SQL attack protection

While some effort has gone into preventing attacks by using templates, additional SQL injection checks could be added.

### Interactive stream display

I would allow the user to drag the start and end points of each stream to more easily adjust the times.

## How to use this repo

### Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode
```bash
quasar dev --mode ssr
```


### Build the app for production
```bash
quasar build --mode ssr
```
