class RespBean {
  success(message, obj) {
    return {code: 200, message, obj}
  }

  error(message, obj) {
    return {code: 500, message, obj}
  }
}

module.exports = new RespBean()
