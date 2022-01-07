/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
module.exports = function getClientIP(req){
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket
}         // 判断是否有反向代理 IP         // 判断 connection 的远程 IP       // 判断后端的 socket 的 IP

