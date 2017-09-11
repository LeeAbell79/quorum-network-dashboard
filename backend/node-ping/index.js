const Web3 = require('web3');
const winston = require('winston-color');
const models = require('../models');

const web3HttpProvider = new Web3.providers.HttpProvider(process.env.NODE_URL);
const web3 = new Web3(web3HttpProvider);

const isConnected = web3.isConnected();

models.Stats.create({
  isConnected : isConnected,
  blockNumber : isConnected ? web3.eth.blockNumber : null,
  peerCount   : isConnected ? web3.net.peerCount   : null
});


// TODO: add node link to stat
// TODO: add node iterator
