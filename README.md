# network-dashboard

WARNING: README may be out-of-date on the development stage

## Run in docker (production-ready)

### Prerequisites

 - Docker
 - Docker-compose

### Steps

 Login to BlockApps private repo to pull Quorum docker image:
 ```
 docker login repo.blockapps.net:5000
 ```
 `TODO: move image to public repo`


 ```
 cd network-dashboard/
 ./build-images.sh
 HOST_IP=<HOST_IP> HOST_NAME=<HOST_NAME> QUORUM_INIT_HOST=<QUORUM_INIT_HOST> docker-compose up -d
 ```
 where:
 - `<HOST_IP>` is the broadcasted host machine IP address (**NOT the `localhost`, `127.0.0.1` or `0.0.0.0`**)
 - `<HOST_NAME>` is the host name of the machine (for UI to access the API). (e.g. for local use: HOST_NAME=localhost)
 - `<QUORUM_INIT_HOST>` is the host name or IP of the current machine used for Quorum nodes (should be reachable from the internet if external nodes are to be connected to the network)

#### Optional parameters

Optional parameters you may provide along with the above:
 - `ADMIN_EMAIL` - the email of the initial user
 - `ADMIN_PASSWORD` - the password of the initial user (to be changed later in the UI)

#### Advanced configuration

For advanced config check:
 - `backend/quorum-config/` for initial Quorum network configuration
 - `backend/config/app.config.js` for advanced backend configuration
 - `backend/config/config.json`  for advanced database configuration
 - `

## Run locally (development-only)

### Prerequisites

 NodeJS 6+

### Steps

 - Run postgres
  ```
  docker run --name postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_DB=governance_dev -d postgres
  ```
  OR

  create database if you have postgres running:
  ```
  psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE governance_dev;"
  ```

 - Check `backend/config/config.json` for proper postgres cfg (`development` config used by default)

 - Run backend server
  ```
  cd network-dashboard/backend
  npm install
  npm run start:dev
  ```

 - Run UI server
  ```
  cd network-dashboard/ui
  npm install
  npm start
  ```
`TODO: provide backend URL:PORT to UI server (in npm start)`