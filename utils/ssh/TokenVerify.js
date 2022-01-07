const fs = require('fs/promises');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = async (token) => {
  try {
    if (!token) return Promise.reject('token不存在！无法实现操作');
    const publicKey = await fs.readFile(path.join(__dirname, './jwtRs256.key.pub'));
    const payload = jwt.verify(token.trim(), publicKey);
    if (!payload.id) return Promise.reject('不存在的ID');
    else return Promise.resolve(payload);
  } catch (error) {
    return Promise.reject('token认证失败');
  }
}

/*const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiYWRtaW4iLCJ1c2VyRmFjZSI6Imh0dHBzOi8vZ2ltZzIuYmFpZHUuY29tL2ltYWdlX3NlYXJjaC9zcmM9aHR0cCUzQSUyRiUyRnVwLnFxMjIuY29tLmNuJTJGaW1nJTJGMjY1MDc5ODQwMiUyRjM3OTgyNTA5OTMuanBnJnJlZmVyPWh0dHAlM0ElMkYlMkZ1cC5xcTIyLmNvbS5jbiZhcHA9MjAwMiZzaXplPWY5OTk5LDEwMDAwJnE9YTgwJm49MCZnPTBuJmZtdD1qcGVnP3NlYz0xNjM4MDIyNjMxJnQ9NzUyY2Y3MGI1ZmNjYTdjZmY1NDM0OGU1YTRjNDMyM2MiLCJpYXQiOjE2MzU0MzYyNzEsImV4cCI6MTYzNjA0MTA3MX0.iEkaPjua9uJ8LGrm01DbuLbl03QFz1gY0yFUmCUPzjefspPY-jhv6-KiNR3pFsafsTgQgWQcxDZYsQ6CUYrtokyaQinQ0ELh2HMdZJCodIma6yzTTwVpXP6JMQqHOlkghnB7sVxDuVIDlYWui4T3ZUYcLbQ3thLcQjzrUxir2jdbSmqXYJAwklN6a_dZ5gFTR9kna7I-eVDeLEBT_jwAiAVNjXT6yCWlA2z3gZsNiqi1uXQs_SSwqdOUMCWv9jcNpwhWL-Pc77ywS7Nsxdw1VY1euG98kgPNXnGpqkqjhICIC6jmrXx5DbU0_m8rzhf9g21PAZmIXXnfbAEM77WSV2CWnIPaW4B7YsV2Dz4v89DYUbhX84FSCf_nHyTQo7c7tRjdXvAoW881eW9BXZ2gMZjxPVFi2E3EnVQ3U_RnHxj5kdVcC90J24sH3Myzf8Cm-snKg6IwcPA_mO45YwefRTAFdOOt0Q8rMkAnuTZJ_1P240GUweSvoESWwK0FXtKewFGLMmE8mgbqQqWY0zp9LID-DPxzCvPWJagcir9KajR9yXficOSgsZqP7oJ7UB6x93XcWaqzcdqm9AtI8tU_rZGF4jQeN7uN0_yJ1AyVYkoIAeztOWjelJ5q5_Z0rNuYeGTpaFKwormK-iIODe8qD9-OgS7V9tFYx5D_wd_81uE';

(async function tok(token) {
  try {
    if (!token) return Promise.reject('无效的token');
    const publicKey = await fs.readFile(path.join(__dirname, './jwtRs256.key.pub'));
    const payload = jwt.verify(token.trim(), publicKey);
    console.log(payload);
  } catch (error) {
    console.log('token认证失败');
  }
})(token)*/
