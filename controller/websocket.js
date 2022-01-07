const Users = require('../services/index');
let sockets = [{id: '', socketId: ''}];

module.exports = (io) => {
  io.on('connection', socket => {
    //上线通知，接收token，解析后返回id值作为key键保留
    socket.on('online', async token => {
      try {
        const {id} = await new Users().tokenVery(token);
        //先遍历一次id，防止页面未刷新的时候多次发送在线事件堆积元素，如果元素不存在再push新的socket对象
        const sock = sockets.filter(item => item.id === id);
        if (sock && sock.length > 0) sock[0].socketId = socket.id;
        else sockets.push({
          id,
          socketId: socket.id
        });
        console.log(`检测到管理员登录聊天页面，管理员id：${id}`);
      } catch (error) {
        console.log(error.toString());
      }
    })

    //"令牌-对象id-消息"事件
    socket.on('auth-id-message', async data => {
      try {
        const {fromToken, toId, msg} = data;
        //此处只需验证完成token即可，本地消息展示由vuex完成无需传输数据
        const {id} = await new Users().tokenVery(fromToken);
        const fromId = id;
        //遍历sockets数组，找到符合条件的对象toId值，完成定点发送。找到fromId值，用于对方下线的通知提醒
        const toSock = sockets.filter(item => item.id === toId);
        //sock存在且长度不为0，说明对方在线
        if (toSock && toSock.length > 0) {
          io.to(toSock[0].socketId).emit('MessageInteraction', {...msg, fromId, toId});
          socket.emit('SuccessfulSending', {...msg, fromId, toId});
        } else {
          socket.emit('NotOnline');
        }
      } catch (error) {
        console.log(error.toString());
      }
    });

    //客户端断开时去清除sockets中的id
    socket.on('disconnect', () => {
      let id;
      sockets = sockets.filter(item => {
        if (item.socketId === socket.id) {
          id = item.id;
          return false;
        } else return true;
      });
      console.log(`检测到管理员断开登录，管理员id：${id}`);
    });
  })

  io.on('disconnection', () => {
    console.log('websocket总连接断开……');
  });
}
