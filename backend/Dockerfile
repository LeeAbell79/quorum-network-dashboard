FROM node:boron-slim

RUN mkdir -p /usr/src/app && \
# Installing docker to run sibling containers
  apt-get update && \
  apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common && \
  curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
  add-apt-repository \
     "deb [arch=amd64] https://download.docker.com/linux/debian \
     $(lsb_release -cs) \
     stable" && \
  apt-get update && \
  apt-get install -y docker-ce && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
# TODO: Install docker-compose

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD [ "sh", "/usr/src/app/docker-run.sh" ]