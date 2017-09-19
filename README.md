# network-dashboard

WARNING: README may be out-of-date on the development stage

## Run in docker (production-ready)

### Prerequisites

 - Docker (1.12+ or 17.04+)
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
 - `<HOST_NAME>` is the host name of the machine (for web browser to access the API from client side). (e.g. for local use only: HOST_NAME=localhost)
 - `<QUORUM_INIT_HOST>` is the host name or IP of the current machine used for Quorum nodes (should be reachable from the internet if external nodes are to be connected to the network)

#### Optional parameters

Optional parameters you may provide along with the above:
 - `ADMIN_PASSWORD` - the password for the initial admin user (default is "admin")

#### Advanced configuration

For advanced config check:
 - `api/quorum-config/` for initial Quorum network configuration
 - `api/config/app.config.js` for advanced api configuration (JWT, initial user, SMTP, email texts)
 - `api/config/config.json`  for advanced database configuration
 - `docker-compose.yml` for deployment configuration (quorum nodes count etc)

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

 - Check `api/config/config.json` for proper postgres cfg (`development` config used by default)

 - Run API server
  ```
  cd network-dashboard/api
  npm install
  npm run start:dev
  ```

 - Run UI server
  ```
  cd network-dashboard/ui
  npm install
  npm start
  ```
