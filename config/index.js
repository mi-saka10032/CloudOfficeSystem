const os = require('os');
let localhost = ''
try {
  let network = os.networkInterfaces()
  localhost = network[Object.keys(network)[0]][1].address
} catch (e) {
  localhost = 'localhost'
}
module.exports = {
  //端口号
  protocol: 'http',
  localhost,
  port: 3000
}
