const bcrypt = require('bcrypt');
const fs = require('fs');

const models = require('../../models');

const initialUser = {
  email: process.env['ADMIN_EMAIL'] || 'admin@example.com',
  password: process.env['ADMIN_PASSWORD'] || 'admin'
};

// TODO: refactor, add rejects handling (or rewrite to migrations)

const createInitialData = () =>
  new Promise(resolve => {
    initScripts.createInitialUser()
      .then(() =>
        initScripts.registerInitialNodes(1)
          .then(() => resolve())
      );
  });


const initScripts = {
  /**
   * Check if not exists and create the admin user with id=1
   */
  createInitialUser: () => new Promise((resolve, reject) => {
    models.User.count().then(count => {
      if (count) {
        console.log("At least one user exists - skipping the init process");
        return resolve(false);
      }
      console.log('First run - default user is being created...');
      if (!process.env['ADMIN_EMAIL']) {
        console.log(`ADMIN_EMAIL env var not provided - using default email: ${initialUser.email}`)
      }
      if (!process.env['ADMIN_PASSWORD']) {
        console.log(`ADMIN_PASSWORD env var not provided - using default password: ${initialUser.password}`)
      }

      // Create default roles
      models.Role.bulkCreate([{name: "admin"}, {name: "party"}]).then(() => {
        // create the password hash
        bcrypt.hash(initialUser.password, 10, function (err, hash) {
          if (err) {
            throw Error('password encryption error for password provided in ADMIN_PASSWORD env var')
          }
          // Create first user
          models.User.create({
            email: initialUser.email,
            passwordHash: hash,
            isConfirmed: true
          }).then(function (user) {
            // get the admin role (can't use createdRoles since they don't have ids at this point)
            models.Role.findAll({
              where: {
                name: 'admin'
              }
            }).then(function (adminRole) {
              user.addRole(adminRole).then(() =>
                resolve(user)
              );
            })
          })
        })
      })
    })
  }),

  /**
   * Register the initial running quorum nodes in database
   * @param userId
   */
  registerInitialNodes: (userId) => new Promise((resolve, reject) => {
    models.Node.count().then(count => {
      if (count) {
        console.log("At least one node exists - skipping the nodes init process");
        return resolve(false);
      }
      console.log('First run - initial quorum nodes are being registered in DB...');
      if (!process.env['QUORUM_INIT_HOST']) {
        console.log('QUORUM_INIT_HOST env var not provided - skipping nodes init process');
        return resolve(false);
      }
      if (!process.env['QUORUM_INIT_RPC_PORTS']) {
        console.log('QUORUM_INIT_RPC_PORTS env var not provided - skipping nodes init process}');
        return resolve(false);
      }

      let nodes = [];
      try {
        // todo: add regexp to validate format
        process.env['QUORUM_INIT_RPC_PORTS'].split(',').forEach(
          pair => {
            pair = pair.split(':');
            nodes.push({id: pair[0], port: pair[1]});
          }
        );
      } catch(err) {
        console.error(err);
        throw new Error('wrong QUORUM_INIT_RPC_PORTS value format. Expected: "nodeId:port[,nodeId:port...]"');
      }

      // TODO: read from each node's consteallation key file instead
      const genesisFilePath = `quorum-config/genesis-raft.json`;
      const genesisConfig = JSON.parse(fs.readFileSync(genesisFilePath, 'utf8'));
      let addresses = [];
      for (const address in genesisConfig.alloc ) {
        addresses.push(address);
      }

      const nodesDataList = nodes.map(node => {
        const publicKeyFilePath = `quorum-config/constellation/keys/tm${node.id}.pub`;
        const publicKey = fs.readFileSync(publicKeyFilePath, 'utf8');
        if (!publicKey) {
          throw new Error(`could not read the public key from ${publicKeyFilePath} for node with id ${node.id}`);
        }
        return models.Node.prepareNodeData(
          userId,
          `node${node.id}`,
          process.env['QUORUM_INIT_HOST'],
          node.port,
          addresses[node.id - 1],
          publicKey
        )
      });
      models.Node.bulkCreate(nodesDataList).then(res =>
        resolve(res)
      );
    })
  })
};

module.exports = createInitialData;