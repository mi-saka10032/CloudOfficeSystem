module.exports = {
  //cors
  corsConfig: {
    origin: ctx => ctx.headers.origin,
    credentials: true
  }
}
