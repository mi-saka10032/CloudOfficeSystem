const fs = require('fs/promises');
const path = require('path');
const jwt = require('jsonwebtoken');
const {sshKey: {expiresIn}} = require('../../config/ssh');
module.exports = async (obj) => {
  const PUBLICKEY = await fs.readFile(path.join(__dirname, './jwtRs256.key'));
  return jwt.sign(obj, PUBLICKEY, {algorithm: 'RS256',expiresIn} );
}

