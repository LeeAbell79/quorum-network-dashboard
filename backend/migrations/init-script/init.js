const bcrypt = require('bcrypt');
const models = require('../../models');

const initialUser = {
  email: process.env['ADMIN_EMAIL'] || 'admin4@example.com',
  password: process.env['ADMIN_PASSWORD'] || 'admin'
};

// TODO: rewrite to migration instead

/**
 * Check if not exists and create the admin user with id=1
 * @returns {Promise.<TResult>}
 */
const createInitialUser = function() {
  return models.User.count().then(count => {
    if (count) {
      console.log("At least one user exists - skipping the init script");
      return true;
    }
    console.log('First run - default user is being created...');
    if (!process.env['ADMIN_EMAIL']) {
      console.log(`ADMIN_EMAIL env var not provided - using default email: ${initialUser.email}`)
    }
    if (!process.env['ADMIN_PASSWORD']) {
      console.log(`ADMIN_PASSWORD env var not provided - using default password: ${initialUser.password}`)
    }

    // Create default roles
    return models.Role.bulkCreate([{name: "admin"}, {name: "party"}]).then(function(createdRoles) {
        // create the password hash
        return bcrypt.hash(initialUser.password, 10, function (err, hash) {
          if (err) {
            throw Error('password encryption error for password provided in ADMIN_PASSWORD env var')
          }
          // Create first user
          return models.User.create({
            email: initialUser.email,
            passwordHash: hash,
            isConfirmed: true
          }).then(function(user) {
            // get the admin role (can't use createdRoles since they don't have ids at this point)
            return models.Role.findAll({
              where: {
                name: 'admin'
              }
            }).then(function(adminRole) {
              return user.addRole(adminRole);
            })
          })
        })
      })
  })
};

module.exports = createInitialUser;