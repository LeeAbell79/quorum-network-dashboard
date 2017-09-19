const Web3 = require('web3');
const winston = require('winston-color');
const models = require('../models');
const Promise = require('bluebird');
const moment = require('moment');

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

setInterval(function() {
  winston.info('Cleaning data');
  cleanup()
    .then(() => {
      winston.info('Completed queryNodes');
    })
    .catch((err)=>{
      winston.error(err.message);
    });
}, process.env.DELAY);

// remove Stats entries older than x hours
function cleanup() {
  return new Promise(function(resolve, reject) {
    const mDate = moment().subtract(process.env.RETENTION,'hours');
    models.Stat.destroy({
      where: {
        createdAt: {
          $lt: mDate.toDate()
        }
      }
    })
    .then(()=>{
      winston.info('Completed cleanup');
    })
    .catch(reject);
  });
}

function queryNodes() {
  return new Promise(function(resolve, reject) {
    models.Node
      .findAll({
        where: {
          isVerified: true
        }
      })
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
    let isConnected = false;
    let web3;
    if (node.port) {
      try {
        winston.info('Connecting to nodeId ' + node.id + ' with host ' + node.host + ' and port ' + node.port);
        const web3HttpProvider = new Web3.providers.HttpProvider(`${node.host}:${node.port}`);
        web3 = new Web3(web3HttpProvider);

        // TODO: FIX: setting timeout to HttpProvider does not seem to work for isConnected (hangs for 60 sec if host is unreachable). Ping host before checking health with web3?
        isConnected = web3.isConnected();

        models.Stat
          .create({
            NodeId: node.id,
            isConnected: isConnected,
            blockNumber: isConnected ? web3.eth.blockNumber : null,
            peerCount: isConnected ? web3.net.peerCount : null
          })
          .then(resolve)
          .catch((err) => {
            winston.error(err.message);
            resolve();
          });
      }
      catch (err) {
        winston.error(err.message);
        resolve();
      }
    } else {
      models.Stat
        .create({
          NodeId: node.id,
          isConnected: false,
        })
        .then(resolve)
        .catch((err) => {
          winston.error(err.message);
          resolve();
        });
    }
  });
}
