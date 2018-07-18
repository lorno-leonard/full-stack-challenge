### Environment
NodeJS 6.9.5, NPM 5.6.0

Install the dependencies on root and client directory

```sh
$ npm install && npm install --prefix client
```

### Config
Update `mongoURI` value on `config/keys.js` file. Currently using mLab for mongodb.

### Dev
API/Backend only
```sh
$ npm run server
```
API/Backend and Frontend
```sh
$ npm run dev
```
Access it via `http://localhost:3000`

### Build and Start
```sh
$ npm run start_prod
```
Access it via `http://localhost:5000`