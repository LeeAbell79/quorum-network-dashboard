const Web3 = require('web3');
const winston = require('winston-color');
const models = require('../models');
const Promise = require('bluebird');

winston.info('Starting node-ping with a delay of', process.env.DELAY);

setInterval(function() {
  winston.info('Calling queryNodes');
  queryNodes()
    .then(() => {
      winston.info('Completed queryNodes');
    })
    .catch((err)=>{
      winston.error(err.message);
    });
}, process.env.DELAY);


//TODO: remove entries older than x hours
function cleanup() {

}

function queryNodes() {
  return new Promise(function(resolve, reject) {
    models.Node
      .findAll()
      .then((nodes) => {
        Promise
          .map(nodes, getNodeStats)
          .then(()=>{
            return resolve();
          });
      })
      .catch(reject);
  });
}

function getNodeStats(node) {
  return new Promise((resolve, reject) => {

    try {
      winston.info('Connecting to nodeId ' + node.id + ' with url ' + node.url);
      const web3HttpProvider = new Web3.providers.HttpProvider(`http://${node.host}:${node.port}`);
      const web3 = new Web3(web3HttpProvider);

      const isConnected = web3.isConnected();

      models.Stat
        .create({
          NodeId: node.id,
          isConnected : isConnected,
          blockNumber : isConnected ? web3.eth.blockNumber : null,
          peerCount   : isConnected ? web3.net.peerCount   : null
        })
        .then(resolve)
        .catch((err) => {
          winston.error(err.message);
          resolve();
        });
    }
    catch(err) {
      winston.error(err.message);
      resolve();
    }

  });
}
