# network-dashboard

## Run in docker (production-ready)

### Prerequisites

 - Docker
 - Docker-compose

### Steps

 ```
 cd network-dashboard/
 ./build-images.sh
 docker-compose up -d
 ```

 see docker-compose.yml for possible environment variables used for configuration

## Run locally (development)

### Prerequisites

 NodeJS 6+

### Steps

 - Run postgres
  ```
  docker run --name postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_DB=governance_dev -d postgres
  ```
  OR

  create table if you have postgres running:
  ```
  psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE governance_dev;"
  ```

 - Check `backend/config/config.json` for proper postgres cfg (`development` config used by default)

 - Run backend server
  ```
  cd network-dashboard/backend
  npm install
  PORT=3001 npm start
  ```

 - Run UI server
  ```
  cd network-dashboard/ui
  npm install
  npm start
  ```

`TODO: provide backend URL:PORT to UI server (in npm start)`