//util/originalWS.js

module.exports =  {
  createWss(wss) {
    wss.on('connection', (ws,req) => {
      console.log(req);
      this.numClients++;
      ws.isAlive = true;
      ws.on('pong', this.heartbeat);//测速激活连接
      this.handle(wss);//连接第一次广播
      ws.on('close', ()=> {
        this.numClients--;
      })
    })
    this.wss = wss;//将第一次创建连接时传入的wss保存起来，以便其他路由使用时可以直接连接
  },
  numClients: 0,//连接计数器
  async handle(wss) {
    let data = {
      name: '这是服务器发送的广播'
    };
    //此处写业务逻辑
    console.log('webSocket connectClients: ' + this.numClients);
    wss.clients.forEach(function each(client) {
      if (client.isAlive === false) {//如果非优雅断开，则强制停止，如网线被拔
        this.numClients--;
        return client.terminate();
      }
      client.isAlive = false;   //先设置成false
      client.ping(this.noop);   //尝试Ping如果响应则true
      client.send(JSON.stringify(data));    //发送消息
    });
  },
  //写其他handle在其他场景使用
  heartbeat() {
    this.isAlive = true;
  },
  noop() {

  }
}
