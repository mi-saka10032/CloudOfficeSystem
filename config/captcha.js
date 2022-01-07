module.exports = {
  //验证码
  verifyCode: {
    size: 4,  //验证码长度
    ignoreChars: '0o1i',  //验证码字符排除0oli
    noise: 4, //干扰线条数量
    width: 120,
    height: 50
  }
};
