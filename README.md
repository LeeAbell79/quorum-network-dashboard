# Quorum Network Dashboard

## Run in docker

### Prerequisites

 - Docker (1.12+ or 17.04+)
 - Docker-compose
 NOTE: works the best on Linux and Mac

### Steps

1. Get docker registry credentials from BlockApps team via email trial@blockapps.net
2. Login to BlockApps public registry using the instructions in the email (after you get the email from BlockApps team)
3. Run the instance:
 ```
 cd network-dashboard/
 ./build-images.sh
 HOST_IP=<HOST_IP> HOST_NAME=<HOST_NAME> QUORUM_INIT_HOST=<QUORUM_INIT_HOST> docker-compose up -d
 ```
 where:
 - `<HOST_IP>` is the host machine public IP address (**NOT the `localhost`, `127.0.0.1` or `0.0.0.0`**)
 - `<HOST_NAME>` is the host name of the machine (for web browser to access the API from client side). (e.g. for local use: HOST_NAME=localhost)
 - `<QUORUM_INIT_HOST>` is the host name or IP of the host machine used for Quorum nodes (should be reachable from the internet if external nodes are to be connected to the network)

#### Optional parameters

Optional parameters you may provide along with the above:
 - `ADMIN_PASSWORD` - the password for the initial admin user (default is "admin")

#### Advanced configuration

For advanced config check:
 - `api/quorum-config/` for initial Quorum network configuration (images to be rebuilt after changes made)
 - `api/config/app.config.js` for advanced api configuration (JWT, initial user, SMTP, email texts) (images to be rebuilt after changes made)
 - `api/config/config.json`  for advanced database configuration (images to be rebuilt after changes made)
 - `docker-compose.yml` for deployment configuration (quorum nodes count etc)
